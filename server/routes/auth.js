const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByEmail, createUser } = require("../storage/usersStoreMongo");

const router = express.Router();

function isProd() {
  return process.env.NODE_ENV === "production";
}

function setAuthCookie(res, user) {
  const token = jwt.sign(
    { email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "7d", subject: user.id }
  );

  res.cookie("pr_auth", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd(),
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });
}

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }
  if (String(password).length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters." });
  }

  let existing;
  try {
    existing = await findUserByEmail(String(email));
  } catch (err) {
    if (err?.code === "MONGO_DOWN") {
      return res.status(503).json({ error: "MongoDB unavailable. Start MongoDB and try again." });
    }
    throw err;
  }
  if (existing) return res.status(409).json({ error: "Email already registered." });

  const passwordHash = await bcrypt.hash(String(password), 10);
  const user = {
    name: String(name || "").trim() || String(email).split("@")[0],
    email: String(email).trim().toLowerCase(),
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  let created;
  try {
    created = await createUser(user);
  } catch (err) {
    if (err?.code === "MONGO_DOWN") {
      return res.status(503).json({ error: "MongoDB unavailable. Start MongoDB and try again." });
    }
    if (err?.code === 11000) {
      return res.status(409).json({ error: "Email already registered." });
    }
    throw err;
  }
  setAuthCookie(res, created);
  return res.json({ user: { id: created.id, name: created.name, email: created.email } });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  let user;
  try {
    user = await findUserByEmail(String(email));
  } catch (err) {
    if (err?.code === "MONGO_DOWN") {
      return res.status(503).json({ error: "MongoDB unavailable. Start MongoDB and try again." });
    }
    throw err;
  }
  if (!user) return res.status(401).json({ error: "Invalid email or password." });

  const ok = await bcrypt.compare(String(password), user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid email or password." });

  const normalized = {
    id: String(user._id || user.id),
    name: user.name,
    email: user.email,
  };
  setAuthCookie(res, normalized);
  return res.json({ user: normalized });
});

router.get("/me", async (req, res) => {
  const token = req.cookies?.pr_auth;
  if (!token) return res.json({ user: null });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({
      user: { id: payload.sub, email: payload.email, name: payload.name },
    });
  } catch {
    return res.json({ user: null });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("pr_auth", { path: "/" });
  return res.json({ ok: true });
});

module.exports = router;

