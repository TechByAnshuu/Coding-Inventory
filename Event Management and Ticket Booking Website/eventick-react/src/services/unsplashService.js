// Unsplash API Service
// Access Key: Df2amptQ0DWMo40ZPJaGHCFJNcfAVv0VFCDQLIbWViI

const UNSPLASH_ACCESS_KEY = 'Df2amptQ0DWMo40ZPJaGHCFJNcfAVv0VFCDQLIbWViI';
const UNSPLASH_API = 'https://api.unsplash.com';

// Cache for storing fetched images (24h expiry)
const imageCache = {
    get: (key) => {
        const cached = localStorage.getItem(`unsplash_${key}`);
        if (!cached) return null;

        const { url, timestamp } = JSON.parse(cached);
        const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000; // 24 hours

        if (isExpired) {
            localStorage.removeItem(`unsplash_${key}`);
            return null;
        }

        return url;
    },

    set: (key, url) => {
        localStorage.setItem(`unsplash_${key}`, JSON.stringify({
            url,
            timestamp: Date.now()
        }));
    }
};

export const unsplashService = {
    /**
     * Search photos by query
     * @param {string} query - Search term
     * @param {number} page - Page number
     * @param {number} perPage - Results per page
     */
    searchPhotos: async (query, page = 1, perPage = 10) => {
        try {
            // Check cache first
            const cacheKey = `search_${query}_${page}_${perPage}`;
            const cached = imageCache.get(cacheKey);
            if (cached) return JSON.parse(cached);

            const url = `${UNSPLASH_API}/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&client_id=${UNSPLASH_ACCESS_KEY}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Unsplash API error: ${response.status}`);
            }

            const data = await response.json();

            // Cache the results
            imageCache.set(cacheKey, JSON.stringify(data));

            return data;
        } catch (error) {
            console.error('Error fetching from Unsplash:', error);
            return { results: [], total: 0 };
        }
    },

    /**
     * Get a random photo by query
     * @param {string} query - Search term for random photo
     */
    getRandomPhoto: async (query) => {
        try {
            const cacheKey = `random_${query}`;
            const cached = imageCache.get(cacheKey);
            if (cached) return { urls: { regular: cached, small: cached, thumb: cached } };

            const url = `${UNSPLASH_API}/photos/random?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_ACCESS_KEY}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Unsplash API error: ${response.status}`);
            }

            const data = await response.json();

            // Cache the image URL
            imageCache.set(cacheKey, data.urls.regular);

            return data;
        } catch (error) {
            console.error('Error fetching random photo:', error);
            return null;
        }
    },

    /**
     * Get photo by ID
     * @param {string} id - Unsplash photo ID
     */
    getPhoto: async (id) => {
        try {
            const url = `${UNSPLASH_API}/photos/${id}?client_id=${UNSPLASH_ACCESS_KEY}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Unsplash API error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching photo:', error);
            return null;
        }
    },

    /**
     * Get optimized image URL based on screen size
     * @param {object} urls - Unsplash URLs object
     * @param {string} size - 'thumb', 'small', 'regular', 'full'
     */
    getOptimizedUrl: (urls, size = 'regular') => {
        if (!urls) return '/placeholder-image.jpg';
        return urls[size] || urls.regular || '/placeholder-image.jpg';
    },

    /**
     * Preload images for better UX
     * @param {array} imageUrls - Array of image URLs to preload
     */
    preloadImages: (imageUrls) => {
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    },

    /**
     * Clear image cache
     */
    clearCache: () => {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith('unsplash_')) {
                localStorage.removeItem(key);
            }
        });
    }
};

// Predefined queries for different categories
export const UNSPLASH_QUERIES = {
    // Events
    events: {
        'Music Night': 'concert stage lights',
        'EDM Night': 'edm festival dj',
        'Concerts': 'live concert crowd',
        'Dance Events': 'dance performance stage',
        'Festival Events': 'music festival crowd',
        'Comedy Shows': 'comedy show stage',
        'Workshops': 'workshop training',
        'Sports': 'sports event stadium',
        'Arts & Culture': 'art exhibition gallery',
        'Food & Drink': 'food festival'
    },

    // Sports
    sports: {
        'Cricket': 'cricket stadium match',
        'Football': 'football soccer stadium',
        'Badminton': 'badminton court',
        'Basketball': 'basketball arena',
        'Tennis': 'tennis court',
        'Esports': 'esports gaming arena',
        'Formula 1': 'formula 1 racing',
        'Kabaddi': 'sports arena'
    },

    // Movies
    movies: {
        'Action': 'action movie scene',
        'Comedy': 'comedy movie',
        'Drama': 'drama film',
        'Horror': 'horror movie',
        'Sci-Fi': 'science fiction movie',
        'Romance': 'romantic movie',
        'Thriller': 'thriller movie',
        'Animation': 'animated movie',
        'default': 'cinema theatre'
    },

    // Venues
    venues: {
        'stadium': 'modern stadium',
        'theatre': 'movie theatre cinema',
        'arena': 'sports arena',
        'hall': 'concert hall',
        'resort': 'luxury resort',
        'palace': 'palace venue'
    }
};

export default unsplashService;
