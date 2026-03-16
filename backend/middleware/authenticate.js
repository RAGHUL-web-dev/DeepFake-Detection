const User = require("../models/User")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("./catchAsynError")
const JWT = require("jsonwebtoken")

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies

    if(!token){
        return next(new ErrorHandler("Please login to access this resource", 401))
    }

    const decodedToken = JWT.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decodedToken.id)

    if(!req.user){
        return next(new ErrorHandler("User not found, please login again", 401))
    }

    next()
})


exports.authrizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role ${req.user.role} is not authorized to access this resource`, 403))
        }
        next()
    }
}