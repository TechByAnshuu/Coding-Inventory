const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { protect, authorize } = require('../middleware/auth.middleware');

// Public routes
router.get('/', movieController.getAllMovies);
router.get('/now-showing', movieController.getNowShowing);
router.get('/upcoming', movieController.getUpcoming);
router.get('/:id', movieController.getMovieById);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), movieController.createMovie);
router.put('/:id', protect, authorize('admin'), movieController.updateMovie);
router.delete('/:id', protect, authorize('admin'), movieController.deleteMovie);

module.exports = router;
