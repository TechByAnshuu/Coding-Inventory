import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Calendar, Heart } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

const EventCard = ({ event }) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

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

    return (
        <Card className="overflow-hidden group cursor-pointer h-full flex flex-col">
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
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
                <div className="absolute top-3 left-3 z-20">
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
                        setIsFavorite(!isFavorite);
                    }}
                    className="absolute top-3 right-3 z-20 w-9 h-9 bg-dark-900/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10 hover:border-primary-500/50 transition-all"
                >
                    <Heart
                        className={`w-4 h-4 transition-all ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'
                            }`}
                    />
                </motion.button>
            </div>

            {/* Content */}
            <div className="p-5 flex-grow flex flex-col">
                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary-400 transition-colors line-clamp-2">
                    {event.title}
                </h3>

                {/* Meta Info */}
                <div className="space-y-2 mb-4 flex-grow">
                    <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="w-4 h-4 mr-2 text-primary-400 flex-shrink-0" />
                        <span className="truncate">{formatDate(event.date)} • {event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                        <MapPin className="w-4 h-4 mr-2 text-primary-400 flex-shrink-0" />
                        <span className="truncate">{event.venue}, {event.city}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                        <Star className="w-4 h-4 mr-2 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                        <span>{event.rating} ({event.reviews} reviews)</span>
                    </div>
                </div>

                {/* Price and Status */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <span className="text-xl font-bold text-white">₹{event.price}</span>
                        {event.maxPrice > event.price && (
                            <span className="text-xs text-gray-400 ml-1">onwards</span>
                        )}
                    </div>
                    {getStatusBadge(event.status)}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <Button
                        variant="primary"
                        size="sm"
                        className="flex-1 text-sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/booking/${event.id}`);
                        }}
                    >
                        Book Now
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/events/${event.id}`);
                        }}
                    >
                        Details
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default EventCard;
