import { Animation } from "./sortingFunctions"

export const bubbleSort = (originalArr: number[], animations: Animation[]): number[] => {
    const arr = originalArr.splice(0)
    let end = arr.length
    let swapped = true
    while (swapped) {
        swapped = false
        for(let i = 1; i < end; i++){
            const newAnimation = {idx1: i - 1, idx2: i, translate: false}
            animations.push(newAnimation)
            if(arr[i - 1] > arr[i]){
                [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]
                swapped = true
                animations.push({...newAnimation, translate: true}, {...newAnimation, translate: true})
            } else {
                animations.push(newAnimation, newAnimation)
            }
        }
        end--
    }
    return arr
}