const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsynError");
const JWT = require("jsonwebtoken");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    let decodedToken;
    try {
        decodedToken = JWT.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
        return next(new ErrorHandler("Invalid or expired token, please login again", 401));
    }

    req.user = await User.findById(decodedToken.id);

    if (!req.user) {
        return next(new ErrorHandler("User not found, please login again", 401));
    }

    if (req.user.security?.isBlocked) {
        return next(new ErrorHandler("Your account has been blocked. Contact support.", 403));
    }

    next();
});


exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role '${req.user.role}' is not authorized to access this resource`, 403));
        }
        next();
    };
};

// Keep backward-compatible alias in case other files still use old typo name
exports.authrizeRoles = exports.authorizeRoles;