const User = require('../models/User');
const firebaseService = require('../services/firebaseService');
const otpService = require('../services/otpService');
const emailService = require('../services/emailService');

// @desc    Send OTP to email
// @route   POST /api/auth/send-otp
// @access  Public
exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        // Check if OTP was recently sent
        const hasRecentOTP = await otpService.hasOTP(email);
        if (hasRecentOTP) {
            return res.status(429).json({
                success: false,
                message: 'OTP already sent. Please wait before requesting a new one.'
            });
        }

        // Generate and store OTP
        const otp = otpService.generateOTP();
        await otpService.storeOTP(email, otp);

        // Send OTP via email
        const emailResult = await emailService.sendOTPEmail(email, otp);

        if (!emailResult.success) {
            return res.status(500).json({
                success: false,
                message: 'Failed to send OTP email',
                error: emailResult.error
            });
        }

        res.status(200).json({
            success: true,
            message: 'OTP sent to your email',
            expiresIn: 300 // 5 minutes
        });
    } catch (error) {
        console.error('Send OTP error:', error);
        res.status(500).json({
            success: false,
            message: 'Error sending OTP',
            error: error.message
        });
    }
};

// @desc    Verify OTP and create/login user
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp, name } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: 'Email and OTP are required'
            });
        }

        // Verify OTP
        const isValidOTP = await otpService.verifyOTP(email, otp);

        if (!isValidOTP) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired OTP'
            });
        }

        // Check if user exists
        let user = await User.findOne({ email });

        if (!user) {
            // Create new user
            if (!name) {
                return res.status(400).json({
                    success: false,
                    message: 'Name is required for new users'
                });
            }

            user = await User.create({
                name,
                email,
                isOtpVerified: true,
                emailVerified: true,
                authProvider: 'email'
            });

            // Send welcome email
            await emailService.sendWelcomeEmail(user);
        } else {
            // Update existing user
            user.isOtpVerified = true;
            user.emailVerified = true;
            user.lastLogin = new Date();
            await user.save();
        }

        // Check if user has password set
        const userWithPassword = await User.findById(user._id).select('+passwordHash');
        const hasPassword = !!userWithPassword.passwordHash;

        if (hasPassword) {
            // User has password, issue full JWT
            const token = user.generateAuthToken();

            return res.status(200).json({
                success: true,
                message: 'OTP verified successfully',
                requiresPassword: false,
                data: {
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        avatar: user.avatar
                    },
                    token
                }
            });
        } else {
            // User needs to set password, issue temporary token
            const tempToken = user.generateTempToken();

            return res.status(200).json({
                success: true,
                message: 'OTP verified successfully. Please set your password.',
                requiresPassword: true,
                data: {
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        avatar: user.avatar
                    },
                    tempToken
                }
            });
        }
    } catch (error) {
        console.error('Verify OTP error:', error);
        res.status(500).json({
            success: false,
            message: 'Error verifying OTP',
            error: error.message
        });
    }
};

// @desc    Set password after OTP verification
// @route   POST /api/auth/set-password
// @access  Private (requires temp token)
exports.setPassword = async (req, res) => {
    try {
        const { password, confirmPassword } = req.body;

        if (!password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password and confirm password are required'
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match'
            });
        }

        // Password validation
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters long'
            });
        }

        // Check if user is OTP verified
        const user = await User.findById(req.user.id).select('+passwordHash');

        if (!user.isOtpVerified) {
            return res.status(403).json({
                success: false,
                message: 'OTP verification required before setting password'
            });
        }

        if (user.passwordHash) {
            return res.status(400).json({
                success: false,
                message: 'Password already set. Use password login.'
            });
        }

        // Set password
        user.password = password;
        await user.save();

        // Send confirmation email
        await emailService.sendPasswordSetConfirmation(user);

        // Issue full JWT token
        const token = user.generateAuthToken();

        res.status(200).json({
            success: true,
            message: 'Password set successfully',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar
                },
                token
            }
        });
    } catch (error) {
        console.error('Set password error:', error);
        res.status(500).json({
            success: false,
            message: 'Error setting password',
            error: error.message
        });
    }
};

// @desc    Login with email and password
// @route   POST /api/auth/login
// @access  Public
exports.loginWithPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Find user with password
        const user = await User.findOne({ email }).select('+passwordHash');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check if user has completed OTP verification
        if (!user.isOtpVerified) {
            return res.status(403).json({
                success: false,
                message: 'Please verify your email with OTP first'
            });
        }

        // Check if password is set
        if (!user.passwordHash) {
            return res.status(403).json({
                success: false,
                message: 'Password not set. Please use OTP login and set your password.'
            });
        }

        // Verify password
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate token
        const token = user.generateAuthToken();

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar
                },
                token
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Error logging in',
            error: error.message
        });
    }
};

// @desc    Google Sign-In
// @route   POST /api/auth/google-login
// @access  Public
exports.googleLogin = async (req, res) => {
    try {
        const { idToken } = req.body;

        if (!idToken) {
            return res.status(400).json({
                success: false,
                message: 'Google ID token is required'
            });
        }

        // Verify Firebase ID token
        const verificationResult = await firebaseService.verifyIdToken(idToken);

        if (!verificationResult.success) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Google token',
                error: verificationResult.error
            });
        }

        const { email, name, picture, uid } = verificationResult.data;

        // Check if user exists
        let user = await User.findOne({ email });

        if (!user) {
            // Create new user
            user = await User.create({
                firebaseUid: uid,
                name: name || email.split('@')[0],
                email,
                avatar: picture || `https://ui-avatars.com/api/?name=${name}&background=a855f7&color=fff`,
                authProvider: 'google',
                isOtpVerified: true,
                emailVerified: true
            });

            // Send welcome email
            await emailService.sendWelcomeEmail(user);
        } else {
            // Update existing user
            user.firebaseUid = uid;
            user.authProvider = 'google';
            user.lastLogin = new Date();
            if (picture) user.avatar = picture;
            await user.save();
        }

        // Generate token
        const token = user.generateAuthToken();

        res.status(200).json({
            success: true,
            message: 'Google login successful',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar
                },
                token
            }
        });
    } catch (error) {
        console.error('Google login error:', error);
        res.status(500).json({
            success: false,
            message: 'Error with Google login',
            error: error.message
        });
    }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('bookings');

        res.status(200).json({
            success: true,
            data: { user }
        });
    } catch (error) {
        console.error('Get me error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user data',
            error: error.message
        });
    }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: 'Error logging out',
            error: error.message
        });
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/update-profile
// @access  Private
exports.updateProfile = async (req, res) => {
    try {
        const { name, phone } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name, phone },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: { user }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating profile',
            error: error.message
        });
    }
};
