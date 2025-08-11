const mongoose = require("mongoose");

const PromptScehma = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    promptText: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["personal", "community"],
      required: true,
    },
}, {timestamps: true});

const promptModel = mongoose.model("prompt", PromptScehma);

module.exports = promptModel;