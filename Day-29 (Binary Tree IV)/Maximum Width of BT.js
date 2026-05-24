/*
# Problem Statement:
    Given the root of a binary tree, return the maximum width of the given tree.
    The maximum width of a tree is the maximum width among all levels. The width of a level is determined by measuring the distance between its end nodes, which are the leftmost and rightmost non-null nodes. The length calculation additionally takes into account the null nodes that would be present between the end nodes if a complete binary tree were to stretch down to that level.


Example 1

    Input : root = [1, 3, 2, 5, 3, null, 9]

    Output : 4

    Explanation :

    So if the below tree would be a complete binary tree then there would be total 4 nodes in the last level.

    So the maximum width of the binary tree is between the nodes with value 5 and 9 is equal to 4.



Example 2

    Input : root = [1, 3, 2, 5, null, null, 9, 6, null, 7]

    Output : 7

    Explanation :

    If the below tree would be a complete binary tree then at last levels there would b 7 nodes including the node with value 6 and 7.

    So the maximum width of binary tree is 7.

# Constraints

    1 <= Number of Nodes <= 3000
    -1000 <= Node.val <= 1000
*/


/*

# Intuition
1. Begin by initializing a variable ans to keep track of the maximum width encountered. If the root node is null, return 0 as the width of an empty tree is zero.
2. Set up a queue for level-order traversal, where each queue element is a Pair consisting of a node and its index within the level. Start by enqueuing the root node along with its initial index of 0.
3. While the queue contains elements, process each level as follows:
4. Determine the number of nodes at the current level by measuring the size of the queue. Capture the index of the first node in the level to establish the leftmost position at that level.
5. Initialize variables first and last to record the indices of the first and last nodes at the current level.
6. For each node in the current level, compute its relative position based on the level's minimum index. Update the first and last variables to reflect the indices of the first and last nodes in this level. Enqueue the left and right children of the current node, assigning them indices of 2 x current index and 2 x current index + 1, respectively.
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

class Solution {
    widthOfBinaryTree(root) {
        if(!root) return 1;
        let queue = [];
        let maxWidth = 0;

        queue.push({node:root, index: 0})
        while(queue.length > 0){
            let size = queue.length;
            // first index of current level
            let minIndex = queue[0].index;
            let first = 0;
            let last = 0;
            
             for (let i = 0; i < size; i++) {
                let { node, index } = queue.shift();

                // Normalize index to avoid overflow
                let currIndex = index - minIndex;

                if (i === 0) first = currIndex;
                if (i === size - 1) last = currIndex;

                if (node.left) {
                    queue.push({
                        node: node.left,
                        index: 2 * currIndex + 1
                    });
                }

                if (node.right) {
                    queue.push({
                        node: node.right,
                        index: 2 * currIndex + 2
                    });
                }
            }
             maxWidth = Math.max(
                maxWidth,
                last - first + 1
            );
        }
        return maxWidth;
    }
}



/*
# Complexity Analysis

Time Complexity
    O(n) where n is the number of nodes in the binary tree, as every node is visited exactly once during the level-order traversal (the inner loop runs once for every node, and the shift operation/queue processing visits each element once).

Space Complexity
    O(w) where w is the maximum width of the binary tree, as the queue stores at most the number of nodes present in the widest level of the tree.
*/