const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  name: { type: String, required: true },
  model: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  info: { type: String, required: true },
  img: { type: [String], required: true },
  status: { type: String, default: "pending" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema );
