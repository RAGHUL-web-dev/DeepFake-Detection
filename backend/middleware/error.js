module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    // Log every error for debugging
    console.error(`[${new Date().toISOString()}] ${err.statusCode} — ${err.message}`);
    if (err.stack && process.env.NODE_ENV !== 'production') {
        console.error(err.stack);
    }

    if (process.env.NODE_ENV === "development") {
        return res.status(err.statusCode).json({
            success: false,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }

    if (process.env.NODE_ENV === "production") {
        // Don't leak internal details in production
        const message = err.isOperational ? err.message : "Something went wrong";
        return res.status(err.statusCode).json({
            success: false,
            message
        });
    }

    // Fallback for any other NODE_ENV value (e.g. typos in .env)
    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};