import { mergeSort, testAlgorithm } from "../../functions/SortingFunctions"
import "./Navbar.scss"

interface Props {
    generateNewArray: () => void,
    barArray: number[],
    setBarArray: React.Dispatch<React.SetStateAction<number[]>>
}

const Navbar = ({ generateNewArray, barArray, setBarArray }: Props) => {
    return (
        <div className='navbar'>
            <button onClick={generateNewArray}>Generate new content</button>
            <button onClick={() => setBarArray(mergeSort(barArray))}>Merge Sort</button>
            <button onClick={() => testAlgorithm(mergeSort)}>Merge Sort TEST</button>
            
            <button onClick={generateNewArray}>Quick Sort</button>
            <button onClick={generateNewArray}>Heap Sort</button>
            <button onClick={generateNewArray}>Bubble Sort</button>
        </div>
    )
}

export default Navbar