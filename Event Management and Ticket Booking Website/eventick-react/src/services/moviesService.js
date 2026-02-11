import unsplashService, { UNSPLASH_QUERIES } from './unsplashService';

// Mock movies data
const mockMovies = [
    {
        id: 'movie-1',
        type: 'movie',
        title: 'Inception',
        genre: ['Sci-Fi', 'Thriller', 'Action'],
        duration: '148 min',
        rating: 4.8,
        reviews: 5200,
        certification: 'UA',
        language: 'English',
        releaseDate: '2024-12-20',
        status: 'now-showing',
        image: null,
        poster: null,
        unsplashQuery: 'inception movie',
        synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        cast: ['Leonardo DiCaprio', 'Tom Hardy', 'Ellen Page', 'Joseph Gordon-Levitt'],
        director: 'Christopher Nolan',
        trailer: 'https://youtube.com/watch?v=YoHD9XEInc0',
        featured: true,
        theatres: [
            {
                id: 'theatre-1',
                name: 'PVR Phoenix',
                location: 'Kurla, Mumbai',
                city: 'Mumbai',
                shows: [
                    { time: '10:00', date: '2024-12-25', pricing: { premium: 300, regular: 200 }, availableSeats: 120 },
                    { time: '14:00', date: '2024-12-25', pricing: { premium: 350, regular: 250 }, availableSeats: 80 },
                    { time: '19:00', date: '2024-12-25', pricing: { premium: 400, regular: 300 }, availableSeats: 45 },
                    { time: '22:30', date: '2024-12-25', pricing: { premium: 350, regular: 250 }, availableSeats: 95 }
                ]
            },
            {
                id: 'theatre-2',
                name: 'INOX Megaplex',
                location: 'Andheri, Mumbai',
                city: 'Mumbai',
                shows: [
                    { time: '11:30', date: '2024-12-25', pricing: { premium: 280, regular: 180 }, availableSeats: 100 },
                    { time: '15:30', date: '2024-12-25', pricing: { premium: 320, regular: 220 }, availableSeats: 60 },
                    { time: '20:00', date: '2024-12-25', pricing: { premium: 380, regular: 280 }, availableSeats: 30 }
                ]
            }
        ]
    },
    {
        id: 'movie-2',
        type: 'movie',
        title: 'The Dark Knight',
        genre: ['Action', 'Crime', 'Drama'],
        duration: '152 min',
        rating: 4.9,
        reviews: 8500,
        certification: 'UA',
        language: 'English',
        releaseDate: '2024-12-18',
        status: 'now-showing',
        image: null,
        poster: null,
        unsplashQuery: 'dark knight batman',
        synopsis: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
        cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Michael Caine'],
        director: 'Christopher Nolan',
        trailer: 'https://youtube.com/watch?v=EXeTwQWrcwY',
        featured: true,
        theatres: [
            {
                id: 'theatre-1',
                name: 'PVR Phoenix',
                location: 'Kurla, Mumbai',
                city: 'Mumbai',
                shows: [
                    { time: '12:00', date: '2024-12-25', pricing: { premium: 320, regular: 220 }, availableSeats: 90 },
                    { time: '16:30', date: '2024-12-25', pricing: { premium: 370, regular: 270 }, availableSeats: 55 },
                    { time: '21:00', date: '2024-12-25', pricing: { premium: 420, regular: 320 }, availableSeats: 25 }
                ]
            }
        ]
    },
    {
        id: 'movie-3',
        type: 'movie',
        title: 'Interstellar',
        genre: ['Sci-Fi', 'Drama', 'Adventure'],
        duration: '169 min',
        rating: 4.7,
        reviews: 6800,
        certification: 'UA',
        language: 'English',
        releaseDate: '2024-12-22',
        status: 'now-showing',
        image: null,
        poster: null,
        unsplashQuery: 'interstellar space',
        synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
        cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
        director: 'Christopher Nolan',
        trailer: 'https://youtube.com/watch?v=zSWdZVtXT7E',
        featured: true,
        theatres: [
            {
                id: 'theatre-2',
                name: 'INOX Megaplex',
                location: 'Andheri, Mumbai',
                city: 'Mumbai',
                shows: [
                    { time: '10:30', date: '2024-12-25', pricing: { premium: 300, regular: 200 }, availableSeats: 110 },
                    { time: '14:30', date: '2024-12-25', pricing: { premium: 350, regular: 250 }, availableSeats: 70 },
                    { time: '18:30', date: '2024-12-25', pricing: { premium: 400, regular: 300 }, availableSeats: 40 },
                    { time: '23:00', date: '2024-12-25', pricing: { premium: 350, regular: 250 }, availableSeats: 85 }
                ]
            }
        ]
    },
    {
        id: 'movie-4',
        type: 'movie',
        title: 'Avengers: Endgame',
        genre: ['Action', 'Adventure', 'Sci-Fi'],
        duration: '181 min',
        rating: 4.6,
        reviews: 9200,
        certification: 'UA',
        language: 'English',
        releaseDate: '2025-01-10',
        status: 'upcoming',
        image: null,
        poster: null,
        unsplashQuery: 'avengers endgame',
        synopsis: 'After the devastating events, the Avengers assemble once more to reverse Thanos\' actions and restore balance to the universe.',
        cast: ['Robert Downey Jr.', 'Chris Evans', 'Scarlett Johansson', 'Chris Hemsworth'],
        director: 'Russo Brothers',
        trailer: 'https://youtube.com/watch?v=TcMBFSGVi1c',
        featured: false,
        theatres: []
    },
    {
        id: 'movie-5',
        type: 'movie',
        title: 'Jawan',
        genre: ['Action', 'Thriller'],
        duration: '169 min',
        rating: 4.5,
        reviews: 4500,
        certification: 'UA',
        language: 'Hindi',
        releaseDate: '2024-12-15',
        status: 'now-showing',
        image: null,
        poster: null,
        unsplashQuery: 'bollywood action movie',
        synopsis: 'A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in society.',
        cast: ['Shah Rukh Khan', 'Nayanthara', 'Vijay Sethupathi'],
        director: 'Atlee',
        trailer: 'https://youtube.com/watch?v=CEEjsNRv-Oc',
        featured: true,
        theatres: [
            {
                id: 'theatre-3',
                name: 'Cinepolis',
                location: 'Andheri, Mumbai',
                city: 'Mumbai',
                shows: [
                    { time: '09:00', date: '2024-12-25', pricing: { premium: 250, regular: 150 }, availableSeats: 130 },
                    { time: '12:30', date: '2024-12-25', pricing: { premium: 300, regular: 200 }, availableSeats: 95 },
                    { time: '16:00', date: '2024-12-25', pricing: { premium: 350, regular: 250 }, availableSeats: 60 },
                    { time: '19:30', date: '2024-12-25', pricing: { premium: 400, regular: 300 }, availableSeats: 35 },
                    { time: '23:00', date: '2024-12-25', pricing: { premium: 350, regular: 250 }, availableSeats: 80 }
                ]
            }
        ]
    }
];

