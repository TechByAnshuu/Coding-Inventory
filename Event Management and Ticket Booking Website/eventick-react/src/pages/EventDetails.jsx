import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Calendar,
    Clock,
    MapPin,
    Star,
    Users,
    Share2,
    Heart,
    Tag,
} from 'lucide-react';
import { eventService } from '../services/eventService';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import EventCard from '../components/events/EventCard';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [similarEvents, setSimilarEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        loadEventDetails();
    }, [id]);

    const loadEventDetails = async () => {
        setLoading(true);
        try {
            const eventData = await eventService.getEventById(id);
            setEvent(eventData);

            const similar = await eventService.getSimilarEvents(id);
            setSimilarEvents(similar);
        } catch (error) {
            console.error('Error loading event details:', error);
            navigate('/404');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: event.title,
                text: event.description,
                url: window.location.href,
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (!event) {
        return null;
    }

    return (
        <div className="min-h-screen pt-20 pb-20">
            {/* Hero Image */}
            <div className="relative h-96 md:h-[500px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/70 to-dark-900/30 z-10" />
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/1200x600?text=Event+Image';
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card className="p-8 mb-8">
                            {/* Category Badge */}
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-4 py-2 bg-primary-500/20 border border-primary-500/30 text-primary-400 rounded-full text-sm font-medium">
                                    {event.category}
                                </span>
                                {event.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-white/5 border border-white/10 text-gray-400 rounded-full text-xs"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                {event.title}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center gap-6 mb-6">
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                    <span className="text-white font-semibold">{event.rating}</span>
                                    <span className="text-gray-400">({event.reviews} reviews)</span>
                                </div>
                                <div className="flex gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setIsFavorite(!isFavorite)}
                                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <Heart
                                            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                                                }`}
                                        />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={handleShare}
                                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <Share2 className="w-5 h-5 text-gray-400" />
                                    </motion.button>
                                </div>
                            </div>

                            {/* Event Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 pb-8 border-b border-white/10">
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-5 h-5 text-primary-400 mt-1" />
                                    <div>
                                        <div className="text-gray-400 text-sm">Date</div>
                                        <div className="text-white font-medium">{formatDate(event.date)}</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock className="w-5 h-5 text-primary-400 mt-1" />
                                    <div>
                                        <div className="text-gray-400 text-sm">Time</div>
                                        <div className="text-white font-medium">{event.time} • {event.duration}</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-primary-400 mt-1" />
                                    <div>
                                        <div className="text-gray-400 text-sm">Venue</div>
                                        <div className="text-white font-medium">{event.venue}</div>
                                        <div className="text-gray-400 text-sm">{event.city}</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Users className="w-5 h-5 text-primary-400 mt-1" />
                                    <div>
                                        <div className="text-gray-400 text-sm">Availability</div>
                                        <div className="text-white font-medium">
                                            {event.availableSeats} / {event.totalSeats} seats
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-4">About This Event</h2>
                                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                    {event.description}
                                </p>
                            </div>
                        </Card>

                        {/* Similar Events */}
                        {similarEvents.length > 0 && (
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-6">
                                    Similar <span className="gradient-text">Events</span>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {similarEvents.map((similarEvent) => (
                                        <EventCard key={similarEvent.id} event={similarEvent} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 sticky top-24">
                            <div className="mb-6">
                                <div className="text-gray-400 text-sm mb-2">Starting from</div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-white">₹{event.price}</span>
                                    {event.maxPrice > event.price && (
                                        <span className="text-gray-400">- ₹{event.maxPrice}</span>
                                    )}
                                </div>
                            </div>

                            {event.status === 'selling-fast' && (
                                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                                    <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
                                        <Tag className="w-4 h-4" />
                                        <span>Selling Fast - Book Now!</span>
                                    </div>
                                </div>
                            )}

                            {event.status === 'few-seats' && (
                                <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                                    <div className="flex items-center gap-2 text-amber-400 text-sm font-medium">
                                        <Users className="w-4 h-4" />
                                        <span>Only {event.availableSeats} seats left!</span>
                                    </div>
                                </div>
                            )}

                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full mb-3"
                                onClick={() => navigate(`/booking/${event.id}`)}
                            >
                                Book Tickets
                            </Button>

                            <div className="text-center text-sm text-gray-400">
                                Free cancellation available
                            </div>

                            {/* Quick Info */}
                            <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Category</span>
                                    <span className="text-white font-medium">{event.category}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Duration</span>
                                    <span className="text-white font-medium">{event.duration}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Language</span>
                                    <span className="text-white font-medium">English/Hindi</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
