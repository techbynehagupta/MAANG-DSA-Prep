/*
# Problem Statement:
    Given a binary tree with root node. Return the In-order,Pre-order and Post-order traversal of the binary tree.


Example 1

    Input : root = [1, 3, 4, 5, 2, 7, 6 ]

    Output : [ [5, 3, 2, 1, 7, 4, 6] , [1, 3, 5, 2, 4, 7, 6] , [5, 2, 3, 7, 6, 4, 1] ]

    Explanation : The In-order traversal is [5, 3, 2, 1, 7, 4, 6].

    The Pre-order traversal is [1, 3, 5, 2, 4, 7, 6].

    The Post-order traversal is [5, 2, 3, 7, 6, 4, 1].


Example 2

    Input : root = [1, 2, 3, null, null, null, 6 ]

    Output : [ [2, 1, 3, 6] , [1, 2, 3, 6] , [2, 6, 3, 1] ]

    Explanation : The In-order traversal is [2, 1, 3, 6].

    The Pre-order traversal is [1, 2, 3, 6].

    The Post-order traversal is [2, 6, 3, 1].
*/


/*
# Intuition

PreOrder => Root, Left, Right
InOrder => Left, Root, Right
PostOrder => Left, Right, Root

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
    pre = [];
    inOrder = [];
    post = [];
    inorderTraversal(root) {
        if(!root) return; 

        this.inorderTraversal(root.left);
        this.inOrder.push(root.data);
        this.inorderTraversal(root.right);
    }
    preorderTraversal(root) {
        if(!root) return; 


        this.pre.push(root.data);
        this.preorderTraversal(root.left);
        this.preorderTraversal(root.right);
    }
    postorderTraversal(root) {
        if(!root) return; 


        this.postorderTraversal(root.left);
        this.postorderTraversal(root.right);
        this.post.push(root.data);
    }
    treeTraversal(root) {
        this.inorderTraversal(root);
        this.preorderTraversal(root);
        this.postorderTraversal(root);

        return [[...this.inOrder], [...this.pre], [...this.post]]
    }
}



/*
# Complexity Analysis

Time Complexity
    O(n) where n is the number of nodes in the binary tree, as each traversal (inorder, preorder, postorder) visits every node exactly once, resulting in 3n total operations.

Space Complexity
    O(n) for the recursive call stack which reaches a depth of O(n) in the worst case (skewed tree) and O(n) to store the three arrays, each containing n elements.
*/