export const randomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const generateNewArray = (ammount = 100, min = 5, max = 100): number[]=> {
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
        const testArr = generateNewArray(randomInt(1, 1000))
        const javascriptSorted = testArr.sort()
        const sortedTestArr = func(testArr)
        console.log(arraysAreEqual(javascriptSorted, sortedTestArr))        
    }
}

export const mergeSort = (arr: number[]): number[] => {
    let newArray = arr
    newArray = [1, 200, 3, 55, 100]
    return newArray
}
