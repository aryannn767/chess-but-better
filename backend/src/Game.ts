import { WebSocket} from "ws";
import { ChessBoard, Move } from "./ChessBoard";


export class Game{
    public player1:WebSocket 
    public player2: WebSocket
    private board : ChessBoard

    constructor(player1: WebSocket, player2: WebSocket){
        this.player1 = player1
        this.player2 = player2
        this.board = new ChessBoard()
    }

    startGame(){
        console.log("Game started");
        this.player1.send(JSON.stringify({type:"board",board:this.board.getBoard()}))
        this.player2.send(JSON.stringify({type:"board",board:this.board.getBoard()}))
        this.player1.send("Game started");
        this.player2.send("Game started");
        this.board.printBoard()
    }

    handleMove(move:Move){
        this.board.movePiece(move)
        this.player1.send(JSON.stringify({type:"board",board:this.board.getBoard()}))
        this.player2.send(JSON.stringify({type:"board",board:this.board.getBoard()}))
        this.board.printBoard()
    }
}
