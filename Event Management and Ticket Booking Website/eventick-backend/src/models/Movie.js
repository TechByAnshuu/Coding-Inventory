const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Movie title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Movie description is required'],
        maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    poster: {
        type: String,
        required: [true, 'Movie poster is required']
    },
    genre: [{
        type: String,
        enum: ['Action', 'Drama', 'Comedy', 'Thriller', 'Horror', 'Romance', 'Sci-Fi', 'Fantasy', 'Animation', 'Documentary']
    }],
    language: {
        type: String,
        required: [true, 'Language is required'],
        enum: ['English', 'Hindi', 'Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Bengali', 'Marathi']
    },
    duration: {
        type: String,
        required: [true, 'Duration is required']
    },
    rating: {
        type: String,
        enum: ['U', 'U/A', 'A', 'R'],
        required: true
    },
    imdbRating: {
        type: Number,
        min: 0,
        max: 10
    },
    releaseDate: {
        type: Date,
        required: [true, 'Release date is required']
    },
    cast: [{
        name: String,
        role: String,
        image: String
    }],
    director: String,
    trailerUrl: String,
    theatres: [{
        name: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        shows: [{
            time: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true
            },
            format: {
                type: String,
                enum: ['2D', '3D', 'IMAX', '4DX'],
                default: '2D'
            },
            pricing: [{
                seatType: {
                    type: String,
                    enum: ['Platinum', 'Gold', 'Silver'],
                    required: true
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
                }
            }]
        }]
    }],
    status: {
        type: String,
        enum: ['now_showing', 'upcoming', 'ended'],
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
movieSchema.index({ title: 'text', description: 'text' });
movieSchema.index({ genre: 1, language: 1 });
movieSchema.index({ status: 1, releaseDate: -1 });
movieSchema.index({ 'theatres.city': 1 });

module.exports = mongoose.model('Movie', movieSchema);
