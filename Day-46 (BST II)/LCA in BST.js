/*
# Problem Statement:
    Given the root node of a binary search tree (BST) and two node values p,q.
    Return the lowest common ancestors(LCA) of the two nodes in BST.


Example 1

    Input : root = [5, 3, 6, 2, 4, null, 7] , p = 2, q = 4

    Output : [3]


Example 2

    Input : root = [5, 3, 6, 2, 4, null, 7] , p = 2, q = 7

    Output : [5]

# Constraints

    1 <= Number of Nodes <= 104
    1 <= Node.val <= 105
    All values in BST are unique.
    The values p and q are always present in the given BST.
*/


/*
# Intuition
    The Lowest Common Ancestor (LCA) of two nodes is the deepest node that has both nodes in its subtree (including itself).
    First, verify that both target nodes actually exist in the tree. If either node is missing, return -1 since an LCA cannot be formed.
    During recursion, if the current node matches either p or q, return that node upward. This acts as a signal that one of the target nodes has been found.
    Recursively search both left and right subtrees. If one target is found in the left subtree and the other is found in the right subtree, then the current node is the first point where both paths meet, making it the LCA.
    If only one subtree returns a non-null node, propagate that node upward since both targets may still lie in that direction or one of them has already been found.
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
    isExists(root, key){
        if(root == null){
            return false;
        }
        if(root.data == key){
            return true;
        }
        return this.isExists(root.left, key) || this.isExists(root.right, key);
    }
    findLCA(root, p, q){
        if(root == null){
            return null;
        }
        if(root.data == p || root.data == q){
            // if any of the node matches return that node as if the other is present as child, the current node wold be considered LCA, else if its present another part of tree it'll return that

            return root;
        }
        let left = this.findLCA(root.left, p, q);
        let right = this.findLCA(root.right, p , q);
        if(left && right){
            return root;
        }
        return left || right;
    }
    lca(root, p, q) {
        let pExists = this.isExists(root, p);
        let qExists = this.isExists(root, q);

        if(!pExists || !qExists){
            return [-1]
        }
        return this.findLCA(root, p, q);
    }
}

/*
# Complexity Analysis

Time Complexity: O(N) — 
    The tree is traversed up to three times (isExists for p, isExists for q, and findLCA), which is 3N, and constants are ignored.

Space Complexity: O(H) — 
    Recursive calls can go as deep as the height of the tree, so the call stack stores at most H nodes at a time.
*/