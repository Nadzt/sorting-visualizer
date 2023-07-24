// helper functions
export const randomInt = (min: number, max: number): number => {
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

export const testAlgorithm = (func: (x: number[]) => number[]) => {
    for(let i = 0; i < 100; i++){
        const testArr = generateNewArray()
        const javascriptSorted = [...testArr].sort((a, b) => a - b)
        const sortedTestArr = func(testArr)
        console.log(arraysAreEqual(javascriptSorted, sortedTestArr))        
    }
}

// sorting algorithms

export const mergeSort = (arr: number[]): number[] => {
    if(arr.length === 1) return arr
    const halfIndex = arr.length / 2
    const right = arr.splice(halfIndex)
    return mergeArray(mergeSort(arr), mergeSort(right))
}

const mergeArray = (left: number[], right: number[]): number[] => {
    const arr = []
    while (left.length && right.length) {
        if(left[0] < right[0]) {
            arr.push(left.shift())
        } else {
            arr.push(right.shift())
        }
    }
    return [...arr, ...left, ...right] as number[]
}
