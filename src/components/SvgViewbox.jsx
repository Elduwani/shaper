import { useEffect, useState } from "react"

function SvgViewbox({ children, containerRef }) {
    const [viewbox, setViewbox] = useState({ width: 100, height: 250 })

    useEffect(() => {
        if (containerRef) {
            //Set width of viewBox to the parent element's full width
            const compStyles = window.getComputedStyle(containerRef.current);
            const width = Number(compStyles.getPropertyValue('width').replace(/[^\d]/g, ''))
            // eslint-disable-next-line
            setViewbox(v => ({ ...v, width }))
        }
    }, [])

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
