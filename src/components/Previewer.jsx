import { useState, useContext, useEffect } from "react"
import { StoreContext } from "../contexts/Store.context"
import { AnimatePresence, motion } from "framer-motion"
import {
    FiRotateCw as ResetIcon,
    FiDroplet as PaletteIcon,
    FiTrash2 as DeleteIcon,
    FiMoreHorizontal as MenuIcon,
} from "react-icons/fi"

const iconVariants = {
    rest: { rotate: 0, scale: 1 },
    hover: { rotate: 360, transition: { duration: 0.4 } },
    pressed: { scale: 0.9 }
};

export default function Previewer({ children, reset, state, id, openPalette }) {
    /**
     * openPalette() does not exist on all components
     * must check first before executing
    */
    const [key, setKey] = useState(0.5)
    const [menuOpen, setMenuOpen] = useState(false)
    const { updateTracker, removeComponent } = useContext(StoreContext)

    const toggleColors = () => openPalette && openPalette(bool => !bool)
    const closeAllMenus = () => menuOpen && setMenuOpen(false)
    const toggleMenu = () => setMenuOpen(val => !val)
    const unmount = () => removeComponent(id)

    const remount = () => {
        reset && reset()
        setKey(k => k + 1)
    }

    useEffect(() => {
        updateTracker(state, id)
    }, [state]);

    useEffect(() => {
        //for a minimal UI close the color palette if the menu is not open
        if (openPalette && !menuOpen) openPalette(false)
    }, [menuOpen]);

    return (
        <motion.div
            className="shape-wrapper"
            initial={{ scale: 0.8, opacity: 0.8, y: -100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
        >
            <div className="menu-wrapper">
                <div className="menu-item toggle" onClick={toggleMenu}>
                    <MenuIcon />
                </div>
                <AnimatePresence>
                    {
                        menuOpen ?
                            <motion.div
                                key="menus"
                                initial={{ opacity: 0, scale: 0.8, y: -30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                <div className="menu-item" onClick={remount}>
                                    <motion.div
                                        initial="rest"
                                        variants={iconVariants}
                                        whileHover="hover"
                                        whileTap="pressed"
                                    >
                                        <ResetIcon />
                                    </motion.div>
                                </div>
                                {
                                    openPalette ?
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
                                <div className="menu-item" onClick={unmount}>
                                    <motion.div
                                        initial="rest"
                                        variants={iconVariants}
                                        whileTap="pressed"
                                    >
                                        <DeleteIcon />
                                    </motion.div>
                                </div>
                            </motion.div>
                            : null
                    }
                </AnimatePresence>
            </div>

            <Container key={key} closeAllMenus={closeAllMenus}>{children}</Container>

        </motion.div>
    )
}

function Container({ children, closeAllMenus }) {
    return <div onClick={closeAllMenus}>{children}</div>
}