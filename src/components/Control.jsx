import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, transform } from 'framer-motion'
import { FiChevronUp, FiChevronDown } from 'react-icons/fi'
import '../css/controls.scss'

export default function Control({ label, min, max, initial, cb }) {
    const [value, setValue] = useState(min ?? 10)
    const constraintRef = useRef(null)
    const x = useMotionValue(0)

    // function handleChange(e) {
    //     const val = e.target.value
    //     if (typeof val === "number" && val >= min && val <= max) {
    //         setValue(val)
    //     }
    // }

    useEffect(() => {
        const input = [0, 116]
        const output = [min ?? 0, max]

        x.onChange(latest => {
            // console.log(latest)
            const mapped = transform(latest, input, output)
            const val = ~~mapped
            setValue(val)
            cb(st => ({ ...st, [label]: val }))
        })
    }, [x])

    return (
        <div className="control-wrapper">
            <div className="label">{label}</div>
            <div className="input">
                <input
                    maxLength={3}
                    value={value}
                />
                {/* <div className="arrows">
                    <div><FiChevronUp /></div>
                    <div><FiChevronDown /></div>
                </div> */}
            </div>
            <div className="slider">
                <div className="bar" ref={constraintRef}></div>
                <motion.div
                    drag="x"
                    dragElastic={0}
                    dragConstraints={constraintRef}
                    dragMomentum={false}
                    style={{ x }}
                    className="handle"
                />
            </div>
        </div>
    )
}
