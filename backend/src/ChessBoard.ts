export interface Move{
    from: string;
    to: string;
}

export class ChessBoard {
    private board : string[][]; 

    constructor(){
        this.board = this.initBoard()
        console.log("ChessBoard created");
    }

    private initBoard():string[][]{
        return  [
            ['r','n','b','q','k','b','n','r'],
            ['p','p','p','p','p','p','p','p'],
            Array(8).fill(''),
            Array(8).fill(''),
            Array(8).fill(''),
            Array(8).fill(''),
            ['P','P','P','P','P','P','P','P'],
            ['R','N','B','Q','K','B','N','R'],
        ]
    }

    printBoard(): void {
        console.log("  a b c d e f g h");
        for (let i = 0; i < 8; i++) {
            const rowNumber = 8 - i;
            const row = this.board[i].map(cell => (cell === "" ? "." : cell)); 
            console.log(`${rowNumber} ${row.join(" ")}`);
        }
        console.log("  a b c d e f g h");
    }

    private toChessNotation(move:string):[number,number]{
        const col = move.charCodeAt(0) - 'a'.charCodeAt(0);
        const row = 8 - parseInt(move[1]);
        return [row,col];
    }
    
    getBoard(){
        return this.board;
    }

    movePiece(move:Move):void{
        const [fromRow,fromCol] = this.toChessNotation(move.from);
        const [toRow,toCol] = this.toChessNotation(move.to);
        console.log(`Moving piece from ${fromCol} ${fromRow} to ${toCol} ${toRow} `);
        this.board[toRow][toCol] = this.board[fromRow][fromCol];
        this.board[fromRow][fromCol] = '';
    }
}
