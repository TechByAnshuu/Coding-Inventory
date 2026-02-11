const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Event title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Event description is required'],
        maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    category: {
        type: String,
        required: [true, 'Event category is required'],
        enum: ['Music', 'Comedy', 'Sports', 'Arts', 'Technology', 'Food', 'Other']
    },
    image: {
        type: String,
        required: [true, 'Event image is required']
    },
    venue: {
        name: {
            type: String,
            required: [true, 'Venue name is required']
        },
        address: {
            type: String,
            required: [true, 'Venue address is required']
        },
        city: {
            type: String,
            required: [true, 'City is required']
        },
        state: String,
        country: {
            type: String,
            default: 'India'
        },
        capacity: {
            type: Number,
            required: [true, 'Venue capacity is required']
        }
    },
    date: {
        type: Date,
        required: [true, 'Event date is required']
    },
    time: {
        type: String,
        required: [true, 'Event time is required']
    },
    duration: {
        type: String,
        default: '2 hours'
    },
    pricing: [{
        category: {
            type: String,
            required: true,
            enum: ['VIP', 'Premium', 'Standard', 'General']
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
    }],
    organizer: {
        name: {
            type: String,
            required: [true, 'Organizer name is required']
        },
        contact: String,
        email: String
    },
    tags: [String],
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
        default: 'upcoming'
    },
    featured: {
        type: Boolean,
        default: false
    },
    totalBookings: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// Index for search and filtering
eventSchema.index({ title: 'text', description: 'text' });
eventSchema.index({ category: 1, date: 1 });
eventSchema.index({ 'venue.city': 1 });
eventSchema.index({ status: 1, featured: -1 });

module.exports = mongoose.model('Event', eventSchema);
