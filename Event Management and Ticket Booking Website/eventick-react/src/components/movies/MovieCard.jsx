import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Heart, Play } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    const getStatusBadge = (status) => {
        const badges = {
            'now-showing': {
                text: 'Now Showing',
                className: 'bg-green-500/20 text-green-400 border-green-500/30'
            },
            'upcoming': {
                text: 'Coming Soon',
                className: 'bg-primary-500/20 text-primary-400 border-primary-500/30'
            }
        };

        const badge = badges[status] || badges['now-showing'];
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${badge.className}`}>
                {badge.text}
            </span>
        );
    };

    return (
        <Card className="overflow-hidden group cursor-pointer h-full flex flex-col">
            {/* Poster Container - Movie aspect ratio 2:3 */}
            <div className="relative aspect-[2/3] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/30 to-transparent z-10" />
                <img
                    src={movie.poster || movie.image || '/placeholder-movie.jpg'}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x450?text=Movie+Poster';
                    }}
                />

                {/* Status Badge */}
                <div className="absolute top-3 left-3 z-20">
                    {getStatusBadge(movie.status)}
                </div>

                {/* Favorite & Trailer Buttons */}
                <div className="absolute top-3 right-3 z-20 flex gap-2">
                    {movie.trailer && (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(movie.trailer, '_blank');
                            }}
                            className="w-9 h-9 bg-dark-900/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10 hover:border-primary-500/50 transition-all"
                            title="Watch Trailer"
                        >
                            <Play className="w-4 h-4 text-white fill-white" />
                        </motion.button>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsFavorite(!isFavorite);
                        }}
                        className="w-9 h-9 bg-dark-900/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10 hover:border-primary-500/50 transition-all"
                    >
                        <Heart
                            className={`w-4 h-4 transition-all ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'
                                }`}
                        />
                    </motion.button>
                </div>

                {/* Rating Badge - Bottom Left */}
                <div className="absolute bottom-3 left-3 z-20">
                    <div className="flex items-center gap-1 px-2 py-1 bg-dark-900/90 backdrop-blur-sm rounded-lg border border-white/10">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-white text-xs font-semibold">{movie.rating}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex-grow flex flex-col">
                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
                    {movie.title}
                </h3>

                {/* Genre Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {movie.genre.slice(0, 3).map((genre) => (
                        <span
                            key={genre}
                            className="px-2 py-1 bg-white/5 border border-white/10 text-gray-400 rounded text-xs"
                        >
                            {genre}
                        </span>
                    ))}
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{movie.duration}</span>
                    </div>
                    <span>•</span>
                    <span className="px-2 py-0.5 bg-white/5 rounded text-xs">
                        {movie.certification}
                    </span>
                    <span>•</span>
                    <span>{movie.language}</span>
                </div>

                {/* Reviews */}
                <div className="text-xs text-gray-400 mb-4">
                    {movie.reviews.toLocaleString()} reviews
                </div>

                {/* Action Buttons */}
                <div className="mt-auto flex gap-2">
                    {movie.status === 'now-showing' ? (
                        <>
                            <Button
                                variant="primary"
                                size="sm"
                                className="flex-1 text-sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/movies/booking/${movie.id}`);
                                }}
                            >
                                Book Tickets
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 text-sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/movies/${movie.id}`);
                                }}
                            >
                                Details
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/movies/${movie.id}`);
                            }}
                        >
                            View Details
                        </Button>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default MovieCard;
