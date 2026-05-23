/*
# Problem Statement:
Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

Example 1

    Input : root = [1, 2, 2, 3, 4, 4, 3]

    Output : true

    Explanation :

Example 2

    Input : root = [1, 2, 2, null, 3, null, 3]

    Output : false

    Explanation : When a straight line is drawn through the root node and the tree is folded around it, the rightmost node 3 is overlapped with null node and the node 3 present at left of root node is overlapped with null nodes.

    So both node 3 in tree does not show symmetric behaviour.
*/


/*

# Intuition
    1. Check if both root.left and root.right is same
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
    checkIsSymmetric(left, right){
        if(!left && !right) return true;
        if(
            !left || !right 
            || left.data != right.data
        ){
             return false;
        }

        return (
            this.checkIsSymmetric(left.left, right.right) && 
            this.checkIsSymmetric(left.right, right.left)
        );
    }
    isSymmetric(root) {
        if(!root) return true;
        return this.checkIsSymmetric(root.left, root.right);
    }
}


/*
# Complexity Analysis

Time Complexity
    O(n) where n is the number of nodes in the binary tree, as each node is visited exactly once.

Space Complexity
    O(h) where h is the height of the tree, representing the maximum recursion depth on the call stack, which is O(n) in the worst case (skewed tree) and O(log n) in the best case (balanced tree).

*/