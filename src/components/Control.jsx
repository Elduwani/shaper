import { useRef, useLayoutEffect } from 'react'
import { motion, useMotionValue, transform, useDragControls } from 'framer-motion'
import { getRefSize } from '../utils'
import '../css/controls.scss'

export default function Control({ name, label, min = 0, max = 100, cb }) {
    const constraintRef = useRef(null)
    const sliderWidth = useRef(0)
    const value = useMotionValue(min)
    const x = useMotionValue(0)
    const handleSize = 20

    const progress = transform(x.get(), [0, sliderWidth.current], [0, 100])
    const dragControls = useDragControls()

    function startDrag(event) {
        dragControls.start(event, { snapToCursor: true })
    }

    useLayoutEffect(() => {
        //need to automatically calculate the computed width of the slider
        //for max value of transform input
        const { width } = getRefSize(constraintRef)
        const maxWidth = width - handleSize
        sliderWidth.current = maxWidth

        const input = [0, maxWidth]
        const output = [min, max]

        cb(st => ({ ...st, [name ?? label]: min }))

        const unsubscribe = x.onChange(latest => {
            // console.log(name, "-->", latest, max)
            const mapped = transform(latest, input, output)
            const val = ~~mapped
            value.set(val)
            cb(st => ({ ...st, [name ?? label]: val }))
        })

        return () => unsubscribe()
    }, [])

    return (
        <div className="control-wrapper">
            <div className="label">{label ?? name}</div>
            <div className="value">{value.get()}</div>
            <div className="slider" ref={constraintRef} onPointerDown={startDrag}>
                <div className="bar">
                    <motion.div
                        className="progress"
                        style={{ width: progress + "%", height: "100%" }}
                    />
                </div>
                <motion.div
                    className="handle"
                    dragElastic={0}
                    dragConstraints={constraintRef}
                    style={{ x, width: handleSize, height: handleSize }}
                    dragControls={dragControls}
                    dragMomentum={false}
                    dragDirectionLock
                    drag="x"
                />
            </div>
        </div>
    )
}
