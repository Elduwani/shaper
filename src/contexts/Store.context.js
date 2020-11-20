import { createContext, useState, useRef, useEffect, useLayoutEffect } from "react"
import Rect from '../components/Rect'
import Circle from '../components/Circle'
import Line from '../components/Line'
import Star from '../components/Star'
import { v4 as uuid } from "uuid";

export const StoreContext = createContext()

export function StoreProvider(props) {
    const [components, setComponents] = useState([])
    const stateTracker = useRef()

    function create(name) {
        const id = uuid()
        setComponents(items => ([addComponent(name, id), ...items]))
    }

    function updateTracker(state, id) {
        if (stateTracker.current) {
            stateTracker.current.forEach(el => {
                if (el.id === id) el.savedState = state
            })
            // console.log("tracker updated")
        }
    }

    function save(state, id) {
        if (state && id) updateTracker(state, id)
        localStorage.setItem("components", JSON.stringify(stateTracker.current))
    }

    function removeComponent(id) {
        const filtered = components.filter(el => el.props.id !== id)
        setComponents(filtered)
    }

    useLayoutEffect(() => {
        /**
         * On componentMount load data from localStorage if exists
         * or render default component
         * localStorage.clear()
        */
        const id = uuid()
        const defaultComponent = [<Rect id={id} key={id} name="rect" />]
        const parsed = JSON.parse(localStorage.getItem("components"))

        if (parsed && parsed.length) {
            const savedState = parsed.map(el => addComponent(el.name, el.id, el.savedState))
            setComponents(savedState)
        } else setComponents(defaultComponent)

    }, []);

    useEffect(() => {
        if (components.length) {
            const newState = components.map(({ props }) => {
                const { id, name, savedState } = props
                return { id, name, savedState }
            })
            //tracker must be updated before calling save()
            stateTracker.current = newState
            //on initial mount don't save because state will be empty
            //con of this is there'll always be one component state even if all are deleted
            save()
        }
    }, [components]);


    return (
        <StoreContext.Provider value={{ components, updateTracker, save, create, removeComponent }}>
            {props.children}
        </StoreContext.Provider>
    )
}

function addComponent(name, id, state) {
    id = id ?? uuid()
    switch (name) {
        // All components require {key, id, savedState, name} 
        case "rect":
            return <Rect key={id} id={id} savedState={state} name={name} />
        case "circle":
            return <Circle key={id} id={id} savedState={state} name={name} />
        case "lines":
            return <Line key={id} id={id} savedState={state} name={name} />
        case "star":
            return <Star key={id} id={id} savedState={state} name={name} />
        default:
            // Please don't return null by default
            return <Rect key={id} id={id} savedState={state} name={name} />
    }
}