import { useState, useRef } from "react";
import { motion } from "framer-motion"
import Previewer from "./Previewer";
import Svg from "./SvgViewbox";
import Control from "./Control";
import { CONSTANTS, generateStar } from "../utils"

const initialState = {
    size: 80,
    sides: 3,
    fill: "#28df99",
    stroke: "#00bcd4",
    strokeWidth: 2,
    rotate: 0
}

export default function Star() {
    const containerRef = useRef()
    const [key, setKey] = useState(0.5)
    const [state, setState] = useState(initialState)

    const { size, sides, stroke, strokeWidth, rotate, fill } = state
    const { containerWidth, containerHeight } = CONSTANTS
    const cx = containerWidth / 2
    const cy = containerHeight / 2

    const reset = () => {
        setKey(Math.random() * 100)
        setState(initialState)
    }

    return (
        <Previewer reset={reset} resetKey={key}>
            <div ref={containerRef} className="svg-container">
                <Svg containerRef={containerRef}>
                    <g>
                        <motion.polygon
                            points={generateStar(size, sides, cx - 20, cy + 15)}
                            fill="transparent"
                            stroke={stroke}
                            strokeLinejoin="round"
                            strokeWidth={strokeWidth}
                            dragConstraints={containerRef}
                            dragMomentum={false}
                            animate={{ rotate }}
                            drag
                        />
                        <motion.polygon
                            fill={fill}
                            points={generateStar(size, sides, cx, cy)}
                            dragConstraints={containerRef}
                            dragMomentum={false}
                            animate={{ rotate }}
                            drag
                        />
                    </g>
                </Svg>
            </div>

            <div className="controls">
                <Control
                    label="size"
                    min={size}
                    max={250}
                    cb={setState}
                />
                <Control
                    name="sides"
                    label="points"
                    min={sides}
                    max={6}
                    cb={setState}
                />
                <Control
                    label="rotate"
                    max={360}
                    cb={setState}
                />
            </div>

        </Previewer>
    );
}