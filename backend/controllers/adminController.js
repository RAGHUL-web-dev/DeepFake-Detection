const User = require("../models/User");
const Media = require("../models/Media");
const catchAsyncError = require("../middleware/catchAsynError");
const ErrorHandler = require("../utils/errorHandler");

// Analytics & Dashboard Stats
exports.getAdminStats = catchAsyncError(async (req, res, next) => {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: "active" });
    const totalAdmins = await User.countDocuments({ role: "admin" });
    
    // Note: If Media isn't fully implemented locally, default to 0 to prevent crashes
    let totalMedia = 0;
    let fakeMedia = 0;
    let authenticMedia = 0;
    try {
        totalMedia = await Media.countDocuments();
        fakeMedia = await Media.countDocuments({ verdict: "Fake" });
        authenticMedia = await Media.countDocuments({ verdict: "Authentic" });
    } catch (e) {
        // Media collection might not exist yet if it's new
    }

    res.status(200).json({
        success: true,
        stats: {
            users: {
                total: totalUsers,
                active: activeUsers,
                admins: totalAdmins
            },
            media: {
                total: totalMedia,
                fake: fakeMedia,
                authentic: authenticMedia
            }
        }
    });
});

// User Management
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: users.length,
        users
    });
});

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        user
    });
});

exports.updateUserRoleStatus = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        status: req.body.status
    };

    // prevent stripping undefined fields
    Object.keys(newUserData).forEach(key => newUserData[key] === undefined && delete newUserData[key]);

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    if (!user) {
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        user
    });
});

exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`, 404));
    }

    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    });
});

// Media/Content Moderation
exports.getAllMedia = catchAsyncError(async (req, res, next) => {
    const media = await Media.find().populate("user", "name email").sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: media.length,
        media
    });
});

exports.deleteMediaContent = catchAsyncError(async (req, res, next) => {
    const media = await Media.findById(req.params.id);

    if (!media) {
        return next(new ErrorHandler(`Media not found with id: ${req.params.id}`, 404));
    }

    await media.deleteOne();

    res.status(200).json({
        success: true,
        message: "Media deleted successfully. Content removed from platform."
    });
});
