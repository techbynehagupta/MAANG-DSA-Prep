/*
# Problem Statement:
Given a 2-D array mat where the elements of each row are sorted in non-decreasing order, and the first element of a row is greater than the last element of the previous row (if it exists), and an integer target, determine if the target exists in the given mat or not.


Example 1

    Input: mat = [ [1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12] ], target = 8

    Output: True

    Explanation: The target = 8 exists in the 'mat' at index (1, 3).

Example 2

    Input: mat = [ [1, 2, 4], [6, 7, 8], [9, 10, 34] ], target = 78

    Output: False

    Explanation: The target = 78 does not exist in the 'mat'. Therefore in the output, we see 'false'.

# Constraints

  n == mat.length
  m == mat[i].length
  1 <= m, n <= 100
  -104 <= mat[i][j], target <= 104
*/


/*

# Intuition
The idea here is to flatten the 2-D matrix into 1-D matrix and then apply the binary seacrh algorithm on it. The resultant 1-D matrix will be of length N*M. If the 2D matrix is flattened, it will require O(N x M) time complexity and extra space to store the 1D array. In that case, the optimal solution will no longer be maintained. So, it is needed to flatten the matrix without actually doing it.

How to apply binary search on the 1D array without actually flattening the 2D matrix:
* If the index of the 1D array can be converted into the corresponding cell number in the 2D matrix, our task will be completed. In this scenario, binary search will be used with the indices of the imaginary 1D array, ranging from 0 to (NxM)-1 (total number of elements in the 1D array = NxM). When elements are compared, the index will be converted to the cell number, and the element will be retrieved. Thus, binary search can be applied in the imaginary 1D array.
* If index = i, and no. of columns in the matrix = m, the index i corresponds to the cell with row = i / m and col = i % m. More formally, the cell is (i / m, i % m)(0-based indexing).
*/


// Solution
class Solution {
    searchMatrix(mat, target) {
        let n = mat.length;
        let m = mat[0].length;
        let s = 0, e = m*n-1;
        while(s<=e){
            let mid = s + Math.floor((e-s)/2);
            let rowNo = Math.floor(mid/m);
            let colNo = mid%m;
            // console.log(s, e, mid, "rowno, colno", rowNo, colNo, "mat[rowNo][colNo]", mat[rowNo][colNo])
            if(mat[rowNo][colNo] == target){
                return true;
            }else if(mat[rowNo][colNo] > target){
                e = mid-1;
            }else{
                s = mid+1;
            }
        }

        return false;
    }
}



/*
# Complexity Analysis

Time Complexity
    O(log(n*m)) where n is the number of rows and m is the number of columns, because the algorithm performs a binary search over the total number of elements (n*m).

Space Complexity
    O(1) because the algorithm uses a constant amount of extra space for variables (s, e, mid, rowNo, colNo) regardless of the input size.
*/