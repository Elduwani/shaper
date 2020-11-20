import { useContext, useRef, useState, useLayoutEffect } from "react"
import { StoreContext } from '../contexts/Store.context'
import { getRefSize } from "../utils";
import SvgViewbox from "./SvgViewbox";
import { FiUpload as SaveIcon } from "react-icons/fi";
import "../css/toolbar.scss"

export default function Toolbar() {

    const ref = useRef()
    const [iconSize, setIconSize] = useState(40)
    const { create, save } = useContext(StoreContext)

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
                    <div
                        className="rect"
                        onClick={() => { create("rect") }}>
                    </div>
                </li>
                <li>
                    <div
                        className="circle"
                        onClick={() => { create("circle") }}>
                    </div>
                </li>
                <li>
                    <div
                        className="line"
                        onClick={() => { create("lines") }}
                    >
                    </div>
                </li>
                <li>
                    <div
                        ref={ref}
                        style={{ border: "none" }}
                        onClick={() => { create("star") }}
                    >
                        <SvgViewbox containerRef={ref}>
                            <polygon points={points.join("")} />
                        </SvgViewbox>
                    </div>
                </li>
            </ul>

            <div className="save-button" onClick={save}>
                <SaveIcon />
            </div>
        </section>
    )
}
