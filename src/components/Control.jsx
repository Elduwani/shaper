import { useState, useRef, useLayoutEffect } from 'react'
import { motion, useMotionValue, transform } from 'framer-motion'
// import { FiChevronUp, FiChevronDown } from 'react-icons/fi'
import '../css/controls.scss'

export default function Control({ name, label, min = 0, max = 100, cb }) {
    const [value, setValue] = useState(min)
    const constraintRef = useRef(null)
    const x = useMotionValue(0)

    function handleChange(e) {
        const val = e.target.value
        if (typeof val === "number" && val >= min && val <= max) {
            setValue(val)
        }
    }

    useLayoutEffect(() => {
        const input = [0, 138]
        const output = [min, max]

        cb(st => ({ ...st, [name ?? label]: min }))

        x.onChange(latest => {
            // console.log(latest)
            const mapped = transform(latest, input, output)
            const val = ~~mapped
            setValue(val)
            cb(st => ({ ...st, [name ?? label]: val }))
        })
    }, [])

    return (
        <div className="control-wrapper">
            <div className="label">{label ?? name}</div>
            <div className="input">
                <input
                    maxLength={3}
                    value={value}
                    onChange={handleChange}
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
