/*
# Problem Statement:
    Given the root node of a binary tree. Return true if the given binary tree is a binary search tree(BST) else false.
    A valid BST is defined as follows:
    The left subtree of a node contains only nodes with key strictly less than the node's key.
    The right subtree of a node contains only nodes with key strictly greater than the node's key.
    Both the left and right subtrees must also be binary search trees.

Example 1

    Input : root = [5, 3, 6, 2, 4, null, 7]

    Output : true



Example 2

    Input : root = [5, 3, 6, 4, 2, null, 7]

    Output : false

    Explanation :

    The node 4 and node 2 violates the BST rule of smaller to left and larger to right.


# Constraints

    1 <= Number of Nodes <= 104
    -231 <= Node.val <= 231 - 1
*/


/*
# Intuition
    1. Find the inorder and it should be sorted for a BST
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
    inOrder(root, result){
        if(root == null){
            return;
        }
        this.inOrder(root.left, result);
        result.push(root.data);
        this.inOrder(root.right, result);
    }
    
    isBST(root) {
        let result = [];
        this.inOrder(root, result);
        for(let i=1; i < result.length; i++){
            if(result[i-1] >= result[i]){
                return false;
            }
        }
        return true;
    }
}


/*
# Solution- I
# Complexity Analysis
Time Complexity
    O(n) where n is the number of nodes. The inOrder traversal visits every node once, and the loop iterates through the result array of size n exactly n-1 times.

Space Complexity
    O(n) where n is the number of nodes. The result array stores all n node values, and the recursion stack occupies O(h) space, where h is the tree height (O(n) in the worst case).
*/

// Solution II

/*
# Intuition
    * A valid BST must satisfy the property that every node's value is greater than all values in its left subtree and smaller than all values in its right subtree.
    * Instead of comparing a node only with its immediate parent, maintain a valid range (min, max) for every node that represents the values it is allowed to take.
    * For each node, check whether its value lies strictly between the current min and max bounds. If not, the tree violates the BST property.
    * When moving to the left child, update the upper bound to the current node's value (max = root.data). When moving to the right child, update the lower bound (min = root.data).
    * If every node satisfies its allowed range during the recursive traversal, the tree is a valid BST; otherwise, return false as soon as a violation is found.

*/

class Solution {
    checkBST(root, min, max){
        if(root == null){
            return true;
        }
        if(root.data <= min || root.data >= max){
            return false;
        }
        return (
                this.checkBST(root.left, min, root.data) &&
                this.checkBST(root.right, root.data, max)
            );
    }
    isBST(root) {
        return this.checkBST(root, -Infinity, Infinity);
    }
}

/*
Complexity Analysis

Time Complexity
    O(n) where n is the number of nodes in the binary tree, as each node is visited exactly once during the recursive traversal.

Space Complexity
    O(h) where h is the height of the tree, representing the maximum depth of the recursion stack, which is O(n) in the worst case (unbalanced tree) and O(log n) in the best case (balanced tree).
*/