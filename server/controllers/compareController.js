const { default: FirecrawlApp } = require("@mendable/firecrawl-js");

const firecrawl = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

async function searchPlatform(query, source) {
  const siteQuery =
    source === "amazon"
      ? `site:amazon.in ${query}`
      : `site:flipkart.com ${query}`;

  try {
    console.log(`Searching ${source} for: "${query}"`);

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

    // Handle both array and object response shapes
    const results = Array.isArray(response)
      ? response
      : response?.data || response?.results || response?.documents || [];

    return results
  .filter((r) => r.json && r.json.name && r.json.price && r.json.price !== "Unavailable")
  .map((r) => ({
    ...r.json,
    productUrl: r.url,
    imageUrl: r.json.imageUrl || r.metadata?.ogImage || null,
  }))
  .slice(0, 5);

  } catch (err) {
    console.error(`Error searching ${source}:`, err.message);
    return [];
  }
}

exports.searchProducts = async (req, res) => {
  const { query } = req.query;

  if (!query || query.trim().length < 2) {
    return res.status(400).json({ error: "Please enter a valid search query." });
  }

  try {
    const [amazonProducts, flipkartProducts] = await Promise.all([
      searchPlatform(query.trim(), "amazon"),
      searchPlatform(query.trim(), "flipkart"),
    ]);

    console.log(`Amazon: ${amazonProducts.length} | Flipkart: ${flipkartProducts.length}`);

    return res.json({
      query: query.trim(),
      amazon: amazonProducts,
      flipkart: flipkartProducts,
    });
  } catch (err) {
    console.error("searchProducts error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};