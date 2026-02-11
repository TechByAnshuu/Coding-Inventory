import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Users } from 'lucide-react';
import { VENUES } from '../../utils/constants';
import Card from '../common/Card';

const Venues = () => {
    const navigate = useNavigate();

    const handleVenueClick = (venueId) => {
        navigate(`/events?venue=${venueId}`);
    };

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Premium <span className="gradient-text">Venues</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Discover spectacular locations for unforgettable events
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {VENUES.map((venue, index) => (
                        <motion.div
                            key={venue.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <Card
                                className="overflow-hidden cursor-pointer group"
                                onClick={() => handleVenueClick(venue.id)}
                            >
                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/30 to-transparent z-10" />
                                    <img
                                        src={venue.image}
                                        alt={venue.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/400x300?text=Venue+Image';
                                        }}
                                    />

                                    {/* Overlay Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <MapPin className="w-5 h-5 text-primary-400" />
                                            <span className="text-primary-400 font-medium text-sm">
                                                {venue.city}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                                            {venue.name}
                                        </h3>
                                        <p className="text-gray-300 text-sm">
                                            {venue.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Footer Info */}
                                <div className="p-4 bg-dark-700/50 border-t border-white/5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <Users className="w-4 h-4" />
                                            <span>Capacity: {venue.capacity}</span>
                                        </div>
                                        <div className="text-sm text-primary-400 group-hover:translate-x-2 transition-transform duration-300">
                                            View Events →
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Venues;
