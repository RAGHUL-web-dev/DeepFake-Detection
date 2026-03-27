const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ErrorHandler = require("../utils/errorHandler");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Disk storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
});

// File type validator
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        // Images
        "image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp", "image/bmp",
        // Videos
        "video/mp4", "video/mpeg", "video/quicktime", "video/x-msvideo", "video/webm",
        // Audio
        "audio/mpeg", "audio/wav", "audio/ogg", "audio/mp4", "audio/flac", "audio/webm",
        // Documents / Text
        "text/plain", "application/pdf"
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new ErrorHandler(`Unsupported file type: ${file.mimetype}. Allowed: images, videos, audio, and text files.`, 400), false);
    }
};

// 100MB limit
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 100 * 1024 * 1024 }
});

module.exports = upload;
