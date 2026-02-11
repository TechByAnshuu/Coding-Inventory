const Sports = require('../models/Sports');

// @desc    Get all sports matches
// @route   GET /api/sports
// @access  Public
exports.getAllMatches = async (req, res) => {
    try {
        const { sportType, city, search, status, featured, sort, page = 1, limit = 12 } = req.query;

        const query = {};

        if (sportType) query.sportType = sportType;
        if (city) query['stadium.city'] = city;
        if (status) query.status = status;
        if (featured) query.featured = featured === 'true';
        if (search) {
            query.$or = [
                { matchTitle: { $regex: search, $options: 'i' } },
                { 'teamA.name': { $regex: search, $options: 'i' } },
                { 'teamB.name': { $regex: search, $options: 'i' } }
            ];
        }

        let sortOption = { matchDate: 1 };
        if (sort === 'price_low') sortOption = { 'seatingCategories.price': 1 };
        if (sort === 'price_high') sortOption = { 'seatingCategories.price': -1 };
        if (sort === 'date_asc') sortOption = { matchDate: 1 };
        if (sort === 'date_desc') sortOption = { matchDate: -1 };

        const skip = (page - 1) * limit;

        const matches = await Sports.find(query)
            .sort(sortOption)
            .limit(parseInt(limit))
            .skip(skip);

        const total = await Sports.countDocuments(query);

        res.status(200).json({
            success: true,
            count: matches.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            data: { matches }
        });
    } catch (error) {
        console.error('Get matches error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching matches',
            error: error.message
        });
    }
};

// @desc    Get single match
// @route   GET /api/sports/:id
// @access  Public
exports.getMatchById = async (req, res) => {
    try {
        const match = await Sports.findById(req.params.id);

        if (!match) {
            return res.status(404).json({
                success: false,
                message: 'Match not found'
            });
        }

        res.status(200).json({
            success: true,
            data: { match }
        });
    } catch (error) {
        console.error('Get match error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching match',
            error: error.message
        });
    }
};

// @desc    Create match
// @route   POST /api/sports
// @access  Private/Admin
exports.createMatch = async (req, res) => {
    try {
        const match = await Sports.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Match created successfully',
            data: { match }
        });
    } catch (error) {
        console.error('Create match error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating match',
            error: error.message
        });
    }
};

// @desc    Update match
// @route   PUT /api/sports/:id
// @access  Private/Admin
exports.updateMatch = async (req, res) => {
    try {
        const match = await Sports.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!match) {
            return res.status(404).json({
                success: false,
                message: 'Match not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Match updated successfully',
            data: { match }
        });
    } catch (error) {
        console.error('Update match error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating match',
            error: error.message
        });
    }
};

// @desc    Delete match
// @route   DELETE /api/sports/:id
// @access  Private/Admin
exports.deleteMatch = async (req, res) => {
    try {
        const match = await Sports.findByIdAndDelete(req.params.id);

        if (!match) {
            return res.status(404).json({
                success: false,
                message: 'Match not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Match deleted successfully'
        });
    } catch (error) {
        console.error('Delete match error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting match',
            error: error.message
        });
    }
};
