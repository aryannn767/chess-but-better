const ChessBoard = ({board}:{board:string[][]}) => {
    return (
        <div>
            {
                board.map((row, i) => (
                    <div key={i} className="flex">
                        {
                            row.map((cell, j) => (
                                <div key={j} className={`w-20 h-20 flex items-center justify-center ${i % 2 === j % 2 ? 'bg-gray-300' : 'bg-gray-500'}`}>
                                    {cell}
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default ChessBoard
