import { useState } from "react"

import { Graph, Navbar } from './components'
import './App.css'




function App() {
    const [barArray, setBarArray] = useState<number[]>([])

    return (
        <div>
            <Navbar 
                barArray={barArray}
                setBarArray={setBarArray}
            />
            <Graph data={barArray}/>
        </div>
    )
}

export default App
