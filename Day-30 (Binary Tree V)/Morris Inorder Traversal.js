/*
# Problem Statement:
    Given root of binary tree, return the Inorder traversal of the binary tree.
    Morris Inorder Traversal is a tree traversal algorithm aiming to achieve a space complexity of O(1) without recursion or an external data structure.


Example 1

    Input : root = [1, 4, null, 4, 2]

    Output : [4, 4, 2, 1]



Example 2

    Input : root = [1, null, 2, 3]

    Output : [1, 3, 2]


# Constraints

    1 <= Number of Nodes <= 100
    -100 <= Node.val <= 100
*/


/*
# Intuition

    1. Morris Traversal provides an efficient method for performing an in-order traversal of a binary tree without relying on recursion or an explicit stack. The core concept involves creating temporary links, referred to as "threads," between nodes to track the current position during the traversal. By establishing temporary links to each node's in-order predecessor, this approach navigates through the tree without requiring additional space. This method ensures that each node is visited in the correct sequence while maintaining the tree's original structure upon completion of the traversal.
    2. The traversal encompasses three primary scenarios: nodes without a left child, nodes with a left child where the in-order predecessor does not have a right child, and nodes with a left child where the right child of the in-order predecessor points back to the current node. Addressing these scenarios allows for an efficient and accurate in-order traversal while preserving the tree's structure.

Approach:
1. Begin by initializing the current node to the root of the binary tree.
2. While the current node is not null:
    2.1 If the current node lacks a left child, print its value and move to the right child by setting the current node to its right child.
    2.2 If the current node has a left child:
        2.2.a Identify the in-order predecessor of the current node, which is the rightmost node in the left subtree.
        2.2.b If the right child of the in-order predecessor is null, create a thread by setting its right child to the current node. Then, move to the left child by updating the current node to its left child.
        2.2.c If the right child of the in-order predecessor is not null, this indicates a previously established thread. Revert this change by setting the right child of the in-order predecessor back to null. Print the current node's value and then move to the right child by setting the current node to its right child.
3. Repeat the above steps until the traversal reaches the end of the tree.
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
    getInorder(root) {
        let ptr = root;
        let op = [];
        while(ptr){
            if(!ptr.left){
                op.push(ptr.data);
                ptr = ptr.right;
            }else{
                let temp = ptr.left;
                while(temp.right && temp.right!= ptr){
                    temp = temp.right;
                }
                if(temp.right == ptr){
                    // break the link
                    temp.right = null;
                    // push the root
                    op.push(ptr.data)
                    // traverse right
                    ptr = ptr.right;
                }else{
                    temp.right = ptr;
                    ptr = ptr.left;
                }
            }
           
        }
        return op;
    }
}

/*
# Complexity Analysis

Time Complexity
    O(n) where n is the number of nodes in the tree, because each edge is traversed at most twice (once for creating the thread and once for removing it).

Space Complexity
    O(1) excluding the output array, as the Morris Traversal modifies the tree structure in-place to store pointers instead of using an explicit stack or recursion.
*/