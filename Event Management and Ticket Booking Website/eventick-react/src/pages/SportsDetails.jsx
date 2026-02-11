import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Calendar, MapPin, Star, Heart, Share2, Users,
    Trophy, Clock, Tag, ArrowLeft, ExternalLink
} from 'lucide-react';
import { sportsService } from '../services/sportsService';
import SportsCard from '../components/sports/SportsCard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const SportsDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [match, setMatch] = useState(null);
    const [similarMatches, setSimilarMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        loadMatchDetails();
    }, [id]);

    const loadMatchDetails = async () => {
        setLoading(true);
        try {
            const data = await sportsService.getMatchById(id);
            setMatch(data);

            const similar = await sportsService.getSimilarMatches(id, 3);
            setSimilarMatches(similar);
        } catch (error) {
            console.error('Error loading match details:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: match.title,
                    text: `Check out this match: ${match.title}`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="bg-dark-700 h-96 rounded-xl mb-8"></div>
                        <div className="bg-dark-700 h-64 rounded-xl"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!match) {
        return (
            <div className="min-h-screen pt-20 pb-20 px-4 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Match Not Found</h2>
                    <Button onClick={() => navigate('/sports')}>Back to Sports</Button>
                </div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen pt-20 pb-20">
            {/* Hero Image */}
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent z-10" />
                <img
                    src={match.image || '/placeholder-sports.jpg'}
                    alt={match.title}
                    className="w-full h-full object-cover"
                />

                {/* Back Button */}
                <button
                    onClick={() => navigate('/sports')}
                    className="absolute top-6 left-6 z-20 p-3 bg-dark-900/80 backdrop-blur-sm rounded-full border border-white/10 hover:border-primary-500/50 transition-all"
                >
                    <ArrowLeft className="w-5 h-5 text-white" />
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-32 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card className="p-5 sm:p-6 md:p-8 mb-6 sm:mb-8">
                            {/* Sport & Status Badges */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                                <span className="px-3 py-1 bg-primary-500/20 border border-primary-500/30 text-primary-400 rounded-full text-xs font-medium uppercase">
                                    {match.sport}
                                </span>
                                {match.league && (
                                    <span className="px-3 py-1 bg-white/5 border border-white/10 text-gray-300 rounded-full text-xs">
                                        {match.league}
                                    </span>
                                )}
                                {match.status === 'selling-fast' && (
                                    <span className="px-3 py-1 bg-red-500/20 border border-red-500/30 text-red-400 rounded-full text-xs font-medium">
                                        Selling Fast
                                    </span>
                                )}
                            </div>

                            {/* Teams Section */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    {/* Team A */}
                                    <div className="flex flex-col items-center flex-1">
                                        <div
                                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white font-bold text-xl mb-2"
                                            style={{ backgroundColor: match.teamA.color }}
                                        >
                                            {match.teamA.shortName}
                                        </div>
                                        <span className="font-bold text-white text-center text-sm sm:text-base">
                                            {match.teamA.name}
                                        </span>
                                    </div>

                                    {/* VS */}
                                    <div className="px-4 sm:px-6">
                                        <span className="text-2xl sm:text-3xl font-bold gradient-text">VS</span>
                                    </div>

                                    {/* Team B */}
                                    <div className="flex flex-col items-center flex-1">
                                        <div
                                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white font-bold text-xl mb-2"
                                            style={{ backgroundColor: match.teamB.color }}
                                        >
                                            {match.teamB.shortName}
                                        </div>
                                        <span className="font-bold text-white text-center text-sm sm:text-base">
                                            {match.teamB.name}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                                {match.title}
                            </h1>

                            {/* Rating & Actions */}
                            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6">
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                    <span className="text-white font-semibold">{match.rating}</span>
                                    <span className="text-gray-400 text-sm">({match.reviews} reviews)</span>
                                </div>

                                <button
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                                >
                                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                                    <span className="text-white text-sm">Wishlist</span>
                                </button>

                                <button
                                    onClick={handleShare}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                                >
                                    <Share2 className="w-5 h-5 text-white" />
                                    <span className="text-white text-sm">Share</span>
                                </button>
                            </div>

                            {/* Match Info Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                                    <Calendar className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-gray-400 text-sm mb-1">Date & Time</div>
                                        <div className="text-white font-semibold">{formatDate(match.date)}</div>
                                        <div className="text-gray-300 text-sm">{match.time}</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                                    <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-gray-400 text-sm mb-1">Venue</div>
                                        <div className="text-white font-semibold">{match.stadium.name}</div>
                                        <div className="text-gray-300 text-sm">{match.city}</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                                    <Users className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-gray-400 text-sm mb-1">Capacity</div>
                                        <div className="text-white font-semibold">{match.stadium.capacity.toLocaleString()}</div>
                                        <div className="text-gray-300 text-sm">Total Seats</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                                    <Clock className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-gray-400 text-sm mb-1">Duration</div>
                                        <div className="text-white font-semibold">{match.duration}</div>
                                        <div className="text-gray-300 text-sm">Approx.</div>
                                    </div>
                                </div>
                            </div>

                            {/* Tags */}
                            {match.tags && match.tags.length > 0 && (
                                <div className="mb-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Tag className="w-4 h-4 text-primary-400" />
                                        <span className="text-white font-semibold">Tags</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {match.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 bg-white/5 border border-white/10 text-gray-300 rounded-full text-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Seating Categories */}
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4">Seating Categories</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {match.stadium.sections.map((section, index) => {
                                        const sectionKey = section.toLowerCase().replace(' ', '-');
                                        const price = match.pricing[sectionKey] || match.pricing.general;
                                        const available = match.availableSeats[sectionKey] || 0;

                                        return (
                                            <div key={section} className="p-4 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-lg">
                                                <div className="text-primary-400 font-semibold mb-2">{section}</div>
                                                <div className="text-2xl font-bold text-white mb-1">₹{price}</div>
                                                <div className="text-sm text-gray-400">{available} seats available</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </Card>

                        {/* Similar Matches */}
                        {similarMatches.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6">Similar Matches</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {similarMatches.map((similarMatch) => (
                                        <SportsCard key={similarMatch.id} match={similarMatch} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <Card className="p-6">
                                <div className="mb-6">
                                    <div className="text-gray-400 text-sm mb-2">Starting from</div>
                                    <div className="text-4xl font-bold gradient-text mb-1">
                                        ₹{match.pricing.general}
                                    </div>
                                    <div className="text-gray-400 text-sm">per person</div>
                                </div>

                                {/* Availability Alert */}
                                {match.status === 'selling-fast' && (
                                    <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                                        <div className="text-red-400 font-semibold text-sm">⚡ Selling Fast!</div>
                                        <div className="text-gray-300 text-xs mt-1">Book now to secure your seats</div>
                                    </div>
                                )}

                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="w-full mb-4"
                                    onClick={() => navigate(`/sports/booking/${match.id}`)}
                                >
                                    Book Tickets
                                </Button>

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center justify-between py-2 border-b border-white/10">
                                        <span className="text-gray-400">Sport</span>
                                        <span className="text-white font-semibold">{match.sport}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-white/10">
                                        <span className="text-gray-400">Date</span>
                                        <span className="text-white font-semibold">{match.date}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-white/10">
                                        <span className="text-gray-400">Time</span>
                                        <span className="text-white font-semibold">{match.time}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-gray-400">Venue</span>
                                        <span className="text-white font-semibold text-right">{match.stadium.name}</span>
                                    </div>
                                </div>

                                {/* Security Badge */}
                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                                        <Trophy className="w-4 h-4" />
                                        <span>100% Authentic Tickets</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SportsDetails;
