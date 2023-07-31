import { Animation } from "./sortingFunctions"

export const heapSort = (arr: number[], animations: Animation[]) => {
    const heap = createMaxHeap(arr, animations)
    
    let heapEnd = heap.length - 1

    while (heapEnd > 0) {
        [heap[0], heap[heapEnd]] = [heap[heapEnd], heap[0]]
        let idx = 0
        const newAnimation = {idx1: 0, idx2: heapEnd, translate: true}
        animations.push(newAnimation, newAnimation, newAnimation)
        while (
            (heap[idx] < heap[heapChild(idx, "left")] && heapChild(idx, "left") < heapEnd) ||
            (heap[idx] < heap[heapChild(idx, "right")] && heapChild(idx, "right") < heapEnd)
        ){
            const newAnimation = {idx1: idx, idx2: heapChild(idx, "left"), translate: true}
            if(heapChild(idx, "right") < heapEnd){
                if(heap[heapChild(idx, "left")] >= heap[heapChild(idx, "right")]){
                    [heap[idx], heap[heapChild(idx, "left")]] = [heap[heapChild(idx, "left")], heap[idx]]
                    animations.push(newAnimation, newAnimation, newAnimation)
                    idx = heapChild(idx, "left")
                } else {
                    [heap[idx], heap[heapChild(idx, "right")]] = [heap[heapChild(idx, "right")], heap[idx]]
                    animations.push(
                        {...newAnimation, idx2: heapChild(idx, "right")},
                        {...newAnimation, idx2: heapChild(idx, "right")},
                        {...newAnimation, idx2: heapChild(idx, "right")}
                    )
                    idx = heapChild(idx, "right")
                }
            } else {
                [heap[idx], heap[heapChild(idx, "left")]] = [heap[heapChild(idx, "left")], heap[idx]]
                animations.push(newAnimation, newAnimation, newAnimation)
                idx = heapChild(idx, "left")
            }
        }
        heapEnd--
    }

    return heap
}

const createMaxHeap = (arr: number[], animations: Animation[]): number[] => {
    const heap: number[] = []
    for(let i = 0; i < arr.length; i++){
        heap.push(arr[i])
        let idx = i
        while (heap[idx] > heap[heapParent(idx)]){
            [heap[idx], heap[heapParent(idx)]] = [heap[heapParent(idx)], heap[idx]]
            const newAnimation = {idx1: idx, idx2: heapParent(idx), translate: true}
            animations.push(newAnimation, newAnimation, newAnimation)
            idx = heapParent(idx)
        }
    }
    return heap
}

const heapParent = (i: number): number => {
    return Math.floor((i - 1) / 2)
}

const heapChild = (i: number, direction: "left" | "right"): number => {
    return i * 2 + (direction === "left" ? 1 : 2)
}