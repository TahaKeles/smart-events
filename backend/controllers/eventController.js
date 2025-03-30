const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      venue,
      dateTime,
      location,
      capacity,
    } = req.body;

    const newEvent = new Event({
      title,
      category,
      description,
      venue,
      dateTime,
      location, // location = { coordinates: [lng, lat] }
      capacity,
    });

    await newEvent.save();
    return res.status(201).json({ message: "Event created successfully." });
  } catch (err) {
    console.error("Create Event Error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ dateTime: 1 });
    return res.json(events);
  } catch (err) {
    console.error("Get Events Error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

exports.rsvpEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.userId;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    if (event.attendees.length < event.capacity) {
      // Add user to attendees
      if (!event.attendees.includes(userId)) {
        event.attendees.push(userId);
      }
      await event.save();
      return res.json({ message: "RSVP successful (attending)." });
    } else {
      // Could handle waitlist logic here
      return res.json({
        message: "Event is full, consider waitlist scenario.",
      });
    }
  } catch (err) {
    console.error("RSVP Error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Example recommendation endpoint
exports.getRecommendedEvents = async (req, res) => {
  try {
    // You’d typically fetch user’s interests and location from the DB,
    // then apply geospatial queries and/or weighting logic
    // For simplicity, we’ll just return all events here.

    const events = await Event.find().limit(10);
    return res.json(events);
  } catch (err) {
    console.error("Recommendation Error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};
