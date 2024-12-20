import { ChessBoard, Move } from "./ChessBoard";

export class Validator{
    private board:string[][];

    constructor(board:string[][]){
        this.board = board;
    }
    getPiece(move:Move):any{
        const [fromRow,fromCol] = ChessBoard.toChessNotation(move.from);
        console.log(this.board[fromRow][fromCol].toLowerCase());
        
        switch(this.board[fromRow][fromCol].toLowerCase()){
            case 'p':
                return this.isPawnMoveValid(move);
            case 'r':
                return this.isRookMoveValid(move);
            case 'n':
                return this.isKnightMoveValid(move);
            case 'b':
                return this.isBishopMoveValid(move);
            case 'q':
                return this.isQueenMoveValid(move);
            case 'k':
                return this.isKingMoveValid(move);
            default:
                return '';
        }
    }

    isPawnMoveValid(move:Move):boolean{
        const [fromRow,fromCol] = ChessBoard.toChessNotation(move.from);
        const [toRow,toCol] = ChessBoard.toChessNotation(move.to);
        if(fromCol === toCol){
            if(fromRow - toRow === 1 || fromRow - toRow === -1){
                console.log("Pawn moves one step");
                if(this.board[toRow][toCol] !== ''){
                    console.log("Invalid move");
                    return false;
                }
                return true;
            }
            if(fromRow === 6 || fromRow === 1 && fromRow - toRow === 2 || fromRow - toRow === -2){
                if(this.board[toRow][toCol] !== ''){
                    console.log("Invalid move");
                    return false;
                }
                console.log("Pawn moves two steps");
                return true;
            }
        }
        if(Math.abs(fromCol - toCol) === 1  && fromRow - toRow === 1 && this.board[toRow][toCol] !== '' || Math.abs(fromCol - toCol) === -1  && fromRow - toRow === -1 && this.board[toRow][toCol] !== ''){
            console.log("Pawn takes piece");
            return true;
        }
        else{
            console.log("Invalid move");
            return false;
        }
    }
    isKingMoveValid(move:Move){
        const [fromRow,fromCol] = ChessBoard.toChessNotation(move.from);
        const [toRow,toCol] = ChessBoard.toChessNotation(move.to);

    }
    isQueenMoveValid(move:Move){
        const [fromRow,fromCol] = ChessBoard.toChessNotation(move.from);
        const [toRow,toCol] = ChessBoard.toChessNotation(move.to);

    }
    isRookMoveValid(move:Move){
        const [fromRow,fromCol] = ChessBoard.toChessNotation(move.from);
        const [toRow,toCol] = ChessBoard.toChessNotation(move.to);

    }
    isBishopMoveValid(move:Move){
        const [fromRow,fromCol] = ChessBoard.toChessNotation(move.from);
        const [toRow,toCol] = ChessBoard.toChessNotation(move.to);

    }
    isKnightMoveValid(move:Move){
        const [fromRow,fromCol] = ChessBoard.toChessNotation(move.from);
        const [toRow,toCol] = ChessBoard.toChessNotation(move.to);

    }
}
