import { useState, useRef } from "react";
import { motion } from "framer-motion"
import Svg from "./SvgViewbox";
import Control from "./Control";
import { CONSTANTS } from "../utils"

function Rect() {
    const containerRef = useRef()
    const [state, setState] = useState({
        width: 100,
        height: 100,
        strokeWidth: 3,
        stroke: "red",
        fill: "black",
        radius: 10,
        rotate: 0,
    })

    const { width, height, strokeWidth, stroke, radius, fill, rotate } = state
    let { containerWidth, containerHeight } = CONSTANTS,
        centerX = (containerWidth / 2) - (width / 2),
        centerY = (containerHeight / 2) - (height / 2);

    return (
        <div className="shape-wrapper">
            <div ref={containerRef} className="svg-container">
                <Svg containerRef={containerRef}>
                    <motion.rect
                        fill={fill}
                        rx={radius}
                        x={centerX - 15} y={centerY - 15}
                        width={width}
                        height={height}
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                        animate={{ rotate }}
                        dragConstraints={containerRef}
                        // dragElastic={false}
                        drag
                    />
                    <motion.rect
                        fill="white"
                        rx={radius}
                        x={centerX} y={centerY}
                        width={width} height={height}
                        animate={{ rotate }}
                        dragConstraints={containerRef}
                        // dragElastic={false}
                        drag
                    />
                </Svg>
            </div>
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
        </div>
    );
}

export default Rect;
