const userModal = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (
      username?.trim() == "" ||
      email?.trim() == "" ||
      password?.trim() == ""
    ) {
      return res.json({ message: "Invalid Credentials" });
    }

    const existingUser = await userModal.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already Registered",
      });
    }

    if (password.length < 5) {
      return res
        .status(400)
        .json({ message: "Password must be at least 5 characters long" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModal.create({
      username,
      email,
      password: hashPassword,
    });

    await user.save();

    res.cookie("token", jwtToken, {
      httpOnly: true, // cannot be accessed by JS
      secure: true, // required for HTTPS (Render uses HTTPS)
      sameSite: "None", // allow cross-origin
      maxAge: 24 * 60 * 60 * 1000, // optional: 1 day
    });

    res.json({
      message: "User Created",
      data: user,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

const loginController = async (req, res) => {
  const { email, password, token } = req.body;

  try {
    const user = await userModal.findOne({ email });

    if (!user) return res.status(401).json({ message: "User does not exist" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).json({ message: "Incorrect password" });

    // If 2FA is enabled → check OTP
    if (user.twoFactorEnabled) {
      if (!token) {
        return res.status(403).json({ message: "2FA token required" });
      }

      const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: "base32",
        token,
      });

      if (!verified) {
        return res.status(401).json({ message: "Invalid 2FA token" });
      }
    }

    // ✅ If password + (2FA if enabled) are correct
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    res.cookie("token", jwtToken, {
      httpOnly: true, // cannot be accessed by JS
      secure: true, // required for HTTPS (Render uses HTTPS)
      sameSite: "None", // allow cross-origin
      maxAge: 24 * 60 * 60 * 1000, // optional: 1 day
    });

    // Don’t send sensitive fields like password or secret
    res.json({
      message: "Login successful",
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        twoFactorEnabled: user.twoFactorEnabled, // 👈 add this explicitly
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const logoutController = async (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { registerController, loginController, logoutController };