// Movies Service Functions
export const moviesService = {
    // Get all movies
    getAllMovies: async () => {
        await new Promise(resolve => setTimeout(resolve, 500));

        // Fetch Unsplash images for movies
        const moviesWithImages = await Promise.all(
            mockMovies.map(async (movie) => {
                if (!movie.image) {
                    try {
                        const photo = await unsplashService.getRandomPhoto(movie.unsplashQuery);
                        return {
                            ...movie,
                            image: photo?.urls?.regular || '/placeholder-movie.jpg',
                            poster: photo?.urls?.regular || '/placeholder-movie.jpg'
                        };
                    } catch (error) {
                        return { ...movie, image: '/placeholder-movie.jpg', poster: '/placeholder-movie.jpg' };
                    }
                }
                return movie;
            })
        );

        return moviesWithImages;
    },

    // Get movie by ID
    getMovieById: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const movie = mockMovies.find(m => m.id === id);
        if (!movie) throw new Error('Movie not found');

        // Fetch Unsplash image if not present
        if (!movie.image) {
            try {
                const photo = await unsplashService.getRandomPhoto(movie.unsplashQuery);
                movie.image = photo?.urls?.regular || '/placeholder-movie.jpg';
                movie.poster = photo?.urls?.regular || '/placeholder-movie.jpg';
            } catch (error) {
                movie.image = '/placeholder-movie.jpg';
                movie.poster = '/placeholder-movie.jpg';
            }
        }

        return movie;
    },

    // Get now showing movies
    getNowShowing: async () => {
        await new Promise(resolve => setTimeout(resolve, 400));
        const nowShowing = mockMovies.filter(m => m.status === 'now-showing');

        const moviesWithImages = await Promise.all(
            nowShowing.map(async (movie) => {
                if (!movie.image) {
                    try {
                        const photo = await unsplashService.getRandomPhoto(movie.unsplashQuery);
                        return {
                            ...movie,
                            image: photo?.urls?.regular || '/placeholder-movie.jpg',
                            poster: photo?.urls?.regular || '/placeholder-movie.jpg'
                        };
                    } catch (error) {
                        return { ...movie, image: '/placeholder-movie.jpg', poster: '/placeholder-movie.jpg' };
                    }
                }
                return movie;
            })
        );

        return moviesWithImages;
    },

    // Get upcoming movies
    getUpcoming: async () => {
        await new Promise(resolve => setTimeout(resolve, 400));
        const upcoming = mockMovies.filter(m => m.status === 'upcoming');

        const moviesWithImages = await Promise.all(
            upcoming.map(async (movie) => {
                if (!movie.image) {
                    try {
                        const photo = await unsplashService.getRandomPhoto(movie.unsplashQuery);
                        return {
                            ...movie,
                            image: photo?.urls?.regular || '/placeholder-movie.jpg',
                            poster: photo?.urls?.regular || '/placeholder-movie.jpg'
                        };
                    } catch (error) {
                        return { ...movie, image: '/placeholder-movie.jpg', poster: '/placeholder-movie.jpg' };
                    }
                }
                return movie;
            })
        );

        return moviesWithImages;
    },

    // Get featured movies
    getFeaturedMovies: async () => {
        await new Promise(resolve => setTimeout(resolve, 400));
        const featured = mockMovies.filter(m => m.featured);

        const moviesWithImages = await Promise.all(
            featured.map(async (movie) => {
                if (!movie.image) {
                    try {
                        const photo = await unsplashService.getRandomPhoto(movie.unsplashQuery);
                        return {
                            ...movie,
                            image: photo?.urls?.regular || '/placeholder-movie.jpg',
                            poster: photo?.urls?.regular || '/placeholder-movie.jpg'
                        };
                    } catch (error) {
                        return { ...movie, image: '/placeholder-movie.jpg', poster: '/placeholder-movie.jpg' };
                    }
                }
                return movie;
            })
        );

        return moviesWithImages;
    },

    // Search and filter movies
    searchMovies: async (filters = {}) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        let results = [...mockMovies];

        // Filter by search query
        if (filters.query) {
            const query = filters.query.toLowerCase();
            results = results.filter(movie =>
                movie.title.toLowerCase().includes(query) ||
                movie.synopsis.toLowerCase().includes(query) ||
                movie.cast.some(actor => actor.toLowerCase().includes(query))
            );
        }

        // Filter by genre
        if (filters.genre && filters.genre.length > 0) {
            results = results.filter(movie =>
                movie.genre.some(g => filters.genre.includes(g))
            );
        }

        // Filter by language
        if (filters.language && filters.language.length > 0) {
            results = results.filter(movie =>
                filters.language.includes(movie.language)
            );
        }

        // Filter by city (theatres)
        if (filters.city && filters.city.length > 0) {
            results = results.filter(movie =>
                movie.theatres.some(t => filters.city.includes(t.city))
            );
        }

        // Filter by status
        if (filters.status) {
            results = results.filter(movie => movie.status === filters.status);
        }

        // Sort results
        if (filters.sortBy) {
            switch (filters.sortBy) {
                case 'rating':
                    results.sort((a, b) => b.rating - a.rating);
                    break;
                case 'popularity':
                    results.sort((a, b) => b.reviews - a.reviews);
                    break;
                case 'release-date':
                    results.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
                    break;
                case 'title':
                    results.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                default:
                    break;
            }
        }

        // Fetch images for filtered results
        const moviesWithImages = await Promise.all(
            results.map(async (movie) => {
                if (!movie.image) {
                    try {
                        const photo = await unsplashService.getRandomPhoto(movie.unsplashQuery);
                        return {
                            ...movie,
                            image: photo?.urls?.regular || '/placeholder-movie.jpg',
                            poster: photo?.urls?.regular || '/placeholder-movie.jpg'
                        };
                    } catch (error) {
                        return { ...movie, image: '/placeholder-movie.jpg', poster: '/placeholder-movie.jpg' };
                    }
                }
                return movie;
            })
        );

        return moviesWithImages;
    },

    // Get movies by genre
    getMoviesByGenre: async (genre) => {
        await new Promise(resolve => setTimeout(resolve, 400));
        return mockMovies.filter(m => m.genre.includes(genre));
    },

    // Get similar movies
    getSimilarMovies: async (movieId, limit = 3) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const movie = mockMovies.find(m => m.id === movieId);
        if (!movie) return [];

        return mockMovies
            .filter(m =>
                m.id !== movieId &&
                m.genre.some(g => movie.genre.includes(g))
            )
            .slice(0, limit);
    },

    // Get shows for a movie in a city
    getShowsByCity: async (movieId, city) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const movie = mockMovies.find(m => m.id === movieId);
        if (!movie) return [];

        return movie.theatres.filter(t => t.city === city);
    }
};

export default mockMovies;
