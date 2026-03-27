const express = require("express");
const { uploadMedia, getMediaStatus, analyzeText } = require("../controllers/uploadController");
const { isAuthenticated } = require("../middleware/authenticate");
const upload = require("../middleware/upload");

const router = express.Router();

// POST /api/v1/upload — Upload a media file (any type)
router.route("/").post(isAuthenticated, upload.single("file"), uploadMedia);

// POST /api/v1/upload/text — Analyze a text snippet
router.route("/text").post(isAuthenticated, analyzeText);

// GET /api/v1/upload/status/:id — Check processing status of a media item
router.route("/status/:id").get(isAuthenticated, getMediaStatus);

module.exports = router;
