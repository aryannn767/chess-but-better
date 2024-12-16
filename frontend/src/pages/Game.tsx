import { useEffect, useState } from "react"
import ChessBoard from "./ChessBoard"

const Game = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const [board, setBoard] = useState<string[][] | null>(null)

    useEffect(() => {
        if (!socket) {
            const ws = new WebSocket("ws://localhost:3000"); // Replace with your WebSocket server URL

            ws.onopen = () => {
                console.log("Connected to WebSocket server");
            };

            ws.onmessage = (event) => {
                const message = JSON.parse(event.data);
                console.log("Message from server:", message);
                if(message.type === 'board'){
                    setBoard(message.board);
                    console.log("Board:",message.board);
                }
            };

            ws.onerror = (error) => {
                console.error("WebSocket error:", error);
            };

            ws.onclose = () => {
                console.log("WebSocket connection closed");
            };

            setSocket(ws);

            return () => {
                ws.close();
            };
        }
    }, [])

    const onClick = () => {
        if(socket && socket.readyState=== WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: "play" }));
        }
        console.log('Play')
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-y-10">
            {
                board ? (<ChessBoard board={board} />) : (
                    <div>
                        <h1 className="font-bold text-2xl">Game</h1>
                        <button className="font-bold text-gray-50 bg-green-800 px-8 py-4 rounded-lg" onClick={onClick}>
                            Play
                        </button>
                    </div>

                )
            }
        </div>
    )
}

export default Game
