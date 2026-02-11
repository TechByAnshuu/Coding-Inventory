import unsplashService, { UNSPLASH_QUERIES } from './unsplashService';

// Mock sports matches data
const mockSportsMatches = [
    {
        id: 'sport-1',
        type: 'sports',
        sport: 'Cricket',
        title: 'India vs Australia - T20 World Cup Final',
        teamA: {
            name: 'India',
            shortName: 'IND',
            logo: '/images/team-india.png',
            color: '#0066CC'
        },
        teamB: {
            name: 'Australia',
            shortName: 'AUS',
            logo: '/images/team-australia.png',
            color: '#FFD700'
        },
        date: '2024-12-25',
        time: '19:00',
        duration: '4 hours',
        venue: 'Wankhede Stadium',
        city: 'Mumbai',
        stadium: {
            name: 'Wankhede Stadium',
            capacity: 33000,
            sections: ['VIP Box', 'Premium', 'General'],
            layout: {
                vip: { rows: 5, seatsPerRow: 20, price: 5000 },
                premium: { rows: 15, seatsPerRow: 30, price: 2500 },
                general: { rows: 50, seatsPerRow: 40, price: 800 }
            }
        },
        pricing: {
            vip: 5000,
            premium: 2500,
            general: 800
        },
        availableSeats: {
            vip: 80,
            premium: 350,
            general: 1500
        },
        totalSeats: 33000,
        image: null, // Will be fetched from Unsplash
        unsplashQuery: 'cricket stadium match',
        rating: 4.9,
        reviews: 2500,
        status: 'selling-fast',
        tags: ['T20', 'World Cup', 'Final', 'International'],
        featured: true,
        league: 'ICC T20 World Cup',
        season: '2024'
    },
    {
        id: 'sport-2',
        type: 'sports',
        sport: 'Football',
        title: 'Manchester United vs Liverpool - Premier League',
        teamA: {
            name: 'Manchester United',
            shortName: 'MUN',
            logo: '/images/team-manutd.png',
            color: '#DA291C'
        },
        teamB: {
            name: 'Liverpool',
            shortName: 'LIV',
            logo: '/images/team-liverpool.png',
            color: '#C8102E'
        },
        date: '2024-12-28',
        time: '20:00',
        duration: '2 hours',
        venue: 'Old Trafford',
        city: 'Mumbai',
        stadium: {
            name: 'DY Patil Stadium',
            capacity: 55000,
            sections: ['VIP Box', 'Premium', 'General'],
            layout: {
                vip: { rows: 8, seatsPerRow: 25, price: 4000 },
                premium: { rows: 20, seatsPerRow: 35, price: 2000 },
                general: { rows: 60, seatsPerRow: 50, price: 600 }
            }
        },
        pricing: {
            vip: 4000,
            premium: 2000,
            general: 600
        },
        availableSeats: {
            vip: 150,
            premium: 500,
            general: 2000
        },
        totalSeats: 55000,
        image: null,
        unsplashQuery: 'football soccer stadium',
        rating: 4.8,
        reviews: 1800,
        status: 'available',
        tags: ['Premier League', 'Football', 'International'],
        featured: true,
        league: 'Premier League',
        season: '2024-25'
    },
    {
        id: 'sport-3',
        type: 'sports',
        sport: 'Badminton',
        title: 'PV Sindhu vs Carolina Marin - India Open Finals',
        teamA: {
            name: 'PV Sindhu',
            shortName: 'IND',
            logo: '/images/player-sindhu.png',
            color: '#FF9933'
        },
        teamB: {
            name: 'Carolina Marin',
            shortName: 'ESP',
            logo: '/images/player-marin.png',
            color: '#C60B1E'
        },
        date: '2024-12-30',
        time: '18:00',
        duration: '3 hours',
        venue: 'KD Jadhav Indoor Hall',
        city: 'Delhi',
        stadium: {
            name: 'KD Jadhav Indoor Hall',
            capacity: 5000,
            sections: ['VIP', 'Premium', 'General'],
            layout: {
                vip: { rows: 3, seatsPerRow: 15, price: 2000 },
                premium: { rows: 10, seatsPerRow: 20, price: 1000 },
                general: { rows: 30, seatsPerRow: 25, price: 400 }
            }
        },
        pricing: {
            vip: 2000,
            premium: 1000,
            general: 400
        },
        availableSeats: {
            vip: 30,
            premium: 150,
            general: 600
        },
        totalSeats: 5000,
        image: null,
        unsplashQuery: 'badminton court',
        rating: 4.7,
        reviews: 950,
        status: 'few-seats',
        tags: ['Badminton', 'India Open', 'Finals'],
        featured: false,
        league: 'India Open',
        season: '2024'
    },
    {
        id: 'sport-4',
        type: 'sports',
        sport: 'Esports',
        title: 'BGMI Masters - Grand Finals',
        teamA: {
            name: 'Team Soul',
            shortName: 'SOUL',
            logo: '/images/team-soul.png',
            color: '#FF6B6B'
        },
        teamB: {
            name: 'Team XO',
            shortName: 'XO',
            logo: '/images/team-xo.png',
            color: '#4ECDC4'
        },
        date: '2025-01-05',
        time: '16:00',
        duration: '6 hours',
        venue: 'Esports Arena',
        city: 'Bangalore',
        stadium: {
            name: 'Bangalore Esports Arena',
            capacity: 2000,
            sections: ['VIP', 'Premium', 'General'],
            layout: {
                vip: { rows: 2, seatsPerRow: 10, price: 1500 },
                premium: { rows: 8, seatsPerRow: 15, price: 800 },
                general: { rows: 20, seatsPerRow: 20, price: 300 }
            }
        },
        pricing: {
            vip: 1500,
            premium: 800,
            general: 300
        },
        availableSeats: {
            vip: 15,
            premium: 100,
            general: 350
        },
        totalSeats: 2000,
        image: null,
        unsplashQuery: 'esports gaming arena',
        rating: 4.6,
        reviews: 1200,
        status: 'available',
        tags: ['BGMI', 'Esports', 'Gaming', 'Finals'],
        featured: true,
        league: 'BGMI Masters',
        season: '2024'
    }
];

