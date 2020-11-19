import { useEffect, useRef } from 'react';
import { transform } from "framer-motion"

export function useInterval(callback, delay) {
    const savedCallback = useRef()

    //remember the latest callback
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        const tick = () => savedCallback.current()

        if (delay !== null) {
            let counter1 = setInterval(tick, delay)
            return () => clearInterval(counter1)
        }
        //eslint-disable-next-line
    }, [delay])
}

export function useDebounce(callback, delay, state) {
    useEffect(() => {
        const timer = setTimeout(() => callback(), delay);
        return () => clearTimeout(timer);
    }, [state ?? delay])
}

export const CONSTANTS = {
    containerWidth: 350,
    containerHeight: 250,
}

export const COLORS = [
    "#06cdff", "#8200ff", "#470c85", "#9ad3bc",
    "#f3eac2", "#f5b461", "#ec524b", "#28abb9",
    "#2d6187", "#effad3", "#a8dda8"
]

export const PALETTES = [
    ["blue", "cyan"], ["#fca3cc", "#bce6eb"],
    ["#8200ff", "#06cdff"], ["#00bcd4", "#28df99"],
    ["#ec5858", "#edf285"], ["#bbbbbb", "#f2dcbb"],
    ["#f05454", "#e8e8e8"], ["#9088d4", "#ebcfc4"],
    ["#adb36e", "#fad5ad"], ["#892cdc", "#bc6ff1"],
    ["#8bcdcd", "#cee397"], ["#bedbbb", "#8db596"],
    ["#7579e7", "#9ab3f5"], ["#a3d8f4", "#b9fffc"],
    ["#726a95", "#709fb0"], ["#931a25", "#e97171"],
    ["#ffcb8e", "#f5efef"], ["#d789d7", "#5d54a4"],
    ["#28df99", "#d2f6c5"],
]

/**
 * http://jsbin.com/quhujowota/1/edit?html,js,output
*/
export function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}
export function drawArc({ x, y, radius, startAngle, endAngle }) {
    x = x ?? radius
    y = y ?? radius
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}

export function circleVectors(cx, cy, radius, deg) {
    let points = []
    const inc = 15 //increment in degrees

    for (let angle = 0; angle < deg; angle += inc) {
        const { x, y } = polarToCartesian(cx, cy, radius, angle)
        points.push({ x, y })
    }
    return points
}

export function generateStar(s, sides = 3, cx = 0, cy = 0) {
    /**
     * pentagram image guide reference =>
     * https://www.algebra.com/algebra/homework/word/geometry/Geometry_Word_Problems.faq.question.1113151.html
    */
    const size = s / 2
    const x = (num) => transform(num, [-6, 6], [cx - size, cx + size])
    const y = (num) => transform(num, [-6, 6], [cy + size, cy - size])

    switch (sides) {
        case 4:
            //square
            return `
                ${x(0)}, ${y(6)} 
                ${x(6)}, ${y(0)} 
                ${x(0)}, ${y(-6)} 
                ${x(-6)}, ${y(0)} 
            `
        case 5:
            //Pentagram
            return `
                ${x(0)}, ${y(6)} 
                ${x(5.8)}, ${y(2)} 
                ${x(3.5)}, ${y(-5)} 
                ${x(-3.5)}, ${y(-5)} 
                ${x(-5.8)}, ${y(2)} 
            `

        case 6:
            //Hexagram
            return `
                ${x(0)}, ${y(6)} 
                ${x(5.2)}, ${y(3)} 
                ${x(5.2)}, ${y(-3)} 
                ${x(0)}, ${y(-6)} 
                ${x(-5.2)}, ${y(-3)} 
                ${x(-5.2)}, ${y(3)}
            `

        default:
            //Triangle
            return `
                ${x(0)}, ${y(6)} 
                ${x(6)}, ${y(-6)} 
                ${x(-6)}, ${y(-6)}
            `
    }
}

export function getRefSize(ref) {
    if (ref) {
        const compStyles = window.getComputedStyle(ref.current);
        const width = Number(compStyles.getPropertyValue('width').replace(/[^\d]/g, ''))
        const height = Number(compStyles.getPropertyValue('height').replace(/[^\d]/g, ''))
        return { width, height }
    }

    console.log("Ref is invalid or null")
}

export function ControlsGroup({ children }) {
    return <div className="controls">
        {children}
    </div>
}