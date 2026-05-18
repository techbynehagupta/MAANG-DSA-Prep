/*
# Problem Statement:
Given a 2D array matrix where each row is sorted in ascending order from left to right and each column is sorted in ascending order from top to bottom, write an efficient algorithm to search for a specific integer target in the matrix.


Example 1

    Input: matrix = [ [1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30] ], target = 5

    Output: True

    Explanation: The target 5 exists in the matrix in the index (1,1)

Example 2

    Input: matrix= [ [1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30] ], target = 20

    Output: False

    Explanation: The target 20 does not exist in the matrix.

# Constraints

  n == matrix.length
  m == matrix[i].length
  1 <= n, m <= 300
  -109 <= matrix[i][j] <= 109
  All the integers in each row are sorted in ascending order.
  All the integers in each column are sorted in ascending order.
  -109 <= target <= 109
*/


/*

# Intuition
* Here, the idea is to utilize the information that the matrix is sorted both row-wise (increasing from left to right) and column-wise (increasing from top to bottom). One corner of the matrix is chosen from (0, 0), (0, m-1), (n-1, 0), and (n-1, m-1). This selection ensures that moving in one direction (either vertically or horizontally) from this corner will lead only to smaller elements, while moving in the other direction will lead only to larger elements relative to the element at the chosen corner.
* This strategy enhances traversal efficiency: if the element at the corner is smaller than the target, move in the direction where larger elements are present; if the element at the corner is greater than the target, move in the direction where smaller elements are present. If neither condition applies, it indicates that the corner element is the target, and true should be returned.
*/


// Solution
class Solution {
    searchMatrix(matrix, target) {
        let n = matrix.length;
        let m = matrix[0].length;
        let row = 0, col = m-1;
        while(row < n && col >= 0){
            if(matrix[row][col] == target){
                return true;
            }
            if(matrix[row][col] > target){
                // move left
                col--;
            }else{
                // move down
                row++;
            }
        }
        return false;
    }
}



/*
# Complexity Analysis

Time Complexity
    O(n + m) where n is the number of rows and m is the number of columns, because the pointer traverses at most n rows down and m columns left.

Space Complexity
    O(1) as the algorithm only uses a fixed number of variables (row, col, n, m) regardless of the input matrix size.

*/