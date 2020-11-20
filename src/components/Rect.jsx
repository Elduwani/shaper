import { useState, useRef } from "react";
import { motion, transform } from "framer-motion"
import Svg from "./SvgViewbox";
import Previewer from "./Previewer";
import Control from "./Control";
import { CONSTANTS } from "../utils"


export default function Rect({ id, savedState }) {
    const initialState = {
        width: 100,
        height: 100,
        fill: savedState ? savedState.fill : '#06cdff',
        stroke: savedState ? savedState.stroke : "#8200ff",
        rotate: 0, offset: 0
    }

    const containerRef = useRef()
    const [state, setState] = useState(initialState)
    const reset = () => setState(initialState)

    const { width, height, rotate, fill, stroke, offset } = state
    let { viewboxWidth, viewboxHeight } = CONSTANTS,
        centerX = (viewboxWidth / 2) - (width / 2),
        centerY = (viewboxHeight / 2) - (height / 2);

    const scale = transform(offset, [0, 10], [1, 0.6])
    const radius = offset * 2

    return (
        <Previewer
            id={id}
            reset={reset}
            state={state}
            setState={setState}
        >
            <div ref={containerRef} className="svg-container">
                <Svg containerRef={containerRef}>
                    <motion.rect
                        fill={fill}
                        x={centerX}
                        y={centerY}
                        width={width}
                        height={height}
                        animate={{ rotate }}
                        dragConstraints={containerRef}
                        dragMomentum={false}
                        drag
                    />
                    <motion.rect
                        initial={{ width, height }}
                        animate={{
                            rotate: rotate * scale,
                            width: width * scale,
                            height: height * scale
                        }}
                        strokeWidth={3}
                        fill='transparent'
                        stroke={stroke}
                        dragConstraints={containerRef}
                        dragMomentum={false}
                        x={centerX - 15}
                        y={centerY - 15}
                        rx={radius}
                        drag
                    />
                </Svg>
            </div>

            <div className="controls">
                <Control
                    label="width"
                    min={100}
                    max={180}
                    state={savedState}
                    cb={setState}
                />
                <Control
                    label="height"
                    min={100}
                    max={200}
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
