import { useState, useContext, useEffect } from "react"
import { StoreContext } from "../contexts/Store.context"
import { AnimatePresence, motion } from "framer-motion"
import ColorPicker from "./ColorPicker";
import { useDebounce } from "../utils";
import {
    FiMoon as PaletteIcon,
    FiTrash2 as DeleteIcon,
    FiMoreHorizontal as MenuIcon,
} from "react-icons/fi"

const iconVariants = {
    rest: { rotate: 0, scale: 1 },
    hover: { rotate: 360, transition: { duration: 0.4 } },
    pressed: { scale: 0.9 }
};

export default function Previewer({ children, id, state, setState, disablePalette }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [openPalette, setOpenPalette] = useState(false)
    const [pkey, setPkey] = useState(0.2)
    const { save, removeComponent } = useContext(StoreContext)

    const toggleMenu = () => setMenuOpen(val => !val)
    const unmount = () => removeComponent(id) //delete

    function shufflePalette() {
        if (!openPalette) setOpenPalette(true)
        setPkey(k => k + 1)
    }

    useDebounce(() => {
        save(state, id)
    }, 3000, state);

    useEffect(() => {
        //for a minimal UI close the color palette if the menu is not open
        if (!menuOpen) setOpenPalette(false)
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
                                {
                                    disablePalette ? null :
                                        <div
                                            className={`menu-item ${openPalette ? "active" : ""}`}
                                            onClick={shufflePalette}
                                        >
                                            <motion.div
                                                initial="rest"
                                                variants={iconVariants}
                                                whileHover="hover"
                                                whileTap="pressed"
                                            >
                                                <PaletteIcon />
                                            </motion.div>
                                        </div>
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

            {
                openPalette ?
                    <ColorPicker
                        shuffleKey={pkey}
                        setState={setState}
                    />
                    : null
            }

            { children}

        </motion.div>
    )
}