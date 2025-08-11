const jwt = require("jsonwebtoken");
const userModal = require("../models/user.model");
const authMiddleware = async (req, res, next) => {

    const token = req.cookies.token;

    if(!token) return res.status(401).json({ message: "Not authorized" });

    try{
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await userModal.findById(decoded.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        req.user = user;
        next();
    }catch(err){
        res.status(401).json({ message: err.message });
    }

};

module.exports = authMiddleware;