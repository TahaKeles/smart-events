const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    venue: {
      type: String,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
      default: "https://via.placeholder.com/800x400?text=No+Image",
    },
    // location as a GeoJSON: [longitude, latitude]
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    capacity: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: true }
);

// Create a 2dsphere index for geospatial queries
eventSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Event", eventSchema);
