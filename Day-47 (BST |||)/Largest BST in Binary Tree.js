/*
# Problem Statement:
    Given a root of Binary Tree, where the nodes have integer values. Return the size of the largest subtree of the binary tree which is also a BST.
    A binary search tree (BST) is a binary tree data structure which has the following properties.
    The left subtree of a node contains only nodes with data less than the node’s data.
    The right subtree of a node contains only nodes with data greater than the node’s data.
    Both the left and right subtrees must also be binary search trees.

Example 1

    Input : root = [2, 1, 3]

    Output : 3

    Explanation :

    The given complete binary tree is a BST consisting of 3 nodes.

Example 2

    Input : root = [10, null, 20, null, 30, null, 40, null, 50]

    Output : 5

    Explanation :

    If we consider the node 10 as root node then it forms the largest BST.

# Constraints

    1 <= Number of Nodes <= 104
    1 <= Node.val <= 105
*/


/*
# Intuition

    - For every node, return three values: [node_count, min_value, max_value].

    - Solve bottom-up: first get information from the left subtree and right subtree. For this we'll be using POST order traversal as we need response from left and right and have to evaluate at the root (or current node)

    - A subtree is a valid BST only if:
    max value from LST < root.data < min value from RST

    - If the condition is true, include the current node:
    node_count = leftCount + rightCount + 1

    - If the condition is false, return the largest BST size found so far from left or right subtree.
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
class NodeValue{
    constructor(minNode, maxNode, maxSize){
        this.minNode = minNode;
        this.maxNode = maxNode;
        this.maxSize = maxSize;
    }
}

class Solution {
  largestBSTHelper(root) {
    if (!root) {
      return new NodeValue(Infinity, -Infinity, 0);
    }

    let left = this.largestBSTHelper(root.left);
    let right = this.largestBSTHelper(root.right);

    if(left.maxNode < root.data && root.data < right.minNode ){
        return new NodeValue(
            Math.min(root.data, left.minNode),
            Math.max(root.data, right.maxNode),
            1+ left.maxSize + right.maxSize
        )
    }
    return new NodeValue(
        -Infinity,
        Infinity,
        Math.max(left.maxSize, right.maxSize)
    )
    
  }
  largestBST(root) {
    return this.largestBSTHelper(root).maxSize;
  }
}




/*
# Complexity Analysis

Time Complexity
    O(n) where n is the number of nodes in the binary tree, as each node is visited exactly once by the recursive helper function.

Space Complexity
    O(h) where h is the height of the tree, representing the maximum recursion depth on the call stack in the worst case (skewed tree O(n), balanced tree O(log n)).
*/