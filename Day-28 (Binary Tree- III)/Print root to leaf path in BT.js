/*
# Problem Statement:
    Given the root of a binary tree. Return all the root-to-leaf paths in the binary tree.
    A leaf node of a binary tree is the node which does not have a left and right child.


Example 1

    Input : root = [1, 2, 3, null, 5, null, 4]

    Output : [ [1, 2, 5] , [1, 3, 4] ]

    Explanation : There are only two paths from root to leaf.

    From root 1 to 5 , 1 -> 2 -> 5.

    From root 1 to 4 , 1 -> 3 -> 4.



Example 2

    Input : root = [1, 2, 3, 4, 5]

    Output : [ [1, 2, 4] , [1, 2, 5] , [1, 3] ]
*/


/*

# Intuition
    1. Traverse all the nodes, once reach the leaf node push all the nodes that were encountered in the path to the result
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
    printPath(root, path, result){
        if(!root) return;

        path.push(root.data);
        if(!root.left && !root.right){
            result.push([...path]);
        }

        this.printPath(root.left, path, result);
        this.printPath(root.right, path, result);
        
        path.pop();      
    }
    allRootToLeaf(root) {
        let result = [];
        this.printPath(root, [], result);
        return result;
    }
}

/*
# Complexity Analysis

Time Complexity
    O(N) where N is the number of nodes in the binary tree. Every node is visited exactly once during the depth-first traversal.

Space Complexity
    O(H) where H is the height of the tree. This space is used by the recursion stack and the path array, which stores nodes along the current branch. In the worst case of a skewed tree, this is O(N).
*/