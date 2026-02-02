const mongoose = require("mongoose");


const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then((con) => {
        console.log(`MongoDB Connected : ${con.connection.host}`)
    }).catch((err) => {
        console.log("Database connection error : ",err)
    })
}

module.exports = connectDatabase 