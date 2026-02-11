import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize auth state from localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Send OTP
    const sendOTP = async (email) => {
        try {
            setError(null);
            const response = await authAPI.sendOTP(email);
            return { success: true, data: response };
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to send OTP';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    // Verify OTP
    const verifyOTP = async (email, otp, name) => {
        try {
            setError(null);
            const response = await authAPI.verifyOTP(email, otp, name);

            if (response.success) {
                if (response.requiresPassword) {
                    // User needs to set password, return temp token
                    return {
                        success: true,
                        requiresPassword: true,
                        tempToken: response.data.tempToken,
                        user: response.data.user
                    };
                } else {
                    // User has password, login complete
                    const { user: userData, token: authToken } = response.data;
                    setUser(userData);
                    setToken(authToken);
                    localStorage.setItem('token', authToken);
                    localStorage.setItem('user', JSON.stringify(userData));
                    return { success: true, requiresPassword: false };
                }
            }
            return { success: false, error: 'OTP verification failed' };
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Invalid OTP';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    // Set password after OTP verification
    const setPassword = async (password, confirmPassword, tempToken) => {
        try {
            setError(null);
            const response = await authAPI.setPassword(password, confirmPassword, tempToken);

            if (response.success) {
                const { user: userData, token: authToken } = response.data;
                setUser(userData);
                setToken(authToken);
                localStorage.setItem('token', authToken);
                localStorage.setItem('user', JSON.stringify(userData));
                return { success: true };
            }
            return { success: false, error: 'Failed to set password' };
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to set password';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    // Login with password
    const login = async (email, password) => {
        try {
            setError(null);
            const response = await authAPI.login(email, password);

            if (response.success) {
                const { user: userData, token: authToken } = response.data;
                setUser(userData);
                setToken(authToken);
                localStorage.setItem('token', authToken);
                localStorage.setItem('user', JSON.stringify(userData));
                return { success: true };
            }
            return { success: false, error: 'Login failed' };
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Invalid credentials';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    // Google login
    const googleLogin = async (idToken) => {
        try {
            setError(null);
            const response = await authAPI.googleLogin(idToken);

            if (response.success) {
                const { user: userData, token: authToken } = response.data;
                setUser(userData);
                setToken(authToken);
                localStorage.setItem('token', authToken);
                localStorage.setItem('user', JSON.stringify(userData));
                return { success: true };
            }
            return { success: false, error: 'Google login failed' };
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Google login failed';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    // Logout
    const logout = async () => {
        try {
            await authAPI.logout();
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            setUser(null);
            setToken(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    };

    // Update profile
    const updateProfile = async (data) => {
        try {
            setError(null);
            const response = await authAPI.updateProfile(data);

            if (response.success) {
                const updatedUser = response.data.user;
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                return { success: true };
            }
            return { success: false, error: 'Failed to update profile' };
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to update profile';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const value = {
        user,
        token,
        loading,
        error,
        isAuthenticated: !!user && !!token,
        sendOTP,
        verifyOTP,
        setPassword,
        login,
        googleLogin,
        logout,
        updateProfile
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
