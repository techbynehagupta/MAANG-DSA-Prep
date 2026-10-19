/*

Problem Statement
A cell containing a thief if grid[r][c] = 1
An empty cell if grid[r][c] = 0
You are initially positioned at cell (0, 0). In one move, you can move to any adjacent cell in the grid, including cells containing thieves.

The safeness factor of a path on the grid is defined as the minimum manhattan distance from any cell in the path to any thief in the grid.

Return the maximum safeness factor of all paths leading to cell (n - 1, n - 1).

An adjacent cell of cell (r, c), is one of the cells (r, c + 1), (r, c - 1), (r + 1, c) and (r - 1, c) if it exists.

The Manhattan distance between two cells (a, b) and (x, y) is equal to |a - x| + |b - y|, where |val| denotes the absolute value of val.

 

Example 1:

Input: grid = [[1,0,0],[0,0,0],[0,0,1]] Output: 0 Explanation: All paths from (0, 0) to (n - 1, n - 1) go through the thieves in cells (0, 0) and (n - 1, n - 1).

Example 2:

Input: grid = [[0,0,1],[0,0,0],[0,0,0]] Output: 2 Explanation: The path depicted in the picture above has a safeness factor of 2 since:

The closest cell of the path to the thief at cell (0, 2) is cell (0, 0). The distance between them is | 0 - 0 | + | 0 - 2 | = 2. It can be shown that there are no other paths with a higher safeness factor.
Example 3:

Input: grid = [[0,0,0,1],[0,0,0,0],[0,0,0,0],[1,0,0,0]] Output: 2 Explanation: The path depicted in the picture above has a safeness factor of 2 since:

The closest cell of the path to the thief at cell (0, 3) is cell (1, 2). The distance between them is | 0 - 1 | + | 3 - 2 | = 2.
The closest cell of the path to the thief at cell (3, 0) is cell (3, 2). The distance between them is | 3 - 3 | + | 0 - 2 | = 2. It can be shown that there are no other paths with a higher safeness factor.
Constraints:

1 <= grid.length == n <= 400
grid[i].length == n
grid[i][j] is either 0 or 1.
There is at least one thief in the grid. 

*/


/*
Can be done in n^2 time complexity 

Current solution is Multi source BFS + Heaps


*/


function maxSafeessFactor(grid){
    let n = grid.length;
    let manDist = Array.from({length: n}, ()=> new Array(n).fill(-1));

    let q = new Queue();
    for(let i=0; i < n; i++){
        for(let j =0; j < m ; j++){
            if(grid[i][j] == 1){
                manDist[i][j] = 0;
                q.push([i, j])
            }
        }
    }
   

    while(q.size() > 0){
        let [x, y] = q.pop();
        let dirs = [[0, 1], [1, 0], [-1, 0], [0, -1]];
        for(let [i, j] of dirs){
            let newX = i+x;
            let newY = j+y;

            if(newX >=0 && newX < n && newY >= 0 && newY < n && manDist[newX][newY] == -1){
                let newDist = Math.abs(newX-x) + Math.abs(newY-y);
                q.push([newX, newY]);
                manDist[newX][newY] = newDist
            }
        }
    }
    console.log(manDist);

    let maxH = new MaxHeap();
    // Insert the manHattancedistance of 0, 0
    // distance, x, y
    maxH.insert(manDist[0][0], 0, 0);

    while(maxH.size() > 0){
        // pop out the maxManhattandistance cell path
        let {minManDistInPath, x, y} = maxH.extractMax();
        let dirs = [[0, 1], [1, 0]];

        if(x == n-1 && y == n-1){
            return minManDistInPath;
        }

        // add all nbrs of current cell
        for(let [i, j] of dirs){
            let newX = i+x;
            let newY = j+y;
            if(newX >=0 && newX < n && newY >= 0 && newY < n){
                let currentMinDist = manDist[newX][newY];
                let minInPath = Math.min(currentMinDist, minManDistInPath);
                maxH.insert(minInPath, newX, newY);
            }
        }
    }
}

