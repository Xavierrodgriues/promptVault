const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {getPersonal, getCommunity, getRatio, getLast6MonthsStats} = require("../controllers/report.controller")
const router = express.Router();

router.get("/personal-prompt", authMiddleware, getPersonal);
router.get("/community-prompt", authMiddleware, getCommunity);
router.get("/getRatio", authMiddleware, getRatio);
router.get("/prompts/stats/6months", authMiddleware, getLast6MonthsStats);

module.exports = router;