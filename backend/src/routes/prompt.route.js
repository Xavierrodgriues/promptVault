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
            data: newPrompt
        });
    } catch (err) {
        console.error("Error adding prompt:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

module.exports = router;