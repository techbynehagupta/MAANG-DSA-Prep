/*
# Problem Statement:
    Given a matrix of integers A of size N x M describing a maze. The maze consists of empty locations and walls.

    1 represents a wall in a matrix and 0 represents an empty location in a wall.

    There is a ball trapped in a maze. The ball can go through empty spaces by rolling up, down, left or right, but it won't stop rolling until hitting a wall (maze boundary is also considered as a wall). When the ball stops, it could choose the next direction.

    Given two array of integers of size B and C of size 2 denoting the starting and destination position of the ball.

    Find the shortest distance for the ball to stop at the destination. The distance is defined by the number of empty spaces traveled by the ball from the starting position (excluded) to the destination (included). If the ball cannot stop at the destination, return -1.



Problem Constraints

    2 <= N, M <= 100

    0 <= A[i] <= 1

    0 <= B[i][0], C[i][0] < N

    0 <= B[i][1], C[i][1] < M



Input Format

    The first argument given is the integer matrix A.

    The second argument given is an array of integer B.

    The third argument if an array of integer C.



Output Format

    Return a single integer, the minimum distance required to reach destination



Example Input

    Input 1:


    A = [ [0, 0], 
        [0, 0] ]
    B = [0, 0]
    C = [0, 1]


    Input 2:

    A = [ [0, 1], 
        [1, 0] ]
    B = [0, 0]
    C = [1, 1]




Example Output

    Output 1:


    1


    Output 2:

    -1


Example Explanation

    Explanation 1:

    Go directly from start to destination in distance 1.
    Explanation 2:

    It is impossible to reach the destination from (0, 0) to (1, 1) as there are walls at (1, 0) and (0, 1)

*/


/*
# Intuition
    1. Create adjlist based on the edges with a distance, 2 vertices are connected if there is a wall behind them
    Ex- 0 1 0
        0 1 0
        0 0 1
        (0,0) => [2,0] with a distance of 2
    2. Use Dijkstra to find shortest distance
*/


// Solution
module.exports = { 
    //param A : array of array of integers
    //param B : array of integers
    //param C : array of integers
    //return an integer
       solve : function(A, B, C){
           return sdMaze(A, B, C);
       }
   };
   
   function sdMaze(A, B, C){
       if(A[B[0]][B[1]] == 1 || A[C[0]][C[1]] == 1) return -1;
       if(B[0] == C[0] && B[1] == C[1]) return 0;
       let adjList = createAdjList(A, B)
       return dijkstra(A, adjList, B, C);
   }
   
   function dijkstra(A, adjList, start, dest){
       let n = A.length, m = A[0].length;
       let mh = new MinHeap();
       let dist = Array.from({length:n }, ()=> new Array(m).fill(Infinity))
       mh.push(start, 0);
       dist[start[0]][start[1]] = 0;
   
       while(mh.size() > 0){
           let {node, d} = mh.extractMin();
           let [r, c] = node;
           if(r == dest[0] && c == dest[1]) return dist[r][c];
   
           if(dist[r][c] < d) continue;
   
           let key = `${r},${c}`;
           for(let [nr, nc, ndist] of adjList.get(key)){
               if(dist[nr][nc] > dist[r][c]+ ndist){
                   mh.push([nr, nc], ndist);
                   dist[nr][nc] = dist[r][c]+ ndist;
               }
           }
       }
       return -1;
   }
   
   function createAdjList(A, B){
       let n = A.length, m = A[0].length;
       let adjList = new Map();
       const directions = [
           [-1, 0], // up
           [1, 0],  // down
           [0, -1], // left
           [0, 1]   // right
       ];
   
       for(let r = 0; r < n ; r++){
           for(let c = 0; c < m ; c++){
               // Wall
               if(A[r][c] == 1){
                  continue;
               }
               const key = `${r},${c}`;
               adjList.set(key, []);
   
               for(let [dr, dc] of directions){
                   let nr = r;
                   let nc = c;
                   let distance = 0;
   
                   while(nr + dr >= 0 && nr+dr < n && nc+ dc >= 0 && nc+dc < m && A[nr+dr][nc+dc] == 0){
                       nr += dr;
                       nc += dc;
                       distance++;
                   }
                   if(distance > 0){
                       adjList.get(key).push([nr, nc, distance])
                   }
               }
           }
       }
   
       return adjList;
   }
   
   class MinHeap {
       constructor() {
           this.heap = [];
       }
   
       push(node, d) {
           this.heap.push({node, d});
           this.bubbleUp();
       }
   
       extractMin() {
           if (this.heap.length === 0) return null;
   
           const min = this.heap[0];
           const last = this.heap.pop();
   
           if (this.heap.length > 0) {
               this.heap[0] = last;
               this.bubbleDown();
           }
   
           return min;
       }
   
       peek() {
           return this.heap[0];
       }
   
       bubbleUp() {
           let i = this.heap.length - 1;
   
           while (i > 0) {
               const parent = Math.floor((i - 1) / 2);
   
               if (this.heap[parent].d <= this.heap[i].d) break;
   
               [this.heap[parent], this.heap[i]] =
                   [this.heap[i], this.heap[parent]];
   
               i = parent;
           }
       }
   
       bubbleDown() {
           let i = 0;
   
           while (true) {
               let smallest = i;
               const left = 2 * i + 1;
               const right = 2 * i + 2;
   
               if (
                   left < this.heap.length &&
                   this.heap[left].d < this.heap[smallest].d
               ) {
                   smallest = left;
               }
   
               if (
                   right < this.heap.length &&
                   this.heap[right].d < this.heap[smallest].d
               ) {
                   smallest = right;
               }
   
               if (smallest === i) break;
   
               [this.heap[i], this.heap[smallest]] =
                   [this.heap[smallest], this.heap[i]];
   
               i = smallest;
           }
       }
       size(){
           return this.heap.length;
       }
   }



/*
# Complexity Analysis

*/