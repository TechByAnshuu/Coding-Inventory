// Event Categories
export const EVENT_CATEGORIES = [
    'Music Night',
    'EDM Night',
    'Concerts',
    'Dance Events',
    'Festival Events',
    'Comedy Shows',
    'Workshops',
    'Sports',
    'Arts & Culture',
    'Food & Drink',
];

// Sports Categories
export const SPORTS_CATEGORIES = [
    'Cricket',
    'Football',
    'Badminton',
    'Basketball',
    'Tennis',
    'Esports',
    'Formula 1',
    'Kabaddi'
];

// Movie Genres
export const MOVIE_GENRES = [
    'Action',
    'Comedy',
    'Drama',
    'Horror',
    'Sci-Fi',
    'Romance',
    'Thriller',
    'Animation',
    'Adventure',
    'Crime'
];

// Movie Languages
export const MOVIE_LANGUAGES = [
    'English',
    'Hindi',
    'Tamil',
    'Telugu',
    'Malayalam',
    'Kannada',
    'Bengali',
    'Marathi'
];

// Cities
export const CITIES = [
    'Jaipur',
    'Ahmedabad',
    'Mumbai',
    'Baroda',
    'Goa',
    'Delhi',
    'Bangalore',
    'Pune',
    'Udaipur',
    'Hyderabad',
];

// Service Types
export const SERVICES = [
    {
        id: 1,
        name: 'Workshops & More',
        icon: 'BookOpen',
        description: 'Learn new skills and expand your knowledge',
        category: 'Workshop',
    },
    {
        id: 2,
        name: 'Photography & Video',
        icon: 'Camera',
        description: 'Professional photography and videography',
        category: 'Photography',
    },
    {
        id: 3,
        name: 'Comedy Shows',
        icon: 'Smile',
        description: 'Laugh out loud with best comedians',
        category: 'Comedy Shows',
    },
    {
        id: 4,
        name: 'Music Shows',
        icon: 'Music',
        description: 'Live music performances and concerts',
        category: 'Music Night',
    },
    {
        id: 5,
        name: 'Esports Centre',
        icon: 'Gamepad2',
        description: 'Gaming tournaments and competitions',
        category: 'Sports',
    },
    {
        id: 6,
        name: 'Upskill & Training',
        icon: 'GraduationCap',
        description: 'Professional development programs',
        category: 'Workshop',
    },
    {
        id: 7,
        name: 'Concerts',
        icon: 'Mic2',
        description: 'Live concerts and music festivals',
        category: 'Concerts',
    },
    {
        id: 8,
        name: 'Festive Events',
        icon: 'PartyPopper',
        description: 'Celebrate festivals with us',
        category: 'Festival Events',
    },
];

// Venues
export const VENUES = [
    {
        id: 1,
        name: 'Azaya Beach Resort',
        location: 'Goa',
        city: 'Goa',
        description: 'Beachside paradise for unforgettable events',
        image: '/images/venue-1.jpg',
        capacity: 500,
    },
    {
        id: 2,
        name: 'The Raj Palace',
        location: 'Jaipur',
        city: 'Jaipur',
        description: 'Royal heritage venue with modern amenities',
        image: '/images/venue-2.jpg',
        capacity: 1000,
    },
    {
        id: 3,
        name: 'Taj Aravalli Resort',
        location: 'Udaipur',
        city: 'Udaipur',
        description: 'Luxury resort with stunning lake views',
        image: '/images/venue-3.jpg',
        capacity: 800,
    },
    {
        id: 4,
        name: 'Prince Palace Hotel',
        location: 'Thailand',
        city: 'Bangkok',
        description: 'International venue for grand celebrations',
        image: '/images/venue-4.jpg',
        capacity: 2000,
    },
    {
        id: 5,
        name: 'Grand Banquet',
        location: 'Mumbai',
        city: 'Mumbai',
        description: 'Premium banquet hall in the heart of city',
        image: '/images/venue-5.jpg',
        capacity: 1500,
    },
    {
        id: 6,
        name: 'The Deltin',
        location: 'Daman',
        city: 'Daman',
        description: 'Coastal luxury for spectacular events',
        image: '/images/venue-6.jpg',
        capacity: 600,
    },
];

// Stadiums
export const STADIUMS = [
    {
        id: 1,
        name: 'Wankhede Stadium',
        city: 'Mumbai',
        capacity: 33000,
        sports: ['Cricket'],
        image: '/images/stadium-wankhede.jpg'
    },
    {
        id: 2,
        name: 'DY Patil Stadium',
        city: 'Mumbai',
        capacity: 55000,
        sports: ['Football', 'Cricket'],
        image: '/images/stadium-dypatil.jpg'
    },
    {
        id: 3,
        name: 'KD Jadhav Indoor Hall',
        city: 'Delhi',
        capacity: 5000,
        sports: ['Badminton', 'Basketball'],
        image: '/images/stadium-kdjadhav.jpg'
    },
    {
        id: 4,
        name: 'Bangalore Esports Arena',
        city: 'Bangalore',
        capacity: 2000,
        sports: ['Esports'],
        image: '/images/stadium-esports.jpg'
    }
];

// Theatres
export const THEATRES = [
    {
        id: 'theatre-1',
        name: 'PVR Phoenix',
        location: 'Kurla, Mumbai',
        city: 'Mumbai',
        screens: 8,
        facilities: ['3D', 'IMAX', 'Dolby Atmos']
    },
    {
        id: 'theatre-2',
        name: 'INOX Megaplex',
        location: 'Andheri, Mumbai',
        city: 'Mumbai',
        screens: 6,
        facilities: ['3D', 'Dolby Atmos']
    },
    {
        id: 'theatre-3',
        name: 'Cinepolis',
        location: 'Andheri, Mumbai',
        city: 'Mumbai',
        screens: 10,
        facilities: ['3D', '4DX', 'IMAX', 'Dolby Atmos']
    }
];

// Price Ranges
export const PRICE_RANGES = [
    { label: 'Under ₹500', min: 0, max: 500 },
    { label: '₹500 - ₹1000', min: 500, max: 1000 },
    { label: '₹1000 - ₹2500', min: 1000, max: 2500 },
    { label: '₹2500 - ₹5000', min: 2500, max: 5000 },
    { label: 'Above ₹5000', min: 5000, max: 999999 },
];

// Booking Types
export const BOOKING_TYPES = {
    EVENT: 'event',
    SPORTS: 'sports',
    MOVIE: 'movie'
};

// Seat Categories
export const SEAT_CATEGORIES = {
    VIP: 'vip',
    PREMIUM: 'premium',
    GENERAL: 'general',
    REGULAR: 'regular'
};

// Booking Status
export const BOOKING_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    CANCELLED: 'cancelled',
    COMPLETED: 'completed'
};

// Payment Status
export const PAYMENT_STATUS = {
    PENDING: 'pending',
    SUCCESS: 'success',
    FAILED: 'failed',
    REFUNDED: 'refunded'
};
