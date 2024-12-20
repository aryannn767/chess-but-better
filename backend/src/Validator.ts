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

    isPawnMoveValid(move: Move): boolean {
        const [fromRow, fromCol] = ChessBoard.toChessNotation(move.from);
        const [toRow, toCol] = ChessBoard.toChessNotation(move.to);

        const colDiff = toCol - fromCol; 
        const rowDiff = toRow - fromRow; 

        const isWhite = this.board[fromRow][fromCol] === 'p'; // White pawns are lowercase.
        const isTargetOccupied = this.board[toRow][toCol] !== '';
        const isTargetWhite = isTargetOccupied && this.board[toRow][toCol] === this.board[toRow][toCol].toLowerCase();

        if (isWhite && rowDiff === 1 && colDiff === 0 && !isTargetOccupied) {
            return true;
        }
        if (!isWhite && rowDiff === -1 && colDiff === 0 && !isTargetOccupied) {
            return true;
        }

        if (isWhite && fromRow === 1 && rowDiff === 2 && colDiff === 0 && !isTargetOccupied) {
            return true;
        }
        if (!isWhite && fromRow === 6 && rowDiff === -2 && colDiff === 0 && !isTargetOccupied) {
            return true;
        }

        
        if (isWhite && rowDiff === 1 && Math.abs(colDiff) === 1 && isTargetOccupied && !isTargetWhite) {
            return true;
        }
        if (!isWhite && rowDiff === -1 && Math.abs(colDiff) === 1 && isTargetOccupied && isTargetWhite) {
            return true;
        }

        return false; 
    }

    isKingMoveValid(move:Move){
        const [fromRow,fromCol] = ChessBoard.toChessNotation(move.from);
        const [toRow,toCol] = ChessBoard.toChessNotation(move.to);
        
        const colDiff = toCol - fromCol;
        const rowDiff = toRow - fromRow;

        const isWhite = this.board[fromRow][fromCol] === 'k'; // White king is lowercase.
        const isTargetOccupied = this.board[toRow][toCol] !== '';
        const isTargetWhite = isTargetOccupied && this.board[toRow][toCol] === this.board[toRow][toCol].toLowerCase();

        if(isWhite && Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1 && !isTargetOccupied){
            return true;
        }
        if(!isWhite && Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1 && !isTargetOccupied){
            return true;
        }
        if(isWhite && Math.abs(rowDiff)<=1 && Math.abs(colDiff) === 1 && isTargetOccupied && !isTargetWhite){
            return true;
        }
        if(!isWhite && Math.abs(rowDiff)<=1 && Math.abs(colDiff) === 1 && isTargetOccupied && isTargetWhite){
            return true;
        }
        return false;
    }

    isQueenMoveValid(move:Move){
        const [fromRow,fromCol] = ChessBoard.toChessNotation(move.from);
        const [toRow,toCol] = ChessBoard.toChessNotation(move.to);

        const colDiff = toCol - fromCol;
        const rowDiff = toRow - fromRow;

        const isWhite = this.board[fromRow][fromCol] === 'q'; // White king is lowercase.
        const isTargetOccupied = this.board[toRow][toCol] !== '';
        const isTargetWhite = isTargetOccupied && this.board[toRow][toCol] === this.board[toRow][toCol].toLowerCase();

        if(Math.abs(rowDiff) === Math.abs(colDiff) && !isTargetOccupied){
            if(toRow > fromRow && toCol > fromCol){
                for(let i = 1; i < Math.abs(rowDiff); i++){
                    if(this.board[fromRow+i][fromCol+i] !== ''){
                        return false;
                    }
                }
            }
            if(toRow > fromRow && toCol < fromCol){
                for(let i = 1; i < Math.abs(rowDiff); i++){
                    if(this.board[fromRow+i][fromCol-i] !== ''){
                        return false;
                    }
                }
            }
            if(toRow < fromRow && toCol < fromCol){
                for(let i = 1; i < Math.abs(rowDiff); i++){
                    if(this.board[fromRow-i][fromCol-i] !== ''){
                        return false;
                    }
                }
            }
            if(toRow < fromRow && toCol > fromCol){
                for(let i = 1; i < Math.abs(rowDiff); i++){
                    if(this.board[fromRow-i][fromCol+i] !== ''){
                        return false;
                    }
                }
            }
            return true;
        }
        if(rowDiff === 0 && !isTargetOccupied){
            if(toCol > fromCol){
                for(let i = fromCol+1; i < toCol; i++){
                    if(this.board[fromRow][i] !== ''){
                        return false;
                    }
                }
            }
            if(toCol < fromCol){
                for(let i = fromCol-1; i > toCol; i--){
                    if(this.board[fromRow][i] !== ''){
                        return false;
                    }
                }
            }
            return true;
        }
        if(colDiff === 0 && !isTargetOccupied){
            if(toRow > fromRow){
                for(let i = fromRow+1; i < toRow; i++){
                    if(this.board[i][fromCol] !== ''){
                        return false;
                    }
                }
            }
            if(toRow < fromRow){
                for(let i = fromRow-1; i > toRow; i--){
                    if(this.board[i][fromCol] !== ''){
                        return false;
                    }
                }
            }
            return true;
        }
        if(isWhite && Math.abs(rowDiff) === Math.abs(colDiff) && isTargetOccupied && !isTargetWhite){
            
            if(toRow > fromRow && toCol > fromCol){
                for(let i = 1; i < Math.abs(rowDiff); i++){
                    if(this.board[fromRow+i][fromCol+i] !== ''){
                        return false;
                    }
                }
            }
            if(toRow > fromRow && toCol < fromCol){
                for(let i = 1; i < Math.abs(rowDiff); i++){
                    if(this.board[fromRow+i][fromCol-i] !== ''){
                        return false;
                    }
                }
            }
            if(toRow < fromRow && toCol < fromCol){
                for(let i = 1; i < Math.abs(rowDiff); i++){
                    if(this.board[fromRow-i][fromCol-i] !== ''){
                        return false;
                    }
                }
            }
            if(toRow < fromRow && toCol > fromCol){
                for(let i = 1; i < Math.abs(rowDiff); i++){
                    if(this.board[fromRow-i][fromCol+i] !== ''){
                        return false;
                    }
                }
            }
            return true;
        }
        if(isWhite && rowDiff === 0 && isTargetOccupied && !isTargetWhite){

            if(toCol > fromCol){
                for(let i = fromCol+1; i < toCol; i++){
                    if(this.board[fromRow][i] !== ''){
                        return false;
                    }
                }
            }
            if(toCol < fromCol){
                for(let i = fromCol-1; i > toCol; i--){
                    if(this.board[fromRow][i] !== ''){
                        return false;
                    }
                }
            }
            return true;
        }
        if(isWhite && colDiff === 0 && isTargetOccupied && !isTargetWhite){

            if(toRow > fromRow){
                for(let i = fromRow+1; i < toRow; i++){
                    if(this.board[i][fromCol] !== ''){
                        return false;
                    }
                }
            }
            if(toRow < fromRow){
                for(let i = fromRow-1; i > toRow; i--){
                    if(this.board[i][fromCol] !== ''){
                        return false;
                    }
                }
            }
            return true;
        }
        if(!isWhite && Math.abs(rowDiff) === Math.abs(colDiff) && isTargetOccupied && isTargetWhite){

            if(toRow > fromRow && toCol > fromCol){
                for(let i = 1; i < Math.abs(rowDiff); i++){
                    if(this.board[fromRow+i][fromCol+i] !== ''){
                        return false;
                    }
                }
            }
            if(toRow > fromRow && toCol < fromCol){
                for(let i = 1; i < Math.abs(rowDiff); i++){
                    if(this.board[fromRow+i][fromCol-i] !== ''){
                        return false;
                    }
                }
            }
            if(toRow < fromRow && toCol < fromCol){
                for(let i = 1; i < Math.abs(rowDiff); i++){
                    if(this.board[fromRow-i][fromCol-i] !== ''){
                        return false;
                    }
                }
            }
            if(toRow < fromRow && toCol > fromCol){
                for(let i = 1; i < Math.abs(rowDiff); i++){
                    if(this.board[fromRow-i][fromCol+i] !== ''){
                        return false;
                    }
                }
            }
            return true;
        }
        if(!isWhite && rowDiff === 0 && isTargetOccupied && isTargetWhite){

            if(toCol > fromCol){
                for(let i = fromCol+1; i < toCol; i++){
                    if(this.board[fromRow][i] !== ''){
                        return false;
                    }
                }
            }
            if(toCol < fromCol){
                for(let i = fromCol-1; i > toCol; i--){
                    if(this.board[fromRow][i] !== ''){
                        return false;
                    }
                }
            }
            return true;
        }
        if(!isWhite && colDiff === 0 && isTargetOccupied && isTargetWhite){

            if(toRow > fromRow){
                for(let i = fromRow+1; i < toRow; i++){
                    if(this.board[i][fromCol] !== ''){
                        return false;
                    }
                }
            }
            if(toRow < fromRow){
                for(let i = fromRow-1; i > toRow; i--){
                    if(this.board[i][fromCol] !== ''){
                        return false;
                    }
                }
            }
            return true;
        }
        return false;
    }

    isRookMoveValid(move:Move){
        const [fromRow,fromCol] = ChessBoard.toChessNotation(move.from);
        const [toRow,toCol] = ChessBoard.toChessNotation(move.to);
        
        const colDiff = toCol - fromCol;
        const rowDiff = toRow - fromRow;

        const isWhite = this.board[fromRow][fromCol] === 'r'; // White king is lowercase.
        const isTargetOccupied = this.board[toRow][toCol] !== '';
        const isTargetWhite = isTargetOccupied && this.board[toRow][toCol] === this.board[toRow][toCol].toLowerCase();
        
        if(rowDiff === 0 && !isTargetOccupied){
            if(toCol > fromCol){
                for(let i = fromCol+1; i < toCol; i++){
                    if(this.board[fromRow][i] !== ''){
                        return false;
                    }
                }
            }
            if(toCol < fromCol){
                for(let i = fromCol-1; i > toCol; i--){
                    if(this.board[fromRow][i] !== ''){
                        return false;
                    }
                }
            }
            return true;
        }
        if(colDiff === 0 && !isTargetOccupied){
            if(toRow > fromRow){
                for(let i = fromRow+1; i < toRow; i++){
                    if(this.board[i][fromCol] !== ''){
                        return false;
                    }
                }
            }
            if(toRow < fromRow){
                for(let i = fromRow-1; i > toRow; i--){
                    if(this.board[i][fromCol] !== ''){
                        return false;
                    }
                }
            }
            return true;
        }
        if(isWhite && rowDiff === 0 && isTargetOccupied && !isTargetWhite){
            if(toCol > fromCol){
                for(let i = fromCol+1; i < toCol; i++){
                    if(this.board[fromRow][i] !== ''){
                        return false;
                    }
                }
            }
            if(toCol < fromCol){
                for(let i = fromCol-1; i > toCol; i--){
                    if(this.board[fromRow][i] !== ''){
                        return false;
                    }
                }
            }
            return true;
        }
        if(isWhite && colDiff === 0 && isTargetOccupied && !isTargetWhite){
            if(toRow > fromRow){
                for(let i = fromRow+1; i < toRow; i++){
                    if(this.board[i][fromCol] !== ''){
                        return false;
                    }
                }
            }
            if(toRow < fromRow){
                for(let i = fromRow-1; i > toRow; i--){
                    if(this.board[i][fromCol] !== ''){
                        return false;
                    }
                }
            }
            return true;
        }
        if(!isWhite && rowDiff === 0 && isTargetOccupied && isTargetWhite){
            if(toCol > fromCol){
                for(let i = fromCol+1; i < toCol; i++){
                    if(this.board[fromRow][i] !== ''){
                        return false;
                    }
                }
            }
            if(toCol < fromCol){
                for(let i = fromCol-1; i > toCol; i--){
                    if(this.board[fromRow][i] !== ''){
                        return false;
                    }
                }
            }
            return true;
        }
        if(!isWhite && colDiff === 0 && isTargetOccupied && isTargetWhite){
            if(toRow > fromRow){
                for(let i = fromRow+1; i < toRow; i++){
                    if(this.board[i][fromCol] !== ''){
                        return false;
                    }
                }
            }
            if(toRow < fromRow){
                for(let i = fromRow-1; i > toRow; i--){
                    if(this.board[i][fromCol] !== ''){
                        return false;
                    }
                }
            }
            return true;
        }

        return false;
    }

    isBishopMoveValid(move:Move){
        const [fromRow,fromCol] = ChessBoard.toChessNotation(move.from);
        const [toRow,toCol] = ChessBoard.toChessNotation(move.to);

        const colDiff = toCol - fromCol;
        const rowDiff = toRow - fromRow;
        const isWhite = this.board[fromRow][fromCol] === 'b'; // White king is lowercase.
        const isTargetOccupied = this.board[toRow][toCol] !== '';
        const isTargetWhite = isTargetOccupied && this.board[toRow][toCol] === this.board[toRow][toCol].toLowerCase();

        if(Math.abs(rowDiff) === Math.abs(colDiff) && !isTargetOccupied){
            if(toRow > fromRow && toCol > fromCol){
                for(let i = 1; i < Math.abs(rowDiff); i++){
                    if(this.board[fromRow+i][fromCol+i] !== ''){
                        return false;
                    }
                }
            }
            if(toRow > fromRow && toCol < fromCol){
                for(let i = 1; i < Math.abs(rowDiff); i++){
                    if(this.board[fromRow+i][fromCol-i] !== ''){
                        return false;
                    }
                }
            }
            if(toRow < fromRow && toCol < fromCol){
                for(let i = 1; i < Math.abs(rowDiff); i++){
                    if(this.board[fromRow-i][fromCol-i] !== ''){
                        return false;
                    }
                }
            }
            if(toRow < fromRow && toCol > fromCol){
                for(let i = 1; i < Math.abs(rowDiff); i++){
                    if(this.board[fromRow-i][fromCol+i] !== ''){
                        return false;
                    }
                }
            }
            return true;
        }

        if(isWhite && Math.abs(rowDiff) === Math.abs(colDiff) && isTargetOccupied && !isTargetWhite){
            if(toRow > fromRow && toCol > fromCol){
                for(let i = 1; i < Math.abs(rowDiff); i++){
                    if(this.board[fromRow+i][fromCol+i] !== ''){
                        return false;
                    }
                }
            }
            if(toRow > fromRow && toCol < fromCol){
                for(let i = 1; i < Math.abs(rowDiff); i++){
                    if(this.board[fromRow+i][fromCol-i] !== ''){
                        return false;
                    }
                }
            }
            if(toRow < fromRow && toCol < fromCol){
                for(let i = 1; i < Math.abs(rowDiff); i++){
                    if(this.board[fromRow-i][fromCol-i] !== ''){
                        return false;
                    }
                }
            }
            if(toRow < fromRow && toCol > fromCol){
                for(let i = 1; i < Math.abs(rowDiff); i++){
                    if(this.board[fromRow-i][fromCol+i] !== ''){
                        return false;
                    }
                }
            }
            return true;
        }
        if(!isWhite && Math.abs(rowDiff) === Math.abs(colDiff) && isTargetOccupied && isTargetWhite){
            if(toRow > fromRow && toCol > fromCol){
                for(let i = 1; i < Math.abs(rowDiff); i++){
                    if(this.board[fromRow+i][fromCol+i] !== ''){
                        return false;
                    }
                }
            }
            if(toRow > fromRow && toCol < fromCol){
                for(let i = 1; i < Math.abs(rowDiff); i++){
                    if(this.board[fromRow+i][fromCol-i] !== ''){
                        return false;
                    }
                }
            }
            if(toRow < fromRow && toCol < fromCol){
                for(let i = 1; i < Math.abs(rowDiff); i++){
                    if(this.board[fromRow-i][fromCol-i] !== ''){
                        return false;
                    }
                }
            }
            if(toRow < fromRow && toCol > fromCol){
                for(let i = 1; i < Math.abs(rowDiff); i++){
                    if(this.board[fromRow-i][fromCol+i] !== ''){
                        return false;
                    }
                }
            }
            return true;
        }
        return false;
    }

    isKnightMoveValid(move:Move){
        const [fromRow,fromCol] = ChessBoard.toChessNotation(move.from);
        const [toRow,toCol] = ChessBoard.toChessNotation(move.to);

        const colDiff = toCol - fromCol;
        const rowDiff = toRow - fromRow;
        const isWhite = this.board[fromRow][fromCol] === 'n'; // White king is lowercase.
        const isTargetOccupied = this.board[toRow][toCol] !== '';
        const isTargetWhite = isTargetOccupied && this.board[toRow][toCol] === this.board[toRow][toCol].toLowerCase();

        if(Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 1 && !isTargetOccupied){
            return true;
        }
        if(Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 2 && !isTargetOccupied){
            return true;
        }
        if(isWhite && Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 1 && isTargetOccupied && !isTargetWhite){
            return true;
        }
        if(isWhite && Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 2 && isTargetOccupied && !isTargetWhite){
            return true;
        }
        if(!isWhite && Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 1 && isTargetOccupied && isTargetWhite){
            return true;
        }
        if(!isWhite && Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 2 && isTargetOccupied && isTargetWhite){
            return true;
        }
        return false;
    }
    
    isKingInCheck(color:string){
        let kingPosition;
        if(color === 'white'){
            for(let i = 0; i < 8; i++){
                for(let j = 0; j < 8; j++){
                    const piece = this.board[i][j];
                    if(piece !== "" && piece === 'k'){
                        kingPosition = [i,j];
                    }
                }
            }
        }
        if(color === 'black'){
            for(let i = 0; i < 8; i++){
                for(let j = 0; j < 8; j++){
                    const piece = this.board[i][j];
                    if(piece !== "" && piece === 'K'){
                        kingPosition = [i,j];
                    }
                }
            }
        }
    }
}
