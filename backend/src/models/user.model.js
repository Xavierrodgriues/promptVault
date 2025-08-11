const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 2,
        maxLength: 15,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minLength:[ 5 , 'Password must be at least 5 characters long'],
        required: true
    }

}, {timestamps: true});

const userModal = mongoose.model("user", UserSchema);

module.exports = userModal;