const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
    status: { type: String, default: "Pending" },
    image: { type: String, default: "" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Issue", IssueSchema);
