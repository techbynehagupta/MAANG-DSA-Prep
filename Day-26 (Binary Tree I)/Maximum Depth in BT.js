/*
# Problem Statement:
    Given root of the binary tree, return its maximum depth.
    A binary tree's maximum depth is number of nodes along the longest path from root node down to the farthest node.


Example 1

    Input : root = [1, 2, 3, null, null, null , 6]

    Output : 3

    Explanation : The path from root node 1 to node with value 6 has maximum depth with 3 nodes along path.

Example 2

    Input : root = [3, 9, 20, null, null, 15 , 7]

    Output : 3

    Explanation : The path from root node 3 to node with value 15 has maximum depth with 3 nodes along path.

    There exists other paths to reach the solution.
*/


/*

# Intuition
    To find the maximum depth of a binary tree, we observe that:
    1. The depth of an empty tree is 0
    2. For any node, the maximum depth depends on:
    3. the depth of its left subtree
    4. the depth of its right subtree
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
    maxDepth(root) {
        if(!root) return 0;

        return  1 + Math.max(this.maxDepth(root.left), this.maxDepth(root.right))
    }
}

/*
# Complexity Analysis

Time Complexity
    O(n) where n is the number of nodes in the binary tree, as the algorithm visits each node exactly once.

Space Complexity
    O(h) where h is the height of the tree, representing the maximum depth of the recursive call stack. In the worst case of a skewed tree, this is O(n), and in the best/average case of a balanced tree, this is O(log n). No explicit init loops are present.
*/