/*
# Problem Statement:
    Given a undirected weighted graph with A nodes labelled from 1 to A with M edges given in a form of 2D-matrix B of size M * 3 where B[i][0] and B[i][1] denotes the two nodes connected by an edge of weight B[i][2].

    For each edge check whether it belongs to any of the possible minimum spanning tree or not , return 1 if it belongs else return 0.

    Return an one-dimensional binary array of size M denoting answer for each edge.

    NOTE:

    The graph may be disconnected in that case consider mst for each component.
    No self-loops and no multiple edges present.
    Answers in output array must be in order with the input array B output[i] must denote the answer of edge B[i][0] to B[i][1].


    Problem Constraints

    1 <= A, M <= 3*105

    1 <= B[i][0], B[i][1] <= A

    1 <= B[i][1] <= 103



    Input Format

    The first argument given is an integer A representing the number of nodes in the graph.

    The second argument given is an matrix B of size M x 3 which represents the M edges such that there is a edge between node B[i][0] and node B[i][1] with weight B[i][2].



    Output Format

    Return an one-dimensional binary array of size M denoting answer for each edge.



    Example Input

    Input 1:

    A = 3
    B = [ [1, 2, 2]
        [1, 3, 2]
        [2, 3, 3]
        ]


    Example Output

    Output 1:

    [1, 1, 0]


    Example Explanation

    Explanation 1:

    Edge (1, 2) with weight 2 is included in the MST           1
                                                            /   \
                                                            2     3
    Edge (1, 3) with weight 2 is included in the same MST mentioned above.
    Edge (2,3) with weight 3 cannot be included in any of the mst possible.
    So we will return [1, 1, 0]
*/


/*
# Intuition
Logic - Check same weight edges can they be a part of MST, If yes then make them 1 in op array
        If not then leave it be 0
        Same weight edges can be part of MST, if there parents (nodes) are not already connected by low weight edges.

    What we're trying to do?
    1. Segregrate the edges by weight using a Map and sort the unduplicated wights
    2. Start with processing least weights edges first
    3. Check is the edges parents are not part of MST yet?, If part means the vertices are connected with some least weight edges earlier
        if not then can be connected with these weight, since all edges have same weight we first check all edges and make op for those as 1 indicating they can be a part of valid MST;
    4. Once we have checked all edges we know which edges needs to be part of MST, for which we made op true, for further edges that these vertices are already conncted with least weight

 
*/


// Solution
module.exports = { 
 //param A : integer
 //param B : array of array of integers
 //return a array of integers
	solve : function(A, B){
        let weightMapToEdges = new Map();
        let weights = new Set();
        let op = new Array(B.length).fill(0);
        let ds = new DisjointSet(A+1);

        // step-I
        for(let i = 0 ; i < B.length; i++){
            let [u, v, wt] = B[i];
            let nodesWt = weightMapToEdges.get(wt) || [];
            nodesWt.push(i);
            weightMapToEdges.set(wt, nodesWt);
            weights.add(wt);
        }

        weights = [...weights].sort((a,b)=>a-b);
        // Step-2
        for(let wt of weights){
            // get edges index associated with a particular weight
            let value = weightMapToEdges.get(wt);
            // Step-3
            for(let index of value){
                let [u, v, wt] = B[index];
                let isSameParent = ds.checkSameParent(u, v);
                if(!isSameParent){
                    // if not same parent means this edge is part of valid MST
                    op[index] = 1;
                }
            }
            // Step-4
            for(let index of value){
                if(op[index] == 1){
                    let [u, v, wt] = B[index];
                    // This edge is part of valid MST so union them
                    ds.unionEvenIfParentsAreSame(u, v)
                }
            }
        }
        return op;
	}
};


class DisjointSet{
	constructor(n){
		this.parent = Array.from({length:n}, (_, i)=> i);
		this.size = new Array(n).fill(1);
	}

	findParent(i){
		if(this.parent[i] == i){
			return i;
		}
		return this.parent[i] = this.findParent(this.parent[i])
	}
    checkSameParent(u, v){
        return this.findParent(u) == this.findParent(v);
    }
    unionEvenIfParentsAreSame(u, v){
        let parentU = this.findParent(u);
		let parentV = this.findParent(v);

		if(this.size[parentU] >= this.size[parentV]){
			// now parent of v becomes parent of u
			this.parent[parentV] = parentU;
			this.size[parentU] += this.size[parentV];
		}else{
			this.parent[parentU] = parentV;
			this.size[parentV] += this.size[parentU];
		}
		return true;
    }
	unionBySize(u, v){
		let parentU = this.findParent(u);
		let parentV = this.findParent(v);

		if(parentU == parentV) return false;

		if(this.size[parentU] >= this.size[parentV]){
			// now parent of v becomes parent of u
			this.parent[parentV] = parentU;
			this.size[parentU] += this.size[parentV];
		}else{
			this.parent[parentU] = parentV;
			this.size[parentV] += this.size[parentU];
		}
		return true;
	}
}


/*
# Complexity Analysis
    TC: O(E log E) // Sorting take O(ElogE) rest is O(E)
    SC: O(E + V)
*/

// Solution II - A slighlty cleaner version
module.exports = { 
    //param A : integer
    //param B : array of array of integers
    //return a array of integers
       solve : function(A, B){
           let weightMap = new Map();
           const ans = new Array(B.length).fill(0);
           let ds = new DisjointSet(A+1);
   
           // step-I
           for(let i = 0 ; i < B.length; i++){
               let [u, v, wt] = B[i];
                if (!weightMap.has(wt)) {
                   weightMap.set(wt, []);
               }
               weightMap.get(wt).push(i)
           }
   
           weights = [...weightMap.keys()].sort((a,b)=>a-b);
   
           // Step-2
           for(let wt of weights){
               // get edges index associated with a particular weight
               let edges = weightMap.get(wt);
               // Step-3
               for(let index of edges){
                   let [u, v] = B[index];
                   if(!ds.checkSameParent(u, v)){
                       // if not same parent means this edge is part of valid MST
                       ans[index] = 1;
                   }
               }
               // Step-4
               for(let index of edges){
                   if(ans[index]){
                       let [u, v] = B[index];
                       // This edge is part of valid MST so union them
                       ds.unionEvenIfParentsAreSame(u, v)
                   }
               }
           }
           return ans;
       }
   };