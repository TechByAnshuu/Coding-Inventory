import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, X, Trophy } from 'lucide-react';
import { sportsService } from '../services/sportsService';
import { SPORTS_CATEGORIES, CITIES, PRICE_RANGES } from '../utils/constants';
import SportsCard from '../components/sports/SportsCard';
import Button from '../components/common/Button';

const Sports = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    // Filter states
    const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
    const [selectedSports, setSelectedSports] = useState(
        searchParams.get('sport') ? [searchParams.get('sport')] : []
    );
    const [selectedCities, setSelectedCities] = useState(
        searchParams.get('city') ? [searchParams.get('city')] : []
    );
    const [priceRange, setPriceRange] = useState({ min: 0, max: 999999 });
    const [sortBy, setSortBy] = useState('date');

    useEffect(() => {
        loadMatches();
    }, [searchQuery, selectedSports, selectedCities, priceRange, sortBy]);

    const loadMatches = async () => {
        setLoading(true);
        try {
            const filters = {
                query: searchQuery,
                sport: selectedSports,
                city: selectedCities,
                minPrice: priceRange.min,
                maxPrice: priceRange.max,
                sortBy,
            };

            const data = await sportsService.searchMatches(filters);
            setMatches(data);
        } catch (error) {
            console.error('Error loading matches:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleSport = (sport) => {
        setSelectedSports(prev =>
            prev.includes(sport)
                ? prev.filter(s => s !== sport)
                : [...prev, sport]
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
        setSelectedSports([]);
        setSelectedCities([]);
        setPriceRange({ min: 0, max: 999999 });
        setSortBy('date');
    };

    const hasActiveFilters = searchQuery || selectedSports.length > 0 || selectedCities.length > 0 || priceRange.min > 0 || priceRange.max < 999999;

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Trophy className="w-10 h-10 text-primary-400" />
                        <h1 className="text-4xl md:text-5xl font-bold">
                            Sports <span className="gradient-text">Matches</span>
                        </h1>
                    </div>
                    <p className="text-xl text-gray-400">
                        {matches.length} {matches.length === 1 ? 'match' : 'matches'} found
                    </p>
                </div>

                {/* Search and Sort Bar */}
                <div className="mb-8 flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search matches, teams, venues..."
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
                        <option value="date">Date</option>
                        <option value="popularity">Most Popular</option>
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

                            {/* Sports Categories */}
                            <div className="mb-6">
                                <h4 className="text-white font-semibold mb-3">Sport Type</h4>
                                <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                                    {SPORTS_CATEGORIES.map((sport) => (
                                        <label
                                            key={sport}
                                            className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedSports.includes(sport)}
                                                onChange={() => toggleSport(sport)}
                                                className="w-4 h-4 accent-primary-500"
                                            />
                                            <span className="text-gray-300 text-sm">{sport}</span>
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

                    {/* Matches Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="animate-pulse">
                                        <div className="bg-dark-700 rounded-xl h-96"></div>
                                    </div>
                                ))}
                            </div>
                        ) : matches.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {matches.map((match, index) => (
                                    <motion.div
                                        key={match.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05, duration: 0.4 }}
                                    >
                                        <SportsCard match={match} />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="text-6xl mb-4">🏆</div>
                                <h3 className="text-2xl font-bold text-white mb-2">No Matches Found</h3>
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

export default Sports;
