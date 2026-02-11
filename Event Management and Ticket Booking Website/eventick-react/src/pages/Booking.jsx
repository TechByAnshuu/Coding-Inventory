import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
    CheckCircle,
    Calendar,
    MapPin,
    Ticket as TicketIcon,
    CreditCard,
    User,
    Mail,
    Phone,
} from 'lucide-react';
import { eventService } from '../services/eventService';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Booking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(1); // 1: Tickets, 2: Details, 3: Confirmation
    const [ticketQuantity, setTicketQuantity] = useState(1);
    const [ticketType, setTicketType] = useState('general');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        loadEvent();
    }, [id]);

    const loadEvent = async () => {
        try {
            const data = await eventService.getEventById(id);
            setEvent(data);
        } catch (error) {
            console.error('Error loading event:', error);
            navigate('/404');
        } finally {
            setLoading(false);
        }
    };

    const ticketTypes = [
        { id: 'general', name: 'General', price: event?.price || 0, description: 'Standard entry' },
        {
            id: 'vip',
            name: 'VIP',
            price: event ? event.price * 2.5 : 0,
            description: 'Premium seating with perks'
        },
    ];

    const selectedTicket = ticketTypes.find(t => t.id === ticketType);
    const subtotal = selectedTicket ? selectedTicket.price * ticketQuantity : 0;
    const fees = subtotal * 0.1; // 10% booking fee
    const total = subtotal + fees;

    const onSubmit = (data) => {
        console.log('Booking data:', { ...data, ticketQuantity, ticketType, total });
        setStep(3);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (!event) return null;

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Progress Steps */}
                <div className="mb-12">
                    <div className="flex items-center justify-center gap-4">
                        {[
                            { num: 1, label: 'Select Tickets' },
                            { num: 2, label: 'Your Details' },
                            { num: 3, label: 'Confirmation' },
                        ].map((s, index) => (
                            <div key={s.num} className="flex items-center">
                                <div className="flex items-center">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s.num
                                                ? 'bg-primary-500 text-white'
                                                : 'bg-dark-700 text-gray-400'
                                            }`}
                                    >
                                        {step > s.num ? <CheckCircle className="w-6 h-6" /> : s.num}
                                    </div>
                                    <span
                                        className={`ml-2 text-sm font-medium hidden sm:inline ${step >= s.num ? 'text-white' : 'text-gray-400'
                                            }`}
                                    >
                                        {s.label}
                                    </span>
                                </div>
                                {index < 2 && (
                                    <div
                                        className={`w-12 sm:w-24 h-1 mx-2 ${step > s.num ? 'bg-primary-500' : 'bg-dark-700'
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {step === 1 && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <Card className="p-8">
                                    <h2 className="text-3xl font-bold text-white mb-6">Select Tickets</h2>

                                    {/* Ticket Types */}
                                    <div className="space-y-4 mb-8">
                                        {ticketTypes.map((ticket) => (
                                            <div
                                                key={ticket.id}
                                                onClick={() => setTicketType(ticket.id)}
                                                className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${ticketType === ticket.id
                                                        ? 'border-primary-500 bg-primary-500/10'
                                                        : 'border-white/10 bg-dark-700/30 hover:border-white/20'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div
                                                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${ticketType === ticket.id
                                                                    ? 'border-primary-500'
                                                                    : 'border-gray-500'
                                                                }`}
                                                        >
                                                            {ticketType === ticket.id && (
                                                                <div className="w-3 h-3 rounded-full bg-primary-500" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-white text-lg">{ticket.name}</div>
                                                            <div className="text-sm text-gray-400">{ticket.description}</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-2xl font-bold text-white">₹{ticket.price}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Quantity Selector */}
                                    <div>
                                        <label className="block text-white font-semibold mb-3">
                                            Number of Tickets
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                                                className="w-12 h-12 bg-dark-700 hover:bg-dark-600 rounded-lg flex items-center justify-center text-white font-bold transition-colors"
                                            >
                                                -
                                            </button>
                                            <div className="text-2xl font-bold text-white w-16 text-center">
                                                {ticketQuantity}
                                            </div>
                                            <button
                                                onClick={() => setTicketQuantity(Math.min(10, ticketQuantity + 1))}
                                                className="w-12 h-12 bg-dark-700 hover:bg-dark-600 rounded-lg flex items-center justify-center text-white font-bold transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            className="w-full"
                                            onClick={() => setStep(2)}
                                        >
                                            Continue to Details
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <Card className="p-8">
                                    <h2 className="text-3xl font-bold text-white mb-6">Your Details</h2>

                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        {/* Name */}
                                        <div>
                                            <label className="block text-white font-medium mb-2">
                                                Full Name *
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    {...register('name', { required: 'Name is required' })}
                                                    type="text"
                                                    className="input-field pl-12"
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                            {errors.name && (
                                                <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-white font-medium mb-2">Email *</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    {...register('email', {
                                                        required: 'Email is required',
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                            message: 'Invalid email address',
                                                        },
                                                    })}
                                                    type="email"
                                                    className="input-field pl-12"
                                                    placeholder="your.email@example.com"
                                                />
                                            </div>
                                            {errors.email && (
                                                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className="block text-white font-medium mb-2">
                                                Phone Number *
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    {...register('phone', {
                                                        required: 'Phone number is required',
                                                        pattern: {
                                                            value: /^[0-9]{10}$/,
                                                            message: 'Invalid phone number (10 digits)',
                                                        },
                                                    })}
                                                    type="tel"
                                                    className="input-field pl-12"
                                                    placeholder="10-digit mobile number"
                                                />
                                            </div>
                                            {errors.phone && (
                                                <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-4 pt-4">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="lg"
                                                className="flex-1"
                                                onClick={() => setStep(1)}
                                            >
                                                Back
                                            </Button>
                                            <Button type="submit" variant="primary" size="lg" className="flex-1">
                                                Proceed to Payment
                                            </Button>
                                        </div>
                                    </form>
                                </Card>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card className="p-12 text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                        className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                                    >
                                        <CheckCircle className="w-16 h-16 text-green-500" />
                                    </motion.div>
                                    <h2 className="text-4xl font-bold text-white mb-4">Booking Confirmed!</h2>
                                    <p className="text-xl text-gray-400 mb-8">
                                        Your tickets have been booked successfully. Check your email for confirmation.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Button variant="primary" onClick={() => navigate('/')}>
                                            Back to Home
                                        </Button>
                                        <Button variant="outline" onClick={() => navigate('/events')}>
                                            Browse More Events
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 sticky top-24">
                            <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>

                            {/* Event Info */}
                            <div className="mb-6 pb-6 border-b border-white/10">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-32 object-cover rounded-lg mb-4"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/400x200?text=Event';
                                    }}
                                />
                                <h4 className="font-bold text-white mb-3 line-clamp-2">{event.title}</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Calendar className="w-4 h-4" />
                                        <span>{new Date(event.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <MapPin className="w-4 h-4" />
                                        <span>{event.venue}, {event.city}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                                <div className="flex justify-between text-gray-400">
                                    <span>
                                        {selectedTicket?.name} x {ticketQuantity}
                                    </span>
                                    <span>₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Booking Fee</span>
                                    <span>₹{fees.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-xl font-bold text-white">Total</span>
                                <span className="text-3xl font-bold gradient-text">₹{total.toFixed(2)}</span>
                            </div>

                            {/* Additional Info */}
                            <div className="text-sm text-gray-400 space-y-2">
                                <div className="flex items-center gap-2">
                                    <TicketIcon className="w-4 h-4 text-primary-400" />
                                    <span>Instant ticket delivery</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CreditCard className="w-4 h-4 text-primary-400" />
                                    <span>Secure payment</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
