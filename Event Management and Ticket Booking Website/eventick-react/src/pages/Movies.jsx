import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, X, Film } from 'lucide-react';
import { moviesService } from '../services/moviesService';
import { MOVIE_GENRES, MOVIE_LANGUAGES, CITIES } from '../utils/constants';
import MovieCard from '../components/movies/MovieCard';
import Button from '../components/common/Button';

const Movies = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [activeTab, setActiveTab] = useState('now-showing'); // 'now-showing' or 'upcoming'

    // Filter states
    const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
    const [selectedGenres, setSelectedGenres] = useState(
        searchParams.get('genre') ? [searchParams.get('genre')] : []
    );
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);
    const [sortBy, setSortBy] = useState('popularity');

    useEffect(() => {
        loadMovies();
    }, [searchQuery, selectedGenres, selectedLanguages, selectedCities, sortBy, activeTab]);

    const loadMovies = async () => {
        setLoading(true);
        try {
            const filters = {
                query: searchQuery,
                genre: selectedGenres,
                language: selectedLanguages,
                city: selectedCities,
                status: activeTab,
                sortBy,
            };

            const data = await moviesService.searchMovies(filters);
            setMovies(data);
        } catch (error) {
            console.error('Error loading movies:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleGenre = (genre) => {
        setSelectedGenres(prev =>
            prev.includes(genre)
                ? prev.filter(g => g !== genre)
                : [...prev, genre]
        );
    };

    const toggleLanguage = (language) => {
        setSelectedLanguages(prev =>
            prev.includes(language)
                ? prev.filter(l => l !== language)
                : [...prev, language]
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
        setSelectedGenres([]);
        setSelectedLanguages([]);
        setSelectedCities([]);
        setSortBy('popularity');
    };

    const hasActiveFilters = searchQuery || selectedGenres.length > 0 || selectedLanguages.length > 0 || selectedCities.length > 0;

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Film className="w-10 h-10 text-primary-400" />
                        <h1 className="text-4xl md:text-5xl font-bold">
                            Movies <span className="gradient-text">Tickets</span>
                        </h1>
                    </div>
                    <p className="text-xl text-gray-400">
                        {movies.length} {movies.length === 1 ? 'movie' : 'movies'} found
                    </p>
                </div>

                {/* Tabs: Now Showing / Upcoming */}
                <div className="mb-8">
                    <div className="flex gap-4 border-b border-white/10">
                        <button
                            onClick={() => setActiveTab('now-showing')}
                            className={`pb-4 px-6 font-semibold transition-all ${activeTab === 'now-showing'
                                    ? 'text-primary-400 border-b-2 border-primary-400'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Now Showing
                        </button>
                        <button
                            onClick={() => setActiveTab('upcoming')}
                            className={`pb-4 px-6 font-semibold transition-all ${activeTab === 'upcoming'
                                    ? 'text-primary-400 border-b-2 border-primary-400'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Coming Soon
                        </button>
                    </div>
                </div>

                {/* Search and Sort Bar */}
                <div className="mb-8 flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search movies, cast, director..."
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
                        <option value="rating">Highest Rated</option>
                        <option value="release-date">Release Date</option>
                        <option value="title">Title (A-Z)</option>
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

                            {/* Genres */}
                            <div className="mb-6">
                                <h4 className="text-white font-semibold mb-3">Genres</h4>
                                <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                                    {MOVIE_GENRES.map((genre) => (
                                        <label
                                            key={genre}
                                            className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedGenres.includes(genre)}
                                                onChange={() => toggleGenre(genre)}
                                                className="w-4 h-4 accent-primary-500"
                                            />
                                            <span className="text-gray-300 text-sm">{genre}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Languages */}
                            <div className="mb-6">
                                <h4 className="text-white font-semibold mb-3">Languages</h4>
                                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                                    {MOVIE_LANGUAGES.map((language) => (
                                        <label
                                            key={language}
                                            className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedLanguages.includes(language)}
                                                onChange={() => toggleLanguage(language)}
                                                className="w-4 h-4 accent-primary-500"
                                            />
                                            <span className="text-gray-300 text-sm">{language}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Cities */}
                            <div>
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
                        </div>
                    </div>

                    {/* Movies Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                                    <div key={i} className="animate-pulse">
                                        <div className="bg-dark-700 rounded-xl aspect-[2/3]"></div>
                                    </div>
                                ))}
                            </div>
                        ) : movies.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {movies.map((movie, index) => (
                                    <motion.div
                                        key={movie.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05, duration: 0.4 }}
                                    >
                                        <MovieCard movie={movie} />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="text-6xl mb-4">🎬</div>
                                <h3 className="text-2xl font-bold text-white mb-2">No Movies Found</h3>
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

export default Movies;
