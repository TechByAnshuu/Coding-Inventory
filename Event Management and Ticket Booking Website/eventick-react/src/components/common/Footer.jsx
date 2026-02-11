import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Mail, MapPin } from 'lucide-react';
import Button from './Button';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { name: 'About Us', path: '/about' },
            { name: 'Contact', path: '/contact' },
            { name: 'Careers', path: '/careers' },
            { name: 'Press', path: '/press' },
        ],
        events: [
            { name: 'Browse Events', path: '/events' },
            { name: 'Venues', path: '/venues' },
            { name: 'Categories', path: '/events' },
            { name: 'Upcoming', path: '/events' },
        ],
        support: [
            { name: 'Help Center', path: '/help' },
            { name: 'FAQs', path: '/faq' },
            { name: 'Terms of Service', path: '/terms' },
            { name: 'Privacy Policy', path: '/privacy' },
        ],
    };

    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Jaipur', 'Goa'];

    const socialLinks = [
        { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
        { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
        { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
        { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    ];

    return (
        <footer className="bg-dark-800 border-t border-white/10 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Newsletter Section */}
                <div className="mb-12 pb-12 border-b border-white/10">
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-2xl font-bold mb-3 gradient-text">
                            Stay Updated
                        </h3>
                        <p className="text-gray-400 mb-6">
                            Subscribe to our newsletter for exclusive event updates and early bird offers!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input-field flex-1"
                            />
                            <Button variant="primary" icon={Mail}>
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold gradient-text mb-4">Eventick</h2>
                        <p className="text-gray-400 mb-6">
                            Your premier platform for discovering and booking amazing events.
                            From concerts to workshops, we bring unforgettable experiences to life.
                        </p>
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary-500/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5 text-gray-400 hover:text-primary-400" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-white font-semibold text-lg mb-4">Company</h4>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Event Links */}
                    <div>
                        <h4 className="text-white font-semibold text-lg mb-4">Events</h4>
                        <ul className="space-y-2">
                            {footerLinks.events.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="text-white font-semibold text-lg mb-4">Support</h4>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Cities */}
                <div className="mb-8 pb-8 border-b border-white/10">
                    <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary-400" />
                        Cities We Serve
                    </h4>
                    <div className="flex flex-wrap gap-3">
                        {cities.map((city) => (
                            <Link
                                key={city}
                                to={`/events?city=${city}`}
                                className="px-4 py-2 bg-white/5 hover:bg-primary-500/20 rounded-full text-sm text-gray-400 hover:text-primary-400 transition-all duration-300"
                            >
                                {city}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                    <p>© {currentYear} Eventick. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link to="/terms" className="hover:text-primary-400 transition-colors">
                            Terms
                        </Link>
                        <Link to="/privacy" className="hover:text-primary-400 transition-colors">
                            Privacy
                        </Link>
                        <Link to="/cookies" className="hover:text-primary-400 transition-colors">
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
