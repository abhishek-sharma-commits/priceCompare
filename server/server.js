require("dotenv").config({ override: true });
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const { connectMongo } = require("./db/mongo");
const compareRoutes = require("./routes/compare");
const agentRoutes = require("./routes/agent");   // ← NEW
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

if (!process.env.JWT_SECRET) {
  console.warn(
    "[Auth] Missing JWT_SECRET. Set it in server/.env (example: JWT_SECRET=supersecret)"
  );
}

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: "Too many requests. Please wait a moment." },
});
app.use("/api/", limiter);

app.use("/api/compare",limiter, compareRoutes);

// Agent limiter — stricter because agent makes 3× API calls per request
const agentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  message: { error: "Agent rate limit reached. Wait a minute and try again." },
});
app.use("/api/agent", agentLimiter, agentRoutes);   // ← NEW
app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "PriceRadar API is running" });
});

// 404 for unknown API routes (must be after all /api routes)
app.use("/api", (req, res) => {
  res.status(404).json({ error: "Page Not Found" });
});

(async () => {
  try {
    await connectMongo();
  } catch (err) {
    console.error("[MongoDB] Connection error:", err.message);
  }

  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`),
  );
})();