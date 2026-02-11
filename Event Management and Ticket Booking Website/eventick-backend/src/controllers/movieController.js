const Movie = require('../models/Movie');

// @desc    Get all movies
// @route   GET /api/movies
// @access  Public
exports.getAllMovies = async (req, res) => {
    try {
        const { genre, language, city, search, status, featured, sort, page = 1, limit = 12 } = req.query;

        const query = {};

        if (genre) query.genre = genre;
        if (language) query.language = language;
        if (city) query['theatres.city'] = city;
        if (status) query.status = status;
        if (featured) query.featured = featured === 'true';
        if (search) {
            query.$text = { $search: search };
        }

        let sortOption = { releaseDate: -1 };
        if (sort === 'rating_high') sortOption = { imdbRating: -1 };
        if (sort === 'rating_low') sortOption = { imdbRating: 1 };
        if (sort === 'title_asc') sortOption = { title: 1 };
        if (sort === 'title_desc') sortOption = { title: -1 };

        const skip = (page - 1) * limit;

        const movies = await Movie.find(query)
            .sort(sortOption)
            .limit(parseInt(limit))
            .skip(skip);

        const total = await Movie.countDocuments(query);

        res.status(200).json({
            success: true,
            count: movies.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            data: { movies }
        });
    } catch (error) {
        console.error('Get movies error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching movies',
            error: error.message
        });
    }
};

// @desc    Get single movie
// @route   GET /api/movies/:id
// @access  Public
exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: 'Movie not found'
            });
        }

        res.status(200).json({
            success: true,
            data: { movie }
        });
    } catch (error) {
        console.error('Get movie error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching movie',
            error: error.message
        });
    }
};

// @desc    Create movie
// @route   POST /api/movies
// @access  Private/Admin
exports.createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Movie created successfully',
            data: { movie }
        });
    } catch (error) {
        console.error('Create movie error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating movie',
            error: error.message
        });
    }
};

// @desc    Update movie
// @route   PUT /api/movies/:id
// @access  Private/Admin
exports.updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: 'Movie not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Movie updated successfully',
            data: { movie }
        });
    } catch (error) {
        console.error('Update movie error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating movie',
            error: error.message
        });
    }
};

// @desc    Delete movie
// @route   DELETE /api/movies/:id
// @access  Private/Admin
exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: 'Movie not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Movie deleted successfully'
        });
    } catch (error) {
        console.error('Delete movie error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting movie',
            error: error.message
        });
    }
};

// @desc    Get now showing movies
// @route   GET /api/movies/now-showing
// @access  Public
exports.getNowShowing = async (req, res) => {
    try {
        const movies = await Movie.find({ status: 'now_showing' })
            .sort({ releaseDate: -1 })
            .limit(12);

        res.status(200).json({
            success: true,
            count: movies.length,
            data: { movies }
        });
    } catch (error) {
        console.error('Get now showing error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching now showing movies',
            error: error.message
        });
    }
};

// @desc    Get upcoming movies
// @route   GET /api/movies/upcoming
// @access  Public
exports.getUpcoming = async (req, res) => {
    try {
        const movies = await Movie.find({ status: 'upcoming' })
            .sort({ releaseDate: 1 })
            .limit(12);

        res.status(200).json({
            success: true,
            count: movies.length,
            data: { movies }
        });
    } catch (error) {
        console.error('Get upcoming error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching upcoming movies',
            error: error.message
        });
    }
};
