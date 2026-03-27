const Media = require("../models/Media");
const catchAsyncError = require("../middleware/catchAsynError");
const ErrorHandler = require("../utils/errorHandler");
const path = require("path");

// Helper: derive fileType enum from mime type
const getFileType = (mimetype) => {
    if (mimetype.startsWith("image/"))  return "Image";
    if (mimetype.startsWith("video/"))  return "Video";
    if (mimetype.startsWith("audio/"))  return "Audio";
    return "Document";
};

// Helper: run prediction from python server
const getPrediction = async (url, options) => {
    try {
        const res = await fetch(`http://localhost:8000${url}`, options);
        if (!res.ok) throw new Error("Python backend error");
        return await res.json();
    } catch (err) {
        console.error("Prediction error:", err);
        return null;
    }
};

// POST /api/v1/upload
exports.uploadMedia = catchAsyncError(async (req, res, next) => {
    if (!req.file) {
        return next(new ErrorHandler("No file uploaded. Please attach a file.", 400));
    }

    const { file } = req;
    const fileType = getFileType(file.mimetype);

    // Build a publicly accessible URL path (served as static by app.js)
    const fileUrl = `/uploads/${file.filename}`;

    const media = await Media.create({
        user: req.user._id,
        fileName: file.originalname,
        fileType,
        fileSize: file.size,
        url: fileUrl,
        verdict: "Processing",
    });

    // We can respond immediately and process async, or await the processing. 
    // Given the Python backend is local, we'll await it so the frontend gets the result.
    const fs = require('fs');
    const formData = new FormData();
    const blob = new Blob([fs.readFileSync(file.path)], { type: file.mimetype });
    formData.append('file', blob, file.originalname);

    let predictPath = '/predict/image';
    if (fileType === 'Video') predictPath = '/predict/video';
    if (fileType === 'Audio') predictPath = '/predict/voice';

    const prediction = await getPrediction(predictPath, {
        method: 'POST',
        body: formData
    });

    if (prediction) {
        media.verdict = prediction.prediction === 1 ? 'Fake' : 'Authentic';
        media.confidenceScore = prediction.score || (prediction.confidence * 100);
        media.findings = prediction.anomalies ? prediction.anomalies.map(a => `${a.title}: ${a.desc}`) : [prediction.verdict];
    } else {
        media.verdict = 'Failed';
    }

    await media.save();

    res.status(201).json({
        success: true,
        message: "File analyzed successfully.",
        media: {
            _id: media._id,
            fileName: media.fileName,
            fileType: media.fileType,
            fileSize: media.fileSize,
            url: media.url,
            verdict: media.verdict,
            confidenceScore: media.confidenceScore,
            createdAt: media.createdAt
        },
        analysis: prediction // Return full analysis for the frontend to show
    });
});

// POST /api/v1/upload/text
exports.analyzeText = catchAsyncError(async (req, res, next) => {
    const { message } = req.body;
    if (!message) {
        return next(new ErrorHandler("Text message is required", 400));
    }

    // Save text to a local file so we have a physical file to point the DB 'url' to.
    const fs = require('fs');
    const filename = `text-${Date.now()}.txt`;
    const filepath = path.join(__dirname, "../uploads", filename);
    fs.writeFileSync(filepath, message);

    const media = await Media.create({
        user: req.user._id,
        fileName: `Text Snippet (${message.substring(0, 15)}...)`,
        fileType: "Document",
        fileSize: Buffer.byteLength(message, 'utf8'),
        url: `/uploads/${filename}`,
        verdict: "Processing",
    });

    // Forward to python backend
    const prediction = await getPrediction('/predict/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    });

    if (prediction) {
        media.verdict = prediction.prediction === 1 ? 'Fake' : 'Authentic';
        media.confidenceScore = prediction.score || (prediction.confidence * 100);
        media.findings = [prediction.verdict];
    } else {
        media.verdict = 'Failed';
    }

    await media.save();

    res.status(201).json({
        success: true,
        message: "Text analyzed successfully.",
        media: {
            _id: media._id,
            fileName: media.fileName,
            fileType: media.fileType,
            verdict: media.verdict,
            confidenceScore: media.confidenceScore,
            createdAt: media.createdAt
        },
        ...prediction // spread analysis output
    });
});

// GET /api/v1/upload/status/:id  — check detection status of a single media item
exports.getMediaStatus = catchAsyncError(async (req, res, next) => {
    const media = await Media.findOne({ _id: req.params.id, user: req.user._id });

    if (!media) {
        return next(new ErrorHandler("Media not found or not authorized", 404));
    }

    res.status(200).json({
        success: true,
        media: {
            _id: media._id,
            fileName: media.fileName,
            fileType: media.fileType,
            verdict: media.verdict,
            confidenceScore: media.confidenceScore,
            findings: media.findings,
            createdAt: media.createdAt,
            updatedAt: media.updatedAt
        }
    });
});
