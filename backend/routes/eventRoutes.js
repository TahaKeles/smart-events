const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvents,
  rsvpEvent,
  getRecommendedEvents,
  getEventById,
} = require("../controllers/eventController");
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

router.post("/", authMiddleware, createEvent);
router.get("/", authMiddleware, getEvents);
router.get("/:eventId", authMiddleware, getEventById);
router.post("/:eventId/rsvp", authMiddleware, rsvpEvent);
router.get("/recommendations", authMiddleware, getRecommendedEvents);

module.exports = router;
