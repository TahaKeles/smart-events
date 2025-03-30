const eventSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      default: "https://via.placeholder.com/800x400?text=No+Image+Available",
    },
  },
  { timestamps: true }
);
