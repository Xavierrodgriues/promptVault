const bcrypt = require("bcryptjs");
const userModal = require("../models/user.model");

const UpdatePassword = async (req, res) => {
    try {
      const { password } = req.body;
      const userId = req.user._id;

      // Validate input
      if (!password || password.length < 5) {
        return res.status(400).json({ message: "Password must be at least 5 characters long" });
      }

      const hashPassword = await bcrypt.hash(password, 10);
      // Update user password
      const updatedUser = await userModal.findByIdAndUpdate(
        { _id: userId },
        { password: hashPassword },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "Password changed successfully",
        data: updatedUser,
      });
    } catch (err) {
      console.error("Error changing password:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
}

const UpdateUsername = async (req, res) => {
    try {
      const { username } = req.body;
      const userId = req.user._id;
      // Validate input
      if (!username || username.length < 2 || username.length > 15) {
        return res
          .status(400)
          .json({ message: "Username must be 2-15 characters long" });
      }

      // Check if username already exists
      const existingUser = await userModal.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Update user details
      const updatedUser = await userModal.findByIdAndUpdate(
        { _id: userId },
        { username },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "Username updated successfully",
        data: updatedUser,
      });
    } catch (err) {
      console.error("Error updating settings:", err);
      res.status(500).json({ message: err.message, error: err.message });
    }
}

module.exports = {
  UpdatePassword,
  UpdateUsername
};
