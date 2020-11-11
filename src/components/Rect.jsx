import { useState, useRef } from "react";
import { motion } from "framer-motion"
import Svg from "./SvgViewbox";
import Control from "./Control";

function Rect() {
    const containerRef = useRef()
    const [state, setState] = useState({
        width: 100,
        height: 100,
        strokeWidth: 3,
        stroke: "red",
        radius: 5,
        fill: "none",
        rotate: 0,
    })

    const { width, height, strokeWidth, stroke, radius, fill, rotate } = state

    return (
        <div className="shape-wrapper">
            <div ref={containerRef} className="svg-container">
                <Svg containerRef={containerRef}>
                    <rect
                        width={width}
                        height={height}
                        strokeWidth={strokeWidth}
                        stroke={stroke}
                        rotate={rotate}
                        rx={radius}
                        fill={fill}
                        x={5} y={5}
                    />
                </Svg>
            </div>
            <Control
                label="width"
                min={50}
                max={300}
                initial={100}
                cb={setState}
            />
            <Control
                label="height"
                min={20}
                max={250}
                cb={setState}
            />
            <Control
                label="rotate"
                max={359}
                cb={setState}
            />
            <Control
                label="radius"
                max={50}
                cb={setState}
            />
        </div>
    );
}

export default Rect;
