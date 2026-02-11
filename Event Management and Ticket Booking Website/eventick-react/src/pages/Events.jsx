import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';
import { eventService } from '../services/eventService';
import { EVENT_CATEGORIES, CITIES, PRICE_RANGES } from '../utils/constants';
import EventCard from '../components/events/EventCard';
import Button from '../components/common/Button';

const Events = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    // Filter states
    const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
    const [selectedCategories, setSelectedCategories] = useState(
        searchParams.get('category') ? [searchParams.get('category')] : []
    );
    const [selectedCities, setSelectedCities] = useState(
        searchParams.get('city') ? [searchParams.get('city')] : []
    );
    const [priceRange, setPriceRange] = useState({ min: 0, max: 999999 });
    const [sortBy, setSortBy] = useState('popularity');

    useEffect(() => {
        loadEvents();
    }, [searchQuery, selectedCategories, selectedCities, priceRange, sortBy]);

    const loadEvents = async () => {
        setLoading(true);
        try {
            const filters = {
                query: searchQuery,
                category: selectedCategories,
                city: selectedCities,
                minPrice: priceRange.min,
                maxPrice: priceRange.max,
                sortBy,
            };

            const data = await eventService.searchEvents(filters);
            setEvents(data);
        } catch (error) {
            console.error('Error loading events:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleCategory = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const toggleCity = (city) => {
        setSelectedCities(prev =>
            prev.includes(city)
                ? prev.filter(c => c !== city)
                : [...prev, city]
        );
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategories([]);
        setSelectedCities([]);
        setPriceRange({ min: 0, max: 999999 });
        setSortBy('popularity');
    };

    const hasActiveFilters = searchQuery || selectedCategories.length > 0 || selectedCities.length > 0 || priceRange.min > 0 || priceRange.max < 999999;

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Discover <span className="gradient-text">Events</span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        {events.length} {events.length === 1 ? 'event' : 'events'} found
                    </p>
                </div>

                {/* Search and Sort Bar */}
                <div className="mb-8 flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none"
                    >
                        <option value="popularity">Most Popular</option>
                        <option value="date">Date</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                    </select>

                    {/* Filter Toggle (Mobile) */}
                    <Button
                        variant="outline"
                        icon={Filter}
                        onClick={() => setShowFilters(!showFilters)}
                        className="md:hidden"
                    >
                        Filters
                    </Button>
                </div>

                <div className="flex gap-8">
                    {/* Filters Sidebar */}
                    <div className={`
            ${showFilters ? 'block' : 'hidden'} md:block
            fixed md:sticky top-24 left-0 right-0 md:left-auto md:right-auto
            w-full md:w-80 h-screen md:h-fit
            bg-dark-900 md:bg-transparent
            z-40 md:z-auto
            p-4 md:p-0
            overflow-y-auto
          `}>
                        <div className="bg-dark-800 border border-white/10 rounded-xl p-6">
                            {/* Filter Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <SlidersHorizontal className="w-5 h-5 text-primary-400" />
                                    <h3 className="text-xl font-bold text-white">Filters</h3>
                                </div>
                                <div className="flex gap-2">
                                    {hasActiveFilters && (
                                        <button
                                            onClick={clearFilters}
                                            className="text-sm text-primary-400 hover:text-primary-300"
                                        >
                                            Clear All
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setShowFilters(false)}
                                        className="md:hidden text-gray-400 hover:text-white"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="mb-6">
                                <h4 className="text-white font-semibold mb-3">Categories</h4>
                                <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                                    {EVENT_CATEGORIES.map((category) => (
                                        <label
                                            key={category}
                                            className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(category)}
                                                onChange={() => toggleCategory(category)}
                                                className="w-4 h-4 accent-primary-500"
                                            />
                                            <span className="text-gray-300 text-sm">{category}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Cities */}
                            <div className="mb-6">
                                <h4 className="text-white font-semibold mb-3">Cities</h4>
                                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                                    {CITIES.map((city) => (
                                        <label
                                            key={city}
                                            className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedCities.includes(city)}
                                                onChange={() => toggleCity(city)}
                                                className="w-4 h-4 accent-primary-500"
                                            />
                                            <span className="text-gray-300 text-sm">{city}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h4 className="text-white font-semibold mb-3">Price Range</h4>
                                <div className="space-y-2">
                                    {PRICE_RANGES.map((range) => (
                                        <button
                                            key={range.label}
                                            onClick={() => setPriceRange({ min: range.min, max: range.max })}
                                            className={`w-full text-left p-2 rounded-lg text-sm transition-all ${priceRange.min === range.min && priceRange.max === range.max
                                                    ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                                                    : 'text-gray-300 hover:bg-white/5'
                                                }`}
                                        >
                                            {range.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Events Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="animate-pulse">
                                        <div className="bg-dark-700 rounded-xl h-96"></div>
                                    </div>
                                ))}
                            </div>
                        ) : events.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {events.map((event, index) => (
                                    <motion.div
                                        key={event.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05, duration: 0.4 }}
                                    >
                                        <EventCard event={event} />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-2xl font-bold text-white mb-2">No Events Found</h3>
                                <p className="text-gray-400 mb-6">
                                    Try adjusting your filters or search query
                                </p>
                                <Button variant="primary" onClick={clearFilters}>
                                    Clear Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;
