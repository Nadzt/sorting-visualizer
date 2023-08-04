import { useEffect, useState } from "react"

import { generateNewArray, createAnimation } from "../../functions/sortingFunctions"
import "./Navbar.scss"

interface Props {
    barArray: number[],
    setBarArray: React.Dispatch<React.SetStateAction<number[]>>
}

// sets the default values for the bars
const setDefaultBarValues = () => {
    const padding = window.innerWidth >= 1000 ? 400 : window.innerWidth >= 800 ? 200 : 100
    const ammount = Math.floor((window.innerWidth - padding) / 5)
    const minValue = 10
    const maxValue = window.innerHeight - 250

    return { ammount, minValue, maxValue }
}

const Navbar = ({ barArray, setBarArray }: Props) => {
    const [animating, setAnimating] = useState<"standby" | "merge" | "quick" | "heap" | "bubble">("standby")
    const [speed, setSpeed] = useState(1)

    // creates a new state of barArrays on App.tsx state
    const createNewBars = () => {
        if(animating !== "standby") return
        const bars = setDefaultBarValues()
        setBarArray(generateNewArray(bars.ammount, bars.minValue, bars.maxValue))
    }

    // creates the animation
    useEffect(() => {
        if(animating === "standby") return
        createAnimation(barArray, animating, setAnimating, speed)
    }, [barArray, animating, speed])


    useEffect(() => {
        const bars = setDefaultBarValues()
        setBarArray(generateNewArray(bars.ammount, bars.minValue, bars.maxValue))
    }, [setBarArray])

    return (
        <div className='navbar'>
            <button
                disabled={animating !== "standby"}
                className={`navbar__button navbar__button--create ${animating !== "standby" ? "navbar__disabled" : ""}`}
                onClick={() => {
                    if(animating !== "standby") return
                    createNewBars()
                }}
            >
                Generate new Bars
            </button>

            <div className="navbar__sorts">
                <p className="navbar__text">
                    Speed in ms:
                </p>
                <button 
                    disabled={animating !== "standby" || speed === 1}
                    className="navbar__button navbar__button--left"
                    onClick={() => setSpeed(1)}
                >
                    1
                </button>
                <button 
                    disabled={animating !== "standby" || speed === 50}
                    onClick={() => setSpeed(50)}
                    className="navbar__button navbar__button--middle"
                >
                    50
                </button>
                <button 
                    disabled={animating !== "standby" || speed === 100}
                    onClick={() => setSpeed(100)}
                    className="navbar__button navbar__button--right"
                >
                    100
                </button>
            </div>

            <div className="navbar__sorts">
                <p className="navbar__text">
                    Sort Algorithm:
                </p>
                <button 
                    disabled={animating !== "standby"}
                    className="navbar__button navbar__button--left" 
                    onClick={() => setAnimating("merge")}
                >
                    Merge
                </button>
                <button 
                    disabled={animating !== "standby"}
                    className="navbar__button navbar__button--middle"
                    onClick={() => setAnimating("quick")}
                >
                    Quick
                </button>
                <button 
                    disabled={animating !== "standby"}
                    className="navbar__button navbar__button--middle"
                    onClick={() => setAnimating("heap")}
                >
                    Heap
                </button>
                <button 
                    disabled={animating !== "standby"}
                    className="navbar__button navbar__button--right"
                    onClick={() => setAnimating("bubble")}
                >
                    Bubble
                </button>
            </div>
        </div>
    )
}

export default Navbar