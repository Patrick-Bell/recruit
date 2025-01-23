import { motion, useSpring, useScroll } from "framer-motion"

const ScrollLinked = ({ children }) => {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    return (


        <>
        <motion.div
                id="scroll-indicator"
                style={{
                    scaleX,
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 10,
                    originX: 0,
                    backgroundColor: "#408663",
                }}
            />
            {children}
        
        </>
    )
}

    export default ScrollLinked