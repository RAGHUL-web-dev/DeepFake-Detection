const User = require("../models/User");
const catchAsyncError = require("../middleware/catchAsynError");
const sendToken = require("../utils/jwt");
const ErrorHandler = require("../utils/errorHandler");


// POST /api/v1/auth/register
exports.authRegisterUser = catchAsyncError(async (req, res, next) => {
    const { email, password, name, avatar } = req.body;

    if (!email || !password || !name) {
        return next(new ErrorHandler("Please provide all fields", 400));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new ErrorHandler("User already exists", 400));
    }

    const user = await User.create({
        email,
        password,
        name,
        avatar
    });

    sendToken(user, 201, res);
});


// POST /api/v1/auth/login
exports.authLoginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please provide all fields", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid credentials", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid credentials", 401));
    }

    // Update last login
    user.auth.loginCount = (user.auth.loginCount || 0) + 1;
    user.auth.lastLogin = Date.now();
    await user.save();

    sendToken(user, 200, res);
});


// GET /api/v1/auth/logout
exports.authLogoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: 'lax'
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});


// GET /api/v1/auth/me  — session rehydration
exports.getMe = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
        success: true,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            status: user.status,
            createdAt: user.createdAt
        }
    });
});
