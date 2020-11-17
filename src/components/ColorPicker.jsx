import { useRef } from "react"
import { PALETTES } from "../utils"
import { motion } from "framer-motion"

const maxPalettes = 5

export default function ColorPicker({ setState }) {
    const rand = Math.floor(Math.random() * PALETTES.length)
    const randomIndex = useRef(rand)
    const toggle = useRef(true)

    const setColors = (fill, stroke) => {
        if (toggle.current) setState(st => ({ ...st, fill, stroke }))
        else setState(st => ({ ...st, fill: stroke, stroke: fill }))
        toggle.current = !toggle.current
    }

    return (
        <motion.div
            className="palette-wrapper"
            style={{ overflow: 'hidden' }}
            initial={{ width: '0%', opacity: 0 }}
            animate={{ width: '100%', opacity: 1 }}
        >
            <div style={{ color: 'white' }}>{randomIndex.current}</div>

            <ul>{
                Array(maxPalettes).fill(true).map((_, i) => {
                    //start from random index and cycke through length of palette
                    const index = randomIndex.current + i
                    const [c1, c2] = PALETTES[index % PALETTES.length]

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
