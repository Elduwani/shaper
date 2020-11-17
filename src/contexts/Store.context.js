import { createContext, useState } from "react"
import Rect from '../components/Rect'
import Circle from '../components/Circle'
import Line from '../components/Line'
import Star from '../components/Star'
import { v4 as uuid } from "uuid";

export const StoreContext = createContext()

export function StoreProvider(props) {
    const [components, setComponents] = useState([<Rect key={uuid()} />])

    function create(name) {
        const id = uuid()
        setComponents(items => ([make(name, id), ...items]))
    }

    function remove(id) {
        const filtered = components.filter(el => el.id !== id)
        setComponents(filtered)
    }

    return (
        <StoreContext.Provider value={{ components, create, remove }}>
            {props.children}
        </StoreContext.Provider>
    )
}

function make(name, id) {
    switch (name) {
        case "rect":
            return <Rect key={id} />
        case "circle":
            return <Circle key={id} />
        case "lines":
            return <Line key={id} />
        case "star":
            return <Star key={id} />
        default:
            return null
    }
}