const User = require("../models/User")
const catchAsyncError = require("../middleware/catchAsynError")
const sendToken = require("../utils/jwt")
const ErrorHandler = require("../utils/errorHandler")


// register user
exports.authRegisterUser = catchAsyncError(async(req, res, next) => {
    const { email, password, name, avatar } = req.body;

    if(!email || !password || !name){
        return next(new ErrorHandler("Please provide all fields", 400))
    }

    const user = await User.create({
        email,  
        password,
        name,
        avatar
    })

    res.status(201).json({
        success : true,
        user
    })
})


exports.authLoginUser = catchAsyncError(async(req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please provide all fields", 400))
    }

    const user = await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandler("Invalid credentials", 401))
    }

    const isPasswordMatched = await user.comparePasword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid credentials", 401))
    }

    sendToken(user, 200, res)
})

