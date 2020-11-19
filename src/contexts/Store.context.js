import { createContext, useState, useRef, useEffect } from "react"
import Rect from '../components/Rect'
import Circle from '../components/Circle'
import Line from '../components/Line'
import Star from '../components/Star'
import { v4 as uuid } from "uuid";

export const StoreContext = createContext()

export function StoreProvider(props) {
    const [components, setComponents] = useState([])
    const tracker = useRef()

    function create(name) {
        const id = uuid()
        setComponents(items => ([addComponent(name, id), ...items]))
    }

    function updateTracker(state, id) {
        if (tracker.current) {
            tracker.current.forEach(el => {
                if (el.id === id) el.savedState = state
            })
        }
    }

    function saveLocal() {
        localStorage.setItem("components", JSON.stringify(tracker.current))
        console.log("saved!...")
    }

    function removeComponent(id) {
        const filtered = components.filter(el => el.props.id !== id)
        setComponents(filtered)
    }

    useEffect(() => {
        const d = components.map(({ props }) => ({ name: props.name, id: props.id }))
        tracker.current = d
    }, [components]);

    useEffect(() => {
        // localStorage.clear()
        const id = uuid()
        const defaultComponent = [<Rect id={id} key={id} name="rect" />]
        const parsed = JSON.parse(localStorage.getItem("components"))

        if (parsed && parsed.length) {
            const savedState = parsed.map(el => addComponent(el.name, el.id, el.savedState))
            setComponents(savedState)
        } else setComponents(defaultComponent)

    }, []);

    return (
        <StoreContext.Provider value={{ components, updateTracker, saveLocal, create, removeComponent }}>
            {props.children}
        </StoreContext.Provider>
    )
}

function addComponent(name, id, state) {
    id = id ?? uuid()
    switch (name) {
        case "rect":
            return <Rect key={id} id={id} savedState={state} name="rect" />
        case "circle":
            return <Circle key={id} id={id} savedState={state} name="circle" />
        case "lines":
            return <Line key={id} id={id} savedState={state} name="line" />
        case "star":
            return <Star key={id} id={id} savedState={state} name="star" />
        default:
            return null
    }
}