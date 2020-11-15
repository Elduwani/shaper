import { useState, useRef } from "react";
import { motion } from "framer-motion"
import Svg from "./SvgViewbox";
import Control from "./Control";
import { CONSTANTS } from "../utils"

function Rect() {
    const containerRef = useRef()
    const [state, setState] = useState({
        copies: 2,
        height: 100,
        width: 3,
        fill: "cyan",
        spacing: 10,
        rotate: 0,
    })

    const { copies, height, width, fill, rotate, spacing } = state
    let { containerWidth, containerHeight } = CONSTANTS,
        cx = (containerWidth / 2) - (width / 2),
        cy = (containerHeight / 2) - (height / 2);

    return (
        <div className="shape-wrapper">
            <div ref={containerRef} className="svg-container">
                <Svg containerRef={containerRef}>
                    <g fill={fill}>
                        {
                            Array(copies).fill(true).map((_, i) => {
                                const x = cx + (spacing * i) - (copies * spacing / 2)

                                return (
                                    <motion.rect
                                        key={i}
                                        x={x} y={cy}
                                        width={width}
                                        height={height}
                                        animate={{ rotate }}
                                        transformOrigin="center center"
                                    />
                                )
                            })
                        }
                    </g>
                </Svg>
            </div>
            <div className="controls">
                <Control
                    name="copies"
                    label="count"
                    min={copies}
                    max={15}
                    cb={setState}
                />
                <Control
                    label="spacing"
                    min={5}
                    max={50}
                    cb={setState}
                />
                <Control
                    label="height"
                    min={height}
                    max={250}
                    cb={setState}
                />
                <Control
                    label="rotate"
                    max={180}
                    cb={setState}
                />
            </div>
        </div>
    );
}

export default Rect;
