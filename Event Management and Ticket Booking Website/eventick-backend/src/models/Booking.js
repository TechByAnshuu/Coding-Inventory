const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    bookingType: {
        type: String,
        enum: ['event', 'sports', 'movie'],
        required: [true, 'Booking type is required']
    },
    // Reference to the booked item (Event, Sports, or Movie)
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Item ID is required'],
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Event', 'Sports', 'Movie']
    },
    // Booking details
    bookingDetails: {
        // For Events
        eventCategory: String,

        // For Sports
        matchTitle: String,
        stadium: String,

        // For Movies
        movieTitle: String,
        theatre: String,
        showTime: String,
        showDate: Date,
        format: String, // 2D, 3D, IMAX, 4DX
    },
    // Seat information
    seats: [{
        seatNumber: String,
        seatType: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        }
    }],
    // Pricing
    totalSeats: {
        type: Number,
        required: [true, 'Total seats is required'],
        min: 1
    },
    subtotal: {
        type: Number,
        required: true,
        min: 0
    },
    convenienceFee: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    // Payment information
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'upi', 'netbanking', 'wallet'],
        required: true
    },
    paymentId: String,
    transactionId: String,
    // Booking status
    bookingStatus: {
        type: String,
        enum: ['confirmed', 'cancelled', 'pending'],
        default: 'pending'
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    // QR code for ticket verification
    qrCode: String,
    // Cancellation
    cancellationReason: String,
    cancelledAt: Date,
    refundAmount: Number,
    refundStatus: {
        type: String,
        enum: ['not_applicable', 'pending', 'processed'],
        default: 'not_applicable'
    }
}, {
    timestamps: true
});

// Indexes
bookingSchema.index({ user: 1, bookingDate: -1 });
bookingSchema.index({ bookingType: 1, itemId: 1 });
bookingSchema.index({ bookingStatus: 1, paymentStatus: 1 });
bookingSchema.index({ transactionId: 1 });

// Pre-save hook to calculate total amount
bookingSchema.pre('save', function (next) {
    if (this.isModified('subtotal') || this.isModified('convenienceFee') || this.isModified('tax')) {
        this.totalAmount = this.subtotal + this.convenienceFee + this.tax;
    }
    next();
});

module.exports = mongoose.model('Booking', bookingSchema);
