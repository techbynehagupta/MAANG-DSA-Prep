/*
# Problem Statement:
    Given a weighted undirected graph having A nodes and M weighted edges, and a source node C.

    You have to find an integer array D of size A such that:

    D[i]: Shortest distance from the C node to node i.
    If node i is not reachable from C then -1.
    Note:

    There are no self-loops in the graph.
    There are no multiple edges between two pairs of vertices.
    The graph may or may not be connected.
    Nodes are numbered from 0 to A-1.
    Your solution will run on multiple test cases. If you are using global variables, make sure to clear them.



    Problem Constraints

    1 <= A <= 1e5

    0 <= B[i][0],B[i][1] < A

    0 <= B[i][2] <= 1e3

    0 <= C < A



    Input Format

    The first argument is an integer A, representing the number of nodes in the graph.
    The second argument is a matrix B of size M x 3, where each row represents an edge in the graph. The three columns of each row denote the source node B[i][0], the destination node B[i][1], and the weight of the edge B[i][2].
    The third argument is an integer C, representing the source node for which the shortest distance to all other nodes needs to be found.


    Output Format

    Return the integer array D.



    Example Input

    Input 1:

    A = 6
    B = [   [0, 4, 9]
            [3, 4, 6] 
            [1, 2, 1] 
            [2, 5, 1] 
            [2, 4, 5] 
            [0, 3, 7] 
            [0, 1, 1] 
            [4, 5, 7] 
            [0, 5, 1] ] 
    C = 4
    Input 2:

    A = 5
    B = [   [0, 3, 4]
            [2, 3, 3] 
            [0, 1, 9] 
            [3, 4, 10] 
            [1, 3, 8]  ] 
    C = 4


    Example Output

    Output 1:

    D = [7, 6, 5, 6, 0, 6]
    Output 2:

    D = [14, 18, 13, 10, 0]


    Example Explanation

    Explanation 1:

    All Paths can be considered from the node C to get shortest path
    Explanation 2:

    All Paths can be considered from the node C to get shortest path
*/


/*
# Intuition
    1. See handmade notes for reference
*/


// Solution
module.exports = { 
    //param A : integer
    //param B : array of array of integers
    //param C : integer
    //return a array of integers
       solve : function(A, B, C){
           return Dijkstra(A, B, C);
       }
   };
   
   function Dijkstra(A, B, C){
           let mh = new MinHeap(); 
           let adjList = createAdjList(A, B);
           let dist = new Array(A).fill(Infinity);
   
           mh.push(C, 0);
           dist[C] = 0;
   
           while(mh.size() > 0){
               let {node, cD} = mh.extractMin();
               if(dist[node] < cD) continue;
   
               for(let [nbr, wt] of adjList[node]){
                   if(dist[nbr] > dist[node] + wt){
                       dist[nbr] =  dist[node] + wt;
                       mh.push(nbr, dist[nbr]);
                   }
               }
           }
           for(let i=0; i < dist.length; i++){
               dist[i] = dist[i] == Infinity ? -1: dist[i];
           }
           return dist;
   }
   function createAdjList(V, E){
       let adjList = Array.from({length: V}, ()=> new Array());
       for(let i=0; i < E.length; i++){
           let [u,v,wt] = E[i];
           adjList[u].push([v, wt]);
           adjList[v].push([u, wt]);
       }
       return adjList;
   }
   class Edge{
       constructor(node, cD){
           this.node = node;
           this.cD = cD;
       }
   }
   
   class MinHeap {
       constructor() {
           this.heap = [];
       }
   
       push(node, cD) {
           let edge = new Edge(node, cD);
           this.heap.push(edge);
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
   
               if (this.heap[parent].wt <= this.heap[i].wt) break;
   
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
                   this.heap[left].wt < this.heap[smallest].wt
               ) {
                   smallest = left;
               }
   
               if (
                   right < this.heap.length &&
                   this.heap[right].wt < this.heap[smallest].wt
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
   TC: O((V+E)logE)
   SC- O(V + E)
*/