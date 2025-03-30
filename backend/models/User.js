const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
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
    interests: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

// Create a 2dsphere index for geospatial queries
userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", userSchema);
