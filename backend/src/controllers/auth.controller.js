const userModal = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    const existingUser = await userModal.findOne({email});

    if(existingUser){
        return res.status(400).json({
            message: "Email already Registered"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModal.create({
      username,
      email,
      password: hashPassword,
    });

    await user.save();

    res.json({
      message: "User Created",
      data: user,
    });
  } catch (err) {
    res.json(err.message);
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    
      if (email?.trim() == "" || password?.trim() == "") {
        return res.json({ message: "Invalid Credentials" });
      }
    

    const user = await userModal.findOne({ email });

    if (!user) {
      throw new Error("User do not exist");
    }

    const hashpassword = await bcrypt.compare(password, user.password);

    if (!hashpassword) {
      throw new Error("Incorrect Password");
    }

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

    res.cookie("token", token);

    res.json({
      message: "Login done",
      data: user.username,
    });
  } catch (err) {
    res.json(err.message);
  }
};

const logoutController = async (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { registerController, loginController, logoutController };
