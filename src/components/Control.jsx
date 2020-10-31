import { useState, useRef } from 'react'
import { motion, useDragControls } from 'framer-motion'
import { FiChevronUp, FiChevronDown } from 'react-icons/fi'
import '../css/controls.scss'

export default function Control({ label, min, max, initial, state, setState }) {
    const [value, setValue] = useState(initial ?? 10)
    const constraintRef = useRef(null)
    const dragControls = useDragControls()

    const startDrag = (e) => {
        console.log(e)
        dragControls.start(e, { snapToCursor: false })
    }

    function handleChange(e) {
        const val = e.target.value
        if (typeof val === "number" && val >= min && val <= max) {
            setValue(val)
        }
    }

    return (
        <div className="control-wrapper">
            <div className="label">{label}</div>
            <div className="input">
                <input
                    maxLength={3}
                    onChange={handleChange}
                    value={value}
                />
                <div className="arrows">
                    <div><FiChevronUp /></div>
                    <div><FiChevronDown /></div>
                </div>
            </div>
            <div className="slider" onPointerDown={(e) => console.log(e.pageX)}>
                <div
                    className="bar"
                    onPointerDown={startDrag}
                    ref={constraintRef}
                ></div>
                <motion.div
                    className="handle"
                    drag="x"
                    dragElastic={0}
                    dragConstraints={constraintRef}
                    dragControls={dragControls}
                // dragMomentum={false}
                />
            </div>
        </div>
    )
}
