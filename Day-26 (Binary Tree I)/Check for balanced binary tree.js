/*
# Problem Statement:

Given a binary tree root, find if it is height-balanced or not.
A tree is height-balanced if the difference between the heights of left and right subtrees is not more than one for all nodes of the tree. 


Example 1

    Input : [3, 9, 20, null, null, 15, 7]

    Output : Yes


Example 2

    Input : [1, 2, null, null, 3]

    Output : No
*/


/*

# Intuition
    1. Check the left and right height of tree and see if there is diff don't exceed 1
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
    checkIsbalanced(root){
        if(!root) return 0;

        let left = this.checkIsbalanced(root.left);
        if(left == -1){
            return -1;
        }

        let right = this.checkIsbalanced(root.right);
        if(right == -1){
            return -1;
        }

        let diff = Math.abs(left-right);
        if(diff > 1){
            return -1;
        }
        return 1 + Math.max(left, right);
    }
    isBalanced(root) {
        return this.checkIsbalanced(root) !== -1;
    }
}

/*
# Complexity Analysis

Time Complexity
    O(n) where n is the number of nodes in the binary tree, as each node is visited exactly once during the post-order traversal.

Space Complexity
    O(h) where h is the height of the tree, representing the maximum recursion stack depth; in the worst case (skewed tree), this is O(n), and in the best case (balanced tree), this is O(log n).
*/