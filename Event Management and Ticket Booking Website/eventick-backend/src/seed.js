require('dotenv').config();
const connectDB = require('./config/database');
const Event = require('./models/Event');
const Sports = require('./models/Sports');
const Movie = require('./models/Movie');
const User = require('./models/User');

// Sample data
const sampleEvents = [
    {
        title: 'Summer Music Festival 2025',
        description: 'Join us for the biggest music festival of the year featuring top artists from around the world.',
        category: 'Music',
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea',
        venue: {
            name: 'Phoenix Arena',
            address: '123 Main Street',
            city: 'Mumbai',
            state: 'Maharashtra',
            capacity: 50000
        },
        date: new Date('2025-06-15'),
        time: '18:00',
        duration: '8 hours',
        pricing: [
            { category: 'VIP', price: 5000, availableSeats: 500 },
            { category: 'Premium', price: 3000, availableSeats: 2000 },
            { category: 'Standard', price: 1500, availableSeats: 5000 },
            { category: 'General', price: 800, availableSeats: 10000 }
        ],
        organizer: {
            name: 'Phoenix Events',
            contact: '+91 9876543210',
            email: 'info@phoenixevents.com'
        },
        tags: ['music', 'festival', 'outdoor'],
        status: 'upcoming',
        featured: true
    },
    {
        title: 'Stand-Up Comedy Night',
        description: 'An evening of laughter with India\'s top comedians.',
        category: 'Comedy',
        image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca',
        venue: {
            name: 'Comedy Club',
            address: '456 Park Avenue',
            city: 'Bangalore',
            state: 'Karnataka',
            capacity: 500
        },
        date: new Date('2025-05-20'),
        time: '20:00',
        duration: '3 hours',
        pricing: [
            { category: 'VIP', price: 2000, availableSeats: 50 },
            { category: 'Premium', price: 1200, availableSeats: 150 },
            { category: 'Standard', price: 800, availableSeats: 300 }
        ],
        organizer: {
            name: 'Laugh Factory',
            contact: '+91 9876543211',
            email: 'info@laughfactory.com'
        },
        tags: ['comedy', 'standup', 'entertainment'],
        status: 'upcoming',
        featured: true
    }
];

const sampleSports = [
    {
        sportType: 'Cricket',
        matchTitle: 'IPL 2025 Final',
        teamA: {
            name: 'Mumbai Indians',
            logo: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da',
            score: 'TBD'
        },
        teamB: {
            name: 'Chennai Super Kings',
            logo: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da',
            score: 'TBD'
        },
        tournament: {
            name: 'Indian Premier League',
            season: '2025'
        },
        stadium: {
            name: 'Wankhede Stadium',
            city: 'Mumbai',
            capacity: 33000
        },
        matchDate: new Date('2025-05-30'),
        matchTime: '19:30',
        seatingCategories: [
            { name: 'VIP Box', price: 10000, availableSeats: 200, facilities: ['AC', 'Premium Food', 'Parking'] },
            { name: 'Premium', price: 5000, availableSeats: 1000, facilities: ['Good View', 'Food Court'] },
            { name: 'Upper Tier', price: 2000, availableSeats: 5000, facilities: ['Standard View'] },
            { name: 'Lower Tier', price: 3000, availableSeats: 3000, facilities: ['Close View'] }
        ],
        image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da',
        description: 'The most anticipated cricket match of the season!',
        status: 'upcoming',
        featured: true
    }
];

const sampleMovies = [
    {
        title: 'Inception',
        description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.',
        poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1',
        genre: ['Sci-Fi', 'Thriller'],
        language: 'English',
        duration: '2h 28m',
        rating: 'U/A',
        imdbRating: 8.8,
        releaseDate: new Date('2010-07-16'),
        cast: [
            { name: 'Leonardo DiCaprio', role: 'Cobb' },
            { name: 'Marion Cotillard', role: 'Mal' }
        ],
        director: 'Christopher Nolan',
        trailerUrl: 'https://youtube.com/watch?v=YoHD9XEInc0',
        theatres: [
            {
                name: 'PVR Cinemas',
                city: 'Mumbai',
                shows: [
                    {
                        time: '14:00',
                        date: new Date('2025-05-25'),
                        format: 'IMAX',
                        pricing: [
                            { seatType: 'Platinum', price: 500, availableSeats: 50 },
                            { seatType: 'Gold', price: 350, availableSeats: 100 },
                            { seatType: 'Silver', price: 200, availableSeats: 150 }
                        ]
                    },
                    {
                        time: '19:00',
                        date: new Date('2025-05-25'),
                        format: '2D',
                        pricing: [
                            { seatType: 'Platinum', price: 400, availableSeats: 50 },
                            { seatType: 'Gold', price: 300, availableSeats: 100 },
                            { seatType: 'Silver', price: 180, availableSeats: 150 }
                        ]
                    }
                ]
            }
        ],
        status: 'now_showing',
        featured: true
    }
];

const seedDatabase = async () => {
    try {
        await connectDB();

        console.log('🗑️  Clearing existing data...');
        await Event.deleteMany({});
        await Sports.deleteMany({});
        await Movie.deleteMany({});

        console.log('🌱 Seeding events...');
        await Event.insertMany(sampleEvents);

        console.log('🌱 Seeding sports matches...');
        await Sports.insertMany(sampleSports);

        console.log('🌱 Seeding movies...');
        await Movie.insertMany(sampleMovies);

        console.log('✅ Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
