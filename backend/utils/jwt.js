const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    if(!token){
        throw new Error("Token not generated");
    }

    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: 'lax'
    };

    // Exclude password from response
    const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        status: user.status,
        createdAt: user.createdAt
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,
        user: userData
    });
};

module.exports = sendToken;