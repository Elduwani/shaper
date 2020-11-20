import { useState, useRef } from "react";
import { motion, transform } from "framer-motion"
import Previewer from "./Previewer";
import Svg from "./SvgViewbox";
import Control from "./Control";
import { CONSTANTS, generateStar } from "../utils"


export default function Star({ id, savedState }) {
    const initialState = {
        size: 80, sides: 3,
        fill: savedState ? savedState.fill : "#28df99",
        stroke: savedState ? savedState.stroke : "#00bcd4",
        strokeWidth: 2, rotate: 0, offset: 0,
    }

    const containerRef = useRef()
    const [state, setState] = useState(initialState)

    const { size, sides, stroke, strokeWidth, rotate, fill, offset } = state
    const { viewboxWidth, viewboxHeight } = CONSTANTS
    const cx = viewboxWidth / 2
    const cy = viewboxHeight / 2

    const scale = transform(offset, [0, 10], [1, 0.6])

    return (
        <Previewer
            id={id}
            state={state}
            setState={setState}
        >
            <div ref={containerRef} className="svg-container">
                <Svg containerRef={containerRef}>
                    <g>
                        <motion.polygon
                            drag
                            stroke={stroke}
                            fill="transparent"
                            animate={{ rotate }}
                            dragMomentum={false}
                            strokeLinejoin="round"
                            strokeWidth={strokeWidth}
                            dragConstraints={containerRef}
                            points={generateStar(size, sides, cx - 20, cy + 15)}
                        />
                        <motion.polygon
                            fill={fill}
                            animate={{ rotate: rotate * scale, scale }}
                            points={generateStar(size, sides, cx, cy)}
                            dragConstraints={containerRef}
                            dragMomentum={false}
                            initial={{ scale: 1 }}
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
                    state={savedState}
                    cb={setState}
                />
                <Control
                    name="sides"
                    label="points"
                    min={sides}
                    max={6}
                    state={savedState}
                    cb={setState}
                />
                <Control
                    label="rotate"
                    max={360}
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