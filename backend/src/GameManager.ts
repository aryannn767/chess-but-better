import { WebSocket } from "ws";
import { Game} from "./Game";

export class GameManager{
    private playerQueue: WebSocket[]
    private Games: Game[]

    constructor(){
        this.Games = []
        this.playerQueue= []
    }

    addUser(player: WebSocket){
        console.log("Player added");
        this.playerQueue.push(player)
        console.log(this.playerQueue.length);

        this.initGame()
    }

    removeUser(socket:WebSocket){
        this.playerQueue = this.playerQueue.filter(player => player !== socket);
    }

    initGame(){
        if(this.playerQueue.length < 2){
            console.log("Waiting for players to join");
            return;
        }
        this.createGame();
        console.log("Game started");
    }

    private createGame() {
        console.log("Attempting to create a game...");

        const player1 = this.playerQueue.pop();
        const player2 = this.playerQueue.pop();

        if (!player1 || !player2) {
            console.error("Error: Failed to retrieve two players for the game.");
            return;
        }

        try {
            const game = new Game(player1, player2);
            this.Games.push(game);
            game.startGame();
        } catch (error) {
            console.error("Error while starting the game:", error);
            if (player1) this.playerQueue.push(player1);
            if (player2) this.playerQueue.push(player2);
        }
    } 

    findGame(player: WebSocket): Game | undefined {
        return this.Games.find(game => game.player1 === player || game.player2 === player);
    }
}
