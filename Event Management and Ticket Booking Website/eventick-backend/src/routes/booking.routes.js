const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { protect } = require('../middleware/auth.middleware');

// All booking routes are protected
router.post('/', protect, bookingController.createBooking);
router.get('/user/:userId', protect, bookingController.getUserBookings);
router.get('/:id', protect, bookingController.getBookingById);
router.put('/:id/payment', protect, bookingController.updatePaymentStatus);
router.put('/:id/cancel', protect, bookingController.cancelBooking);

module.exports = router;
