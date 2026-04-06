const User = require("../models/User");

function assertMongoReady() {
  const state = User.db?.readyState;
  // 1 = connected
  if (state !== 1) {
    const err = new Error("MongoDB is not connected");
    err.code = "MONGO_DOWN";
    throw err;
  }
}

async function findUserByEmail(email) {
  if (!email) return null;
  assertMongoReady();
  return User.findOne({ email: String(email).trim().toLowerCase() }).lean();
}

async function createUser(user) {
  assertMongoReady();
  const doc = await User.create({
    name: user.name,
    email: user.email,
    passwordHash: user.passwordHash,
  });
  const plain = doc.toObject();
  return {
    id: String(plain._id),
    name: plain.name,
    email: plain.email,
    passwordHash: plain.passwordHash,
  };
}

module.exports = {
  findUserByEmail,
  createUser,
};

