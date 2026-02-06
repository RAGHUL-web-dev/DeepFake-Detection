module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal server error"

    if(process.env.NODE_ENV == "development"){
        req.status(err.statusCode).json({
            success : false,
            error : err,
            message : err.message,
            stack : err.stack
        })
    }

    if(process.env.NODE_ENV == "production"){

        let message = err.message
        let error = new Error(message) 
        req.status(err.statusCode).json({
            success : false,
            message : err.message
        })
    }
}