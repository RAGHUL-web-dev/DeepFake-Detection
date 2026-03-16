const User = require("../models/User");
const Media = require("../models/Media");
const catchAsyncError = require("../middleware/catchAsynError");
const ErrorHandler = require("../utils/errorHandler");

// GET /api/v1/user/me — authenticated user's profile + stats
exports.getMyProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Get this user's media stats
    const totalVerifications = await Media.countDocuments({ user: req.user._id });
    const authenticCount = await Media.countDocuments({ user: req.user._id, verdict: "Authentic" });
    const fakeCount = await Media.countDocuments({ user: req.user._id, verdict: "Fake" });
    const pendingCount = await Media.countDocuments({ user: req.user._id, verdict: "Processing" });

    // Get recent activity (last 5)
    const recentActivity = await Media.find({ user: req.user._id })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("fileName fileType verdict confidenceScore createdAt status");

    res.status(200).json({
        success: true,
        user,
        stats: {
            totalVerifications,
            authenticCount,
            fakeCount,
            pendingCount
        },
        recentActivity
    });
});

// GET /api/v1/user/media — all user's media verifications
exports.getMyMedia = catchAsyncError(async (req, res, next) => {
    const media = await Media.find({ user: req.user._id })
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: media.length,
        media
    });
});
