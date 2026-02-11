const mongoose = require('mongoose');

const sportsSchema = new mongoose.Schema({
    sportType: {
        type: String,
        required: [true, 'Sport type is required'],
        enum: ['Cricket', 'Football', 'Badminton', 'Tennis', 'Basketball', 'Esports', 'Other']
    },
    matchTitle: {
        type: String,
        required: [true, 'Match title is required'],
        trim: true
    },
    teamA: {
        name: {
            type: String,
            required: [true, 'Team A name is required']
        },
        logo: String,
        score: String
    },
    teamB: {
        name: {
            type: String,
            required: [true, 'Team B name is required']
        },
        logo: String,
        score: String
    },
    tournament: {
        name: String,
        season: String
    },
    stadium: {
        name: {
            type: String,
            required: [true, 'Stadium name is required']
        },
        city: {
            type: String,
            required: [true, 'City is required']
        },
        capacity: {
            type: Number,
            required: true
        },
        layout: {
            type: Map,
            of: mongoose.Schema.Types.Mixed
        }
    },
    matchDate: {
        type: Date,
        required: [true, 'Match date is required']
    },
    matchTime: {
        type: String,
        required: [true, 'Match time is required']
    },
    seatingCategories: [{
        name: {
            type: String,
            required: true,
            enum: ['VIP Box', 'Premium', 'Upper Tier', 'Lower Tier', 'General']
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        availableSeats: {
            type: Number,
            required: true,
            min: 0
        },
        facilities: [String]
    }],
    image: String,
    description: String,
    status: {
        type: String,
        enum: ['upcoming', 'live', 'completed', 'cancelled'],
        default: 'upcoming'
    },
    featured: {
        type: Boolean,
        default: false
    },
    totalBookings: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Indexes
sportsSchema.index({ sportType: 1, matchDate: 1 });
sportsSchema.index({ 'stadium.city': 1 });
sportsSchema.index({ status: 1, featured: -1 });

module.exports = mongoose.model('Sports', sportsSchema);
