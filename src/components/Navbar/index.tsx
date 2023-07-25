import { testAlgorithm, createAnimation, animate } from "../../functions/SortingFunctions"
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
            <button onClick={() => {
                        const animations = createAnimation(barArray, "merge")
                        animate(animations)
                        console.log(animations)
                    }
                }
            >
                Merge Sort
            </button>
            <button onClick={() => testAlgorithm("merge")}>Test Merge Sort</button>
            
            <button onClick={generateNewArray}>Quick Sort</button>
            <button onClick={generateNewArray}>Heap Sort</button>
            <button onClick={generateNewArray}>Bubble Sort</button>
        </div>
    )
}

export default Navbar