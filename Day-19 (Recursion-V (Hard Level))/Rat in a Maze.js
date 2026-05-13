/*
# Problem Statement:
    Given a grid of dimensions n x n. A rat is placed at coordinates (0, 0) and wants to reach at coordinates (n-1, n-1).
    Find all possible paths that rat can take to travel from (0, 0) to (n-1, n-1). The directions in which rat can move are 'U' (up) , 'D' (down) , 'L' (left) , 'R' (right).
    The value 0 in grid denotes that the cell is blocked and rat cannot use that cell for travelling, whereas value 1 represents that rat can travel through the cell. If the cell (0, 0) has 0 value, then mouse cannot move to any other cell.

Note :
    In a path no cell can be visited more than once.
    If there is no possible path then return empty vector.

Example 1

    Input : n = 4 , grid = [ [1, 0, 0, 0] , [1, 1, 0, 1], [1, 1, 0, 0], [0, 1, 1, 1] ]

    Output : [ "DDRDRR" , "DRDDRR" ]

    Explanation : The rat has two different path to reach (3, 3).

    The first path is (0, 0) => (1, 0) => (2, 0) => (2, 1) => (3, 1) => (3, 2) => (3, 3).

    The second path is (0,0) => (1,0) => (1,1) => (2,1) => (3,1) => (3,2) => (3,3).

Example 2

    Input : n = 2 , grid = [ [1, 0] , [1, 0] ]

    Output : -1

    Explanation : There is no path that rat can choose to travel from (0,0) to (1,1).


*/


/*

# Intuition
    // Refer to Word Search problem to get insight for this problem
*/


// Solution
class Solution {
    coord = [{x:1, y:0}, {x:0, y:1},{x:-1, y:0}, {x:0, y:-1} ];
    _findDir(x, y){
        let dir ='';
        if(x == 0){
                if(y == 1){
                    dir = 'R'
                }else{
                    dir = 'L'
                }
            }else{
                if(x == 1){
                    dir = 'D'
                }else{
                    dir = 'U'
                }
            }
            return dir;
    }

    _findPathHelper(grid, visited, i, j, str, result){
        if( i== grid.length-1  && j == grid.length-1){
            result.push(str);
            return ;
        }

        if(
            i < 0
            || j < 0
            || i >= grid.length
            || j >= grid[0].length
            || grid[i][j] == 0
            || visited[i][j] == true
            ){
            return;
        }
        visited[i][j] = true;
        for(let {x, y} of this.coord){
            console.log(x, y);
            let dir = this._findDir(x, y);
            this._findPathHelper(grid, visited, i+x, j+y, str+dir, result);
        }
        visited[i][j] = false;
    }
    findPath(grid) {
        let n = grid.length;
        if(grid[0][0] == 0 || grid[n-1][n-1] == 0){
            return [];
        }
        let visited = Array.from({length:n}, ()=>new Array(n).fill(false));
        let result = [];
        this._findPathHelper(grid, visited, 0, 0, '', result)
        return result;
    }
}



/*
# Complexity Analysis
    Time Complexity
        O(3^(n^2)) where n is the side length of the grid. The grid has N = n^2 cells. At each cell, the algorithm explores up to 4 directions, but one is always moving backward to the parent, resulting in 3 possible moves. The initialization of the visited array takes O(n^2).
    
    Space Complexity
        O(n^2) for the recursion stack depth in the worst case (traversing every cell) plus O(n^2) for the visited array. The memory for the result array depends on the number of paths found, which can be exponential.

*/