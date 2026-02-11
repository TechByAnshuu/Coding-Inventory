const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth.middleware');
const { otpLimiter, authLimiter } = require('../middleware/rateLimiter');
const {
    validateOTPRequest,
    validateOTPVerification,
    validatePasswordSetup,
    validateLogin,
    validateGoogleLogin,
    validateProfileUpdate
} = require('../middleware/validator');

// Public routes - OTP Authentication
router.post('/send-otp', otpLimiter, validateOTPRequest, authController.sendOTP);
router.post('/verify-otp', authLimiter, validateOTPVerification, authController.verifyOTP);

// Protected route - Set password (requires temp token from OTP verification)
router.post('/set-password', protect, validatePasswordSetup, authController.setPassword);

// Public routes - Password & Google Login
router.post('/login', authLimiter, validateLogin, authController.loginWithPassword);
router.post('/google-login', authLimiter, validateGoogleLogin, authController.googleLogin);

// Protected routes
router.get('/me', protect, authController.getMe);
router.post('/logout', protect, authController.logout);
router.put('/update-profile', protect, validateProfileUpdate, authController.updateProfile);

module.exports = router;
