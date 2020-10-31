function SvgViewbox({ width, height, children }) {
    const w = width ? width + 10 : 200
    const h = height ? height + 10 : 200

    return (
        <svg
            viewBox={`0 0 ${w} ${h}`}
            xmlns="http://www.w3.org/2000/svg"
            width={w}
            height={h}
        >
            {children}
        </svg>
    );
}

export default SvgViewbox;
