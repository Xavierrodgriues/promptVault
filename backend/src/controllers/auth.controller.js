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

    if (password.length < 5) {
      return res.status(400).json({ message: "Password must be at least 5 characters long" });
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
    res.json({message: err.message});
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
      return res.status(401).json({message: "User do not exist"});
    }

    const hashpassword = await bcrypt.compare(password, user.password);

    if (!hashpassword) {
      return res.status(401).json({message: "Incorrect Password"});
    }

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

    res.cookie("token", token);

    res.json({
      message: "Login done",
      data: user,
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

const logoutController = async (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { registerController, loginController, logoutController };
