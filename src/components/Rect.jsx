import { useState, useRef } from "react";
import { motion, transform } from "framer-motion"
import Previewer from "./Previewer";
import Svg from "./SvgViewbox";
import Control from "./Control";
import { CONSTANTS } from "../utils"

const initialState = {
    width: 100,
    height: 100,
    fill: '#06cdff',
    rotate: 0,
    offset: 0
}

export default function Rect() {
    const containerRef = useRef()
    const [key, setKey] = useState(0.5)
    const [state, setState] = useState(initialState)

    const reset = () => {
        setKey(Math.random() * 100)
        setState(initialState)
    }

    const { width, height, rotate, fill, offset } = state
    let { containerWidth, containerHeight } = CONSTANTS,
        centerX = (containerWidth / 2) - (width / 2),
        centerY = (containerHeight / 2) - (height / 2);

    const scale = transform(offset, [0, 10], [1, 0.6])
    const radius = offset * 2

    return (
        <Previewer reset={reset} resetKey={key}>
            <div ref={containerRef} className="svg-container">
                <Svg containerRef={containerRef}>
                    <motion.rect
                        fill={fill}
                        rx={radius}
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
                        stroke="#8200ff"
                        fill='transparent'
                        dragConstraints={containerRef}
                        dragMomentum={false}
                        x={centerX - 15}
                        y={centerY - 15}
                        rx={radius}
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
                    max={180}
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
                    label="offset"
                    max={10}
                    cb={setState}
                />
            </div>
        </Previewer>
    );
}
