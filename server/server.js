require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const compareRoutes = require("./routes/compare");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  }),
);
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: "Too many requests. Please wait a moment." },
});
app.use("/api/", limiter);

app.use("/api/compare",limiter, compareRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "PriceRadar API is running" });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
