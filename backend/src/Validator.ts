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
            if(!kingPosition){
                console.log('no king');
                return true;
            }
            for(let i = 0; i < 8; i++){
                for(let j = 0; j < 8; j++){
                    const opponentPiece = this.board[i][j];
                    if(opponentPiece !== '' && opponentPiece !== opponentPiece.toLowerCase()){
                        const possibleMoves = this.getAllPossibleMoves(i,j);
                        for(let move of possibleMoves){
                            const [row,col] = move;
                            if(row === kingPosition[0] && col === kingPosition[1]){
                                return true;
                            }    
                        }
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
            if(!kingPosition){
                console.log('no king');
                return true;
            }
            for(let i = 0; i < 8; i++){
                for(let j = 0; j < 8; j++){
                    const opponentPiece = this.board[i][j];
                    if(opponentPiece !== '' && opponentPiece === opponentPiece.toLowerCase()){
                        const possibleMoves = this.getAllPossibleMoves(i,j);
                        for(let move of possibleMoves){
                            const [row,col] = move;
                            if(row === kingPosition[0] && col === kingPosition[1]){
                                return true;
                            }    
                        }
                    }
                }
            }
        }
        return  false;
    }

    isCheckMate(color:string){
        if(!this.isKingInCheck(color)){
            return false;
        }

        if(color === 'white'){
            for(let  i =0; i < 8; i++){
                for(let j=0; j<8;j++){
                    const piece = this.board[i][j];
                    console.log('i & j',i,j);
                    console.log('piece',piece);

                    if(piece !=='' && piece === piece.toLowerCase()){
                        const possibleMoves = this.getAllPossibleMoves(i,j);
                        for(let move of possibleMoves){
                            console.log('move',move);

                            //const [row,col]=move;
                            //const newBoard = this.board.map((row) => row.slice());
                            //newBoard[row][col] = newBoard[i][j];                            
                            //newBoard[i][j] = '';
                            //const newValidator = new Validator(newBoard);
                            //if(newValidator.isKingInCheck(color)){
                            //    return true;
                            //}
                        }
                    }
                }
            }
        }
        if(color === 'black'){
        }

        return false;
    }

    getPawnMoves(row:number, col:number ,piece:string):number[][]{
        let moves:number[][] = [];
        if(piece = "p"){
            if(row+1 < 8 && this.board[row+1][col] === ''){
                moves.push([row+1,col]);
            }
            if(row+1 < 8 && col+1 < 8  && this.board[row+1][col+1] !== '' && this.board[row+1][col+1] !== this.board[row+1][col+1].toLowerCase()){
                moves.push([row+1,col]);
            }

            if(row+1 < 8 && col-1 >= 0  && this.board[row+1][col-1] !== '' && this.board[row+1][col-1] !== this.board[row+1][col-1].toLowerCase()){
                moves.push([row+1,col]);
            }
            if(row === 1 && this.board[row+2][col] === ''){
                moves.push([row+2,col]);
            }
        }

        if(piece === 'P'){
            if(row-1 >= 0 && this.board[row-1][col] === ''){
                console.log('found black pawn');

                moves.push([row-1,col]);
            }
            if(row-1 >= 0 && col+1 < 8  && this.board[row-1][col+1] !== '' && this.board[row-1][col+1] !== this.board[row-1][col+1].toLowerCase()){
                moves.push([row-1,col]);
            }

            if(row-1 >= 0 && col-1 >= 0  && this.board[row-1][col-1] !== '' && this.board[row-1][col-1] !== this.board[row-1][col-1].toLowerCase()){
                moves.push([row-1,col]);
            }
            if(row === 6 && this.board[row-2][col] === ''){
                moves.push([row-2,col]);
            }
        }
        return moves;
    }

    getKnightMoves(row:number, col:number,piece:string):number[][]{
        let moves:number[][] = [];
        if(piece === 'n'){
            if(row+2 < 8 && col+1 < 8 && this.board[row+2][col+1] === '' || row+2 < 8 && col+1 < 8 && this.board[row+2][col+1] !== this.board[row+2][col+1].toLowerCase() && this.board[row+2][col+1] !== ''){
                moves.push([row+2,col+1]);
            }
            if(row+2 < 8 && col-1 >= 0 && this.board[row+2][col-1] === '' || row+2 < 8 && col-1 >= 0 && this.board[row+2][col-1] !== this.board[row+2][col-1].toLowerCase() && this.board[row+2][col-1] !== ''){
                moves.push([row+2,col-1]);
            }
            if(row-2 >= 0 && col+1 < 8 && this.board[row-2][col+1] === '' || row-2 >= 0 && col+1 < 8 && this.board[row-2][col+1] !== this.board[row-2][col+1].toLowerCase() && this.board[row-2][col+1] !== ''){
                moves.push([row-2,col+1]);
            }
            if(row-2 >= 0 && col-1 >= 0 && this.board[row-2][col-1] === '' || row-2 >= 0 && col-1 >= 0 && this.board[row-2][col-1] !== this.board[row-2][col-1].toLowerCase() && this.board[row-2][col-1] !== ''){
                moves.push([row-2,col-1]);
            }
            if(row+1 < 8 && col+2 < 8 && this.board[row+1][col+2] === '' || row+1 < 8 && col+2 < 8 && this.board[row+1][col+2] !== this.board[row+1][col+2].toLowerCase() && this.board[row+1][col+2] !== ''){
                moves.push([row+1,col+2]);
            }
            if(row+1 < 8 && col-2 >= 0 && this.board[row+1][col-2] === '' || row+1 < 8 && col-2 >= 0 && this.board[row+1][col-2] !== this.board[row+1][col-2].toLowerCase() && this.board[row+1][col-2] !== ''){
                moves.push([row+1,col-2]);
            }
            if(row-1 >= 0 && col+2 < 8 && this.board[row-1][col+2] === '' || row-1 >= 0 && col+2 < 8 && this.board[row-1][col+2] !== this.board[row-1][col+2].toLowerCase() && this.board[row-1][col+2] !== ''){
                moves.push([row-1,col+2]);
            }
            if(row-1 >= 0 && col-2 >= 0 && this.board[row-1][col-2] === '' || row-1 >= 0 && col-2 >= 0 && this.board[row-1][col-2] !== this.board[row-1][col-2].toLowerCase() && this.board[row-1][col-2] !== ''){
                moves.push([row-1,col-2]);
            }
        }
        if(piece === 'N'){
            if(row+2 < 8 && col+1 < 8 && this.board[row+2][col+1] === '' || row+2 < 8 && col+1 < 8 && this.board[row+2][col+1] === this.board[row+2][col+1].toLowerCase() && this.board[row+2][col+1] !== ''){
                moves.push([row+2,col+1]);
            }
            if(row+2 < 8 && col-1 >= 0 && this.board[row+2][col-1] === '' || row+2 < 8 && col-1 >= 0 && this.board[row+2][col-1] === this.board[row+2][col-1].toLowerCase() && this.board[row+2][col-1] !== ''){
                moves.push([row+2,col-1]);
            }
            if(row-2 >= 0 && col+1 < 8 && this.board[row-2][col+1] === '' || row-2 >= 0 && col+1 < 8 && this.board[row-2][col+1] === this.board[row-2][col+1].toLowerCase() && this.board[row-2][col+1] !== ''){
                moves.push([row-2,col+1]);
            }
            if(row-2 >= 0 && col-1 >= 0 && this.board[row-2][col-1] === '' || row-2 >= 0 && col-1 >= 0 && this.board[row-2][col-1] === this.board[row-2][col-1].toLowerCase() && this.board[row-2][col-1] !== ''){
                moves.push([row-2,col-1]);
            }
            if(row+1 < 8 && col+2 < 8 && this.board[row+1][col+2] === '' || row+1 < 8 && col+2 < 8 && this.board[row+1][col+2] === this.board[row+1][col+2].toLowerCase() && this.board[row+1][col+2] !== ''){
                moves.push([row+1,col+2]);
            }
            if(row+1 < 8 && col-2 >= 0 && this.board[row+1][col-2] === '' || row+1 < 8 && col-2 >= 0 && this.board[row+1][col-2] === this.board[row+1][col-2].toLowerCase() && this.board[row+1][col-2] !== ''){
                moves.push([row+1,col-2]);
            }
            if(row-1 >= 0 && col+2 < 8 && this.board[row-1][col+2] === '' || row-1 >= 0 && col+2 < 8 && this.board[row-1][col+2] === this.board[row-1][col+2].toLowerCase() && this.board[row-1][col+2] !== ''){
                moves.push([row-1,col+2]);
            }
            if(row-1 >= 0 && col-2 >= 0 && this.board[row-1][col-2] === '' || row-1 >= 0 && col-2 >= 0 && this.board[row-1][col-2] === this.board[row-1][col-2].toLowerCase() && this.board[row-1][col-2] !== ''){
                moves.push([row-1,col-2]);
            }
        }
        return moves;
    }
    getBishopMoves(row: number, col: number, piece: string): number[][] {
        let moves: number[][] = [];

        // Helper function to check if the piece is an opponent's piece
        const isOpponentPiece = (targetPiece: string) =>
            piece === 'b' ? targetPiece === targetPiece.toUpperCase() : targetPiece === targetPiece.toLowerCase();

        // Diagonal directions for bishop movement
        const directions = [
            [1, 1],  // Down-Right (Diagonal)
            [1, -1], // Down-Left (Diagonal)
            [-1, -1], // Up-Left (Diagonal)
            [-1, 1]  // Up-Right (Diagonal)
        ];

        for (const [dx, dy] of directions) {
            for (let i = 1; i < 8; i++) {
                const newRow = row + i * dx;
                const newCol = col + i * dy;

                // Check if the new position is within bounds
                if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) {
                    break;
                }

                const targetPiece = this.board[newRow][newCol];

                if (targetPiece === '') {
                    moves.push([newRow, newCol]);
                } else if (isOpponentPiece(targetPiece)) {
                    moves.push([newRow, newCol]);
                    break; // Stop after capturing
                } else {
                    break; // Stop at blocking piece
                }
            }
        }

        return moves;
    }

    getRookMoves(row: number, col: number, piece: string): number[][] {
        let moves: number[][] = [];

        // Helper functions to check opponent and same color pieces
        const isOpponentPiece = (targetPiece: string) =>
            piece === 'r' ? targetPiece === targetPiece.toUpperCase() : targetPiece === targetPiece.toLowerCase();

        const isSameColorPiece = (targetPiece: string) =>
            piece === 'r' ? targetPiece === targetPiece.toLowerCase() : targetPiece === targetPiece.toUpperCase();

        // Directions: down, up, right, left
        const directions = [
            [1, 0],  // Down
            [-1, 0], // Up
            [0, 1],  // Right
            [0, -1]  // Left
        ];

        for (const [dx, dy] of directions) {
            for (let i = 1; i < 8; i++) {
                const newRow = row + i * dx;
                const newCol = col + i * dy;

                // Check if the new position is within bounds
                if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) {
                    break;
                }

                const targetPiece = this.board[newRow][newCol];

                if (targetPiece === '') {
                    moves.push([newRow, newCol]);
                } else if (isOpponentPiece(targetPiece)) {
                    moves.push([newRow, newCol]);
                    break; // Stop after capturing
                } else if (isSameColorPiece(targetPiece)) {
                    break; // Stop at blocking piece
                }
            }
        }

        return moves;
    }
    getQueenMoves(row: number, col: number, piece: string): number[][] {
        let moves: number[][] = [];

        // Helper function to check if the piece is an opponent's piece
        const isOpponentPiece = (targetPiece: string) =>
            piece === 'q' ? targetPiece === targetPiece.toUpperCase() : targetPiece === targetPiece.toLowerCase();

        // Directions for rook-like (straight) and bishop-like (diagonal) movements
        const directions = [
            [1, 0],  // Down
            [-1, 0], // Up
            [0, 1],  // Right
            [0, -1], // Left
            [1, 1],  // Down-Right (Diagonal)
            [1, -1], // Down-Left (Diagonal)
            [-1, -1], // Up-Left (Diagonal)
            [-1, 1]  // Up-Right (Diagonal)
        ];

        for (const [dx, dy] of directions) {
            for (let i = 1; i < 8; i++) {
                const newRow = row + i * dx;
                const newCol = col + i * dy;

                // Check if the new position is within bounds
                if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) {
                    break;
                }

                const targetPiece = this.board[newRow][newCol];

                if (targetPiece === '') {
                    moves.push([newRow, newCol]);
                } else if (isOpponentPiece(targetPiece)) {
                    moves.push([newRow, newCol]);
                    break; // Stop after capturing
                } else {
                    break; // Stop at blocking piece
                }
            }
        }

        return moves;
    }
    getKingMoves(row:number, col:number, piece:string):number[][]{
        let moves:number[][] = [];
        if(piece === 'k'){
            if(row+1 < 8 && col+1 < 8 && this.board[row+1][col+1] === '' || row+1 < 8 && col+1 < 8 && this.board[row+1][col+1] !== this.board[row+1][col+1].toLowerCase() && this.board[row+1][col+1] !== ''){
                moves.push([row+1,col+1]);
            }
            if(row+1 < 8 && col-1 >= 0 && this.board[row+1][col-1] === '' || row+1 < 8 && col-1 >= 0 && this.board[row+1][col-1] !== this.board[row+1][col-1].toLowerCase() && this.board[row+1][col-1] !== ''){
                moves.push([row+1,col-1]);
            }
            if(row-1 >= 0 && col-1 >= 0 && this.board[row-1][col-1] === '' || row-1 >= 0 && col-1 >= 0 && this.board[row-1][col-1] !== this.board[row-1][col-1].toLowerCase() && this.board[row-1][col-1] !== ''){
                moves.push([row-1,col-1]);
            }
            if(row-1 >= 0 && col+1 < 8 && this.board[row-1][col+1] === '' || row-1 >= 0 && col+1 < 8 && this.board[row-1][col+1] !== this.board[row-1][col+1].toLowerCase() && this.board[row-1][col+1] !== ''){
                moves.push([row-1,col+1]);
            }
            if(row+1 < 8 && this.board[row+1][col] === '' || row+1 < 8 && this.board[row+1][col] !== this.board[row+1][col].toLowerCase() && this.board[row+1][col] !== ''){
                moves.push([row+1,col]);
            }
            if(row-1 >= 0 && this.board[row-1][col] === '' || row-1 >= 0 && this.board[row-1][col] !== this.board[row-1][col].toLowerCase() && this.board[row-1][col] !== ''){
                moves.push([row-1,col]);
            }
            if(col+1 < 8 && this.board[row][col+1] === '' || col+1 < 8 && this.board[row][col+1] !== this.board[row][col+1].toLowerCase() && this.board[row][col+1] !== ''){
                moves.push([row,col+1]);
            }
            if(col-1 >= 0 && this.board[row][col-1] === '' || col-1 >= 0 && this.board[row][col-1] !== this.board[row][col-1].toLowerCase() && this.board[row][col-1] !== ''){
                moves.push([row,col-1]);
            }
        }
        if(piece === 'K'){
            if(row+1 < 8 && col+1 < 8 && this.board[row+1][col+1] === '' || row+1 < 8 && col+1 < 8 && this.board[row+1][col+1] === this.board[row+1][col+1].toLowerCase() && this.board[row+1][col+1] !== ''){
                moves.push([row+1,col+1]);
            }
            if(row+1 < 8 && col-1 >= 0 && this.board[row+1][col-1] === '' || row+1 < 8 && col-1 >= 0 && this.board[row+1][col-1] === this.board[row+1][col-1].toLowerCase() && this.board[row+1][col-1] !== ''){
                moves.push([row+1,col-1]);
            }
            if(row-1 >= 0 && col-1 >= 0 && this.board[row-1][col-1] === '' || row-1 >= 0 && col-1 >= 0 && this.board[row-1][col-1] === this.board[row-1][col-1].toLowerCase() && this.board[row-1][col-1] !== ''){
                moves.push([row-1,col-1]);
            }
            if(row-1 >= 0 && col+1 < 8 && this.board[row-1][col+1] === '' || row-1 >= 0 && col+1 < 8 && this.board[row-1][col+1] === this.board[row-1][col+1].toLowerCase() && this.board[row-1][col+1] !== ''){
                moves.push([row-1,col+1]);
            }
            if(row+1 < 8 && this.board[row+1][col] === '' || row+1 < 8 && this.board[row+1][col] === this.board[row+1][col].toLowerCase() && this.board[row+1][col] !== ''){
                moves.push([row+1,col]);
            }
            if(row-1 >= 0 && this.board[row-1][col] === '' || row-1 >= 0 && this.board[row-1][col] === this.board[row-1][col].toLowerCase() && this.board[row-1][col] !== ''){
                moves.push([row-1,col]);
            }
            if(col+1 < 8 && this.board[row][col+1] === '' || col+1 < 8 && this.board[row][col+1] === this.board[row][col+1].toLowerCase() && this.board[row][col+1] !== ''){
                moves.push([row,col+1]);
            }
            if(col-1 >= 0 && this.board[row][col-1] === '' || col-1 >= 0 && this.board[row][col-1] === this.board[row][col-1].toLowerCase() && this.board[row][col-1] !== ''){
                moves.push([row,col-1]);
            }
        }
        return moves;
    }

    // get all possible moves of the piece
    getAllPossibleMoves(row:number, col:number){
        let moves: number[][]= [];
        if(this.board[row][col] !== ''){
            const piece = this.board[row][col];
            if(piece === 'p' || piece === 'P'){
                moves = this.getPawnMoves(row,col ,piece);
            }
            if(piece === 'r' || piece === 'R'){
                moves = this.getRookMoves(row,col ,piece);
            }
            if(piece === 'n' || piece === 'N'){
                moves = this.getKnightMoves(row,col ,piece);
            }
            if(piece === 'b' || piece === 'B'){
                moves = this.getBishopMoves(row,col ,piece);
            }
            if(piece === 'q' || piece === 'Q'){
                moves = this.getQueenMoves(row,col ,piece);
            }
            if(piece === 'k' || piece === 'K'){
                moves = this.getKingMoves(row,col ,piece);
            }
        }
        return moves;
    }
}
