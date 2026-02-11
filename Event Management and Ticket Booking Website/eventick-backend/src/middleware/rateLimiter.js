const rateLimit = require('express-rate-limit');

// General API rate limiter
exports.apiLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// OTP request rate limiter
exports.otpLimiter = rateLimit({
    windowMs: 900000, // 15 minutes
    max: parseInt(process.env.OTP_RATE_LIMIT_MAX) || 3,
    message: {
        success: false,
        message: 'Too many OTP requests. Please try again after 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true
});

// Authentication rate limiter
exports.authLimiter = rateLimit({
    windowMs: 900000, // 15 minutes
    max: parseInt(process.env.AUTH_RATE_LIMIT_MAX) || 5,
    message: {
        success: false,
        message: 'Too many login attempts. Please try again after 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true
});

// Strict rate limiter for sensitive operations
exports.strictLimiter = rateLimit({
    windowMs: 3600000, // 1 hour
    max: 3,
    message: {
        success: false,
        message: 'Too many attempts. Please try again after 1 hour.'
    },
    standardHeaders: true,
    legacyHeaders: false
});
