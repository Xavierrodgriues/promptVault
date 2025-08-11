require("dotenv").config();
const app = require("./src/app");
const dbConnection = require("./src/db/dbConfig");
const express = require("express");
var cookieParser = require('cookie-parser')
const authRouter = require("./src/routes/auth.route");
const promptRouter = require("./src/routes/prompt.route");
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/",promptRouter);

dbConnection();
app.listen(3000, () => {
    console.log("Server listening");
});