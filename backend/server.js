const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Issue = require("./models/Issue");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.log("MongoDB connection error: ", err));

app.get("/", (req, res) => {
  res.send("GreenMap API is running...");
});

app.get("/api/issues", async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/issues", async (req, res) => {
  try {
    const { title, category, description, lat, lng, image } = req.body;

    const newIssue = new Issue({
      title,
      category,
      description,
      lat,
      lng,
      image,
      location: { lat, lng },
    });

    const savedIssue = await newIssue.save();
    res.status(201).json(savedIssue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/api/issues/:id", async (req, res) => {
  try {
    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(updatedIssue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/test-create", async (req, res) => {
  try {
    const testIssue = new Issue({
      title: "Garbage Dump near College",
      description: "Huge pile of uncollected trash blocking the road.",
      category: "Waste",
      lat: 18.5204,
      lng: 73.8567,
      location: { lat: 18.5204, lng: 73.8567 },
    });

    await testIssue.save();
    res.send("Success! Test issue saved to database.");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

const PORT = process.env.PORT || 5000;

app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    res.json({ success: true, token: "admin_authorized_token" });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
