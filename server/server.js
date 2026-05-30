// server/server.js
// Assignment 7: Express backend for PlateScout.
// Mongoose + bcrypt + JWT replace the in-memory users array from Assignment 6.

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-platescout.vercel.app",
      /\.vercel\.app$/,
    ],
    credentials: true,
  })
);
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 8 },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// Helpers
function validateInputs({ username, email, password }) {
  if (!username || username.trim().length < 3) {
    return "Username must be at least 3 characters.";
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Email must be a valid email address.";
  }
  if (!password || password.length < 8) {
    return "Password must be at least 8 characters.";
  }
  return "";
}

// POST /api/register
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  const validationError = validateInputs({ username, email, password });
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ error: "Username already taken." });
  }

  const hash = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, email, password: hash });

  return res.status(201).json({
    message: "User registered successfully.",
    user: { username: newUser.username, email: newUser.email },
  });
});

// POST /api/login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  const user = await User.findOne({ username });
  const passwordMatch = user && (await bcrypt.compare(password, user.password));

  if (!passwordMatch) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  return res.status(200).json({
    message: "Login successful.",
    user: { username: user.username, email: user.email },
    token,
  });
});

// POST /api/logout
app.post("/api/logout", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token." });
  }

  const token = authHeader.slice(7);

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    // Accept expired tokens for logout; just log and continue.
    console.log("Logout called with expired/invalid token:", err.message);
  }

  return res.status(200).json({ message: "Logged out." });
});

// GET /api/health
app.get("/api/health", (req, res) => {
  return res.json({
    status: "ok",
    time: new Date().toISOString(),
    mongo: mongoose.connection.readyState === 1,
  });
});

// 404 fallback
app.use((req, res) => {
  return res.status(404).json({ error: "Route not found." });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});