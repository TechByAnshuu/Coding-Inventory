const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { protect, authorize } = require('../middleware/auth.middleware');

// Public routes
router.get('/', eventController.getAllEvents);
router.get('/featured', eventController.getFeaturedEvents);
router.get('/:id', eventController.getEventById);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), eventController.createEvent);
router.put('/:id', protect, authorize('admin'), eventController.updateEvent);
router.delete('/:id', protect, authorize('admin'), eventController.deleteEvent);

module.exports = router;
