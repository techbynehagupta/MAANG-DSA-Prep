/*
# Problem Statement:

Given the root of a binary tree, return the length of the diameter of the tree.
The diameter of a binary tree is the length of the longest path between any two nodes in the tree. It may or may not pass through the root.


Example 1

    Input : root = [1, 2, 3, 4, 5]

    Output : 3

    Explanation : The path length between node 4 and 3 is of length 3.

    There are other ways to reach the solution.


Example 2

    Input : root = [1, 2, 3, null, 4, null, 5]

    Output : 4

    Explanation : The path length between node 4 and 5 is of length 4.
*/


/*

# Intuition
1. Make a global variable and save max of 1+ left height + right height
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
    diameter = 0;

   calcDiameter(root){
        if(!root){
            return null;
        }
        let left = this.calcDiameter(root.left);
        let right = this.calcDiameter(root.right);

        this.diameter = Math.max(this.diameter, left+right);
        return 1+ Math.max(left, right);
    } 
    diameterOfBinaryTree(root) {
        this.calcDiameter(root);
        return this.diameter;
    }
}


/*
# Complexity Analysis

Time Complexity
    O(n) where n is the total number of nodes in the binary tree because each node is visited exactly once by the recursive function calcDiameter.

Space Complexity
    O(h) where h is the height of the binary tree, representing the maximum depth of the call stack during the recursion; h equals n in the worst case (skewed tree) and log n in the best case (balanced tree).
*/