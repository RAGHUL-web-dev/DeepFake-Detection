const express = require("express");
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const authRoutes = require("./routes/authRoutes")

// Routes
app.use("/api/v1/auth", authRoutes)


// APP EXPORTS
module.exports = app;