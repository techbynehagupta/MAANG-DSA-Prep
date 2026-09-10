/*
# Problem Statement:
Find largest distance Given an arbitrary unweighted rooted tree which consists of N (2 <= N <= 40000) nodes.

The goal of the problem is to find largest distance between two nodes in a tree. Distance between two nodes is a number of edges on a path between the nodes (there will be a unique path between any pair of nodes since it is a tree).

The nodes will be numbered 0 through N - 1.

The tree is given as an array A, there is an edge between nodes A[i] and i (0 <= i < N). Exactly one of the i's will have A[i] equal to -1, it will be root node.



Problem Constraints

2 <= |A| <= 40000



Input Format

First and only argument is vector A



Output Format

Return the length of the longest path



Example Input

Input 1:

 
A = [-1, 0]
Input 2:

 
A = [-1, 0, 0]


Example Output

Output 1:

 1
Output 2:

 2


Example Explanation

Explanation 1:

 Path is 0 -> 1.
Explanation 2:

 Path is 1 -> 0 -> 2.
*/


/*
# Intuition

    Approach
    1. Since there are n nodes, there can be only n-1 edges, since A[i]-i
    2. So it forms a tree
    3.  let's say A and B are the farthese node, so we can start from any middle node, If we can find the farthese
    node from that middle node it'll be either A or B
        Once we found one end of diameter we can again run BFS to find maxm Distance from that node  that will be the other end of diameter always
        A -------- X ------------ B

    How to Solve?
    1. construct adj list first from given input
    2. Take any source node I have taken 0, which will help to find one end of diameter using BFS
    3. Once you get one end of diameter you can use it to find other end of diameter

*/


// Solution

function largestDistance(A){
    let n = A.length;
    if(n==1) return 0;
    let adjList = createAdjList(A);
    let {node, distance} = bfs(n, 0, adjList);
    ({ node, distance } = bfs(n, node, adjList));
    return distance;
}
function bfs(n, sourceNode, adjList){
    let visited = new Array(n).fill(false)
    let dist = new Array(n).fill(Infinity);
    let q = new Queue();

    q.push(sourceNode);
    visited[sourceNode] = true;
    dist[sourceNode] = 0;

    while(q.size() > 0){
       let node = q.pop();
       for(let nbr of adjList[node]){
           if(dist[nbr] != Infinity) continue;
           dist[nbr] = 1+ dist[node];
           q.push(nbr);
       }
    }
    let farthestNode, maxDistance = 0;
    for(let i=0; i < dist.length; i++){
        if(maxDistance < dist[i]){
            maxDistance = dist[i];
            farthestNode = i;
        }
    }
    // console.log(dist, farthestNode)
    return {node: farthestNode, distance: maxDistance};
}

function createAdjList(A){
    let n = A.length;
    let adjList = Array.from({length:n}, ()=> new Array());
    for(let i=1; i < n; i++){
        let u = A[i];
        let v = i;
        adjList[u].push(v);
        adjList[v].push(u);
    }
    return adjList;
}


class Queue {
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
    Time Complexity - O(V+E)
        createAdjList- V
        BFS - 2* O(V+E)
    SC - O(N)
*/  