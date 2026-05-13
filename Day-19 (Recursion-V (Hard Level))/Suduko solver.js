/*
# Problem Statement:
Create a program that fills in the blank cells in a Sudoku puzzle to solve it.

Every sudoku solution needs to follow to these guidelines:

1) In every row, the numbers 1 through 9 must appear exactly once.

2) In every column, the numbers 1 through 9 must appear exactly once.

3) In each of the grid's nine 3x3 sub-boxes, the numbers 1 through 9 must appear exactly once.

Empty cells are indicated by the '.' character.


Example 1

    Input : board = [ ["5", "3", ".", ".", "7", ".", ".", ".", "."] , ["6", ".", ".", "1", "9", "5", ".", ".", "."] , [".", "9", "8", ".", ".", ".", ".", "6", "."] , ["8", ".", ".", ".", "6", ".", ".", ".", "3"] , ["4", ".", ".", "8", ".", "3", ".", ".", "1"] , ["7", ".", ".", ".", "2", ".", ".", ".", "6"] , [".", "6", ".", ".", ".", ".", "2", "8", "."] , [".", ".", ".", "4", "1", "9", ".", ".", "5"] , [".", ".", ".", ".", "8", ".", ".", "7", "9"] ]

    Output : [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]

    Explanation : The Input and Output boards are shown above.

Example 2

    Input : board = [ [ ".", ".", ".", ".", ".", ".", "7", ".", ".", ], [ "7", ".", "5", ".", ".", ".", "9", ".", ".", ], [ ".", ".", ".", "9", "7", "5", "4", "3", "1", ], [ "9", ".", ".", ".", "4", "1", ".", ".", "7", ], [ ".", "5", ".", "8", ".", "7", "6", "4", ".", ], [ ".", "7", ".", ".", "2", ".", ".", ".", ".", ], [ ".", "4", ".", ".", ".", ".", ".", "6", "9", ], [ "1", "6", ".", "4", "3", ".", ".", ".", ".", ], [ ".", ".", ".", ".", "6", "2", "3", ".", "4", ] ]

    Output : [ [ "4", "1", "9", "3", "8", "6", "7", "5", "2", ], [ "7", "3", "5", "2", "1", "4", "9", "8", "6", ], [ "8", "2", "6", "9", "7", "5", "4", "3", "1", ], [ "9", "8", "3", "6", "4", "1", "5", "2", "7", ], [ "2", "5", "1", "8", "9", "7", "6", "4", "3", ], [ "6", "7", "4", "5", "2", "3", "1", "9", "8", ], [ "3", "4", "7", "1", "5", "8", "2", "6", "9", ], [ "1", "6", "2", "4", "3", "9", "8", "7", "5", ], [ "5", "9", "8", "7", "6", "2", "3", "1", "4", ] ]

    Explanation : The Input and output board are shown above.
*/


/*

# Intuition

    1. Place a digit for the ith row if its a valid position
    2. check for the rest of digits
*/


// Solution
class Solution {
    _solve(board){
        for(let i=0; i<9; i++){
            for(let j =0; j<9; j++){
                if(board[i][j] == '.'){
                    for(let digit =  1; digit <=  9 ; digit++){
                        if(this.areRulesMet(board, i, j, digit)){
                            board[i][j] = digit.toString();
                            if(this._solve(board)){
                                return true;
                            }else{
                                board[i][j] = '.';
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    areRulesMet(board, row, col, digit){
        for(let i=0; i<9; i++){
            if(Number(board[row][i]) === digit || Number(board[i][col]) === digit){
                return false;
            }
        }
        let startRow = Math.floor(row/3) * 3;
        let startCol = Math.floor(col/3) * 3;

        for(let i= startRow; i<startRow+3; i++){
            for(let j= startCol; j < startCol+3; j++){
                if(Number(board[i][j])== digit){
                    return false;
                }
            }
        }
        return true;
    }
    solveSudoku(board) {
    this._solve(board);
    return board.map(r=> r.join(" ")).join("\n");
    }
}



/*
# Complexity Analysis
    Time Complexity
        O(9^m), where m is the number of empty cells in the Sudoku grid. For every empty cell, you try 1,2,3,4,5,6,7,8,9, so maxium 9 choices and for each placement, the areRulesMet helper performs a constant time check of O(1) (specifically 9+9=18 operations).
    
    Space Complexity
        O(m), where m is the number of empty cells in the Sudoku grid. This space is used by the recursion stack depth, which corresponds to the number of cells filled during the backtracking process.
*/