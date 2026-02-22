const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())
app.use(cors())


const authRoutes = require("./routes/authRoutes")

// Routes
app.use("/api/v1/auth", authRoutes)


// APP EXPORTS
module.exports = app;