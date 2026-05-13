/*
# Problem Statement:
    The challenge of arranging n queens on a n × n chessboard so that no two queens attack one another is known as the "n-queens puzzle."
    Return every unique solution to the n-queens puzzle given an integer n. The answer can be returned in any sequence.
    Every solution has a unique board arrangement for the placement of the n-queens, where 'Q' and '.' stand for a queen and an empty space, respectively.

    Here are the attack rules for N-Queens:

    Same Row - No two queens can be in the same row.
    Same Column - No two queens can be in the same column.
    Same Diagonal (top-left to bottom-right) - No two queens can share the same diagonal where (row - col) is equal.
    Same Anti-Diagonal (top-right to bottom-left) - No two queens can share the same anti-diagonal where (row + col) is equal.

Example 1

    Input : n = 4

    Output : [[".Q.." , "...Q" , "Q..." , "..Q."] , ["..Q." , "Q..." , "...Q" , ".Q.."]]

    Explanation : There are two possible combinations as shown below.


Example 2

    Input : n = 2

    Output : [ [] ]

    Explanation : There is no possible combination for placing two queens on a board of size 2*2.


*/


/*

# Intuition
    1. Place a queen out of n cells
    2. Now for each n-1 queen , check the next remaining valid position 
    3. If no valid pos present for the current queen
    4. backtrack the previous queen by finding valid position if again not found repeast stp 3 and 4
    5. for checking valid position, when a queen is placed
        5.a. Push the row in rows set to chec valid row positions for next queens
        5.b. Push the col in cols set to check valid col position for next queens
        5.c Put the booked diagonals for a queen as the digonal will always have row-col, row+col
        row+col matrix, similarily you can check for row-col matrix
            [
                [0, 1, 2, 3]
                [1, 2, 3, 4]
                [2, 3, 4, 5]
                [3, 4, 5, 6]
            ]
            As you can see matrix to identify whether 2 elements meeting diagonally check their
            d1 = row-col; 
            d2 = row+col;

*/


// Solution
class Solution {
    _solve(row, n, board, cols, diag1, diag2, result){
        if(row == n){
            result.push((board.map(r=>r.join(""))));
            return;
        }
        for(let col = 0; col < n ; col++){
            const d1 = row - col;
            const d2 = row + col;
            if(
                cols.has(col)
                || diag1.has(d1)
                || diag2.has(d2)
            ){
                // not safe
                continue;
            }
            // place queen
             board[row][col] = 'Q';

             cols.add(col)
             diag1.add(d1)
             diag2.add(d2)

             this._solve(row+1, n, board, cols, diag1, diag2, result);

              // backtrack
            board[row][col] = '.';

            cols.delete(col);
            diag1.delete(d1);
            diag2.delete(d2);
        }
    }
    solveNQueens(n) {
     const board = Array.from({length: n}, ()=>new Array(n).fill('.'));

        const result = [];

        this._solve(
            0,
            n,
            board,
            new Set(),
            new Set(),
            new Set(),
            result
        );

        return result;
    }
}



/*
# Complexity Analysis
 
    Time Complexity
        O(n!), where n is the size of the board
        As for Q1- there are n options, for Q2 (n-1), for Q3 (n-2).... Qn(1) =  Total (n!)
        Pushing board in result also comes with a complexity of n^2 but it's negligible infront of n!

    Space Complexity
        O(n^2), where n^2 is used for the board storage and O(n) for the recursive call stack and the sets storing column/diagonal indices, resulting in O(n^2) total space complexity.
*/