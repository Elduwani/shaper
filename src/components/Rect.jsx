import { useState, useRef } from "react";
import { motion } from "framer-motion"
import Svg from "./SvgViewbox";
import Control from "./Control";
// import ColorPicker from "./ColorPicker";
import { CONSTANTS } from "../utils"

export default function Rect() {
    const containerRef = useRef()
    const [state, setState] = useState({ width: 100, height: 100, radius: 10, rotate: 0 })
    const [primary] = useState({ fill: '#06cdff', stroke: "cyan", strokeWidth: 2 })
    const [secondary] = useState({ fill: 'transparent', stroke: "#8200ff", strokeWidth: 3 })
    // const [selected, setSelected] = useState(null)
    // const isPrimary = selected === 'primary'

    const { width, height, radius, rotate } = state
    let { containerWidth, containerHeight } = CONSTANTS,
        centerX = (containerWidth / 2) - (width / 2),
        centerY = (containerHeight / 2) - (height / 2);

    function handleSelect(e) {
        e.stopPropagation()
        // const name = e.target.getAttribute('name')
        // !selected ? setSelected(name) : setSelected(null)
    }

    return (
        <div className="shape-wrapper">
            <div ref={containerRef} className="svg-container">
                <Svg containerRef={containerRef}>
                    <motion.rect
                        name="secondary"
                        fill={secondary.fill}
                        rx={radius}
                        x={centerX - 15} y={centerY - 15}
                        width={width}
                        height={height}
                        stroke={secondary.stroke}
                        strokeWidth={secondary.strokeWidth}
                        animate={{ rotate }}
                        dragConstraints={containerRef}
                        onClick={handleSelect}
                        // dragElastic={false}
                        drag
                    />
                    <motion.rect
                        name="primary"
                        fill={primary.fill}
                        rx={radius}
                        x={centerX} y={centerY}
                        width={width} height={height}
                        animate={{ rotate }}
                        dragConstraints={containerRef}
                        onClick={handleSelect}
                        // dragElastic={false}
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
        </div>
    );
}
