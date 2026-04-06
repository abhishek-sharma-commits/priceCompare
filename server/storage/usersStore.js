const fs = require("fs/promises");
const path = require("path");

const USERS_PATH = path.join(__dirname, "users.json");

async function readUsers() {
  const raw = await fs.readFile(USERS_PATH, "utf-8");
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
}

async function writeUsers(users) {
  await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2), "utf-8");
}

async function findUserByEmail(email) {
  const users = await readUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

async function createUser(user) {
  const users = await readUsers();
  users.push(user);
  await writeUsers(users);
  return user;
}

module.exports = {
  readUsers,
  writeUsers,
  findUserByEmail,
  createUser,
};

