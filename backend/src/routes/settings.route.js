const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { UpdateUsername, UpdatePassword } = require("../controllers/settings.controller");
const { setup2FA, verify2FA, disable2FA } = require("../controllers/2fa.controller");
const router = express.Router();


router.put(
  "/update-username/",
  authMiddleware,
  UpdateUsername
);

router.post("/setup-2fa", authMiddleware, setup2FA);
router.post("/verify-2fa", authMiddleware, verify2FA);
router.post("/disable-2fa", authMiddleware, disable2FA);

router.put("/update-password/", authMiddleware,UpdatePassword )
module.exports = router;