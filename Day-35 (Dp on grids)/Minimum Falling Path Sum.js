/*
# Problem Statement:
    Given a 2d array called matrix consisting of integer values. Return the minimum path sum that can be obtained by starting at any cell in the first row and ending at any cell in the last row.
    Movement is allowed only to the bottom, bottom-right, or bottom-left cell of the current cell.


Example 1

    Input: matrix = [[1, 2, 10, 4], [100, 3, 2, 1], [1, 1, 20, 2], [1, 2, 2, 1]]

    Output: 6

    Explanation:

    One optimal route can be:-

    Start at 1st cell of 1st row -> bottom-right -> bottom -> bottom-left.

Example 2

    Input: matrix = [[1, 4, 3, 1], [2, 3, -1, -1], [1, 1, -1, 8]]

    Output: -1

    Explanation:

    One optimal route can be:-

    Start at 4th cell of 1st row -> bottom-left -> bottom.


# Constraints

    m == number of rows in matrix
    n == number of columns in matrix
    1 <= n, m <= 100
    -1000 <= matrix[i][j] <= 1000
    The answer will not exceed 109
*/


/*
# Intuition
As the question asks for minimum path sum, the first approach that comes to our mind is to take a greedy approach and always form a path by locally choosing the cheaper option. At every cell, we have three choices, to move to the bottom cell, move to the bottom-left cell or move to the bottom-right cell. Our ultimate aim is to provide a path that provides us the least path sum. Therefore at every cell, we will make the choice to move which costs us less.
We can clearly see the issue with the greedy solution. When we make local choices, we might select a path that ends up costing us much more later on.
Therefore, the only alternative left to us is to generate all possible paths and determine which path has the minimum path sum. To generate all paths, we will use recursion.

1. Fill the top most row with default values
2. for rows below that get minimum out of left, top and right of previous row and add it to current value
3. return the max value from last row
*/


// Solution
class Solution {
    minFallingPathSum(matrix) {
        let m = matrix.length, n = matrix[0].length;
        let dp = Array.from({length: m}, ()=> new Array(n).fill(0));

        for(let i=0; i<n; i++){
            dp[0][i] = matrix[0][i];
        }
        for(let i=1; i < m; i++){
            for(let j= 0; j < n;  j++){
                let left = j > 0 ? dp[i-1][j-1]: Infinity;
                let top = dp[i-1][j];
                let right = j < n-1 ? dp[i-1][j+1] : Infinity;
                let min = Math.min(top, left, right);
                dp[i][j] = matrix[i][j] + min;
            }
        }
        return Math.min(...dp[m-1]);
    }
}

/*
# Complexity Analysis

Time Complexity
    O(m * n) where m is the number of rows and n is the number of columns, because the initialization loop runs n times and the nested loop runs m-1 times for n iterations each.

Space Complexity
    O(m * n) to store the dp table of size m x n.
*/