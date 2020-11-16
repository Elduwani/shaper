import { useState, useRef } from "react";
import { motion, transform } from "framer-motion"
import Svg from "./SvgViewbox";
import Control from "./Control";
import { CONSTANTS } from "../utils"

export default function Star() {
    const containerRef = useRef()
    const maxSides = 6
    const [state, setState] = useState({
        size: 80,
        sides: 3,
        fill: "blue",
        stroke: "cyan",
        strokeWidth: 6,
        rotate: 0
    })

    const { size, sides, stroke, strokeWidth, rotate, fill } = state
    const { containerWidth, containerHeight } = CONSTANTS
    const cx = containerWidth / 2
    const cy = containerHeight / 2

    const d = points(size, sides, cx, cy)

    return (
        <div className="shape-wrapper">
            <div ref={containerRef} className="svg-container">
                <Svg containerRef={containerRef}>
                    <g>
                        {/* <polygon fill="gray" points={points(size, 4, cx, cy)} /> */}
                        <motion.polygon
                            points={d}
                            fill={fill}
                            stroke={stroke}
                            strokeLinejoin="round"
                            strokeWidth={strokeWidth}
                            dragConstraints={containerRef}
                            drag
                        />
                    </g>
                </Svg>
            </div>
            <div className="controls">
                <Control
                    label="size"
                    min={100}
                    max={200}
                    cb={setState}
                />
                <Control
                    label="sides"
                    min={3}
                    max={maxSides}
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
                ${cx - size}, ${cy - size} 
                ${cx + size}, ${cy - size} 
                ${cx + size}, ${cy + size}
                ${cx - size}, ${cy + size} 
            `
        case 5:
            return `
                ${x(0)}, ${y(6)} 
                ${x(3.5)}, ${y(-5)}
                ${x(-6)}, ${y(2)}
                ${x(6)}, ${y(2)}
                ${x(-3.5)}, ${y(-5)}
            `
        case 6:
            return ""

        default:
            return `
                ${cx}, ${cy - size} 
                ${cx + size}, ${cy + size} 
                ${cx - size}, ${cy + size}
            `
    }
}