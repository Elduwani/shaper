import { useState, useRef } from "react";
import { motion, transform } from "framer-motion"
import Previewer from "./Previewer";
import Svg from "./SvgViewbox";
import Control from "./Control";
import { CONSTANTS, drawArc, circleVectors } from "../utils"


export default function Circle({ id, savedState }) {
    const minRadius = 50
    const maxRadius = 100
    const initialState = {
        endAngle: 60,
        radius: minRadius,
        fill: savedState ? savedState.fill : "blue",
        stroke: savedState ? savedState.stroke : "cyan",
        strokeWidth: 6,
        offset: 0,
    }

    const containerRef = useRef()
    const [state, setState] = useState(initialState)

    const { radius, endAngle, stroke, strokeWidth, fill, offset } = state
    let { viewboxWidth, viewboxHeight } = CONSTANTS,
        centerX = viewboxWidth / 2,
        centerY = viewboxHeight / 2;
    //shrink outlined circle between x% - 100% based on reversed offset
    const scale = transform(offset, [0, 10], [1, 0.6])

    const d = drawArc({
        x: strokeWidth + centerX + 10,
        y: strokeWidth + centerY + 10,
        startAngle: 0,
        endAngle,
        radius,
    })

    const points = circleVectors(
        centerX, //cx
        centerY, //cy
        (radius * 1.3) + (offset * 2), //radius
        endAngle * 0.7 //70% of the angle
    )

    return (
        <Previewer
            id={id}
            state={state}
            setState={setState}
        >
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
                                    r={scale * 3}
                                />
                            )
                        }
                        <motion.circle
                            initial={{ r: radius }}
                            animate={{ r: radius }}
                            cx={centerX}
                            cy={centerY}
                            // r={radius}
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
                    min={minRadius}
                    max={maxRadius}
                    state={savedState}
                    cb={setState}
                />
                <Control
                    name="endAngle"
                    label="angle"
                    min={endAngle}
                    max={359}
                    state={savedState}
                    cb={setState}
                />
                <Control
                    name="strokeWidth"
                    label="stroke"
                    min={strokeWidth}
                    max={20}
                    state={savedState}
                    cb={setState}
                />
                <Control
                    label="offset"
                    max={10}
                    state={savedState}
                    cb={setState}
                />
            </div>

        </Previewer>
    );
}