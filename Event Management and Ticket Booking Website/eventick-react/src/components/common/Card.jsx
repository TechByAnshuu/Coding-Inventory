import { motion } from 'framer-motion';

const Card = ({
    children,
    className = '',
    variant = 'default',
    hoverable = true,
    ...props
}) => {
    const variants = {
        default: 'bg-dark-800 border border-white/10',
        glass: 'glass-dark',
        gradient: 'bg-gradient-to-br from-dark-800 to-dark-700 border border-white/10',
    };

    const hoverClass = hoverable ? 'card-hover' : '';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`rounded-xl overflow-hidden ${variants[variant]} ${hoverClass} ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
