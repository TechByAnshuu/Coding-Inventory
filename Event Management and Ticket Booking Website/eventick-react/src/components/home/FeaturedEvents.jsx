import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Calendar, Heart } from 'lucide-react';
import { eventService } from '../../services/eventService';
import Card from '../common/Card';
import Button from '../common/Button';

const FeaturedEvents = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        loadFeaturedEvents();
    }, []);

    const loadFeaturedEvents = async () => {
        try {
            const data = await eventService.getFeaturedEvents();
            setEvents(data);
        } catch (error) {
            console.error('Error loading featured events:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = (eventId) => {
        setFavorites(prev =>
            prev.includes(eventId)
                ? prev.filter(id => id !== eventId)
                : [...prev, eventId]
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getStatusBadge = (status) => {
        const badges = {
            'selling-fast': {
                text: 'Selling Fast',
                className: 'bg-red-500/20 text-red-400 border-red-500/30'
            },
            'few-seats': {
                text: 'Few Seats Left',
                className: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
            },
            'available': {
                text: 'Available',
                className: 'bg-green-500/20 text-green-400 border-green-500/30'
            }
        };

        const badge = badges[status] || badges['available'];
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${badge.className}`}>
                {badge.text}
            </span>
        );
    };

    if (loading) {
        return (
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-dark-700 rounded-xl h-80"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800/50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Featured <span className="gradient-text">Events</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Don't miss out on these amazing upcoming events
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <Card className="overflow-hidden group cursor-pointer">
                                {/* Image Container */}
                                <div className="relative h-56 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent z-10" />
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/400x300?text=Event+Image';
                                        }}
                                    />

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="px-3 py-1 bg-dark-900/80 backdrop-blur-sm border border-primary-500/50 text-primary-400 rounded-full text-xs font-medium">
                                            {event.category}
                                        </span>
                                    </div>

                                    {/* Favorite Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(event.id);
                                        }}
                                        className="absolute top-4 right-4 z-20 w-10 h-10 bg-dark-900/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10 hover:border-primary-500/50 transition-all"
                                    >
                                        <Heart
                                            className={`w-5 h-5 transition-all ${favorites.includes(event.id)
                                                    ? 'fill-red-500 text-red-500'
                                                    : 'text-white'
                                                }`}
                                        />
                                    </motion.button>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors line-clamp-2">
                                        {event.title}
                                    </h3>

                                    {/* Meta Info */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-sm text-gray-400">
                                            <Calendar className="w-4 h-4 mr-2 text-primary-400" />
                                            <span>{formatDate(event.date)} • {event.time}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-400">
                                            <MapPin className="w-4 h-4 mr-2 text-primary-400" />
                                            <span>{event.venue}, {event.city}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-400">
                                            <Star className="w-4 h-4 mr-2 text-yellow-400 fill-yellow-400" />
                                            <span>{event.rating} ({event.reviews} reviews)</span>
                                        </div>
                                    </div>

                                    {/* Price and Status */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <span className="text-2xl font-bold text-white">₹{event.price}</span>
                                            {event.maxPrice > event.price && (
                                                <span className="text-sm text-gray-400 ml-1">onwards</span>
                                            )}
                                        </div>
                                        {getStatusBadge(event.status)}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => navigate(`/booking/${event.id}`)}
                                        >
                                            Book Now
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => navigate(`/events/${event.id}`)}
                                        >
                                            Details
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => navigate('/events')}
                    >
                        View All Events
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedEvents;
