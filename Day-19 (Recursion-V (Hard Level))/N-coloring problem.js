/*
# Problem Statement:
    Given an integer M and an undirected graph with N vertices (zero indexed) and E edges. The goal is to determine whether the graph can be coloured with a maximum of M colors so that no two of its adjacent vertices have the same colour applied to them.
    In this context, colouring a graph refers to giving each vertex a different colour. If the colouring of vertices is possible then return true, otherwise return false.


Example 1
    Input : N = 4 , M = 3 , E = 5 , Edges = [ (0, 1) , (1, 2) , (2, 3) , (3, 0) , (0, 2) ]

    Output : true

    Explanation : Consider the three colors to be red, green, blue.

    We can color the vertex 0 with red, vertex 1 with blue, vertex 2 with green, vertex 3 with blue.

    In this way we can color graph using 3 colors at most.



Example 2
    Input : N = 3 , M = 2 , E = 3 , Edges = [ (0, 1) , (1, 2) , (0, 2) ]

    Output : false

    Explanation : Consider the two colors to be red, green.

    We can color the vertex 0 with red, vertex 1 with green.

    As the vertex 2 is adjacent to both vertex 1 and 0 , so we cannot color with red and green.

    Hence as we could not color all vertex of graph we return false.


*/


/*

# Intuition
Note- Use bfs to color the nodes
    1. make a adj list
    2. There can be multiple starting node if graph is dis-connected, use visited array for the same
    3. assign a color to starting node after popping out from queue 
    3. then put all the nbr in the queue
    4. for each node popping out assign a color to the node
    5. for assigning colors check what color is assign to its nbrs and then get the smallest color that is not used yet, if not found add a new color

*/


// Solution
class Solution {
    _makeAdjacencyList(n, edges){
        let adjList = Array.from({length: n}, ()=> new Array());
        for(let [u, v] of edges){
            adjList[u].push(v);
            adjList[v].push(u);
        }
        return adjList;
    }
    _assinColor(vertice, adjList, colors){
        let usedColors = new Set();
        // add nbr colors in set
        for(let nbr of adjList[vertice]){
            if(colors[nbr] != 0){
                usedColors.add(colors[nbr]);
            } 
        }
        // find smallest color not used
        let color = 1;
        while(usedColors.has(color)){
            color++;
        }
        return color;
    }
    _findNoOfColors(n, adjList, src,  colors, visited){
        if(n == 0 || n == 1) return 1;
        let queue = [];
        queue.push(src);
        visited[src] = true;
        while(queue.length > 0){
            let v = queue.shift();
            colors[v] = this._assinColor(v, adjList, colors);
            for(let nbr of adjList[v]){
                if(visited[nbr] == false){
                   queue.push(nbr);
                   visited[nbr] = true;
                }
            }
        }
    }

    graphColoring(edges, m, n) {
        let adjList = this._makeAdjacencyList(n, edges);
        let colors= new Array(n).fill(0);
        let visited = new Array(n).fill(false);
        for(let i=0; i< n; i++){
            if(visited[i] == false){
                 this._findNoOfColors(n, adjList, i,  colors, visited);
            }     
        }
        let colorsUsed = new Set(colors)
        return colorsUsed.size <= m ? true : false;
    }
}



/*
# Complexity Analysis
    Time Complexity
        O(V + E * maxDegree), where V is n and E is the number of edges. Initializing the adjacency list takes O(V + E). The BFS traverses each vertex once, and for each vertex, _assinColor iterates over its neighbors (degree) and finds a color in O(degree) time.
    Space Complexity
        O(V + E) to store the adjacency list, colors array, visited array, and the queue used for the BFS traversal.
*/