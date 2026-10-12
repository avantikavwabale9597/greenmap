const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Issue = require("./models/Issue");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.log("MongoDB connection error: ", err));

app.get("/", (req, res) => {
  res.send("GreenMap API is running...");
});

app.get("/test-create", async (req, res) => {
  try {
    const testIssue = new Issue({
      title: "Garbage Dump neaar College",
      description: "Huge pile of uncollected trash blocking the road.",
      category: "Waste",
      location: { lat: 18.5204, lng: 73.8567 },
    });

    await testIssue.save();
    res.send(
      "Success! Test issue saved to database. Go check MogoDB Compass!!",
    );
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
