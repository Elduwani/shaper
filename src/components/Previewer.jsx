import { useState } from "react"
import { motion } from "framer-motion"
import { FiRotateCw, FiDroplet as PaletteIcon } from "react-icons/fi"

const iconVariants = {
    rest: { rotate: 0, scale: 1 },
    hover: { rotate: 360, transition: { duration: 0.4 } },
    pressed: { scale: 0.9 }
};

export default function Previewer({ children, reset, togglePalette }) {
    const [key, setKey] = useState(0.5)

    const remount = () => {
        reset && reset()
        setKey(Math.random() * 100)
    }

    return (
        <motion.div
            className="shape-wrapper"
            initial={{ scale: 0.8, opacity: 0.8, y: -100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
        >

            <div className="menu-wrapper">
                <div className="menu-item reset" onClick={remount}>
                    <motion.div
                        initial="rest"
                        variants={iconVariants}
                        whileHover="hover"
                        whileTap="pressed"
                    >
                        <FiRotateCw />
                    </motion.div>
                </div>

                <div
                    className="menu-item palette"
                    onClick={() => togglePalette(open => !open)}
                >
                    <motion.div
                        initial="rest"
                        variants={iconVariants}
                        whileTap="pressed"
                    >
                        <PaletteIcon />
                    </motion.div>
                </div>
            </div>

            <Container key={key}>{children}</Container>

        </motion.div>
    )
}

function Container({ children }) {
    return <>{children}</>
}