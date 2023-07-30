// import { Animation } from "./sortingFunctions"

export const heapSort = (arr: number[]) => {
    const heap = createMaxHeap(arr)
    
    let heapEnd = heap.length - 1
    console.log(heap)

    while (heapEnd > 0) {
        console.log(`swap ${heap[0]}, ${heap[heapEnd]}`);// write animation here
        console.log(`delete ${heap[0]}`);// write animation here
        [heap[0], heap[heapEnd]] = [heap[heapEnd], heap[0]]
        let idx = 0
        while (
            (heap[idx] < heap[heapChild(idx, "left")] && heapChild(idx, "left") < heapEnd) ||
            (heap[idx] < heap[heapChild(idx, "right")] && heapChild(idx, "right") < heapEnd)
        ){
            if(heapChild(idx, "right") < heapEnd){
                if(heap[heapChild(idx, "left")] >= heap[heapChild(idx, "right")]){
                    console.log(`swap ${heap[idx]}, ${heap[heapChild(idx, "left")]}`);// write animation here
                    [heap[idx], heap[heapChild(idx, "left")]] = [heap[heapChild(idx, "left")], heap[idx]]
                    idx = heapChild(idx, "left")
                } else {
                    console.log(`swap ${heap[idx]}, ${heap[heapChild(idx, "right")]}`);// write animation here
                    [heap[idx], heap[heapChild(idx, "right")]] = [heap[heapChild(idx, "right")], heap[idx]]
                    idx = heapChild(idx, "right")
                }
            } else {
                console.log(`swap ${heap[idx]}, ${heap[heapChild(idx, "left")]}`);// write animation here
                [heap[idx], heap[heapChild(idx, "left")]] = [heap[heapChild(idx, "left")], heap[idx]]
                idx = heapChild(idx, "left")
            }
        }

        console.log(heap)
        console.log("----------")
        heapEnd--
    }
}

const createMaxHeap = (arr: number[]): number[] => {
    const heap: number[] = []
    for(let i = 0; i < arr.length; i++){0
        heap.push(arr[i])
        let idx = i
        while (heap[idx] > heap[heapParent(idx)]){
            [heap[idx], heap[heapParent(idx)]] = [heap[heapParent(idx)], heap[idx]]
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