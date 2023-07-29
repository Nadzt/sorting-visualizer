import { useState } from "react"

import { Graph, Navbar } from './components'
import './App.css'




function App() {
    const [barArray, setBarArray] = useState<number[]>([60, 50, 30, 10, 80, 70, 20, 40])

    return (
        <div>
            <button onClick={() => console.log(barArray)}>barArray</button>
            <Navbar 
                barArray={barArray}
                setBarArray={setBarArray}
            />
            <Graph data={barArray}/>
        </div>
    )
}

export default App
