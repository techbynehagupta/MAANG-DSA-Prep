/*
# Problem Statement:
Given a non-empty grid mat consisting of only 0s and 1s, where all the rows are sorted in ascending order, find the index of the row with the maximum number of ones.
If two rows have the same number of ones, consider the one with a smaller index. If no 1 exists in the matrix, return -1.


Example 1

    Input : mat = [ [1, 1, 1], [0, 0, 1], [0, 0, 0] ]

    Output: 0

    Explanation: The row with the maximum number of ones is 0 (0 - indexed).

Example 2

    Input: mat = [ [0, 0], [0, 0] ]

    Output: -1

    Explanation: The matrix does not contain any 1. So, -1 is the answer.

*/


/*

# Intuition

The extremely naive approach is to traverse the matrix as usual using nested loops and for every single row count the number of 1’s. Finally, return the row with the maximum no. of 1’s. If multiple rows contain the maximum no. of 1’s, return the row with the minimum index.
*/


// Solution
class Solution {
    count1s(grid, row){
        let s = 0, e = grid[row].length-1;
        while(s <=  e){
            let col = s + Math.floor((e-s)/2);
            if(grid[row][col] == 1){
                e = col-1;
            }else{
                s = col+1;
            }
        }
        return s;
    }
    rowWithMax1s(mat) {
        let n = mat.length;
        let m = mat[0].length;
        let max = 0, rowNo= -1;
        for(let i=0; i< n; i++){
            let index = this.count1s(mat, i);
            if(m-index > max){
                rowNo = i;
                max = m-index;
            }
        }
        return rowNo;
    }
}

/*
# Complexity Analysis

Time Complexity
    O(n * log(m)), where n is the number of rows and m is the number of columns. The function iterates through each of the n rows exactly once, and for each row, it performs a binary search with O(log(m)) complexity to find the first occurrence of 1.

Space Complexity
    O(1), as the algorithm uses a constant amount of extra space for variables (s, e, col, n, m, max, rowNo, index) regardless of the input size.

*/