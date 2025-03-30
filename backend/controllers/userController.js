const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.getUserProfile = async (req, res) => {
  try {
    // req.userId is typically set after JWT verification
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.json(user);
  } catch (err) {
    console.error("Get User Error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * @desc    Update user preferences (age, gender, location, interests)
 * @route   PUT /api/users/preferences
 * @access  Private
 */
exports.updateUserPreferences = async (req, res) => {
  try {
    const { age, gender, location, interests } = req.body;

    // Find the user
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update user preferences fields if provided
    // Only update fields that are explicitly provided in the request
    if (age !== undefined) {
      user.age = age;
    }

    if (gender !== undefined) {
      user.gender = gender;
    }

    if (location && location.coordinates) {
      user.location.coordinates = location.coordinates;
    }

    if (interests) {
      user.interests = interests;
    }

    // Save the updated user
    await user.save();

    return res.status(200).json({
      message: "Preferences updated successfully",
      user: {
        username: user.username,
        email: user.email,
        age: user.age,
        gender: user.gender,
        location: user.location,
        interests: user.interests,
      },
    });
  } catch (err) {
    console.error("Update Preferences Error:", err);
    return res
      .status(500)
      .json({ message: "Failed to update preferences. Please try again." });
  }
};
