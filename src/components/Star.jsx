import { useState, useRef } from "react";
import { motion, transform } from "framer-motion"
import Svg from "./SvgViewbox";
import Control from "./Control";
import { CONSTANTS } from "../utils"

export default function Star() {
    const containerRef = useRef()
    const [state, setState] = useState({
        size: 80,
        sides: 3,
        fill: "#28df99",
        stroke: "#00bcd4",
        strokeWidth: 2,
        rotate: 0
    })

    const { size, sides, stroke, strokeWidth, rotate, fill } = state
    const { containerWidth, containerHeight } = CONSTANTS
    const cx = containerWidth / 2
    const cy = containerHeight / 2

    return (
        <div className="shape-wrapper">
            <div ref={containerRef} className="svg-container">
                <Svg containerRef={containerRef}>
                    <g>
                        <motion.polygon
                            points={points(size, sides, cx - 20, cy + 15)}
                            fill="transparent"
                            stroke={stroke}
                            strokeLinejoin="round"
                            strokeWidth={strokeWidth}
                            dragConstraints={containerRef}
                            animate={{ rotate }}
                            drag
                        />
                        <motion.polygon
                            fill={fill}
                            points={points(size, sides, cx, cy)}
                            dragConstraints={containerRef}
                            animate={{ rotate }}
                            drag
                        />
                    </g>
                </Svg>
            </div>
            <div className="controls">
                <Control
                    label="size"
                    min={120}
                    max={250}
                    cb={setState}
                />
                <Control
                    name="sides"
                    label="points"
                    min={3}
                    max={6}
                    cb={setState}
                />
                <Control
                    label="rotate"
                    max={360}
                    cb={setState}
                />
            </div>
        </div>
    );
}

function points(s, sides = 3, cx = 0, cy = 0) {
    /**
     * pentagram reference:
     * https://www.algebra.com/algebra/homework/word/geometry/Geometry_Word_Problems.faq.question.1113151.html
    */
    const size = s / 2
    const x = (num) => transform(num, [-6, 6], [cx - size, cx + size])
    const y = (num) => transform(num, [-6, 6], [cy + size, cy - size])

    switch (sides) {
        case 4:
            //square
            return `
                ${x(0)}, ${y(6)} 
                ${x(6)}, ${y(0)} 
                ${x(0)}, ${y(-6)} 
                ${x(-6)}, ${y(0)} 
            `
        case 5:
            //Pentagram
            return `
                ${x(0)}, ${y(6)} 
                ${x(5.8)}, ${y(2)} 
                ${x(3.5)}, ${y(-5)} 
                ${x(-3.5)}, ${y(-5)} 
                ${x(-5.8)}, ${y(2)} 
            `

        case 6:
            //Hexagram
            return `
                ${x(0)}, ${y(6)} 
                ${x(5.2)}, ${y(3)} 
                ${x(5.2)}, ${y(-3)} 
                ${x(0)}, ${y(-6)} 
                ${x(-5.2)}, ${y(-3)} 
                ${x(-5.2)}, ${y(3)}
            `

        default:
            //Triangle
            return `
                ${x(0)}, ${y(6)} 
                ${x(6)}, ${y(-6)} 
                ${x(-6)}, ${y(-6)}
            `
    }
}