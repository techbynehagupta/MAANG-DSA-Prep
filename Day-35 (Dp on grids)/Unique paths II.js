/*
# Problem Statement:
    Given an m x n 2d array named matrix, where each cell is either 0 or 1. Return the number of unique ways to go from the top-left cell (matrix[0][0]) to the bottom-right cell (matrix[m-1][n-1]). A cell is blocked if its value is 1, and no path is possible through that cell.
    Movement is allowed in only two directions from a cell - right and bottom.


Example 1

    Input: matrix = [[0, 0, 0], [0, 1, 0], [0, 0, 0]]

    Output: 2

    Explanation:

    The two possible paths are:

    1) down -> down-> right -> right

    2) right -> right -> down -> down

Example 2

    Input: matrix = [[0, 0, 0], [0, 0, 1], [0, 1, 0]]

    Output: 0

    Explanation:

    There is no way to reach the bottom-right cell.


# Constraints

    m == number of rows in matrix
    n == number of columns in matrix
    1 <= n, m <= 100
    Value of each cell in matrix is either 0 or 1
    The answer will not exceed 109
*/


/*
# Intuition

The only upgrade in this question is previously we were moving freely but now if we enounter any blockers then
1. for first or column we can't move forward in that row or column so no. of ways to reach that is zero
2. If we encounter any blocker in between matrix we put the ways of reaching that as zero
*/


// Solution
class Solution {
    countPathsTabulation(matrix, m, n){
        if(matrix[0][0] == 1){
            return 0;
        }
        let dp = Array.from({length:m}, ()=> new Array(n).fill(0));

        dp[0][0] = 1

         // fill first row
        for (let j = 1; j < n; j++) {
            dp[0][j] = matrix[0][j] === 1 ? 0 : dp[0][j - 1];
        }
        for(let i = 1; i < m ; i++) {
            dp[i][0] = matrix[i][0] === 1 ? 0: dp[i-1][0];
        }

         for(let i = 1; i<m; i++){
            for(let j= 1; j < n ; j++){
                if(matrix[i][j] == 1){
                    dp[i][j] = 0;
                }else{
                    dp[i][j] = dp[i-1][j] + dp[i][j-1];
                }
                
            }
         }
         return dp[m-1][n-1];
    }
    uniquePathsWithObstacles(matrix) {
        return this.countPathsTabulation(matrix, matrix.length, matrix[0].length)
    }
}



/*
# Complexity Analysis

Time Complexity
    O(m * n) where m is the number of rows and n is the number of columns. The function initializes the dp table in O(m * n), fills the first row in O(n), the first column in O(m), and performs a nested loop over the remaining (m-1) * (n-1) cells, resulting in a total time complexity of O(m * n).

Space Complexity
    O(m * n) to allocate the 2D dp array of size m x n.
*/