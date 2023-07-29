import { OffsettedArr, Animation } from "./SortingFunctions"

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
        const newAnimation = { idx1: left.offset + arr.length, idx2: right.offset + rightCounter }
        if(left.arr[0] <= right.arr[0]) {
            animations.push({...newAnimation, translate: false}, {...newAnimation, translate: false}, {...newAnimation, translate: false})
            arr.push(left.arr.shift())
        } else {
            animations.push({...newAnimation, translate: true}, {...newAnimation, translate: true}, {...newAnimation, translate: true})
            arr.push(right.arr.shift())
            rightCounter++
        }
    }

    return [...arr, ...left.arr, ...right.arr] as number[]
}