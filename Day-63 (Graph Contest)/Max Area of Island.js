/*
# Problem Statement:
You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

The area of an island is the number of cells with a value 1 in the island.

Return the maximum area of an island in grid. If there is no island, return 0.

 

Example 1:


Input: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
Output: 6
Explanation: The answer is not 11, because the island must be connected 4-directionally.
Example 2:

Input: grid = [[0,0,0,0,0,0,0,0]]
Output: 0
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 50
grid[i][j] is either 0 or 1.
*/


/*
# Intuition
Edge Cases
1. No 1's are there, only water
2. All 1's are there, complete island
3. multiple islands are there

Intiution
1. Finding an island
2. Calculating its area
3. We can use BFS or DFS
4. I'm going to use BFS, I'll make a visited array
4. Traverse the org matrix, as soon as I find 1 use BFS and find its area, whatever nodes are visted mark it as true


Approach
1. use a bfs traversal as soon as you find a 1 which is univisted and caluclate the area

*/


// Solution
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
    let n = grid.length, m = grid[0].length;
    let maxArea= 0;

    // not using visited array instead updating grid 1's which are visited to 0
    for(let i=0; i < n; i++){
        for(let j = 0; j < m ; j++){
            if(grid[i][j] == 1){
                maxArea = Math.max(BFS(n, m, grid, i, j), maxArea);
            }
        }
    }
    return maxArea;
};

function BFS(n, m, grid, i, j){
    if(n == 1 && m == 1){
        grid[n-1][m-1] = 0;
        return 1;
    }
    let area = 0;
    let q = new QueueMain();
    q.push([i, j]);
    grid[i][j] = 0;

    while(q.size() > 0){
        ([i, j] = q.pop());
        area++;
        let dirs = [[0,1], [1,0],[0, -1], [-1, 0]];

        for(let [x, y] of dirs){
            let newX = i+x;
            let newY = j+y;
            if(newX >=0 && newX < n && newY >=0 && newY < m){
                if(grid[newX][newY] == 1){
                    q.push([newX, newY]);
                    grid[newX][newY] = 0;
                }
            }
        }
    }
    return area;
}

class QueueMain {
    constructor() {
        this.queue = [];
        this.front = 0;
    }

    push(value) {
        this.queue.push(value);
    }

    pop() {
        if (this.front >= this.queue.length) {
            return null;
        }

        return this.queue[this.front++];
    }

    peek() {
        if (this.front >= this.queue.length) {
            return null;
        }

        return this.queue[this.front];
    }

    isEmpty() {
        return this.front >= this.queue.length;
    }

    size() {
        return this.queue.length - this.front;
    }
}


/*
# Complexity Analysis
TC -  Grid Traversal(m*n) + BFS(m*n)=> O(m*n)
SC- Queue (m*n)=> O(m*n)
*/