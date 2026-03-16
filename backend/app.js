const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}))


const authRoutes = require("./routes/authRoutes")
const adminRoutes = require("./routes/adminRoutes")
const userRoutes = require("./routes/userRoutes")

// Routes
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/admin", adminRoutes)
app.use("/api/v1/user", userRoutes)


// APP EXPORTS
module.exports = app;