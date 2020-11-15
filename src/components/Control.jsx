import { useState, useRef, useLayoutEffect } from 'react'
import { motion, useMotionValue, transform } from 'framer-motion'
// import { FiChevronUp, FiChevronDown } from 'react-icons/fi'
import '../css/controls.scss'

export default function Control({ name, label, min = 0, max = 100, cb }) {
    const constraintRef = useRef(null)
    const sliderWidth = useRef(0)
    const [value, setValue] = useState(min)
    const x = useMotionValue(0)
    const handleSize = 20

    const progress = transform(x.get(), [0, sliderWidth.current], [0, 100])

    useLayoutEffect(() => {
        //need to automatically calculate the computed width of the slider
        //for max value of transform input
        const refStyles = window.getComputedStyle(constraintRef.current)
        const refWidth = Number(refStyles.getPropertyValue('width').replace(/[^\d]/g, ''))
        const maxWidth = refWidth - handleSize
        sliderWidth.current = maxWidth

        const input = [0, maxWidth]
        const output = [min, max]

        cb(st => ({ ...st, [name ?? label]: min }))

        const unsubscribe = x.onChange(latest => {
            // console.log(progress)
            const mapped = transform(latest, input, output)
            const val = ~~mapped
            setValue(val)
            cb(st => ({ ...st, [name ?? label]: val }))
        })

        return () => unsubscribe()
    }, [])

    return (
        <div className="control-wrapper">
            <div className="label">{label ?? name}</div>
            <div className="value">{value}</div>
            <div className="slider">
                <div className="bar" ref={constraintRef}>
                    <motion.div className="progress" style={{ width: progress + "%", height: "100%" }} />
                </div>
                <motion.div
                    drag="x"
                    dragElastic={0}
                    dragConstraints={constraintRef}
                    dragMomentum={false}
                    style={{ x, width: handleSize, height: handleSize }}
                    className="handle"
                />
            </div>
        </div>
    )
}
