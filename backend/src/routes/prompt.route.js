const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { createPrompt, getPrompts, deletePrompt, searchByTags, getTotalPrompts } = require("../controllers/prompt.controller");


const router = express.Router();

router.post("/prompt/add", authMiddleware, createPrompt);

router.get("/prompts", authMiddleware, getPrompts);

router.get("/prompts/count", authMiddleware, getTotalPrompts);

// DELETE /prompts/:id
router.delete("/prompts/delete/:id",authMiddleware, deletePrompt);

router.post("/prompts/tags", authMiddleware, searchByTags);

 
module.exports = router;
