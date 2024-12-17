import { useState } from "react";

const ChessBoard = ({board,socket}:{board:string[][], socket:WebSocket}) => {

    function toChessNotation(i:number,j:number){
        const files="abcdefgh";
        const rank = 8 - i;
        const file = files[j]; 
        return `${file}${rank}`
    }

    const[from, setFrom] = useState<string| null>(null);
    const[to, setTo] = useState<string| null>(null);
    const onClick = (i:number, j:number)=> {
        const move = toChessNotation(i,j);
        if(from === null){
            setFrom(move);
        }else if(to === null){
            setTo(move);
            socket.send(JSON.stringify({type:'move', move:{from: from, to:move}}));
            //const currentFrom = from
            //const currentTo = move
            //console.log('Move',currentFrom,currentTo);

            setFrom(null);
            setTo(null);
        }
    }
    return (
        <div>
            {
                board.map((row, i) => (
                    <div key={i} className="flex">
                        {
                            row.map((cell, j) => (
                                <div key={j} className={`w-20 h-20 flex items-center justify-center ${i % 2 === j % 2 ? 'bg-gray-300' : 'bg-gray-500'}`}
                                    onClick={()=>{onClick(i,j)}}>
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
