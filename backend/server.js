const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
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

// Set up the Email Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.get("/", (req, res) => {
  res.send("GreenMap API is running...");
});

// ADD THIS ROUTE TO FETCH ALL ISSUES
app.get("/api/issues", async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    console.error("Error fetching all issues:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/issues/:id", async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid issue ID format" });
    }

    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }
    res.json(issue);
  } catch (err) {
    console.error("Error fetching single issue:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/issues", async (req, res) => {
  try {
    // IMPORTANT: Make sure your frontend sends userEmail instead of userPhone now!
    const { title, category, description, lat, lng, image, userEmail } =
      req.body;
    const newIssue = new Issue({
      title,
      category,
      description,
      lat,
      lng,
      image,
      userEmail,
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
      { returnDocument: "after" },
    );

    if (updatedIssue.userEmail && process.env.EMAIL_USER) {
      // Create a link to your React frontend (Assuming Vite runs on port 5173)
      const frontendLink = `https://greenmappune.netlify.app/status/${updatedIssue._id}`;

      // Build a beautiful HTML email body
      const htmlBody = `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
          <h2 style="color: #16a34a; text-align: center;">🌿 GreenMap Update</h2>
          <p>Hello,</p>
          <p>Your reported issue <strong>"${updatedIssue.title}"</strong> has been updated.</p>
          <p><strong>New Status:</strong> <span style="background-color: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 9999px; font-weight: bold;">${updatedIssue.status}</span></p>
          
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 15px 0;">
            ${updatedIssue.helpline ? `<p style="margin: 5px 0;">📞 <strong>Helpline:</strong> ${updatedIssue.helpline}</p>` : ""}
            ${updatedIssue.website ? `<p style="margin: 5px 0;">🌐 <strong>Website:</strong> <a href="${updatedIssue.website}" style="color: #2563eb;">${updatedIssue.website}</a></p>` : ""}
          </div>
          
          <div style="text-align: center; margin-top: 25px;">
            <p style="margin-bottom: 15px;">Click below to view your full report details:</p>
            <a href="${frontendLink}" style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">View Issue Details</a>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eaeaea; margin-top: 30px;" />
          <p style="font-size: 12px; color: #888; text-align: center;">Thank you for helping keep Pune clean!<br>— The GreenMap Team</p>
        </div>
      `;

      const mailOptions = {
        from: `"GreenMap Alerts" <${process.env.EMAIL_USER}>`,
        to: updatedIssue.userEmail,
        subject: `GreenMap Update: Issue Marked as ${updatedIssue.status}`,
        html: htmlBody,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(" Email successfully sent with link!");
      } catch (emailError) {
        console.error("Nodemailer Error:", emailError.message);
      }
    }

    res.json(updatedIssue);
  } catch (err) {
    console.error("Error updating issue:", err.message);
    res.status(400).json({ error: err.message });
  }
});

app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin123") {
    res.json({ success: true, token: "admin_authorized_token" });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
