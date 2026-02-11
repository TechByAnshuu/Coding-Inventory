import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Booking from './pages/Booking';
import Sports from './pages/Sports';
import Movies from './pages/Movies';
import Venues from './pages/Venues';
import NotFound from './pages/NotFound';

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router>
                    <div className="min-h-screen flex flex-col bg-dark-900">
                        <Navbar />
                        <main className="flex-grow">
                            <Routes>
                                <Route path="/" element={<Home />} />

                                {/* Events Routes */}
                                <Route path="/events" element={<Events />} />
                                <Route
                                    path="/events/:id"
                                    element={
                                        <ProtectedRoute>
                                            <EventDetails />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/booking/:id"
                                    element={
                                        <ProtectedRoute>
                                            <Booking />
                                        </ProtectedRoute>
                                    }
                                />

                                {/* Sports Routes */}
                                <Route path="/sports" element={<Sports />} />
                                <Route
                                    path="/sports/:id"
                                    element={
                                        <ProtectedRoute>
                                            <EventDetails />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/sports/booking/:id"
                                    element={
                                        <ProtectedRoute>
                                            <Booking />
                                        </ProtectedRoute>
                                    }
                                />

                                {/* Movies Routes */}
                                <Route path="/movies" element={<Movies />} />
                                <Route
                                    path="/movies/:id"
                                    element={
                                        <ProtectedRoute>
                                            <EventDetails />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/movies/booking/:id"
                                    element={
                                        <ProtectedRoute>
                                            <Booking />
                                        </ProtectedRoute>
                                    }
                                />

                                {/* Other Routes */}
                                <Route path="/venues" element={<Venues />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
