/*
# Problem Statement:
    Given root of binary tree, return the preorder traversal of the binary tree.
    Morris preorder Traversal is a tree traversal algorithm aiming to achieve a space complexity of O(1) without recursion or an external data structure.


Example 1

    Input : root = [1, 4, null, 4 2]

    Output : [1, 4, 4, 2]


Example 2

    Input : root = [1]

    Output : [1]

    Explanation : Only root node is present.

# Constraints

    1 <= Number of Nodes <= 100
    -100 Node.val <= 100
*/


/*
# Intuition
    To address this problem, it is crucial to understand the Morris Inorder Traversal technique for binary trees. Morris Inorder Traversal, known for its space efficiency, can be adapted to perform Preorder Traversal by modifying the traversal method. Specifically, in Preorder Morris Traversal, the value of the current node is printed before proceeding to its left child, but only if the right child of the inorder predecessor is null.
    This modification maintains the core structure of Morris Traversal while ensuring that nodes are processed in the sequence required for Preorder Traversal. As a result, the traversal remains efficient, operating in constant space, as it does not require additional data structures.

Approach
    1. Begin by initializing a pointer, current, to traverse the tree, and set it to the root node of the binary tree.
    2. Perform the traversal while current is not null:
        2.1 If the current node does not have a left child, print the value of the current node and move to its right child.
        2.2 If the current node has a left child:
            2.2.a Identify the inorder predecessor of the current node, which is the rightmost node in the left subtree.
            2.2.b If the right child of this inorder predecessor is null, establish a temporary link by setting the right child of the inorder predecessor to the current node. Print the value of the current node and move to its left child.
            2.2.c If the right child of the inorder predecessor is not null, this indicates that the temporary link established earlier has been encountered. Therefore, revert the changes by setting the right child of the inorder predecessor back to null and proceed to the current node’s right child.
    3. Continue this process until the traversal reaches the end of the binary tree.
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
    preorder(root) {
        if(!root) return [];
        let cur = root;
        let op = [];

        while(cur != null){
            if(cur.left == null){
                op.push(cur.data);
                cur = cur.right;
            }else{
                let temp = cur.left;
                while(temp.right && temp.right != cur){
                    temp = temp.right;
                }
                if(temp.right == cur){
                    temp.right = null;
                    cur = cur.right;
                }else{
                    temp.right = cur;
                    op.push(cur.data);
                    cur = cur.left;
                }
            }
        }

        return op;
    }
}


/*
# Complexity Analysis

Time Complexity
    O(n) where n is the number of nodes in the binary tree. Although there is a nested loop, each edge is traversed at most twice (once to establish the thread and once to restore it), resulting in a linear number of operations.

Space Complexity
    O(1) excluding the output array. The algorithm uses Morris Traversal to traverse the tree without using recursion or an explicit stack, requiring only constant extra pointer space.
*/