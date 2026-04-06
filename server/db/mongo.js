const mongoose = require("mongoose");

async function connectMongo() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("[MongoDB] Missing MONGODB_URI in server/.env");
    return null;
  }

  mongoose.set("strictQuery", true);
  mongoose.set("bufferCommands", false);
  await mongoose.connect(uri, { dbName: process.env.MONGODB_DB || undefined });
  console.log("[MongoDB] Connected");
  return mongoose.connection;
}

module.exports = { connectMongo };

