// Mock event data based on current website content
const mockEvents = [
    {
        id: '1',
        title: 'Ed Sheeran Live in Mumbai',
        description: 'Experience the magic of Ed Sheeran live with his greatest hits and new songs. An unforgettable night of music awaits!',
        category: 'Concerts',
        city: 'Mumbai',
        venue: 'Grand Banquet',
        venueId: 5,
        date: '2024-02-15',
        time: '19:00',
        duration: '3 hours',
        image: '/images/image1.jpeg',
        rating: 4.8,
        reviews: 1250,
        price: 2500,
        maxPrice: 8000,
        availableSeats: 450,
        totalSeats: 1500,
        featured: true,
        tags: ['Music', 'International', 'Live Performance'],
        status: 'selling-fast',
    },
    {
        id: '2',
        title: 'T20 World Cup Final',
        description: 'Witness cricket history in the making! Be part of the electrifying atmosphere at the T20 World Cup Final.',
        category: 'Sports',
        city: 'Mumbai',
        venue: 'Wankhede Stadium',
        venueId: 5,
        date: '2024-03-20',
        time: '14:00',
        duration: '5 hours',
        image: '/images/image2.jpeg',
        rating: 4.9,
        reviews: 3200,
        price: 1500,
        maxPrice: 15000,
        availableSeats: 200,
        totalSeats: 33000,
        featured: true,
        tags: ['Sports', 'Cricket', 'International'],
        status: 'selling-fast',
    },
    {
        id: '3',
        title: 'Sunburn Goa Festival 2024',
        description: 'Asia\'s biggest EDM festival is back! 3 days of non-stop music, dance, and celebration on the beaches of Goa.',
        category: 'Festival Events',
        city: 'Goa',
        venue: 'Azaya Beach Resort',
        venueId: 1,
        date: '2024-12-28',
        time: '16:00',
        duration: '3 days',
        image: '/images/image3.jpeg',
        rating: 4.7,
        reviews: 2800,
        price: 3500,
        maxPrice: 12000,
        availableSeats: 1200,
        totalSeats: 5000,
        featured: true,
        tags: ['EDM', 'Festival', 'Multi-day'],
        status: 'available',
    },
    {
        id: '4',
        title: 'Stand-up Comedy Night',
        description: 'Laugh your heart out with India\'s top comedians. An evening full of jokes, stories, and non-stop entertainment!',
        category: 'Comedy Shows',
        city: 'Bangalore',
        venue: 'Phoenix Marketcity',
        venueId: null,
        date: '2024-01-25',
        time: '20:00',
        duration: '2 hours',
        image: '/images/image4.jpeg.jpeg',
        rating: 4.6,
        reviews: 890,
        price: 499,
        maxPrice: 1499,
        availableSeats: 120,
        totalSeats: 300,
        featured: false,
        tags: ['Comedy', 'Stand-up', 'Entertainment'],
        status: 'available',
    },
    {
        id: '5',
        title: 'Bollywood Dance Workshop',
        description: 'Learn Bollywood dance moves from professional choreographers. Perfect for beginners and enthusiasts!',
        category: 'Workshop',
        city: 'Mumbai',
        venue: 'Dance Academy',
        venueId: null,
        date: '2024-02-10',
        time: '10:00',
        duration: '4 hours',
        image: '/images/image5.jpeg',
        rating: 4.5,
        reviews: 450,
        price: 799,
        maxPrice: 799,
        availableSeats: 35,
        totalSeats: 50,
        featured: false,
        tags: ['Workshop', 'Dance', 'Bollywood'],
        status: 'few-seats',
    },
    {
        id: '6',
        title: 'Holi Festival Celebration',
        description: 'Celebrate the festival of colors with music, dance, and lots of fun! Safe colors and unlimited entertainment.',
        category: 'Festival Events',
        city: 'Jaipur',
        venue: 'The Raj Palace',
        venueId: 2,
        date: '2024-03-25',
        time: '11:00',
        duration: '6 hours',
        image: '/images/IMAGES3.jpeg',
        rating: 4.8,
        reviews: 1500,
        price: 599,
        maxPrice: 1299,
        availableSeats: 800,
        totalSeats: 1000,
        featured: true,
        tags: ['Festival', 'Holi', 'Cultural'],
        status: 'available',
    },
    {
        id: '7',
        title: 'Electronic Music Night',
        description: 'Best DJs spinning the hottest EDM tracks. Get ready to dance all night long with amazing lights and sound!',
        category: 'EDM Night',
        city: 'Pune',
        venue: 'Club Vertigo',
        venueId: null,
        date: '2024-01-27',
        time: '21:00',
        duration: '5 hours',
        image: '/images/IMAGES4.jpeg',
        rating: 4.6,
        reviews: 670,
        price: 999,
        maxPrice: 2499,
        availableSeats: 250,
        totalSeats: 400,
        featured: false,
        tags: ['EDM', 'DJ', 'Nightlife'],
        status: 'available',
    },
    {
        id: '8',
        title: 'Food & Wine Festival',
        description: 'Indulge in culinary delights from around the world. Wine tasting, live cooking shows, and gourmet experiences!',
        category: 'Food & Drink',
        city: 'Goa',
        venue: 'Azaya Beach Resort',
        venueId: 1,
        date: '2024-02-15',
        time: '12:00',
        duration: '2 days',
        image: '/images/IMAGES5.jpeg',
        rating: 4.7,
        reviews: 980,
        price: 1499,
        maxPrice: 4999,
        availableSeats: 300,
        totalSeats: 500,
        featured: true,
        tags: ['Food', 'Wine', 'Gourmet'],
        status: 'available',
    },
    {
        id: '9',
        title: 'Photography Masterclass',
        description: 'Learn from award-winning photographers. Master the art of composition, lighting, and post-processing.',
        category: 'Workshop',
        city: 'Delhi',
        venue: 'India Habitat Centre',
        venueId: null,
        date: '2024-02-05',
        time: '09:00',
        duration: '8 hours',
        image: '/images/IMAGES6.jpeg',
        rating: 4.9,
        reviews: 320,
        price: 2999,
        maxPrice: 2999,
        availableSeats: 15,
        totalSeats: 30,
        featured: false,
        tags: ['Workshop', 'Photography', 'Skill Development'],
        status: 'few-seats',
    },
    {
        id: '10',
        title: 'New Year Eve Celebration',
        description: 'Ring in the New Year with spectacular performances, DJ, unlimited food & drinks, and fireworks!',
        category: 'Festival Events',
        city: 'Mumbai',
        venue: 'Grand Banquet',
        venueId: 5,
        date: '2024-12-31',
        time: '20:00',
        duration: '6 hours',
        image: '/images/IMAGES7.jpeg',
        rating: 4.9,
        reviews: 2100,
        price: 5000,
        maxPrice: 15000,
        availableSeats: 600,
        totalSeats: 1500,
        featured: true,
        tags: ['New Year', 'Party', 'Celebration'],
        status: 'available',
    },
];

