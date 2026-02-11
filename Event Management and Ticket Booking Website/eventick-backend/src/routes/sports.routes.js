const express = require('express');
const router = express.Router();
const sportsController = require('../controllers/sportsController');
const { protect, authorize } = require('../middleware/auth.middleware');

// Public routes
router.get('/', sportsController.getAllMatches);
router.get('/:id', sportsController.getMatchById);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), sportsController.createMatch);
router.put('/:id', protect, authorize('admin'), sportsController.updateMatch);
router.delete('/:id', protect, authorize('admin'), sportsController.deleteMatch);

module.exports = router;
