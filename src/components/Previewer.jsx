import { motion } from "framer-motion"
import { FiRotateCw } from "react-icons/fi"

const arrow = {
    rest: { rotate: 0, scale: 1 },
    hover: { rotate: 360, transition: { duration: 0.4 } },
    pressed: { scale: 0.9 }
};

export default function Previewer({ children, reset, resetKey }) {
    return (
        <motion.div
            className="shape-wrapper"
            initial={{ scale: 0.8, opacity: 0.8, y: -100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
        // transition={{ duration: 0.3 }}
        >
            <div className="reload" onClick={reset}>
                <motion.div
                    initial="rest"
                    variants={arrow}
                    whileHover="hover"
                    whileTap="pressed"
                >
                    <FiRotateCw />
                </motion.div>
            </div>
            <Resetter key={resetKey}>{children}</Resetter>
        </motion.div>
    )
}

function Resetter({ children }) {
    return <>{children}</>
}