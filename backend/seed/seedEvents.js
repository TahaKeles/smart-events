require("dotenv").config();
const mongoose = require("mongoose");
const Event = require("../models/Event");

// Connect to Mongo
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB connected for seeding...");

    // Clear existing events
    await Event.deleteMany({});

    // Sample event images
    const eventImages = [
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ];

    // Insert sample events
    const eventsData = [
      {
        title: "Music Concert",
        category: "music",
        description: "A live music event featuring local bands.",
        venue: "Central Park",
        dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
        location: {
          type: "Point",
          coordinates: [-73.9654, 40.7829], // Example: New York City
        },
        attendees: [],
        capacity: 50,
        image: eventImages[0], // Concert image
      },
      {
        title: "Tech Talk 2025",
        category: "technology",
        description: "A conference for software developers.",
        venue: "TechHub",
        dateTime: new Date(Date.now() + 48 * 60 * 60 * 1000),
        location: {
          type: "Point",
          coordinates: [-0.1278, 51.5074], // Example: London
        },
        attendees: [],
        capacity: 200,
        image: eventImages[1], // Tech conference image
      },
      {
        title: "Art Exhibition",
        category: "art",
        description: "Showcasing local modern art.",
        venue: "City Gallery",
        dateTime: new Date(Date.now() + 72 * 60 * 60 * 1000),
        location: {
          type: "Point",
          coordinates: [2.3522, 48.8566], // Example: Paris
        },
        attendees: [],
        capacity: 30,
        image: eventImages[2], // Art exhibition image
      },
      {
        title: "Food Festival",
        category: "food",
        description: "Taste dishes from top local restaurants and food trucks.",
        venue: "City Square",
        dateTime: new Date(Date.now() + 96 * 60 * 60 * 1000),
        location: {
          type: "Point",
          coordinates: [-118.2437, 34.0522], // Example: Los Angeles
        },
        attendees: [],
        capacity: 150,
        image: eventImages[3], // Food event image
      },
      {
        title: "Yoga Workshop",
        category: "wellness",
        description: "A relaxing yoga session for all experience levels.",
        venue: "Zen Garden",
        dateTime: new Date(Date.now() + 120 * 60 * 60 * 1000),
        location: {
          type: "Point",
          coordinates: [139.6917, 35.6895], // Example: Tokyo
        },
        attendees: [],
        capacity: 25,
        image: eventImages[4], // Wellness event image
      },
    ];

    await Event.insertMany(eventsData);
    console.log("Dummy events seeded successfully!");
    process.exit();
  })
  .catch((err) => {
    console.error(`Seeding Error: ${err}`);
    process.exit(1);
  });