// Event Service Functions
export const eventService = {
    // Get all events
    getAllEvents: async () => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockEvents;
    },

    // Get event by ID
    getEventById: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const event = mockEvents.find(e => e.id === id);
        if (!event) throw new Error('Event not found');
        return event;
    },

    // Get featured events
    getFeaturedEvents: async () => {
        await new Promise(resolve => setTimeout(resolve, 400));
        return mockEvents.filter(e => e.featured);
    },

    // Search and filter events
    searchEvents: async (filters = {}) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        let results = [...mockEvents];

        // Filter by search query
        if (filters.query) {
            const query = filters.query.toLowerCase();
            results = results.filter(event =>
                event.title.toLowerCase().includes(query) ||
                event.description.toLowerCase().includes(query) ||
                event.category.toLowerCase().includes(query)
            );
        }

        // Filter by category
        if (filters.category && filters.category.length > 0) {
            results = results.filter(event =>
                filters.category.includes(event.category)
            );
        }

        // Filter by city
        if (filters.city && filters.city.length > 0) {
            results = results.filter(event =>
                filters.city.includes(event.city)
            );
        }

        // Filter by date range
        if (filters.dateFrom) {
            results = results.filter(event => event.date >= filters.dateFrom);
        }
        if (filters.dateTo) {
            results = results.filter(event => event.date <= filters.dateTo);
        }

        // Filter by price range
        if (filters.minPrice !== undefined) {
            results = results.filter(event => event.price >= filters.minPrice);
        }
        if (filters.maxPrice !== undefined) {
            results = results.filter(event => event.price <= filters.maxPrice);
        }

        // Sort results
        if (filters.sortBy) {
            switch (filters.sortBy) {
                case 'price-low':
                    results.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    results.sort((a, b) => b.price - a.price);
                    break;
                case 'date':
                    results.sort((a, b) => a.date.localeCompare(b.date));
                    break;
                case 'rating':
                    results.sort((a, b) => b.rating - a.rating);
                    break;
                case 'popularity':
                    results.sort((a, b) => b.reviews - a.reviews);
                    break;
                default:
                    break;
            }
        }

        return results;
    },

    // Get events by category
    getEventsByCategory: async (category) => {
        await new Promise(resolve => setTimeout(resolve, 400));
        return mockEvents.filter(e => e.category === category);
    },

    // Get events by venue
    getEventsByVenue: async (venueId) => {
        await new Promise(resolve => setTimeout(resolve, 400));
        return mockEvents.filter(e => e.venueId === venueId);
    },

    // Get similar events
    getSimilarEvents: async (eventId, limit = 3) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const event = mockEvents.find(e => e.id === eventId);
        if (!event) return [];

        return mockEvents
            .filter(e => e.id !== eventId && e.category === event.category)
            .slice(0, limit);
    },
};

export default mockEvents;
