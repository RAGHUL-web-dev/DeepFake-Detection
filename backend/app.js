const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const app = express();

// ─── MIDDLEWARE ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

// Serve uploaded files as static assets
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ─── ROUTES ───────────────────────────────────────────────────────────────────
const authRoutes   = require("./routes/authRoutes");
const adminRoutes  = require("./routes/adminRoutes");
const userRoutes   = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

app.use("/api/v1/auth",   authRoutes);
app.use("/api/v1/admin",  adminRoutes);
app.use("/api/v1/user",   userRoutes);
app.use("/api/v1/upload", uploadRoutes);

// ─── HEALTH CHECK ─────────────────────────────────────────────────────────────
app.get("/api/v1/health", (req, res) => {
    res.status(200).json({ success: true, message: "API is healthy", timestamp: new Date().toISOString() });
});

// ─── GLOBAL ERROR HANDLER (must be last) ──────────────────────────────────────
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);

// APP EXPORTS
module.exports = app;