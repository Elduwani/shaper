import { useState, useContext, useEffect } from "react"
import { StoreContext } from "../contexts/Store.context"
import { motion } from "framer-motion"
import { FiRotateCw, FiDroplet as PaletteIcon } from "react-icons/fi"

const iconVariants = {
    rest: { rotate: 0, scale: 1 },
    hover: { rotate: 360, transition: { duration: 0.4 } },
    pressed: { scale: 0.9 }
};

export default function Previewer({ children, reset, state, id, togglePalette }) {
    const [key, setKey] = useState(0.5)
    const { updateTracker } = useContext(StoreContext)

    const toggleColors = () => togglePalette(bool => !bool)

    const remount = () => {
        reset && reset()
        setKey(k => k + 1)
    }

    useEffect(() => {
        updateTracker(state, id)
    }, [state]);

    return (
        <motion.div
            className="shape-wrapper"
            initial={{ scale: 0.8, opacity: 0.8, y: -100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
        >

            <div className="menu-wrapper">
                <div className="menu-item" onClick={remount}>
                    <motion.div
                        initial="rest"
                        variants={iconVariants}
                        whileHover="hover"
                        whileTap="pressed"
                    >
                        <FiRotateCw />
                    </motion.div>
                </div>
                {
                    togglePalette ?
                        <div className="menu-item" onClick={toggleColors}>
                            <motion.div
                                initial="rest"
                                variants={iconVariants}
                                whileTap="pressed"
                            >
                                <PaletteIcon />
                            </motion.div>
                        </div>
                        : null
                }
            </div>

            <Container key={key}>{children}</Container>

        </motion.div>
    )
}

function Container({ children }) {
    // console.log("Previewer rendering...!")
    return <>{children}</>
}