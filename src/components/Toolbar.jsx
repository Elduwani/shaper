import { useRef } from "react"
import SvgViewbox from "./SvgViewbox";

export default function Toolbar() {
    const ref = useRef()

    const points = Array(3).fill(true).map((_, i) => {
        //Generate points to draw a triangle => "0, 60 30, 0 60, 60"
        const iconSize = 60
        const x = (iconSize / 2) * i
        const y = i === 1 ? 0 : iconSize - 3 //reducing iconSize because of oveshooting...
        return `${x}, ${y} `
    })

    return (
        <section className="toolbar-wrapper">
            <div className="toolbar">
                <div className="icon rect"></div>
                <div className="icon circle"></div>
                <div className="icon line"><div></div></div>
                <div className="icon triangle" ref={ref}>
                    <SvgViewbox containerRef={ref}>
                        <polygon points={points.join("")} />
                    </SvgViewbox>
                </div>
            </div>
        </section>
    )
}
