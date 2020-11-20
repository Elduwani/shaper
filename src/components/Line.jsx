import { useState, useRef } from "react";
import { motion } from "framer-motion"
import Previewer from "./Previewer";
import Svg from "./SvgViewbox";
import Control from "./Control";
import { CONSTANTS, COLORS } from "../utils"

const initialState = {
    copies: 5,
    height: 200,
    width: 3,
    fill: "cyan",
    spacing: 20,
    rotate: 15,
}

export default function Line({ id, savedState }) {
    const containerRef = useRef()
    const [state, setState] = useState(initialState)
    const reset = () => setState(initialState)

    const { copies, height, width, fill, rotate, spacing } = state
    let { viewboxWidth, viewboxHeight } = CONSTANTS,
        cx = (viewboxWidth / 2) - (width / 2),
        cy = (viewboxHeight / 2) - (height / 2),
        { colors } = COLORS;

    return (
        <Previewer id={id} reset={reset} state={state}>
            <div ref={containerRef} className="svg-container">
                <Svg containerRef={containerRef}>
                    <g fill={fill}>
                        {
                            Array(copies).fill(true).map((_, i) => {
                                const x = cx + (spacing * i) - (copies * spacing / 2)
                                const randomIndex = Math.round(Math.random() * colors.length)
                                const color = colors[i] ?? colors[randomIndex]

                                return (
                                    <motion.rect
                                        key={i}
                                        x={x} y={cy}
                                        width={width}
                                        fill={color}
                                        height={height}
                                        animate={{ rotate }}
                                        transformOrigin="center top"
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
                    max={10}
                    state={savedState}
                    cb={setState}
                />
                <Control
                    name="height"
                    label="length"
                    min={height}
                    max={450}
                    state={savedState}
                    cb={setState}
                />
                <Control
                    name="spacing"
                    label="spread"
                    min={spacing}
                    max={40}
                    state={savedState}
                    cb={setState}
                />
                <Control
                    name="rotate"
                    label="skew"
                    min={15}
                    max={30}
                    state={savedState}
                    cb={setState}
                />
            </div>
        </Previewer>
    );
}
