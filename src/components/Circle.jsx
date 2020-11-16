import { useState, useRef } from "react";
import { motion } from "framer-motion"
import Svg from "./SvgViewbox";
import Control from "./Control";
import { CONSTANTS } from "../utils"

export default function Circle() {
    const containerRef = useRef()
    const minRadius = 50
    const maxRadius = 100
    const [state, setState] = useState({
        radius: minRadius,
        endAngle: 250,
        fill: "blue",
        stroke: "cyan",
        strokeWidth: 6,
        rotate: 0
    })

    const { radius, endAngle, stroke, strokeWidth, rotate, fill } = state
    let { containerWidth, containerHeight } = CONSTANTS,
        centerX = containerWidth / 2,
        centerY = containerHeight / 2;

    const d = describeArc({
        x: strokeWidth + centerX + 10,
        y: strokeWidth + centerY + 10,
        radius,
        startAngle: 0,
        endAngle,
    })
    // console.log(d)

    return (
        <div className="shape-wrapper">
            <div ref={containerRef} className="svg-container">
                <Svg containerRef={containerRef}>
                    <g>
                        <motion.circle
                            cx={centerX}
                            cy={centerY}
                            r={radius}
                            fill={fill}
                            dragConstraints={containerRef}
                            // dragElastic={false}
                            drag
                        />
                        <motion.path
                            d={d}
                            fill="transparent"
                            stroke={stroke}
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            dragConstraints={containerRef}
                            // dragElastic={false}
                            drag
                        />
                    </g>
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
        </div>
    );
}

/**
 * http://jsbin.com/quhujowota/1/edit?html,js,output
*/

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