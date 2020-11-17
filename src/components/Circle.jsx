import { useState, useRef } from "react";
import { motion } from "framer-motion"
import Previewer from "./Previewer";
import Svg from "./SvgViewbox";
import Control from "./Control";
import { CONSTANTS, drawArc, circleVectors } from "../utils"

const minRadius = 50
const maxRadius = 100
const initialState = {
    radius: minRadius,
    endAngle: 20,
    fill: "blue",
    stroke: "cyan",
    strokeWidth: 6,
    rotate: 0,
}

export default function Circle() {
    const containerRef = useRef()
    const [key, setKey] = useState(0.5)
    const [state, setState] = useState(initialState)

    const reset = () => {
        setKey(Math.random() * 100)
        setState(initialState)
    }

    const { radius, endAngle, stroke, strokeWidth, fill } = state
    let { containerWidth, containerHeight } = CONSTANTS,
        centerX = containerWidth / 2,
        centerY = containerHeight / 2;

    const d = drawArc({
        x: strokeWidth + centerX + 10,
        y: strokeWidth + centerY + 10,
        radius,
        startAngle: 0,
        endAngle,
    })

    const points = circleVectors(centerX, centerY, radius * 1.3, endAngle)

    return (
        <Previewer reset={reset} resetKey={key}>
            <div ref={containerRef} className="svg-container">
                <Svg containerRef={containerRef}>

                    <motion.g
                        drag
                        dragConstraints={containerRef}
                        dragMomentum={false}
                    >
                        {
                            points.map((vector, i) =>
                                <circle
                                    key={i}
                                    fill="white"
                                    cx={vector.x}
                                    cy={vector.y}
                                    r={2}
                                />
                            )
                        }
                        <circle
                            cx={centerX}
                            cy={centerY}
                            r={radius}
                            fill={fill}
                        />
                    </motion.g>

                    <motion.path
                        d={d}
                        fill="transparent"
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        dragConstraints={containerRef}
                        dragMomentum={false}
                        // dragElastic={false}
                        drag
                    />

                </Svg>
            </div>

            <div className="controls">
                <Control
                    name="radius"
                    label="scale"
                    min={radius}
                    max={maxRadius}
                    cb={setState}
                />
                <Control
                    name="endAngle"
                    label="angle"
                    min={endAngle}
                    max={359}
                    cb={setState}
                />
                <Control
                    name="strokeWidth"
                    label="stroke"
                    min={strokeWidth}
                    max={20}
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