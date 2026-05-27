/*
# Problem Statement:
    Given two integers m and n, representing the number of rows and columns of a 2d array named matrix. Return the number of unique ways to go from the top-left cell (matrix[0][0]) to the bottom-right cell (matrix[m-1][n-1]).
    Movement is allowed only in two directions from a cell: right and bottom.


Example 1

    Input: m = 3, n = 2

    Output: 3

    Explanation:

    There are 3 unique ways to go from the top left to the bottom right cell.

    1) right -> down -> down

    2) down -> right -> down

    3) down -> down -> right

Example 2

    Input: m = 2, n = 4

    Output: 4

    Explanation:

    There are 4 unique ways to go from the top left to the bottom right cell.

    1) down -> right -> right -> right

    2) right -> down -> right -> right

    3) right -> right -> down -> right

    4) right -> right -> right -> down

# Constraints

    1 <= n, m <= 100
    The answer will not exceed 109
*/


/*
# Intuition
   
    At every cell, we can move only in two directions: right or down.
    To reach any cell (i, j), we must have come either from the top cell (i-1, j) or the left cell (i, j-1).
    So, the total number of paths to reach a cell is simply the sum of paths from top and left.
    We initialize the first row and first column with 1 because there is only one way to reach those cells (move straight right or straight down).
    Using DP avoids recalculating the same paths repeatedly, making the solution efficient.
*/


// Solution
class Solution {
    countPathsMemoization(m, n, i, j, dp){
        if(i > m || j > n){
            return 0;
        }
        if(i == m && j == n){
            return 1;
        }
        if(dp[i][j] != -1){
            return dp[i][j]
        }
        let down = this.countPaths(m, n, i+1, j, dp);
        let right = this.countPaths(m, n, i, j+1, dp)
        return dp[i][j] =   down + right;
    }
    countPathsTabulation(m, n){
         let dp = Array.from({length:m}, ()=> new Array(n).fill(1));

         for(let i = 1; i<m; i++){
            for(let j= 1; j < n ; j++){
                dp[i][j] = dp[i-1][j] + dp[i][j-1];
            }
         }
         return dp[m-1][n-1];
    }
    uniquePaths(m, n) {
        // let dp = Array.from({length:m+1}, ()=> new Array(n+1).fill(-1));
        // return this.countPathsMemoization(m, n, 1, 1, dp);
        return this.countPathsTabulation(m, n)
    }
}



/*
# Complexity Analysis

Time Complexity
    O(m * n) where m is the number of rows and n is the number of columns, because the nested loops visit each cell of the dp table exactly once.

Space Complexity
    O(m * n) to store the 2D array of size m x n.
*/