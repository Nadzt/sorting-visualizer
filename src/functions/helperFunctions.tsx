// get random int from a range
export const randomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// checks if 2 arrays are equal
export const arraysAreEqual = (arr1: number[], arr2: number[]): boolean => {
    if(arr1.length !== arr2.length) return false
    for(let i = 0; i < arr1.length; i++) {
        if(arr1[i] !== arr2[i]) return false
    }
    return true
}