// Sports Service Functions
export const sportsService = {
    // Get all sports matches
    getAllMatches: async () => {
        await new Promise(resolve => setTimeout(resolve, 500));

        // Fetch Unsplash images for matches
        const matchesWithImages = await Promise.all(
            mockSportsMatches.map(async (match) => {
                if (!match.image) {
                    try {
                        const photo = await unsplashService.getRandomPhoto(match.unsplashQuery);
                        return {
                            ...match,
                            image: photo?.urls?.regular || '/placeholder-sports.jpg'
                        };
                    } catch (error) {
                        return { ...match, image: '/placeholder-sports.jpg' };
                    }
                }
                return match;
            })
        );

        return matchesWithImages;
    },

    // Get match by ID
    getMatchById: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const match = mockSportsMatches.find(m => m.id === id);
        if (!match) throw new Error('Match not found');

        // Fetch Unsplash image if not present
        if (!match.image) {
            try {
                const photo = await unsplashService.getRandomPhoto(match.unsplashQuery);
                match.image = photo?.urls?.regular || '/placeholder-sports.jpg';
            } catch (error) {
                match.image = '/placeholder-sports.jpg';
            }
        }

        return match;
    },

    // Get featured matches
    getFeaturedMatches: async () => {
        await new Promise(resolve => setTimeout(resolve, 400));
        const featured = mockSportsMatches.filter(m => m.featured);

        const matchesWithImages = await Promise.all(
            featured.map(async (match) => {
                if (!match.image) {
                    try {
                        const photo = await unsplashService.getRandomPhoto(match.unsplashQuery);
                        return {
                            ...match,
                            image: photo?.urls?.regular || '/placeholder-sports.jpg'
                        };
                    } catch (error) {
                        return { ...match, image: '/placeholder-sports.jpg' };
                    }
                }
                return match;
            })
        );

        return matchesWithImages;
    },

    // Search and filter matches
    searchMatches: async (filters = {}) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        let results = [...mockSportsMatches];

        // Filter by search query
        if (filters.query) {
            const query = filters.query.toLowerCase();
            results = results.filter(match =>
                match.title.toLowerCase().includes(query) ||
                match.sport.toLowerCase().includes(query) ||
                match.teamA.name.toLowerCase().includes(query) ||
                match.teamB.name.toLowerCase().includes(query)
            );
        }

        // Filter by sport type
        if (filters.sport && filters.sport.length > 0) {
            results = results.filter(match =>
                filters.sport.includes(match.sport)
            );
        }

        // Filter by city
        if (filters.city && filters.city.length > 0) {
            results = results.filter(match =>
                filters.city.includes(match.city)
            );
        }

        // Filter by date range
        if (filters.dateFrom) {
            results = results.filter(match => match.date >= filters.dateFrom);
        }
        if (filters.dateTo) {
            results = results.filter(match => match.date <= filters.dateTo);
        }

        // Filter by price range
        if (filters.minPrice !== undefined) {
            results = results.filter(match => match.pricing.general >= filters.minPrice);
        }
        if (filters.maxPrice !== undefined) {
            results = results.filter(match => match.pricing.general <= filters.maxPrice);
        }

        // Sort results
        if (filters.sortBy) {
            switch (filters.sortBy) {
                case 'price-low':
                    results.sort((a, b) => a.pricing.general - b.pricing.general);
                    break;
                case 'price-high':
                    results.sort((a, b) => b.pricing.general - a.pricing.general);
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

        // Fetch images for filtered results
        const matchesWithImages = await Promise.all(
            results.map(async (match) => {
                if (!match.image) {
                    try {
                        const photo = await unsplashService.getRandomPhoto(match.unsplashQuery);
                        return {
                            ...match,
                            image: photo?.urls?.regular || '/placeholder-sports.jpg'
                        };
                    } catch (error) {
                        return { ...match, image: '/placeholder-sports.jpg' };
                    }
                }
                return match;
            })
        );

        return matchesWithImages;
    },

    // Get matches by sport type
    getMatchesBySport: async (sport) => {
        await new Promise(resolve => setTimeout(resolve, 400));
        return mockSportsMatches.filter(m => m.sport === sport);
    },

    // Get upcoming matches
    getUpcomingMatches: async (limit = 5) => {
        await new Promise(resolve => setTimeout(resolve, 400));
        const today = new Date().toISOString().split('T')[0];
        return mockSportsMatches
            .filter(m => m.date >= today)
            .sort((a, b) => a.date.localeCompare(b.date))
            .slice(0, limit);
    },

    // Get similar matches
    getSimilarMatches: async (matchId, limit = 3) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const match = mockSportsMatches.find(m => m.id === matchId);
        if (!match) return [];

        return mockSportsMatches
            .filter(m => m.id !== matchId && m.sport === match.sport)
            .slice(0, limit);
    }
};

export default mockSportsMatches;
