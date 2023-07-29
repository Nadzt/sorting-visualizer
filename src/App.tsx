import { useState } from "react"

import { Graph, Navbar } from './components'
import './App.css'




function App() {
    const [barArray, setBarArray] = useState<number[]>([100, 50, 90, 20, 60, 30])

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
