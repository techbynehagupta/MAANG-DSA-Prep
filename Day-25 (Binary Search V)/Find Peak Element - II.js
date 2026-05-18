/*
# Problem Statement:
Given a 0-indexed n x m matrix mat where no two adjacent cells are equal, find any peak element mat[i][j] and return the array [i, j].A peak element in a 2D grid is an element that is strictly greater than all of its adjacent neighbours to the left, right, top, and bottom.
Assume that the entire matrix is surrounded by an outer perimeter with the value -1 in each cell.
Note: As there can be many peak values, 1 is given as output if the returned index is a peak number, otherwise 0.


Example 1

    Input: mat=[[10, 20, 15], [21, 30, 14], [7, 16, 32]]

    Output: [1, 1]

    Explanation: The value at index [1, 1] is 30, which is a peak element because all its neighbours are smaller or equal to it. Similarly, {2, 2} can also be picked as a peak.

Example 2

    Input: mat=[[10, 7], [11, 17]]

    Output : [1, 1]

    Explanation:The value at index [1, 1] is 17, which is the only peak element because all its neighbours are smaller or equal to it.

# Constraints

  n == mat.length
  m == mat[i].length
  1 <= m, n <= 500
  1 <= mat[i][j] <= 105
  No two adjacent cells are equal

*/


/*
# Intuition

1. The brute-force solution to this problem involves searching for the largest element in the matrix by iterating through all cells. Since the question suggests that no two adjacent elements are equal, the largest element will be the peak element. However, this approach has a time complexity of O(N*M), where N is the number of rows and M is the number of columns.
2. To optimize the previous solution, binary search can be employed. The intuition behind the peak element in 1-D array can be used here. For each element (mid), we check if it is greater than its previous and next elements. If so, mid is identified as a peak element. Alternatively, if mid is smaller than its previous element, a peak must exist on the left side, so the right half is eliminated. Similarly, if mid is less than the next element, a peak must exist on the right side, so the left half is eliminated. This approach trims down the search space in each iteration, thereby enhancing the time complexity.
3. Here, for a 2-D array, the search will start from range [0, col-1], where col is the total number of columns in each row. First, find the 'mid' and find out the largest element in column 'mid' and apply the same approach as a 1-D array. That is, if the element at mid is a peak, return it. Otherwise, if the left element is greater, eliminate the right half; otherwise, eliminate the left half.
*/


// Solution
// Using binary search here
class Solution {
    findMaxInCol(mat, col){
        let row =0;
        for(let i=1; i< mat.length; i++){
            if(mat[i][col] > mat[row][col]){
                row = i; 
            }
        }
        return row;
    }
    findPeakGrid(mat) {
        let n = mat.length;
        let m = mat[0].length;
        let row = Math.floor(n/2);
        let col = Math.floor(m/2);
        let adjacentCord = [[0, -1], [0, 1]];
        while(1){
            row = this.findMaxInCol(mat, col);
            let max = mat[row][col];
            for(let [x, y] of adjacentCord){
                let nbrX = row + x;
                let nbrY = col + y;
                if(
                    nbrX >= 0 && 
                    nbrX < n && 
                    nbrY >= 0 && 
                    nbrY < m && 
                    mat[nbrX][nbrY] > mat[row][col]
                ){
                    row = nbrX;
                    col = nbrY;
                    break;
                }
            }
            if(max == mat[row][col]){
                return [row, col];
            }
        }
    }
}

/*
# Complexity Analysis

Time Complexity
    O(n * log m), where n is the number of rows and m is the number of columns. The findMaxInCol function takes O(n) per iteration. In the worst case, the binary search approach (moving to the higher neighbor) will traverse the columns in O(log m) steps.

Space Complexity
    O(1), as the algorithm only uses a fixed set of scalar variables (row, col, max, nbrX, nbrY) and a constant-sized array adjacentCord regardless of the input matrix dimensions.

*/