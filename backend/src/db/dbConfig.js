const mongoose = require("mongoose");

const dbConnection = async () => {
    await mongoose.connect("mongodb://localhost:27017/")
    .then(()=>{
        console.log("Database connected");
    })
    .catch((err) => {
        console.log(err.message)
    })
}

module.exports =  dbConnection;