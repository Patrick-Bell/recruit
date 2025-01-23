import { motion } from 'framer-motion'

const Bounce = ({ children }) => {


    return (

        <>
        <motion.div  
                initial={{ y: 0 }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}>
                {children}
        </motion.div>
        
        </>
    )
}

export default Bounce