import { useState, useRef, useEffect } from "react"
import { COLORS, CONSTANTS } from "../utils"
import { motion } from "framer-motion"

const paletteCount = 6
const randomPalette = COLORS.randomPalette(paletteCount)

export default function ColorPicker({ setState, shuffleKey }) {
    const toggle = useRef(true)
    const [palette, setPalette] = useState(randomPalette)

    const setColors = (fill, stroke) => {
        if (toggle.current) setState(st => ({ ...st, fill, stroke }))
        else setState(st => ({ ...st, fill: stroke, stroke: fill }))
        toggle.current = !toggle.current
    }

    useEffect(() => {
        setPalette(COLORS.randomPalette(paletteCount))
    }, [shuffleKey])

    return (
        <motion.div
            key="palette"
            className="palette-wrapper"
            style={{
                left: 0,
                top: CONSTANTS.viewboxHeight - 10,
                position: "absolute",
                zIndex: 30,
            }}
            initial={{ width: '0%', opacity: 0 }}
            animate={{ width: '100%', opacity: 1 }}
        >
            <ul>{
                palette.map(([c1, c2], i) => {
                    return (
                        <li key={i} onClick={() => setColors(c1, c2)}>
                            <div style={{ backgroundColor: c1 }}></div>
                            <div style={{ backgroundColor: c2 }}></div>
                        </li>
                    )
                })
            }</ul>
        </motion.div>
    )
}
