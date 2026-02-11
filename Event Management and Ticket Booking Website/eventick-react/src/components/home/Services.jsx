import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    BookOpen,
    Camera,
    Smile,
    Music,
    Gamepad2,
    GraduationCap,
    Mic2,
    Sparkles,
} from 'lucide-react';
import { SERVICES } from '../../utils/constants';
import Card from '../common/Card';

const iconMap = {
    BookOpen,
    Camera,
    Smile,
    Music,
    Gamepad2,
    GraduationCap,
    Mic2,
    PartyPopper: Sparkles,
};

const Services = () => {
    const navigate = useNavigate();

    const handleServiceClick = (category) => {
        navigate(`/events?category=${category}`);
    };

    return (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
                        Explore Our <span className="gradient-text">Services</span>
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
                        From workshops to concerts, discover a world of amazing experiences
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {SERVICES.map((service, index) => {
                        const Icon = iconMap[service.icon];

                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <Card
                                    className="p-4 sm:p-6 cursor-pointer group relative overflow-hidden"
                                    onClick={() => handleServiceClick(service.category)}
                                >
                                    {/* Gradient Overlay on Hover */}
                                    <div className="absolute inset-0 bg: gradient-to-br from-primary-500/0 to-accent-pink/0 group-hover:from-primary-500/10 group-hover:to-accent-pink/10 transition-all duration-500" />

                                    <div className="relative z-10">
                                        {/* Icon */}
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary-500 to-accent-pink rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                                            {Icon && <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">
                                            {service.name}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-400 text-xs sm:text-sm line-clamp-2">
                                            {service.description}
                                        </p>

                                        {/* Hover Arrow */}
                                        <div className="mt-3 sm:mt-4 flex items-center text-primary-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
                                            <span className="text-xs sm:text-sm font-medium">Explore</span>
                                            <svg
                                                className="w-3 h-3 sm:w-4 sm:h-4 ml-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
