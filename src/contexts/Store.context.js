import { createContext, useState, useRef, useEffect } from "react"
import Rect from '../components/Rect'
import Circle from '../components/Circle'
import Line from '../components/Line'
import Star from '../components/Star'
import { v4 as uuid } from "uuid";
import { useInterval } from "../utils"

export const StoreContext = createContext()

export function StoreProvider(props) {
    const id = uuid()
    const [components, setComponents] = useState([<Rect id={id} key={id} name="rect" />])
    const tracker = useRef()

    function create(name) {
        const id = uuid()
        setComponents(items => ([make(name, id), ...items]))
    }

    function updateTracker(state, id) {
        if (tracker.current) {
            tracker.current.forEach(el => {
                if (el.id === id) el.state = state
            })
        }
    }

    function remove(id) {
        const filtered = components.filter(el => el.id !== id)
        setComponents(filtered)
    }

    useInterval(() => {
        localStorage.setItem("components", JSON.stringify(tracker.current))
        console.log("saved to localStorage!...")
        // const d = localStorage.getItem("components")
        // console.log(d)
    }, 15000)

    useEffect(() => {
        const d = components.map(({ props }) => ({ type: props.name, id: props.id }))
        tracker.current = d
    }, [components]);

    return (
        <StoreContext.Provider value={{ components, updateTracker, create, remove }}>
            {props.children}
        </StoreContext.Provider>
    )
}

function make(name, id) {
    switch (name) {
        case "rect":
            return <Rect key={id} id={id} name="rect" />
        case "circle":
            return <Circle key={id} id={id} name="circle" />
        case "lines":
            return <Line key={id} id={id} name="line" />
        case "star":
            return <Star key={id} id={id} name="star" />
        default:
            return null
    }
}