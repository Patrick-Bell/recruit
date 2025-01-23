import { motion } from 'framer-motion'

function Underline({ children }) {

    const borderAnimation = {
        hidden: { width: "0%" },
        visible: { width: "auto", transition: { duration: 2, ease: "easeInOut" } },
      };

    return (
        <>
        <motion.div 
            variants={borderAnimation}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            style={{
            display: 'inline-block',
            borderBottom: '5px solid #408663',
            marginBottom: '10px',
            whiteSpace: 'nowrap', // Ensures the text stays on one line
            }}>
            {children}
        </motion.div>
        </>
    )
}

export default Underline