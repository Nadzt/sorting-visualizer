import { useState, useEffect } from "react"

import { generateNewArray } from "./functions/SortingFunctions"
import { Graph, Navbar } from './components'
import './App.css'

function App() {
    const [barArray, setBarArray] = useState<number[]>([])
    const [animating, setAnimating] = useState(false)

    const barAmmount = 300
    const minBarValue = 10
    const maxBarValue = 700
    
    useEffect(() => {
        setBarArray(generateNewArray(barAmmount, minBarValue, maxBarValue))
        return(() => {
            setBarArray(generateNewArray(barAmmount, minBarValue, maxBarValue))
        })
    }, [])

    return (
        <div>
            <Navbar 
                generateNewArray={() => setBarArray(generateNewArray(barAmmount, minBarValue, maxBarValue))}
                setBarArray={setBarArray}
                barArray={[10, 5, 9, 2, 6, 7, 10, 1]}
            />
            <Graph data={[10, 5, 9, 2, 6, 7, 10, 1]}/>
        </div>
    )
}

export default App
