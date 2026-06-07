/*
# Problem Statement:
    Given the root of a binary search tree (BST) and an integer val.
    Find the node in the BST that the node's value equals val and return the subtree rooted with that node. If such a node does not exist, return null.


Example 1

Input : root = [4, 2, 7, 1, 3] , val = 2

Output : [2, 1, 3]


Example 2

Input : root = [4, 2, 7, 1, 3] , val = 5

Output : []


# Constraints

    1 <= Number of Nodes <= 5000
    1 <= Node.val <= 107
    1 <= val <= 107
    All nodes values in BST are unique.
*/


/*
# Intuition
    1. Check is the root is the value if not 
    2. Check if the root's value is > value if yes then value is present in the left subtree
    3. Else it'll be in right subtree
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

    searchBST(root, val) {
        if(root == null){
            return root;
        }
        if(root.data == val){
            return root;
        }
        if(val < root.data){
           return this.searchBST(root.left, val);
        }else{
           return this.searchBST(root.right, val)
        }
    }
}



/*
# Complexity Analysis

Time Complexity
    O(h), where h is the height of the tree, because in each recursive step we descend one level, resulting in O(log n) for a balanced BST and O(n) for a skewed BST.

Space Complexity
    O(h), where h is the height of the tree, due to the call stack during recursion, which is O(log n) for a balanced tree and O(n) for a skewed tree.
*/