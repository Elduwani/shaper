import { COLORS } from "../utils"

export default function ColorPicker({ setState }) {
    return (
        <div className="color-picker-wrapper">
            <ul>
                {
                    Array(10).fill(true).map((_, i) => {
                        const randomIndex = Math.round(Math.random() * COLORS.length)
                        const color = COLORS[i] ?? COLORS[randomIndex]
                        return (
                            <li
                                key={i}
                                style={{ backgroundColor: color }}
                                onClick={() => setState(st => ({ ...st, fill: color }))}
                            ></li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
