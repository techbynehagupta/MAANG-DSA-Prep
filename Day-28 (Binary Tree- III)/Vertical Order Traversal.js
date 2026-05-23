/*
# Problem Statement:
    Compute the binary tree's vertical order traversal given its root.
    The left and right children of a node at location (row, col) will be at (row + 1, col - 1) and (row + 1, col + 1), respectively. The tree's root is located at (0, 0).
    The vertical order traversal of a binary tree is a list of top-to-bottom orderings for each column index starting from the leftmost column and ending on the rightmost column. There may be multiple nodes in the same row and same column. In such a case, sort these nodes by their values. Return the binary tree's vertical order traversal.


Example 1

    Input : root = [3, 9, 20, null, null, 15, 7]

    Output : [ [9] , [3, 15] , [20] , [7] ]

    Explanation :

    Column -1: Only node 9 is in this column.

    Column 0: Nodes 3 and 15 are in this column in that order from top to bottom.

    Column 1: Only node 20 is in this column.

    Column 2: Only node 7 is in this column.



Example 2

    Input : root = [1, 2, 3, 4, 5, 6, 7]

    Output : [ [4] , [2] , [1, 5, 6] , [3] , [7] ]

    Explanation :

    Column -2: Only node 4 is in this column.

    Column -1: Only node 2 is in this column.

    Column 0: Nodes 1, 5, and 6 are in this column.1 is at the top, so it comes first. 5 and 6 are at the same position (2, 0), so we sort them by their value, 5 before 6.

    Column 1: Only node 3 is in this column.

    Column 2: Only node 7 is in this column.

# Constraints

    1 <= Number of Nodes <= 104
    -103 <= Node.val <= 103
*/


/*
# Intuition
    The vertical order traversal of a binary tree involves organizing nodes based on their horizontal and vertical positions relative to their parent nodes. Each node can be categorized by its vertical column ('x') and level ('y'). Nodes with the same 'x' value are aligned vertically, forming columns, while 'y' represents the depth or level within the tree.
    To achieve this traversal, use a level order BFS approach, starting from the root node. This ensures that nodes are processed level by level, and within each level, nodes are processed from left to right. By maintaining a map structure that uses 'x' as keys for vertical columns and 'y' as keys within a nested map for levels, we store node values in a multiset to maintain uniqueness and sorting.
*/


// Solution
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *      constructor(val = 0, left = null, right = null){
 *          this.data = val;
 *          this.left = null;
 *          this.right = null;
 *      }
 * }
 **/

class Pair{
    constructor(node, row, col){
        this.node = node;
        this.row = row;
        this.col = col;  
    }
}

class Solution {
    verticalTraversal(root) {
        if(!root) return [];

        let map = new Map();
        let queue = [];
        let leftMostCol = Infinity;
        let rightMostCol = -Infinity;
        let op = [];

        let pair = new Pair(root, 0, 0)
        queue.push(pair);

        while(queue.length > 0){
            let {node, row, col} = queue.shift();
            leftMostCol = Math.min(leftMostCol, col);
            rightMostCol = Math.max(rightMostCol, col);

            if(!map.has(col)){
                map.set(col, [])
            }
            map.get(col).push([row, node.data])

            if(node.left){
                let pair = new Pair(node.left, row+1, col-1);
                queue.push(pair);
            }
            if(node.right){
                let pair = new Pair(node.right, row+1, col+1);
                queue.push(pair);
            }
        }

        for(let i = leftMostCol; i<= rightMostCol; i++){
            let order = map.get(i);
            order  = order.sort((a, b)=>{
                // sort by row
                if (a[0] !== b[0]) {
                    return a[0] - b[0];
                }
                // same row → sort by value
                return a[1] - b[1];
            }).map(el=> {
                return el[1];
            });
            op.push([...order]);
        }
        return op;
    }
}


/*
# Complexity Analysis

Time Complexity
    O(N log N) where N is the number of nodes. The BFS visits every node once (O(N)). Sorting the nodes within each column takes O(W * (N/W log (N/W))) where W is the number of columns, which simplifies to O(N log(N/W)).

Space Complexity
    O(N) to store the nodes in the map and the queue, where N is the total number of nodes in the binary tree.
*/