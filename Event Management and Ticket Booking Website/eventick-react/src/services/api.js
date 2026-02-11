import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

// Authentication API
export const authAPI = {
    // Send OTP to email
    sendOTP: async (email) => {
        const response = await api.post('/auth/send-otp', { email });
        return response.data;
    },

    // Verify OTP
    verifyOTP: async (email, otp, name) => {
        const response = await api.post('/auth/verify-otp', { email, otp, name });
        return response.data;
    },

    // Set password after OTP verification
    setPassword: async (password, confirmPassword, tempToken) => {
        const response = await api.post(
            '/auth/set-password',
            { password, confirmPassword },
            { headers: { Authorization: `Bearer ${tempToken}` } }
        );
        return response.data;
    },

    // Login with password
    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },

    // Google login
    googleLogin: async (idToken) => {
        const response = await api.post('/auth/google-login', { idToken });
        return response.data;
    },

    // Get current user
    getMe: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },

    // Logout
    logout: async () => {
        const response = await api.post('/auth/logout');
        return response.data;
    },

    // Update profile
    updateProfile: async (data) => {
        const response = await api.put('/auth/update-profile', data);
        return response.data;
    }
};

// Events API
export const eventsAPI = {
    getAll: async (params) => {
        const response = await api.get('/events', { params });
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/events/${id}`);
        return response.data;
    },

    getFeatured: async () => {
        const response = await api.get('/events/featured');
        return response.data;
    }
};

// Sports API
export const sportsAPI = {
    getAll: async (params) => {
        const response = await api.get('/sports', { params });
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/sports/${id}`);
        return response.data;
    }
};

// Movies API
export const moviesAPI = {
    getAll: async (params) => {
        const response = await api.get('/movies', { params });
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/movies/${id}`);
        return response.data;
    },

    getNowShowing: async () => {
        const response = await api.get('/movies/now-showing');
        return response.data;
    },

    getUpcoming: async () => {
        const response = await api.get('/movies/upcoming');
        return response.data;
    }
};

// Bookings API
export const bookingsAPI = {
    create: async (bookingData) => {
        const response = await api.post('/bookings', bookingData);
        return response.data;
    },

    getUserBookings: async (userId) => {
        const response = await api.get(`/bookings/user/${userId}`);
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/bookings/${id}`);
        return response.data;
    },

    updatePayment: async (id, paymentData) => {
        const response = await api.put(`/bookings/${id}/payment`, paymentData);
        return response.data;
    },

    cancel: async (id, reason) => {
        const response = await api.put(`/bookings/${id}/cancel`, { cancellationReason: reason });
        return response.data;
    }
};

export default api;
