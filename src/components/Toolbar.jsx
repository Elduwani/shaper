import { useRef, useState, useLayoutEffect } from "react"
import { getRefSize } from "../utils";
import SvgViewbox from "./SvgViewbox";
import "../css/toolbar.scss"

export default function Toolbar() {
    const ref = useRef()
    const [iconSize, setIconSize] = useState(40)

    const points = Array(3).fill(true).map((_, i) => {
        //Generate points to draw a triangle => "0, 50 30, 0 50, 50"
        //I could just write the points out tho...
        const x = (iconSize / 2) * i
        const y = i === 1 ? 0 : iconSize - 3 //reducing iconSize because of oveshooting...
        return `${x}, ${y} `
    })

    useLayoutEffect(() => {
        const { width, height } = getRefSize(ref)
        setIconSize(width ?? height)
    }, []);

    return (
        <section className="toolbar-wrapper">
            <ul className="toolbar">
                <li>
                    <div className="rect"></div>
                </li>
                <li>
                    <div className="circle"></div>
                </li>
                <li>
                    <div className="line"></div>
                </li>
                <li>
                    <div ref={ref} style={{ border: "none" }}>
                        <SvgViewbox containerRef={ref}>
                            <polygon points={points.join("")} />
                        </SvgViewbox>
                    </div>
                </li>
            </ul>
        </section>
    )
}
