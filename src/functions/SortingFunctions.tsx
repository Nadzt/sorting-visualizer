// helper functions
const randomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const generateNewArray = (ammount = 1000, min = 5, max = 100): number[]=> {
    const newArray = []
    for(let i = 0; i < ammount; i++){
        newArray.push(randomInt(min, max))
    }
    return newArray
}


const arraysAreEqual = (arr1: number[], arr2: number[]): boolean => {
    if(arr1.length !== arr2.length) return false
    for(let i = 0; i < arr1.length; i++) {
        if(arr1[i] !== arr2[i]) return false
    }
    return true
}

export const testAlgorithm = (func: "merge") => {
    for(let i = 0; i < 100; i++){
        const testArr = generateNewArray()
        const javascriptSorted = [...testArr].sort((a, b) => a - b)
        let sortedTestArr: number[]
        switch (func) {
            case "merge":
                sortedTestArr = mergeSort(testArr, []).arr
                break
        }
        
        console.log(arraysAreEqual(javascriptSorted, sortedTestArr))        
    }
}

// animation functions

interface Animation {
    idx1: number,
    idx2: number,
    translate: boolean,
}

interface OffsettedArr {
    arr: number[],
    offset: number 
}

export const createAnimation = (arr: number[], func: "merge" ): void => {
    const animationsArray: Animation[] = []

    switch (func) {
        case "merge":
            mergeSort(arr, animationsArray)
    }

    animate(animationsArray)
}

export const animate = (animations: Animation []) => {
    const green = "#619677"
    const yellow = "#D5BC4C"
    const red = "#9D3340"

    const graph = document.querySelector(".graph")
    animations.map((animation, i) => {
        setTimeout(() => {
            const barArray = Array.from(document.querySelectorAll<HTMLElement>(".graph__bar"))
            barArray[animation.idx1].style.backgroundColor = yellow
            barArray[animation.idx2].style.backgroundColor = yellow
            setTimeout(() => {
                if(animation.translate) {
                    graph?.insertBefore(barArray[animation.idx2], barArray[animation.idx1])
                    barArray[animation.idx1].style.backgroundColor = red
                    barArray[animation.idx2].style.backgroundColor = red
                } else {
                    barArray[animation.idx1].style.backgroundColor = green
                    barArray[animation.idx2].style.backgroundColor = green
                }
            }, 10)

        }, 25 * i + 100)
    })
}

// sorting algorithms

export const mergeSort = (arr: number[], animations: Animation[] , offset = 0): OffsettedArr => {
    if(arr.length === 1) return { arr, offset }
    const halfIndex = Math.floor(arr.length / 2)
    const right = arr.splice(halfIndex)
    return { 
        arr: mergeArray(
            mergeSort(arr, animations, offset),
            mergeSort(right, animations, offset + halfIndex),
            animations
        ),
        offset
    }
}

const mergeArray = (left: OffsettedArr, right: OffsettedArr, animations: Animation[]): number[] => {
    const arr = []
    let rightCounter = 0
    while (left.arr.length && right.arr.length) {
        if(left.arr[0] <= right.arr[0]) {
            animations.push({idx1: left.offset + arr.length, idx2: right.offset + rightCounter, translate: false})
            arr.push(left.arr.shift())
        } else {
            animations.push({idx1: left.offset + arr.length, idx2: right.offset + rightCounter, translate: true})
            arr.push(right.arr.shift())
            rightCounter++
        }
    }

    return [...arr, ...left.arr, ...right.arr] as number[]
}