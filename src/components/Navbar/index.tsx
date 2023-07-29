import { useEffect, useState } from "react"

import { generateNewArray, testAlgorithm, createAnimation } from "../../functions/sortingFunctions"
import "./Navbar.scss"

interface Props {
    barArray: number[],
    setBarArray: React.Dispatch<React.SetStateAction<number[]>>
}

// sets the default values for the bars
const setDefaultBarValues = () => {
    const Ammount = Math.floor((window.innerWidth - 400) / 5)
    const minValue = 10
    const maxValue = 700

    return { Ammount, minValue, maxValue }
}

const Navbar = ({ barArray, setBarArray }: Props) => {
    const [animating, setAnimating] = useState<"standby" | "merge" | "quick" | "heap">("standby")

    // creates a new state of barArrays on App.tsx state
    const createNewBars = () => {
        if(animating !== "standby") return
        const bars = setDefaultBarValues()
        setBarArray(generateNewArray(bars.Ammount, bars.minValue, bars.maxValue))
    }

    // creates the animation
    useEffect(() => {
        if(animating === "standby") return
        createAnimation(barArray, animating, setAnimating)
    }, [barArray, animating])


    // useEffect(() => {
    //     const bars = setDefaultBarValues()
    //     setBarArray(generateNewArray(bars.Ammount, bars.minValue, bars.maxValue))
    // }, [setBarArray])

    return (
        <div className='navbar'>
            <div style={{color: "white", fontSize: 16, textTransform: "uppercase"}}>Animating: "{animating}"</div>
            <button onClick={() => {
            if(animating !== "standby") return
            createNewBars()
            }}>Generate new content</button>
            <button onClick={() => setAnimating("merge")}>Merge Sort</button>
            <button onClick={() => testAlgorithm("merge")}>Test Merge Sort</button>
            ------------------------------
            <button onClick={() => setAnimating("quick")}>Quick Sort</button>
            <button onClick={() => testAlgorithm("quick")}>Test Quick Sort</button>
            ------------------------------
            <button onClick={() => setAnimating("heap")}>Heap Sort</button>
            ------------------------------
            <button>Bubble Sort</button>
        </div>
    )
}

export default Navbar