import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Star, Heart, Users } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

const SportsCard = ({ match }) => {
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
                    src={match.image || '/placeholder-sports.jpg'}
                    alt={match.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=Sports+Match';
                    }}
                />

                {/* Sport Category Badge */}
                <div className="absolute top-3 left-3 z-20">
                    <span className="px-3 py-1 bg-dark-900/80 backdrop-blur-sm border border-primary-500/50 text-primary-400 rounded-full text-xs font-medium uppercase">
                        {match.sport}
                    </span>
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 right-3 z-20">
                    {getStatusBadge(match.status)}
                </div>

                {/* Favorite Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsFavorite(!isFavorite);
                    }}
                    className="absolute bottom-3 right-3 z-20 w-9 h-9 bg-dark-900/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10 hover:border-primary-500/50 transition-all"
                >
                    <Heart
                        className={`w-4 h-4 transition-all ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'
                            }`}
                    />
                </motion.button>
            </div>

            {/* Content */}
            <div className="p-5 flex-grow flex flex-col">
                {/* Teams Section */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        {/* Team A */}
                        <div className="flex items-center gap-2 flex-1">
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                style={{ backgroundColor: match.teamA.color }}
                            >
                                {match.teamA.shortName}
                            </div>
                            <span className="font-semibold text-white text-sm truncate">
                                {match.teamA.name}
                            </span>
                        </div>

                        {/* VS */}
                        <div className="px-3">
                            <span className="text-primary-400 font-bold text-sm">VS</span>
                        </div>

                        {/* Team B */}
                        <div className="flex items-center gap-2 flex-1 justify-end">
                            <span className="font-semibold text-white text-sm truncate">
                                {match.teamB.name}
                            </span>
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                style={{ backgroundColor: match.teamB.color }}
                            >
                                {match.teamB.shortName}
                            </div>
                        </div>
                    </div>

                    {/* League/Tournament */}
                    {match.league && (
                        <div className="text-center">
                            <span className="text-xs text-gray-400">{match.league}</span>
                        </div>
                    )}
                </div>

                {/* Match Title */}
                <h3 className="text-base sm:text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-primary-400 transition-colors">
                    {match.title}
                </h3>

                {/* Meta Info */}
                <div className="space-y-2 mb-4 flex-grow">
                    <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="w-4 h-4 mr-2 text-primary-400 flex-shrink-0" />
                        <span className="truncate">{formatDate(match.date)} • {match.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                        <MapPin className="w-4 h-4 mr-2 text-primary-400 flex-shrink-0" />
                        <span className="truncate">{match.venue}, {match.city}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                        <Star className="w-4 h-4 mr-2 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                        <span>{match.rating} ({match.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                        <Users className="w-4 h-4 mr-2 text-primary-400 flex-shrink-0" />
                        <span>Capacity: {match.stadium.capacity.toLocaleString()}</span>
                    </div>
                </div>

                {/* Price and Actions */}
                <div className="mt-auto">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <span className="text-xl font-bold text-white">₹{match.pricing.general}</span>
                            <span className="text-xs text-gray-400 ml-1">onwards</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <Button
                            variant="primary"
                            size="sm"
                            className="flex-1 text-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/sports/booking/${match.id}`);
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
                                navigate(`/sports/${match.id}`);
                            }}
                        >
                            Details
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default SportsCard;
