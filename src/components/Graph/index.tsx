import "./Graph.scss"

interface Props {
    data: number[]
}

const Graph = ({data}: Props) => {
    
    return (
        <div className="graph">
            {data.map((bar, index) => (
                <div 
                    className="graph__bar" 
                    key={`idx${index}val${bar}`}
                    style={{ height: `${bar}px`}}
                >
                </div>
            ))}
        </div>
    )
}

export default Graph