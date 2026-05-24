/*
# Problem Statement:
    Given two integer arrays preorder and inorder. Where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree.
    Construct and return the binary tree using in-order and preorder arrays.


Example 1

    Input : preorder = [3, 9, 20, 15, 7] , inorder = [9, 3, 15, 20, 7]

    Output : [3, 9, 20, null, null, 15, 7]

    Explanation : The output tree is shown below.



Example 2

    Input : preorder = [3, 4, 5, 6, 2, 9] , inorder = [5, 4, 6, 3, 2, 9]

    Output : [3, 4, 2, 5, 6, null, 9]

    Explanation : The output tree is shown below.
*/


/*
# Intuition

Understanding the significance of inorder and preorder traversals is crucial. Inorder traversal helps identify a node along with its left and right subtrees, while preorder traversal ensures the root node is encountered first. By leveraging these properties, it becomes possible to uniquely construct a binary tree. The core approach involves a recursive algorithm that creates one node at a time. The root node is located in the inorder traversal, splitting the array into left and right subtrees.
The inorder array continuously gets divided into left and right subtrees. To avoid unnecessary array duplication, variables (inStart, inEnd) and (preStart, preEnd) are used on the inorder and preorder arrays, respectively. These variables effectively define the boundaries of the current subtree within the original inorder and preorder traversals. Every time the root of a subtree is encountered via preorder traversal, its position is located in the inorder array to determine the left and right subtrees. To optimize the linear lookup, a hashmap is used to store the index of each element in the inorder traversal, transforming the search operation into a constant-time lookup
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
    constructTree(preorder, preStart, preEnd, inorder, inStart, inEnd, inOrderMap){
        if(preStart > preEnd || inStart > inEnd ){
            return null;
        }
        let root = new TreeNode(preorder[preStart]);
        let rootIndex = inOrderMap.get(preorder[preStart]);
        let leftSubTreeSize = rootIndex-inStart;

        root.left = this.constructTree(
                                    preorder, 
                                    preStart+1, 
                                    preStart+leftSubTreeSize, 
                                    inorder, 
                                    inStart, 
                                    rootIndex-1, 
                                    inOrderMap
                                );

        root.right = this.constructTree(
                preorder,
                preStart+leftSubTreeSize+1, 
                preEnd, 
                inorder, 
                rootIndex+1, 
                inEnd, 
                inOrderMap
            );
        return root;
    }
    buildTree(preorder, inorder) {
        let inOrderMap = new Map();
        for(let i=0; i< inorder.length; i++){
            inOrderMap.set(inorder[i], i);
        }
        return this.constructTree(preorder, 0, preorder.length-1, inorder, 0, inorder.length-1, inOrderMap);
    }
}


/*
# Complexity Analysis

Time Complexity
    O(n) where n is the number of nodes in the tree. The initial loop iterates n times to populate the Map, and the recursive constructTree function visits each node exactly once.

Space Complexity
    O(n) required for the hash map to store n nodes and for the recursion stack, which is O(h) where h is the tree height, resulting in O(n) in the worst case for a skewed tree.
*/