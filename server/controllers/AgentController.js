const { default: FirecrawlApp } = require("@mendable/firecrawl-js");

const firecrawl = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "google/gemini-2.0-flash-001"; // fast & cheap — great for tool-like tasks

async function chatLLM(systemPrompt, userPrompt) {
  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://priceradar.app", // your site URL (shown on openrouter dashboard)
      "X-Title": "PriceRadar",                  // your app name
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1000,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices[0].message.content.trim();
}

// ─── Phase 1: Extract structured parameters from natural language ────────────
async function extractParams(query) {
  const text = await chatLLM(
    `You are a shopping search parameter extractor for Indian e-commerce.
Convert natural language queries into structured JSON. Rules:
- Convert "k" shorthand to thousands: 45k → 45000, 1.5L → 150000
- If no budget mentioned, set budget to null
- Platforms default to ["amazon", "flipkart"] unless user specifies one
- Extract meaningful keywords (brand names, specs, colors etc.)
- Respond ONLY with valid JSON. No markdown fences. No explanation.`,
    `Extract search parameters from this query: "${query}"

Return a JSON object with this exact shape:
{
  "product": "clean product name",
  "budget": number or null,
  "currency": "INR",
  "platforms": ["amazon", "flipkart"],
  "category": "laptops | phones | headphones | etc",
  "keywords": ["brand", "spec", "color", ...]
}`
  );

  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

// ─── Phase 2: Search on one platform ────────────────────────────────────────
async function searchPlatform(params, source) {
  const budgetStr = params.budget
    ? `under ₹${params.budget.toLocaleString("en-IN")}`
    : "";
  const keywordsStr = params.keywords?.slice(0, 3).join(" ") || "";
  const query = `${params.product} ${keywordsStr} ${budgetStr}`.trim();

  const siteQuery =
    source === "amazon"
      ? `site:amazon.in ${query}`
      : `site:flipkart.com ${query}`;

  try {
    console.log(`[Agent] Searching ${source}: "${query}"`);

    const response = await firecrawl.search(siteQuery, {
      limit: 5,
      scrapeOptions: {
        formats: ["extract"],
        extract: {
          schema: {
            type: "object",
            properties: {
              name: { type: "string", description: "Full product name" },
              price: { type: "string", description: "Current price with ₹ symbol" },
              originalPrice: { type: "string", description: "Original MRP" },
              discount: { type: "string", description: "Discount percentage" },
              rating: { type: "string", description: "Star rating" },
              reviewCount: { type: "string", description: "Number of reviews" },
              availability: { type: "string", description: "In stock or out of stock" },
              deliveryInfo: { type: "string", description: "Delivery time or info" },
              imageUrl: { type: "string", description: "Product image URL" },
              specs: {
                type: "array",
                description: "Key product specs",
                items: { type: "string" },
              },
            },
            required: ["name", "price"],
          },
          systemPrompt: `Extract product details from this ${source} product page. 
            Include name, current price with ₹, original MRP, discount, rating, 
            review count, availability, delivery info, image URL, and up to 6 key specs.`,
        },
      },
    });

    const results = Array.isArray(response)
      ? response
      : response?.data || response?.results || [];

    return results
      .filter(
        (r) =>
          r.json &&
          r.json.name &&
          r.json.price &&
          r.json.price !== "Unavailable"
      )
      .map((r) => ({
        ...r.json,
        source,
        productUrl: r.url,
        imageUrl: r.json.imageUrl || r.metadata?.ogImage || null,
      }))
      .slice(0, 5);
  } catch (err) {
    console.error(`[Agent] ${source} search failed:`, err.message);
    return [];
  }
}

// ─── Phase 3: Synthesize & rank products with AI reasoning ──────────────────
async function synthesizeResults(params, allProducts) {
  if (allProducts.length === 0) {
    return {
      topPicks: [],
      overallReasoning: "No products found matching your query.",
    };
  }

  const productList = allProducts.map((p, i) => ({
    id: i,
    name: p.name,
    price: p.price,
    originalPrice: p.originalPrice,
    discount: p.discount, 
    rating: p.rating,
    reviewCount: p.reviewCount,
    availability: p.availability,
    specs: p.specs?.slice(0, 5),
    source: p.source,
  }));

  const budgetText = params.budget
    ? `₹${params.budget.toLocaleString("en-IN")}`
    : "no specific budget";

  const text = await chatLLM(
    `You are a sharp, analytical shopping advisor for Indian consumers.
Evaluate products on: price-to-spec ratio, rating, review count, availability, and value vs budget.
Be concise and decisive. Respond ONLY with valid JSON — no markdown, no preamble.`,
    `User wants: "${params.product}" with budget of ${budgetText}

Products to evaluate:
${JSON.stringify(productList, null, 2)}

Select the TOP 3 best value-for-money products. For each, give a sharp 1-2 sentence reason.
Also write a 2-sentence overall recommendation.

Return this exact JSON shape:
{
  "topPicks": [
    { "productId": 0, "rank": 1, "badge": "Best Overall", "reason": "..." },
    { "productId": 1, "rank": 2, "badge": "Best Budget", "reason": "..." },
    { "productId": 2, "rank": 3, "badge": "Premium Pick", "reason": "..." }
  ],
  "overallReasoning": " sentence recommendation..."
}`
  );

  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

// ─── Main agent handler ──────────────────────────────────────────────────────
exports.runAgent = async (req, res) => {
  const { query } = req.query;

  if (!query || query.trim().length < 2) {
    return res.status(400).json({ error: "Please enter a valid search query." });
  }

  try {
    // ── Phase 1
    console.log(`[Agent] Phase 1: Extracting params from "${query}"`);
    const params = await extractParams(query.trim());
    console.log("[Agent] Params:", params);

    // ── Phase 2
    console.log("[Agent] Phase 2: Searching platforms...");
    const platforms = params.platforms || ["amazon", "flipkart"];
    const [amazonProducts, flipkartProducts] = await Promise.all([
      platforms.includes("amazon") ? searchPlatform(params, "amazon") : [],
      platforms.includes("flipkart") ? searchPlatform(params, "flipkart") : [],
    ]);

    const allProducts = [...amazonProducts, ...flipkartProducts];
    console.log(
      `[Agent] Found: Amazon(${amazonProducts.length}) + Flipkart(${flipkartProducts.length}) = ${allProducts.length}`
    );

    // ── Phase 3
    console.log("[Agent] Phase 3: Synthesizing results...");
    const synthesis = await synthesizeResults(params, allProducts);

    const topPicks = (synthesis.topPicks || [])
      .map((pick) => {
        const product = allProducts[pick.productId];
        if (!product) return null;
        return {
          ...product,
          rank: pick.rank,
          badge: pick.badge,
          reason: pick.reason,
        };
      })
      .filter(Boolean);

    return res.json({
      query: query.trim(),
      params,
      products: { amazon: amazonProducts, flipkart: flipkartProducts },
      topPicks,
      reasoning: synthesis.overallReasoning,
    });
  } catch (err) {
    console.error("[Agent] Fatal error:", err);
    if (err instanceof SyntaxError) {
      return res.status(500).json({
        error:
          "Agent failed to parse AI response. Please try a different query.",
      });
    }
    return res.status(500).json({
      error: "The agent encountered an error. Please try again.",
    });
  }
};