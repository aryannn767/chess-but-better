import express from "express";
import http from "http";
import  { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";

const app = express();
const server = http.createServer(app);
const wss =new WebSocketServer({server})
const gameManager = new GameManager();

wss.on('connection',ws=>{
    console.log('Client connected')
    ws.on('message',message=>{
        const msg = JSON.parse(message.toString())
        console.log('Received:',msg)
        if(msg.type === 'play'){
            console.log('Play')
            gameManager.addUser(ws)
        }
        if(msg.type === 'move'){
            console.log('Move')
            const game = gameManager.findGame(ws)
            if(game){
                game.handleMove(msg.move)
            }
            else{
                console.log('Game not found')
            }
        }
    })
    ws.on("close", () => {
        gameManager.removeUser(ws);
        console.log("Client disconnected");
    }
    )
    ws.send("Welcome to the WebSocket server!");
}
)


server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
