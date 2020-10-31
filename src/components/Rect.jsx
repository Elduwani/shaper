import { useState } from "react";
import Svg from "./SvgViewbox";
import Control from "./Control";

function Rect() {
    const [state, setState] = useState({
        width: 100,
        height: 100,
        strokeWidth: 3,
        stroke: "red",
        radius: 5,
        fill: "none",
    })

    return (
        <>
            <Svg width={state.width} height={state.height}>
                <rect
                    width={state.width}
                    height={state.height}
                    strokeWidth={state.strokeWidth}
                    stroke={state.stroke}
                    rx={state.radius}
                    fill={state.fill}
                    x={5} y={5}
                />
            </Svg>

            <Control
                label="width"
                min={50}
                max={200}
                initial={100}
                cb={setState}
            />
        </>
    );
}

export default Rect;
