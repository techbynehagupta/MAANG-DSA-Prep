/*
# Problem Statement:

Refer to thw question here as the visuals would be more clear here-
https://leetcode.com/problems/trapping-rain-water-ii/description/

Given an m x n integer matrix heightMap representing the height of each unit cell in a 2D elevation map, return the volume of water it can trap after raining.

Example 1:
    Input: heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]
    Output: 4
    Explanation: After the rain, water is trapped between the blocks.
    We have two small ponds 1 and 3 units trapped.
    The total volume of water trapped is 4.

Example 2: 
    Input: heightMap = [[3,3,3,3,3],[3,2,2,2,3],[3,2,1,2,3],[3,2,2,2,3],[3,3,3,3,3]]
    Output: 10
*/


/*
# Intuition
    Read notes.md file in the same folder //Day-63
*/


// Solution
/**
 * @param {number[][]} heightMap
 * @return {number}
 */
var trapRainWater = function (heightMap) {
    return trapRainWaterHelper(heightMap);
};



function trapRainWaterHelper(heightMap) {
    // Read notes for solution In Maang-DSA-prep repo
    // Day-63 (Graph Contest)/trapping_rain_water_II_notes.md
    let n = heightMap.length, m= heightMap[0].length;
    let visited = Array.from({length:n}, ()=> new Array(m).fill(false));
    let pq = new MinHeapMain();


    // Add boundaries in PQ
    for(let i=0; i < n; i++){
        pq.insert([heightMap[i][0], i, 0]);
        pq.insert([heightMap[i][m-1], i, m-1]);
        visited[i][0] = true;
        visited[i][m-1] = true;
    }

    for(let j= 1; j < m-1; j++){
        pq.insert([heightMap[0][j], 0, j]);
        pq.insert([heightMap[n-1][j], n-1, j]);
        visited[0][j] = true;
        visited[n-1][j] = true;
    }
    /*
[
[5,5,5,1],
[5,1,1,5],
[5,1,5,5],
[5,2,5,8]
]

[5,5,5,1c],
[5,1p,1,5],
[5,2c,5p,5],
[5,2c,5,8]
wh =1 + 0
 */
    // Process boundirs in increasing order, every nbr will be associated with minm wall height as parent
    let totalWaterHold = 0;
    while(pq.size() > 0){
        let [minBoundaryHeight, i, j] = pq.extractMin();
        // console.log("parent", i, j, "minBoundaryHeight", minBoundaryHeight)

        let dirs = [[0,1], [1,0], [0,-1], [-1, 0]];

        for(let [x, y] of dirs){
            let newX = i + x;
            let newY = j + y;

            if(newX >=0 && newX < n && newY >= 0 && newY < m && !visited[newX][newY]){
                let currHeight = heightMap[newX][newY];
                totalWaterHold += minBoundaryHeight - currHeight > 0 ? minBoundaryHeight - currHeight: 0;
                let nbrminBoundaryHeight = Math.max(currHeight, minBoundaryHeight);
                pq.insert([nbrminBoundaryHeight, newX, newY]);
                visited[newX][newY] = true;
            }
        }
    }
    return totalWaterHold;

}


class MinHeapMain {
    constructor() {
        this.heap = [];
    }

    // Get parent index
    parent(i) {
        return Math.floor((i - 1) / 2);
    }

    // Get left child index
    left(i) {
        return 2 * i + 1;
    }

    // Get right child index
    right(i) {
        return 2 * i + 2;
    }

    // Swap two elements
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    // Add element
    insert([height, i, j]) {
        this.heap.push([height, i, j]);

        // Move the new element upward
        this.heapifyUp();
    }

    heapifyUp() {
        let i = this.heap.length - 1;

        while (i > 0) {
            const p = this.parent(i);

            // Parent is already smaller
            if (this.heap[p][0] <= this.heap[i][0]) {
                break;
            }

            this.swap(p, i);
            i = p;
        }
    }

    // Remove and return minimum element
    extractMin() {
        if (this.heap.length === 0) return null;

        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const min = this.heap[0];

        // Move last element to root
        this.heap[0] = this.heap.pop();

        // Fix heap
        this.heapifyDown();

        return min;
    }

    heapifyDown() {
        let i = 0;

        while (true) {
            const left = this.left(i);
            const right = this.right(i);

            let smallest = i;

            if (
                left < this.heap.length &&
                this.heap[left][0] < this.heap[smallest][0]
            ) {
                smallest = left;
            }

            if (
                right < this.heap.length &&
                this.heap[right][0] < this.heap[smallest][0]
            ) {
                smallest = right;
            }

            // Current element is already smallest
            if (smallest === i) {
                break;
            }

            this.swap(i, smallest);
            i = smallest;
        }
    }

    // See minimum without removing
    peek() {
        return this.heap.length ? this.heap[0] : null;
    }

    size() {
        return this.heap.length;
    }
}



/*
# Complexity Analysis
    TC- O(mnlog(mn))
        Travseral - n+m
        For all m*n elemets extrcat min and insert - (m*n)log(m*n)
    SC- O(mn)
        Visited array - m*n
        Heap - m*n
*/