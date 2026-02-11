const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getAllEvents = async (req, res) => {
    try {
        const { category, city, search, status, featured, sort, page = 1, limit = 12 } = req.query;

        // Build query
        const query = {};

        if (category) query.category = category;
        if (city) query['venue.city'] = city;
        if (status) query.status = status;
        if (featured) query.featured = featured === 'true';
        if (search) {
            query.$text = { $search: search };
        }

        // Sorting
        let sortOption = { date: 1 }; // Default: upcoming first
        if (sort === 'price_low') sortOption = { 'pricing.price': 1 };
        if (sort === 'price_high') sortOption = { 'pricing.price': -1 };
        if (sort === 'date_asc') sortOption = { date: 1 };
        if (sort === 'date_desc') sortOption = { date: -1 };

        // Pagination
        const skip = (page - 1) * limit;

        const events = await Event.find(query)
            .sort(sortOption)
            .limit(parseInt(limit))
            .skip(skip)
            .populate('createdBy', 'name email');

        const total = await Event.countDocuments(query);

        res.status(200).json({
            success: true,
            count: events.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            data: { events }
        });
    } catch (error) {
        console.error('Get events error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching events',
            error: error.message
        });
    }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('createdBy', 'name email');

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        res.status(200).json({
            success: true,
            data: { event }
        });
    } catch (error) {
        console.error('Get event error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching event',
            error: error.message
        });
    }
};

// @desc    Create event
// @route   POST /api/events
// @access  Private/Admin
exports.createEvent = async (req, res) => {
    try {
        const eventData = {
            ...req.body,
            createdBy: req.user.id
        };

        const event = await Event.create(eventData);

        res.status(201).json({
            success: true,
            message: 'Event created successfully',
            data: { event }
        });
    } catch (error) {
        console.error('Create event error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating event',
            error: error.message
        });
    }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private/Admin
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Event updated successfully',
            data: { event }
        });
    } catch (error) {
        console.error('Update event error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating event',
            error: error.message
        });
    }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/Admin
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Event deleted successfully'
        });
    } catch (error) {
        console.error('Delete event error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting event',
            error: error.message
        });
    }
};

// @desc    Get featured events
// @route   GET /api/events/featured
// @access  Public
exports.getFeaturedEvents = async (req, res) => {
    try {
        const events = await Event.find({ featured: true, status: 'upcoming' })
            .sort({ date: 1 })
            .limit(6);

        res.status(200).json({
            success: true,
            count: events.length,
            data: { events }
        });
    } catch (error) {
        console.error('Get featured events error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching featured events',
            error: error.message
        });
    }
};
