const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const generateTags = require("../services/ai.service");
const Prompt = require("../models/prompt.model");

const router = express.Router();

router.post("/prompt/add", authMiddleware, async (req, res) => {
  try {
    const { title, promptText, category, type } = req.body;

    // Basic validation
    if (!title || !promptText || !category || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Generate tags using Gemini
    const tags = await generateTags(promptText);

    // Create prompt document
    const newPrompt = await Prompt.create({
      ownerId: req.user.id,
      title,
      promptText,
      tags,
      category,
      type,
    });

    res.status(201).json({
      message: "Prompt added successfully",
      data: newPrompt,
    });
  } catch (err) {
    console.error("Error adding prompt:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/prompts", authMiddleware, async (req, res) => {
  try {
    const { scope, category, type, limit = 10, page = 1 } = req.query;
    const filter = {};

    if (scope === "personal") {
      // Only prompts created by the current user
      filter.ownerId = req.user._id;
    } else if (scope === "community") {
      // Only prompts of type "community"
      filter.type = "community";
    }

    // Apply category filter if provided
    if (category) {
      filter.category = new RegExp(`^${category}`, "i"); // starts with
    }

    // Apply type filter if provided, but don't override the community restriction
    if (type && !(scope === "community" && type === "community")) {
      filter.type = type;
    }

    const prompts = await Prompt.find(filter)
      .populate("ownerId", "username email")
      .limit(Number(limit))
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Prompt.countDocuments(filter);

    res.json({
      data: prompts,
      pagination: {
        totalPages: Math.ceil(total / limit),
        currentPage: Number(page),
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
