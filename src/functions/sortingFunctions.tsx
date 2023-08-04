import { randomInt, arraysAreEqual } from "./helperFunctions"
import { mergeSort } from "./mergeAlgorithm.tsx"
import { quickSort } from "./quickAlgorithm.tsx"
import { heapSort } from "./heapAlgorithm.tsx"
import { bubbleSort } from "./bubbleAlgorithm.tsx"

// interfaces and types
export interface Animation {
    idx1: number,
    idx2: number,
    translate: boolean,
    offset?: number
}

export interface OffsettedArr {
    arr: number[],
    offset: number 
}

type sortFunc = "merge" | "quick" | "heap" | "bubble"
type setAnimatingState = React.Dispatch<React.SetStateAction<"standby" | sortFunc>>

type animationFunction = typeof mergeAnimation | typeof quickAnimation

// exports
// generates a new array of bars
export const generateNewArray = (ammount = 1000, min = 5, max = 100): number[]=> {
    const newArray = []

    for(let i = 0; i < ammount; i++){
        newArray.push(randomInt(min, max))
    }

    return newArray
}

// tests an algorithm, for development
export const testAlgorithm = (func: sortFunc) => {
    for(let i = 0; i < 100; i++){
        const testArr = generateNewArray()
        const javascriptSorted = [...testArr].sort((a, b) => a - b)
        let sortedTestArr: number[]
        switch (func) {
            case "merge":
                sortedTestArr = mergeSort(testArr, []).arr
                break
            case "quick":
                sortedTestArr = quickSort(testArr, [])
                break
            case "heap":
                sortedTestArr = heapSort(testArr, [])
                break
            case "bubble":
                sortedTestArr = bubbleSort(testArr, [])
                break

        }
        console.log(arraysAreEqual(javascriptSorted, sortedTestArr))        
    }
}

// animation functions
export const createAnimation = (arr: number[], func: sortFunc, setAnimating: setAnimatingState, speed: number): void => {
    if(arr.length <= 1) return setAnimating("standby")
    const animationsArray: Animation[] = []
    let animationFunc: animationFunction

    switch (func) {
        case "merge":
            mergeSort(arr, animationsArray, 0).arr
            animationFunc = mergeAnimation
            break
        case "quick":
            quickSort(arr, animationsArray)
            animationFunc = quickAnimation
            break
        case "heap":
            heapSort(arr, animationsArray)
            animationFunc = heapAnimation
            break
        case "bubble":
            bubbleSort(arr, animationsArray)
            animationFunc = bubbleAnimation
            break
        }

        animate(animationsArray, setAnimating, animationFunc, speed)
}

// Animations and animate function
const mergeAnimation = (graph: Element, left: HTMLElement, right: HTMLElement) => {
    graph.insertBefore(right, left)
}

const quickAnimation = (graph: Element, left: HTMLElement, right: HTMLElement, animation: Animation) => {
    if(animation.offset !== undefined) {
        const barArray = Array.from(document.querySelectorAll<HTMLElement>(".graph__bar"))
        const lastElement = barArray[animation.idx2 + animation.offset]
        lastElement.after(left)
    } else {
        graph.insertBefore(left, right)
    }
}

const heapAnimation = (_graph: Element, left: HTMLElement, right: HTMLElement) => {
    [left.style.height, right.style.height] = [right.style.height, left.style.height]
}

const bubbleAnimation = (_graph: Element, left: HTMLElement, right: HTMLElement) => {
    [left.style.height, right.style.height] = [right.style.height, left.style.height]
}


const animate = (animations: Animation [], setAnimating: setAnimatingState, func: animationFunction, speed: number) => {
    const green = "#619677"
    const yellow = "#D5BC4C"
    const red = "#9D3340"
    const black = "#0E1921"
    const animationTime = speed

    const graph = document.querySelector(".graph")
    for (let i = 0; i < animations.length; i++) {
        setTimeout(() => {
            const barArray = Array.from(document.querySelectorAll<HTMLElement>(".graph__bar"))
            const animation = animations[i]
            const leftBar = barArray[animation.idx1]
            const rightBar = barArray[animation.idx2]
            const color = i % 3 === 0 ? yellow : i % 3 === 2 ? black : animation.translate ? red : green
            leftBar.style.backgroundColor = color
            rightBar.style.backgroundColor = color
            if( animation.translate && i % 3 === 2 && graph) {
                func(graph, leftBar, rightBar, animation)
            }
        }, i * animationTime)
    }

    setTimeout(() => {
        const barArray = Array.from(document.querySelectorAll<HTMLElement>(".graph__bar"))
        for(let i = 0; i < barArray.length; i++){
            setTimeout(() => {
                barArray[i].style.backgroundColor = green
                i === barArray.length - 1 && setAnimating("standby")
            }, i * animationTime)
        }
    }, (animations.length + 1) * animationTime + 50)
}