import { useState, useRef } from "react";
import { motion, transform } from "framer-motion"
import Previewer from "./Previewer";
import Svg from "./SvgViewbox";
import Control from "./Control";
import { CONSTANTS, drawArc, circleVectors } from "../utils"

const minRadius = 50
const maxRadius = 100
const initialState = {
    radius: minRadius,
    endAngle: 60,
    fill: "blue",
    stroke: "cyan",
    strokeWidth: 6,
    offset: 0,
}

export default function Circle() {
    const containerRef = useRef()
    const [key, setKey] = useState(0.5)
    const [state, setState] = useState(initialState)

    const reset = () => {
        setKey(Math.random() * 100)
        setState(initialState)
    }

    const { radius, endAngle, stroke, strokeWidth, fill, offset } = state
    let { containerWidth, containerHeight } = CONSTANTS,
        centerX = containerWidth / 2,
        centerY = containerHeight / 2;
    //shrink outlined circle between x% - 100% based on reversed offset
    const scale = transform(offset, [0, 10], [1, 0.6])

    const d = drawArc({
        x: strokeWidth + centerX + 10,
        y: strokeWidth + centerY + 10,
        startAngle: 0,
        endAngle,
        radius,
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
                        stroke={stroke}
                        fill="transparent"
                        strokeLinecap="round"
                        strokeWidth={strokeWidth}
                        initial={{ scale: 1 }}
                        animate={{ scale }}
                        dragConstraints={containerRef}
                        dragMomentum={false}
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
                    label="offset"
                    max={10}
                    cb={setState}
                />
            </div>

        </Previewer>
    );
}