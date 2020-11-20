import { useRef, useLayoutEffect, useEffect } from 'react'
import { motion, useMotionValue, transform, useDragControls } from 'framer-motion'
import { getRefSize } from '../utils'
import '../css/controls.scss'

export default function Control({ name, label, min = 0, max = 10, cb, state }) {
    /**
     * When the component first mounts it gets initial state from either: 
     *  -- saved localStorage state (as <state> prop), 
     *  -- the minimum value (as <min> prop)
     * <state> prop is not always available to all components initially so needs check
    */
    const initialValue = state ? state[name ?? label] : min
    const value = useMotionValue(initialValue)
    const x = useMotionValue(0)
    const progressBar = useMotionValue(0)
    const constraintRef = useRef(null)
    const sliderWidth = useRef(0)
    const handleSize = 20

    const dragControls = useDragControls()

    function startDrag(event) {
        //state should be saved after this event as it resets with window resize
        dragControls.start(event, { snapToCursor: true })
    }

    function maxSliderLimit(ref) {
        //get the computed css width of the slider as it changes with responsive css
        ref = ref ?? constraintRef
        const { width } = getRefSize(constraintRef)
        return width - handleSize
    }

    useLayoutEffect(() => {
        const sliderLimit = maxSliderLimit()
        sliderWidth.current = sliderLimit

        const unsubscribe = x.onChange(latest => {
            const mapped = transform(latest, [0, sliderLimit], [min, max])
            const percent = transform(latest, [0, sliderLimit], [0, 100])
            //set motionValues
            progressBar.set(percent)
            value.set(~~mapped)

            //!IMPORTANT BUG: setState must be called last so motionValues are refreshed
            cb(st => ({ ...st, [name ?? label]: ~~mapped }))
        })

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        /**
         * If there is initial state from localStorage or slider gets reset due to 
         * window resize, calculate new <x> position. Inside a new useEffect than 
         * where <x> has an onChange handler other dependent motionValues or states
         * will be updated again. 
        */
        const sliderLimit = sliderWidth.current
        const distance = transform(initialValue, [min, max], [0, sliderLimit])
        x.set(distance)
    }, [])

    return (
        <div className="control-wrapper">
            <div className="label">{label ?? name}</div>
            <div className="value">{value.get()}</div>
            <div className="slider" ref={constraintRef} onPointerDown={startDrag}>
                <div className="bar">
                    <div
                        className="progress"
                        style={{
                            width: progressBar.get() + "%",
                            height: "100%"
                        }}
                    />
                </div>
                <motion.div
                    className="handle"
                    dragConstraints={constraintRef}
                    style={{ x, width: handleSize, height: handleSize }}
                    // dragControls={dragControls}
                    dragMomentum={false}
                    dragDirectionLock
                    dragElastic={0}
                    drag="x"
                />
            </div>
        </div>
    )
}
