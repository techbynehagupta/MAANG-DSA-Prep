/*
# Problem Statement:

Given the roots of two binary trees p and q, write a function to check if they are the same or not.
Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.


Example 1

    Input : p = [1, 2, 3] , q = [1, 2, 3]

    Output : true

    Explanation : Both trees images are shown below

Example 2

    Input : p = [1, 2, 1] , q = [1, 1, 2]

    Output : false

    Explanation : Both trees images are shown below
*/


/*

# Intuition
    1. Match node value 
    2. Go to left match, if don't match then return false
    3. Go to right and do same thing
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
    isSameTree(p, q) {
        if(!p && !q) return true;
        if(!p || !q) return false;

        if(p.data != q.data){
            return false;
        }

        return this.isSameTree(p.left, q.left) && this.isSameTree(p.right, q.right);
    }
}

/*
# Complexity Analysis

Time Complexity
    O(N) where N is the number of nodes in the smaller tree, as the algorithm visits each corresponding pair of nodes exactly once.

Space Complexity
    O(H) where H is the height of the tree, representing the maximum depth of the recursion stack, which ranges from O(log N) in a balanced tree to O(N) in a skewed tree.
*/