/*
# Problem Statement
You are given an m x n matrix of characters boxGrid representing a side-view of a box. Each cell of the box is one of the following:

A stone '#'
A stationary obstacle '*'
Empty '.'
The box is rotated 90 degrees clockwise, causing some of the stones to fall due to gravity. Each stone falls down until it lands on an obstacle, another stone, or the bottom of the box. Gravity does not affect the obstacles' positions, and the inertia from the box's rotation does not affect the stones' horizontal positions.

It is guaranteed that each stone in boxGrid rests on an obstacle, another stone, or the bottom of the box.

Return an n x m matrix representing the box after the rotation described above.

# Example 1:
Input: boxGrid = [["#",".","#"]]
Output: [["."],
         ["#"],
         ["#"]]

# Example 2:
Input: boxGrid = [["#",".","*","."],
              ["#","#","*","."]]
Output: [["#","."],
         ["#","#"],
         ["*","*"],
         [".","."]]


# Example 3:
Input: boxGrid = [["#","#","*",".","*","."],
              ["#","#","#","*",".","."],
              ["#","#","#",".","#","."]]
Output: [[".","#","#"],
         [".","#","#"],
         ["#","#","*"],
         ["#","*","."],
         ["#",".","*"],
         ["#",".","."]]
 

# Constraints:

m == boxGrid.length
n == boxGrid[i].length
1 <= m, n <= 500
boxGrid[i][j] is either '#', '*', or '.'.


*/


// Solution 1
function boxRotate(matrix){
    let n = matrix.length;
    let m = matrix[0].length;
    let rotatedMatrix = Array.from({length:m}, ()=>new Array(n).fill("."));
    for(let oldRow=n-1, newCol=0; oldRow>=0; oldRow--, newCol++){
        for(let oldCol = m-1, newRow=m-1; oldCol>=0; oldCol--){
            switch(matrix[oldRow][oldCol]){
                case "#": {
                    rotatedMatrix[newRow][newCol] = "#";
                    newRow--;
                    break;
                }
                case "*": {
                    newRow = oldCol;
                    rotatedMatrix[newRow][newCol] = "*";
                    newRow--;
                     break;   
                }
            }
        }
    }
    return rotatedMatrix;
}

// Solution 1 - Intuition
/*
Intuition:

When we rotate the box, rows of the original matrix become columns in the new matrix.
So for every row in the original matrix, we fill one column in the rotated matrix.

Example:
Original row → ["#", "#", ".", "*"]  (1 × 4)
Rotated column → 
[
 (0,0),
 (1,0),
 (2,0),
 (3,0)
]  (4 × 1)

👉 Notice:
- In the original matrix → row is constant
- In the rotated matrix → column becomes constant

---

Approach:

1. Create a new matrix of size (m × n), filled with ".".

2. Traverse each row of the original matrix from bottom to top.
   - For every row, we will fill one column in the new matrix.

3. Use a pointer `newRow` to track where the next stone ("#") should fall
   in the rotated matrix (simulating gravity).

4. Traverse the current row from right to left:
   
   a. If the cell contains a stone ("#"):
      - Place it at (newRow, newCol) in the rotated matrix
      - Move `newRow` upward (newRow--)

   b. If the cell contains an obstacle ("*"):
      - Place "*" at its rotated position
      - Reset `newRow` to just above the obstacle
        (since stones cannot pass through it)

5. Move to the next column in the rotated matrix and repeat.

---

Key Idea:
- We simulate gravity while rotating.
- Stones fall until they hit either:
  - the bottom, or
  - an obstacle ("*")

Time Complexity: O(n × m)
Space Complexity: O(n × m)
*/


// Solution 2
function boxRotate2(matrix){
    let n = matrix.length;
    let m = matrix[0].length;
    // 1. simulate gravity using problem moving zeroes (2 pointers)
    for(let i=0; i<n; i++){
        let left=0, right =0;
       // for each row use 2 pointers to simulate gravity as done in moving zeroes
       while(right < m){
        if(
            (
                (matrix[i][left]  =="." || matrix[i][left] =="*")  && 
                matrix[i][right] == "#"
            ) || 
            matrix[i][right] == "*"
            ){
                left = right;
        }
        if(matrix[i][right] == "." && matrix[i][left] =="#"){
            matrix[i][right] = "#";
            matrix[i][left] = ".";
            left++;
        }
        right++;
       }
    }
    console.log(matrix);
    // Step 2: Rotate the matrix (transpose + reverse rows)
    let rotated = Array.from({ length: m }, () => Array(n));
    for(let i=0; i<n; i++){
        let newCol = n-i-1;
        for(let j=0; j<m; j++){
            rotated[j][newCol] = matrix[i][j]
        }
    }
    return rotated;
}

// Solution 2- Intuition
/*
1. simulate gravity using problem moving zeroes (2 pointers), move all rocks to one side using 2 pointers left and right
2. Step 2: Rotate the matrix (transpose)
*/