import { motion } from 'framer-motion';

const Slide = ({ children, show }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: show ? -75 : -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: show ? -75 : 50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
            {children}
        </motion.div>
    );
};

export default Slide;
