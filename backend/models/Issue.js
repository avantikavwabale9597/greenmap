const mongoose = require("mongoose");
const IssueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  status: {
    type: String,
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Issue", IssueSchema);
