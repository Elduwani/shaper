import { motion } from "framer-motion"
import { FiRotateCw } from "react-icons/fi"

const arrow = {
    rest: { rotate: 0, scale: 1 },
    hover: { rotate: 360, transition: { duration: 0.4 } },
    pressed: { scale: 0.9 }
};

export default function Previewer({ children, reset, resetKey }) {
    return (
        <div className="shape-wrapper">
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
        </div>
    )
}

function Resetter({ children }) {
    return <>{children}</>
}