const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firebaseUid: {
        type: String,
        sparse: true,
        index: true
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        select: false
    },
    passwordHash: {
        type: String,
        select: false
    },
    isOtpVerified: {
        type: Boolean,
        default: false
    },
    authProvider: {
        type: String,
        enum: ['email', 'google'],
        default: 'email'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    avatar: {
        type: String,
        default: 'https://ui-avatars.com/api/?name=User&background=a855f7&color=fff'
    },
    phone: String,
    emailVerified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'wishlistModel'
    }],
    wishlistModel: {
        type: String,
        enum: ['Event', 'Sports', 'Movie']
    }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password') && !this.isModified('passwordHash')) {
        return next();
    }

    try {
        // Handle both password and passwordHash fields
        const passwordField = this.password || this.passwordHash;
        if (passwordField) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(passwordField, salt);
            this.passwordHash = hash;
            this.password = undefined; // Clear password field
        }
        next();
    } catch (error) {
        next(error);
    }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.passwordHash);
    } catch (error) {
        return false;
    }
};

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { id: this._id, email: this.email, role: this.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
};

// Generate temporary token (for password setup after OTP)
userSchema.methods.generateTempToken = function () {
    return jwt.sign(
        { id: this._id, email: this.email, temp: true },
        process.env.JWT_SECRET,
        { expiresIn: '15m' } // 15 minutes to set password
    );
};

module.exports = mongoose.model('User', userSchema);
