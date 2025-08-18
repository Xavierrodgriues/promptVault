const generateTags = require("../services/ai.service");
const Prompt = require("../models/prompt.model");

const createPrompt = async (req, res) => {
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
}

const getPrompts = async (req, res) => {
  try {
    const { scope, category, page = 1 } = req.query;
    let { limit = 6 } = req.query;

    // Convert limit to number and clamp it to max 6
    limit = Math.min(Number(limit) || 5, 5);

    const filter = {};

    if (scope === "personal") {
      filter.ownerId = req.user._id;
    } else if (scope === "community") {
      filter.type = "community";
    }

    if (category) {
      filter.category = new RegExp(`^${category}`, "i");
    }

    const prompts = await Prompt.find(filter)
      .populate("ownerId", "username email")
      .limit(limit)
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
}

const deletePrompt = async (req, res) => {
  try {
    const { id } = req.params;

    // Assuming you have authentication middleware that sets req.user
    const prompt = await Prompt.findById(id);
    if (!prompt) {
      return res.status(404).json({ message: "Prompt not found" });
    }

    // Check ownership (or admin rights)
    if (prompt.ownerId.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await prompt.deleteOne();
    res.json({ message: "Prompt deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

const searchByTags =  async (req, res) => {
  try {
    const { tagText, page = 1, limit = 2 } = req.body;

    if (!tagText) {
      return res.status(400).json({ message: "Tag text is required" });
    }

    const skip = (page - 1) * limit;

    const data = await Prompt.find({
      tags: { $regex: new RegExp(`^${tagText}`, "i") },
      type: "community",
    })
      .skip(skip)
      .limit(limit);

    const total = await Prompt.countDocuments({
      tags: { $regex: new RegExp(`^${tagText}`, "i") }
    });

    res.json({
      message: "Data sent successfully",
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      prompts: data,
    });
  } catch (err) {
    console.error("Error generating tags:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

const getTotalPrompts = async (req, res) =>{
    try {
        const total = await Prompt.countDocuments({ ownerId: req.user._id });
        res.json({ total });
    } catch (err) {
        console.error("Error fetching total prompts:", err);
        res.status(500).json({ message: err.message, error: err.message });
    }

}

module.exports = {
    createPrompt,
    getPrompts,
    deletePrompt,
    searchByTags,
    getTotalPrompts
};