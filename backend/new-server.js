const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const SECRET_KEY = "your_secret_key";

// Dummy User Data
const user = { username: "test@example.com", password: bcrypt.hashSync("password123", 10) };

// Login Route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === user.username && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.cookie("jwtToken", token, { httpOnly: true, secure: false, sameSite: "Strict" });
    return res.json({ success: true });
  }
  res.status(401).json({ message: "Invalid credentials" });
});

// Logout Route
app.post("/api/logout", (req, res) => {
  res.clearCookie("jwtToken");
  res.json({ success: true });
});

// Check Auth
app.get("/api/check-auth", (req, res) => {
  const token = req.cookies.jwtToken;
  if (!token) return res.json({ authenticated: false });

  jwt.verify(token, SECRET_KEY, (err) => {
    if (err) return res.json({ authenticated: false });
    res.json({ authenticated: true });
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
