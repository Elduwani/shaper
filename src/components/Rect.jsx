import { useState, useRef } from "react";
import { motion } from "framer-motion"
import Previewer from "./Previewer";
import Svg from "./SvgViewbox";
import Control from "./Control";
import { CONSTANTS } from "../utils"

const initialState = {
    width: 100,
    height: 100,
    fill: '#06cdff',
    radius: 0,
    rotate: 0
}

export default function Rect() {
    const containerRef = useRef()
    const [key, setKey] = useState(0.5)
    const [state, setState] = useState(initialState)

    const reset = () => {
        setKey(Math.random() * 100)
        setState(initialState)
    }

    const { width, height, radius, rotate, fill } = state
    let { containerWidth, containerHeight } = CONSTANTS,
        centerX = (containerWidth / 2) - (width / 2),
        centerY = (containerHeight / 2) - (height / 2);

    return (
        <Previewer reset={reset} resetKey={key}>
            <div ref={containerRef} className="svg-container">
                <Svg containerRef={containerRef}>
                    <motion.rect
                        width={width}
                        height={height}
                        strokeWidth={3}
                        stroke="#8200ff"
                        fill='transparent'
                        animate={{ rotate }}
                        dragConstraints={containerRef}
                        dragMomentum={false}
                        rx={radius} x={centerX - 15} y={centerY - 15}
                        drag
                    />
                    <motion.rect
                        fill={fill}
                        rx={radius}
                        x={centerX} y={centerY}
                        width={width} height={height}
                        animate={{ rotate }}
                        dragConstraints={containerRef}
                        dragMomentum={false}
                        drag
                    />
                </Svg>
            </div>

            {
                // selected ?
                //     <ColorPicker setState={isPrimary ? setPrimary : setSecondary} />
                //     : null
            }

            <div className="controls">
                <Control
                    label="width"
                    min={width}
                    max={200}
                    cb={setState}
                />
                <Control
                    label="height"
                    min={width}
                    max={200}
                    cb={setState}
                />
                <Control
                    label="rotate"
                    max={360}
                    cb={setState}
                />
                <Control
                    label="radius"
                    max={30}
                    cb={setState}
                />
            </div>
        </Previewer>
    );
}
