const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { UpdateUsername, UpdatePassword } = require("../controllers/settings.controller");
const router = express.Router();


router.put(
  "/update-username/",
  authMiddleware,
  UpdateUsername
);

router.put("/update-password/", authMiddleware,UpdatePassword )
module.exports = router;