const crypto = require('crypto');

// In-memory OTP storage (fallback when Redis is not available)
const otpStore = new Map();

// Redis client (optional)
let redisClient = null;

// Initialize Redis if enabled
if (process.env.USE_REDIS === 'true') {
    try {
        const Redis = require('ioredis');
        redisClient = new Redis(process.env.REDIS_URL);
        console.log('✅ Redis connected for OTP storage');
    } catch (error) {
        console.warn('⚠️  Redis not available, using in-memory OTP storage');
    }
}

/**
 * Generate 6-digit OTP
 * @returns {string} 6-digit OTP
 */
const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
};

/**
 * Store OTP with 5-minute expiry
 * @param {string} email - User email
 * @param {string} otp - Generated OTP
 * @returns {Promise<void>}
 */
const storeOTP = async (email, otp) => {
    const key = `otp:${email.toLowerCase()}`;
    const expirySeconds = 300; // 5 minutes

    if (redisClient) {
        await redisClient.setex(key, expirySeconds, otp);
    } else {
        // In-memory storage with expiry
        otpStore.set(key, {
            otp,
            expiresAt: Date.now() + (expirySeconds * 1000)
        });
    }
};

/**
 * Verify OTP
 * @param {string} email - User email
 * @param {string} otp - OTP to verify
 * @returns {Promise<boolean>} True if OTP is valid
 */
const verifyOTP = async (email, otp) => {
    const key = `otp:${email.toLowerCase()}`;

    if (redisClient) {
        const storedOTP = await redisClient.get(key);
        if (storedOTP === otp) {
            await redisClient.del(key); // Delete after successful verification
            return true;
        }
        return false;
    } else {
        // In-memory verification
        const otpData = otpStore.get(key);
        if (!otpData) return false;

        // Check expiry
        if (Date.now() > otpData.expiresAt) {
            otpStore.delete(key);
            return false;
        }

        // Verify OTP
        if (otpData.otp === otp) {
            otpStore.delete(key);
            return true;
        }
        return false;
    }
};

/**
 * Delete OTP
 * @param {string} email - User email
 * @returns {Promise<void>}
 */
const deleteOTP = async (email) => {
    const key = `otp:${email.toLowerCase()}`;

    if (redisClient) {
        await redisClient.del(key);
    } else {
        otpStore.delete(key);
    }
};

/**
 * Check if OTP exists for email
 * @param {string} email - User email
 * @returns {Promise<boolean>} True if OTP exists
 */
const hasOTP = async (email) => {
    const key = `otp:${email.toLowerCase()}`;

    if (redisClient) {
        const exists = await redisClient.exists(key);
        return exists === 1;
    } else {
        const otpData = otpStore.get(key);
        if (!otpData) return false;

        // Check expiry
        if (Date.now() > otpData.expiresAt) {
            otpStore.delete(key);
            return false;
        }
        return true;
    }
};

// Cleanup expired OTPs every 5 minutes (for in-memory storage)
if (!redisClient) {
    setInterval(() => {
        const now = Date.now();
        for (const [key, data] of otpStore.entries()) {
            if (now > data.expiresAt) {
                otpStore.delete(key);
            }
        }
    }, 300000); // 5 minutes
}

module.exports = {
    generateOTP,
    storeOTP,
    verifyOTP,
    deleteOTP,
    hasOTP
};
