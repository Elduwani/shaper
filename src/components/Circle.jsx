import { useState, useRef } from "react";
import { motion } from "framer-motion"
import Svg from "./SvgViewbox";
import Control from "./Control";
import { CONSTANTS } from "../utils"

export default function Rect() {
    const containerRef = useRef()
    const [state, setState] = useState({
        radius: 50,
        endAngle: 45,
        fill: "blue",
        stroke: "cyan",
        strokeWidth: 6,
        rotate: 0
    })

    const { radius, endAngle, stroke, strokeWidth, rotate, fill } = state
    let { containerWidth, containerHeight } = CONSTANTS,
        centerX = containerWidth / 2,
        centerY = containerHeight / 2;

    const d = describeArc({ x: centerX, y: centerY, radius, startAngle: 0, endAngle })
    // console.log(d)

    return (
        <div className="shape-wrapper">
            <div ref={containerRef} className="svg-container">
                <Svg containerRef={containerRef}>
                    <motion.g
                        animate={{ rotate }}
                        dragConstraints={containerRef}
                        transformOrigin="center center"
                        dragElastic={false}
                        drag
                    >
                        <circle
                            cx={centerX}
                            cy={centerY}
                            r={radius}
                            fill={fill}
                        />
                        <path
                            d={d}
                            fill="none"
                            stroke={stroke}
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                        />
                    </motion.g>
                </Svg>
            </div>
            <div className="controls">
                <Control
                    label="radius"
                    min={radius}
                    max={100}
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
        </div>
    );
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function describeArc({ x, y, radius, startAngle, endAngle }) {
    x = x ?? radius
    y = y ?? radius
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}