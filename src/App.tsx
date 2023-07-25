import { useState, useEffect } from "react"

import { generateNewArray } from "./functions/SortingFunctions"
import { Graph, Navbar } from './components'
import './App.css'



function App() {
    const [barArray, setBarArray] = useState<number[]>([])
    const [animating, setAnimating] = useState(false)
    
    const setDefaultBarValues = () => {
        const Ammount = Math.floor((window.innerWidth - 400) / 5)
        const minValue = 10
        const maxValue = 700

        return { Ammount, minValue, maxValue }
    }

    const renderBars = () => {
        if(animating) return
        const bars = setDefaultBarValues()
        setBarArray(generateNewArray(bars.Ammount, bars.minValue, bars.maxValue))
    }

    useEffect(() => {
        renderBars()
        window.addEventListener("resize", renderBars)
        return(() => {
            window.removeEventListener("resize", renderBars)
        })
    }, [])

    return (
        <div>
            <Navbar 
                generateNewArray={renderBars}
                barArray={barArray}
            />
            <Graph data={barArray}/>
        </div>
    )
}

export default App
