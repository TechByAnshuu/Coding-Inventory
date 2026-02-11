const socketIO = require('socket.io');

let io;
const seatLocks = new Map(); // Store seat locks: key = `${eventId}:${seatId}`, value = { userId, expiresAt }

/**
 * Initialize WebSocket server
 * @param {Object} server - HTTP server instance
 * @returns {Object} Socket.IO instance
 */
const initializeWebSocket = (server) => {
    if (!process.env.WEBSOCKET_ENABLED || process.env.WEBSOCKET_ENABLED === 'false') {
        console.log('⚠️  WebSocket disabled');
        return null;
    }

    io = socketIO(server, {
        cors: {
            origin: process.env.FRONTEND_URL || 'http://localhost:5173',
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log(`✅ Client connected: ${socket.id}`);

        // Handle seat locking
        socket.on('lock-seat', handleSeatLock(socket));

        // Handle seat release
        socket.on('release-seat', handleSeatRelease(socket));

        // Join event room for real-time updates
        socket.on('join-event', (eventId) => {
            socket.join(`event:${eventId}`);
            console.log(`User ${socket.id} joined event room: ${eventId}`);
        });

        // Leave event room
        socket.on('leave-event', (eventId) => {
            socket.leave(`event:${eventId}`);
            console.log(`User ${socket.id} left event room: ${eventId}`);
        });

        // Admin dashboard - join admin room
        socket.on('join-admin', () => {
            socket.join('admin');
            console.log(`Admin ${socket.id} joined admin room`);
        });

        // Disconnect
        socket.on('disconnect', () => {
            console.log(`❌ Client disconnected: ${socket.id}`);
            // Release all seats locked by this user
            releaseUserSeats(socket.id);
        });
    });

    // Cleanup expired seat locks every 30 seconds
    setInterval(cleanupExpiredLocks, 30000);

    console.log('✅ WebSocket server initialized');
    return io;
};

/**
 * Handle seat locking
 */
const handleSeatLock = (socket) => {
    return async (data) => {
        const { eventId, seatId, userId } = data;

        if (!eventId || !seatId || !userId) {
            socket.emit('error', { message: 'Invalid seat lock request' });
            return;
        }

        const lockKey = `${eventId}:${seatId}`;
        const existingLock = seatLocks.get(lockKey);

        // Check if seat is already locked by someone else
        if (existingLock && existingLock.userId !== userId) {
            if (Date.now() < existingLock.expiresAt) {
                socket.emit('seat-lock-failed', {
                    eventId,
                    seatId,
                    message: 'Seat is already locked by another user',
                    expiresAt: existingLock.expiresAt
                });
                return;
            }
        }

        // Lock the seat
        const lockDuration = parseInt(process.env.SEAT_LOCK_DURATION) || 300000; // 5 minutes
        const expiresAt = Date.now() + lockDuration;

        seatLocks.set(lockKey, {
            userId,
            socketId: socket.id,
            expiresAt
        });

        // Notify the user
        socket.emit('seat-locked', {
            eventId,
            seatId,
            expiresAt
        });

        // Broadcast to others in the event room
        socket.to(`event:${eventId}`).emit('seat-unavailable', {
            eventId,
            seatId,
            lockedBy: userId
        });

        console.log(`Seat locked: ${lockKey} by user ${userId}`);
    };
};

/**
 * Handle seat release
 */
const handleSeatRelease = (socket) => {
    return async (data) => {
        const { eventId, seatId, userId } = data;

        if (!eventId || !seatId) {
            socket.emit('error', { message: 'Invalid seat release request' });
            return;
        }

        const lockKey = `${eventId}:${seatId}`;
        const existingLock = seatLocks.get(lockKey);

        // Verify ownership
        if (existingLock && (existingLock.userId === userId || existingLock.socketId === socket.id)) {
            seatLocks.delete(lockKey);

            // Notify the user
            socket.emit('seat-released', {
                eventId,
                seatId
            });

            // Broadcast to others in the event room
            socket.to(`event:${eventId}`).emit('seat-available', {
                eventId,
                seatId
            });

            console.log(`Seat released: ${lockKey}`);
        }
    };
};

/**
 * Release all seats locked by a specific socket
 */
const releaseUserSeats = (socketId) => {
    for (const [lockKey, lock] of seatLocks.entries()) {
        if (lock.socketId === socketId) {
            const [eventId, seatId] = lockKey.split(':');
            seatLocks.delete(lockKey);

            // Broadcast seat availability
            if (io) {
                io.to(`event:${eventId}`).emit('seat-available', {
                    eventId,
                    seatId
                });
            }

            console.log(`Auto-released seat: ${lockKey} (user disconnected)`);
        }
    }
};

/**
 * Cleanup expired seat locks
 */
const cleanupExpiredLocks = () => {
    const now = Date.now();
    let cleanedCount = 0;

    for (const [lockKey, lock] of seatLocks.entries()) {
        if (now > lock.expiresAt) {
            const [eventId, seatId] = lockKey.split(':');
            seatLocks.delete(lockKey);

            // Broadcast seat availability
            if (io) {
                io.to(`event:${eventId}`).emit('seat-available', {
                    eventId,
                    seatId
                });
            }

            cleanedCount++;
        }
    }

    if (cleanedCount > 0) {
        console.log(`🧹 Cleaned up ${cleanedCount} expired seat locks`);
    }
};

/**
 * Broadcast seat availability update
 */
const broadcastSeatAvailability = (eventId, availableSeats) => {
    if (io) {
        io.to(`event:${eventId}`).emit('seats-updated', {
            eventId,
            availableSeats
        });
    }
};

/**
 * Broadcast booking notification to admin
 */
const notifyAdminNewBooking = (booking) => {
    if (io) {
        io.to('admin').emit('new-booking', {
            bookingId: booking._id,
            userId: booking.user,
            type: booking.bookingType,
            amount: booking.totalAmount,
            timestamp: new Date()
        });
    }
};

/**
 * Broadcast payment notification to admin
 */
const notifyAdminPayment = (payment) => {
    if (io) {
        io.to('admin').emit('new-payment', {
            transactionId: payment.transactionId,
            amount: payment.amount,
            status: payment.status,
            timestamp: new Date()
        });
    }
};

/**
 * Get Socket.IO instance
 */
const getIO = () => {
    if (!io) {
        throw new Error('WebSocket not initialized');
    }
    return io;
};

module.exports = {
    initializeWebSocket,
    broadcastSeatAvailability,
    notifyAdminNewBooking,
    notifyAdminPayment,
    getIO
};
