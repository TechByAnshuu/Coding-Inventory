const Booking = require('../models/Booking');
const Event = require('../models/Event');
const Sports = require('../models/Sports');
const Movie = require('../models/Movie');

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
    try {
        const {
            bookingType,
            itemId,
            seats,
            bookingDetails,
            paymentMethod,
            convenienceFee = 50,
            tax = 0
        } = req.body;

        // Validate booking type and item exists
        let item;
        let onModel;

        if (bookingType === 'event') {
            item = await Event.findById(itemId);
            onModel = 'Event';
        } else if (bookingType === 'sports') {
            item = await Sports.findById(itemId);
            onModel = 'Sports';
        } else if (bookingType === 'movie') {
            item = await Movie.findById(itemId);
            onModel = 'Movie';
        }

        if (!item) {
            return res.status(404).json({
                success: false,
                message: `${bookingType} not found`
            });
        }

        // Calculate pricing
        const subtotal = seats.reduce((sum, seat) => sum + seat.price, 0);
        const taxAmount = (subtotal * 0.18); // 18% GST
        const totalAmount = subtotal + convenienceFee + taxAmount;

        // Create booking
        const booking = await Booking.create({
            user: req.user.id,
            bookingType,
            itemId,
            onModel,
            bookingDetails,
            seats,
            totalSeats: seats.length,
            subtotal,
            convenienceFee,
            tax: taxAmount,
            totalAmount,
            paymentMethod,
            bookingStatus: 'pending',
            paymentStatus: 'pending'
        });

        // Update item's total bookings
        item.totalBookings += seats.length;
        await item.save();

        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: { booking }
        });
    } catch (error) {
        console.error('Create booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating booking',
            error: error.message
        });
    }
};

// @desc    Get user bookings
// @route   GET /api/bookings/user/:userId
// @access  Private
exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Ensure user can only access their own bookings
        if (req.user.id !== userId && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access these bookings'
            });
        }

        const bookings = await Booking.find({ user: userId })
            .sort({ bookingDate: -1 })
            .populate('itemId');

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: { bookings }
        });
    } catch (error) {
        console.error('Get user bookings error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching bookings',
            error: error.message
        });
    }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('user', 'name email phone')
            .populate('itemId');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Ensure user can only access their own bookings
        if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this booking'
            });
        }

        res.status(200).json({
            success: true,
            data: { booking }
        });
    } catch (error) {
        console.error('Get booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching booking',
            error: error.message
        });
    }
};

// @desc    Update booking payment status
// @route   PUT /api/bookings/:id/payment
// @access  Private
exports.updatePaymentStatus = async (req, res) => {
    try {
        const { paymentStatus, paymentId, transactionId } = req.body;

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        booking.paymentStatus = paymentStatus;
        booking.paymentId = paymentId;
        booking.transactionId = transactionId;

        if (paymentStatus === 'completed') {
            booking.bookingStatus = 'confirmed';
        }

        await booking.save();

        res.status(200).json({
            success: true,
            message: 'Payment status updated',
            data: { booking }
        });
    } catch (error) {
        console.error('Update payment error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating payment status',
            error: error.message
        });
    }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = async (req, res) => {
    try {
        const { cancellationReason } = req.body;

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Ensure user can only cancel their own bookings
        if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to cancel this booking'
            });
        }

        booking.bookingStatus = 'cancelled';
        booking.cancellationReason = cancellationReason;
        booking.cancelledAt = new Date();
        booking.refundStatus = 'pending';
        booking.refundAmount = booking.totalAmount * 0.8; // 80% refund

        await booking.save();

        res.status(200).json({
            success: true,
            message: 'Booking cancelled successfully',
            data: { booking }
        });
    } catch (error) {
        console.error('Cancel booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Error cancelling booking',
            error: error.message
        });
    }
};
