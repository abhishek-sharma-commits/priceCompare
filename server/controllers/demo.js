const { default: FirecrawlApp } = require("@mendable/firecrawl-js");

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

const WEATHER_URL =
  "https://www.timeanddate.com/weather/india/north-lakhimpur/ext";

async function scrapeWeather() {
  try {
    console.log("Scraping weather data...");

    const response = await firecrawl.scrape(WEATHER_URL, {
      formats: ["extract"],
      extract: {
        schema: {
          type: "object",
          properties: {
            location: { type: "string" },
            forecast: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  day: { type: "string" },
                  date: { type: "string" },
                  weather: { type: "string" },
                  temperatureHigh: { type: "string" },
                  temperatureLow: { type: "string" },
                  humidity: { type: "string" },
                  wind: { type: "string" },
                },
                required: ["day", "weather"],
              },
            },
          },
          required: ["location", "forecast"],
        },
        systemPrompt: `
          Extract extended weather forecast data.
          For each day include:
          - day name (Mon, Tue, etc.)
          - date
          - weather condition (e.g. cloudy, rain)
          - high and low temperature
          - humidity (if available)
          - wind info (if available)
          
          Return clean structured JSON.
        `,
      },
    });

    const data =
      response?.data ||
      response?.result ||
      response?.json ||
      response;

    return data;
  } catch (err) {
    console.error("Weather scrape error:", err.message);
    return null;
  }
}

exports.getWeather = async (req, res) => {
  try {
    const weatherData = await scrapeWeather();

    if (!weatherData) {
      return res.status(500).json({
        error: "Failed to fetch weather data",
      });
    }

    return res.json({
      source: WEATHER_URL,
      data: weatherData,
    });
  } catch (err) {
    console.error("getWeather error:", err);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};