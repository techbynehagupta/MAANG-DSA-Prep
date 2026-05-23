/*
# Problem Statement:
    Assuming standing on the right side of a binary tree and given its root, return the values of the nodes visible, arranged from top to bottom.


Example 1

    Input : root = [1, 2, 3, null, 5, null, 4]

    Output : [1, 3, 4]

Example 2

    Input : root = [1, 2, 3, 6, 5, 8, 4]

    Output : [1, 3, 4]

# Constraints

    1 <= Number of Nodes <= 104
    -103 <= Node.val <= 103
*/


/*

# Intuition
1. Print all the last nodes at a particular level of the Tree for right side
2. Print all the first nodes at a level of the Tree for Left side
*/


// Solution
class Solution {
    rightSideView(root) {
        let queue = [];
        let map = new Map();
        let rows = 0;
        let op = [];

        queue.push({ node: root, row: 0 });
        while (queue.length > 0) {
            let { node, row } = queue.shift();
            rows = row

            map.set(row, node.data);
            
            // push nbrs
            if (node.left) {
                queue.push({ node: node.left, row: row + 1 });
            }
            if (node.right) {
                queue.push({ node: node.right, row: row + 1 });
            }
        }
        for (let i = 0; i <= rows; i++) {
            op.push(map.get(i));
        }
        return op;
    }
}


/*
# Complexity Analysis

Time Complexity
    O(n) where n is the number of nodes. Every node is visited once during the queue processing, and the final loop iterates through the number of levels (max n), making the operations linear.

Space Complexity
    O(w) where w is the maximum width of the tree. The queue stores nodes level by level (up to w nodes), and the map/output array stores one value per level (up to h levels), leading to a complexity proportional to the widest level of the binary tree.

*/