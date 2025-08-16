const speakeasy = require("speakeasy");
const QRCode = require("qrcode");
const userModal = require("../models/user.model");

// Step 1: Generate QR code & secret for 2FA setup
const setup2FA = async (req, res) => {
  try {
    const userId = req.user._id;
    const secret = speakeasy.generateSecret({
      name: `MyApp (${req.user.email})`,
    });

    await userModal.findByIdAndUpdate(userId, {
      twoFactorSecret: secret.base32,
    });

    const qrCode = await QRCode.toDataURL(secret.otpauth_url);

    res.json({
      message: "2FA setup generated",
      qrCode,
      secret: secret.base32, // optional, can hide this in production
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Step 2: Verify user entered OTP & enable 2FA
const verify2FA = async (req, res) => {
  try {
    const { token } = req.body;
    const user = await userModal.findById(req.user._id);

    if (!user || !user.twoFactorSecret) {
      return res.status(400).json({ message: "2FA not initialized" });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
    });

    if (!verified) {
      return res.status(400).json({ message: "Invalid 2FA token" });
    }

    user.twoFactorEnabled = true;
    await user.save();

    res.json({ message: "2FA enabled successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Step 3: Disable 2FA
const disable2FA = async (req, res) => {
  try {
    const user = await userModal.findById(req.user._id);

    if (!user || !user.twoFactorEnabled) {
      return res.status(400).json({ message: "2FA is not enabled" });
    }

    user.twoFactorEnabled = false;
    user.twoFactorSecret = null;
    await user.save();

    res.json({ message: "2FA disabled successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { setup2FA, verify2FA, disable2FA };


module.exports = { setup2FA, verify2FA, disable2FA };