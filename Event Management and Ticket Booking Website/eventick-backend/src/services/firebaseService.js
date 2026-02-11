const admin = require('../config/firebase');

/**
 * Verify Firebase ID Token
 * @param {string} idToken - Firebase ID token from client
 * @returns {Promise<Object>} Decoded token with user info
 */
const verifyIdToken = async (idToken) => {
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        return {
            success: true,
            data: decodedToken
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

/**
 * Get user by email from Firebase
 * @param {string} email - User email
 * @returns {Promise<Object>} Firebase user record
 */
const getUserByEmail = async (email) => {
    try {
        const userRecord = await admin.auth().getUserByEmail(email);
        return {
            success: true,
            data: userRecord
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

/**
 * Create custom token for user
 * @param {string} uid - Firebase UID
 * @returns {Promise<string>} Custom token
 */
const createCustomToken = async (uid) => {
    try {
        const customToken = await admin.auth().createCustomToken(uid);
        return {
            success: true,
            token: customToken
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

/**
 * Delete user from Firebase
 * @param {string} uid - Firebase UID
 * @returns {Promise<Object>} Result
 */
const deleteUser = async (uid) => {
    try {
        await admin.auth().deleteUser(uid);
        return {
            success: true,
            message: 'User deleted from Firebase'
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

module.exports = {
    verifyIdToken,
    getUserByEmail,
    createCustomToken,
    deleteUser
};
