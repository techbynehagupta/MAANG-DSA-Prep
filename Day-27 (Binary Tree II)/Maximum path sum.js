/*
# Problem Statement:

In a binary tree, a path is a list of nodes where there is an edge between every pair of neighbouring nodes. A node may only make a single appearance in the sequence.
The total of each node's values along a path is its path sum. Return the largest path sum of all non-empty paths given the root of a binary tree.
Note: The path does not have to go via the root.


Example 1

    Input : root = [20, 9, -10, null, null, 15, 7]

    Output : 34

    Explanation : The path from node 15 to node 9 has maximum path sum.

    The path is 15 -> -10 -> 20 -> 9.


Example 2

    Input : root = [-10, 9, 20, null, null, 15, 7]

    Output : 42

    Explanation : The path from node 15 to node 7 has maximum path sum.

    The path is 15 -> 20 -> 7.
*/


/*
# Intuition
    1. Same as diameter of the tree here just add the value and save the max
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
    maxPath = -Infinity;
    pathSumHelper(root){
       if(root == null) return 0;
       if(!root.left && !root.right){
           this.maxPath = Math.max(this.maxPath, root.data);
           return root.data;
       }
       let left = Math.max(0, this.pathSumHelper(root.left));
       let right = Math.max(0, this.pathSumHelper(root.right));

       this.maxPath = Math.max(this.maxPath, left+right+root.data);
       return root.data + Math.max(left, right);
   }
   maxPathSum(root) {
       this.pathSumHelper(root);
       return this.maxPath;
   }
}


/*
# Complexity Analysis

*/