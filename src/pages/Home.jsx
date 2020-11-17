import { useContext } from 'react'
import { StoreContext } from '../contexts/Store.context'

export default function Home() {
    const { components } = useContext(StoreContext)

    return (
        <section className="content-wrapper">
            {
                components
            }
        </section>

    )
}
