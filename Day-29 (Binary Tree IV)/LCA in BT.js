/*
# Problem Statement:
    Given a root of binary tree, find the lowest common ancestor (LCA) of two given nodes (p, q) in the tree.
    The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).


Example 1

    Input : root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4] , p = 5, q = 1

    Output : 3



Example 2

    Input : root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4] , p = 5, q = 4

    Output : 5

# Constraints

    2 <= Number of Nodes <= 105
    -106 <= node.val <= 106
    All values in tree are unique.
*/


/*

# Intuition
1. Start by checking if the current root node is null or matches one of the target nodes (x or y). If the root is null or matches either target node, then return the root, as it could potentially be the LCA or simply indicate the end of the search path.
2. Perform a recursive search in the left subtree to find the nodes x and y. This involves calling the LCA function on the left child of the current root.
3. Similarly, perform a recursive search in the right subtree. This entails calling the LCA function on the right child of the current root.
4. After completing the recursive searches, analyze the results of both subtree searches. If both recursive calls return non-null values, it implies that one target node was found in each subtree. Consequently, the current root node must be the LCA, as it is the common ancestor of both nodes.
5. If only one of the subtree searches returns a non-null result, it indicates that both target nodes are located within the same subtree. In this case, return the non-null result, which represents the LCA found in that subtree.
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
    findNode(root, node){
        if(!root) return false;
        if(root.data == node){
            return true;
        }
        
        return( this.findNode(root.left, node) || this.findNode(root.right, node));
    }
    findLCA(root, p, q){
        if(!root) return null;

        // console.log("root.data", root.data)
        if(root.data == p || root.data == q){
            return root;
        }
        let left  = this.findLCA(root.left, p, q);
        let right = this.findLCA(root.right, p, q);

        // console.log(root.data, left, right)
        if(left && right){
            return root;
        }
        return left || right;
    }
    lowestCommonAncestor(root, p, q) {
        let pExists = this.findNode(root, p.data);
        let qExists = this.findNode(root, q.data);

        if(!pExists || !qExists){
            return -1;
        }
        let op = this.findLCA(root, p.data, q.data)
        return op;
    }
}



/*
# Complexity Analysis

Time Complexity
    O(n) where n is the number of nodes in the tree. The function findNode traverses the entire tree twice (2n) and findLCA traverses the entire tree once (n), resulting in 3n total operations.

Space Complexity
    O(h) where h is the height of the tree. The space complexity is determined by the maximum depth of the recursion stack used in the depth-first searches, which is proportional to the tree height.
*/