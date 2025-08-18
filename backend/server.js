require("dotenv").config();
const app = require("./src/app");
const dbConnection = require("./src/db/dbConfig");
const express = require("express");
var cookieParser = require('cookie-parser')
const authRouter = require("./src/routes/auth.route");
const promptRouter = require("./src/routes/prompt.route");
const cors = require("cors");
const settingsRouter = require("./src/routes/settings.route");
const reportsROuter = require("./src/routes/report.route");

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));


app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/",promptRouter);
app.use("/settings", settingsRouter);
app.use("/", reportsROuter);

dbConnection();
app.listen(3000, () => {
    console.log("Server listening");
});