const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  imageUrl: {
    type: String,
    required: [true, "image is required for product"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "You must be logged in to add a product"],
  },
});

module.exports = mongoose.model("Product", (schema = productSchema));
