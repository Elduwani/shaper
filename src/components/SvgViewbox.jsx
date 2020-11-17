import { useEffect, useState } from "react"
import { getRefSize } from "../utils"

function SvgViewbox({ children, containerRef }) {
    const [viewbox, setViewbox] = useState({ width: 100, height: 250 })

    useEffect(() => {
        const { width } = getRefSize(containerRef)
        // eslint-disable-next-line
        setViewbox(v => ({ ...v, width }))
    }, [containerRef])

    return (
        <svg
            viewBox={`0 0 ${viewbox.width} ${viewbox.height}`}
            xmlns="http://www.w3.org/2000/svg"
            height={viewbox.height + 3}
            width={viewbox.width}
        >
            {children}
        </svg>
    );
}

export default SvgViewbox;
