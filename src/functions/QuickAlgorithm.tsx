import { Animation } from "./sortingFunctions"

export const quickSort = (arr: number[], animations: Animation[], offset = 0): number[] => {
    if(arr.length <= 1) return arr
    const pivot = arr[arr.length - 1]
    const left: number[] = []
    const right: number[] = []
    const middle: number[] = []
    for(let i = 0; i < arr.length - 1; i++){
        const newAnimation = {
            idx1: i - right.length - middle.length + offset,
            idx2: arr.length - 1 - right.length + offset,
            translate: false
    }
        if(pivot > arr[i]) { 
            animations.push(newAnimation, newAnimation, newAnimation)
            left.push(arr[i])
        }
        else if (pivot < arr[i]) { 
            animations.push(
                {...newAnimation, translate: true, offset: right.length},
                {...newAnimation, translate: true, offset: right.length},
                {...newAnimation, translate: true, offset: right.length}
            )
            right.push(arr[i])
        }
        else {
            animations.push(
                {...newAnimation, translate: true},
                {...newAnimation, translate: true},
                {...newAnimation, translate: true}
            )
            middle.push(arr[i])
        }
    }
    middle.push(pivot)
    const newOffset = offset + left.length + middle.length
    arr.splice(1) // prevents sorting the same array twice
    return quickMerge(quickSort(left, animations, offset), middle, quickSort(right, animations, newOffset))
}

const quickMerge = (left: number[], middle: number[], right: number[]): number[] => {
    return [...left, ...middle, ...right]
}