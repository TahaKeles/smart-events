const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserPreferences,
} = require("../controllers/userController");

// A simple middleware to verify JWT
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided." });

  try {
    const jwt = require("jsonwebtoken");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

router.get("/profile", authMiddleware, getUserProfile);
router.put("/preferences", authMiddleware, updateUserPreferences);

module.exports = router;
