const mongoose = require("mongoose");

const dbConnection = async () => {
    await mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Database connected");
    })
    .catch((err) => {
        console.log(err.message)
    })
}

module.exports =  dbConnection;