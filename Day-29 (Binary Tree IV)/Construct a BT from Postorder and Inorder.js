/*
# Problem Statement:
    Given two integer arrays Postorder and Inorder. Where Postorder is the postorder traversal of a binary tree and Inorder is the inorder traversal of the same tree.
    Construct and return the binary tree using the postorder and inorder arrays.


Example 1

    Input : postorder = [9, 15, 7, 20, 3] , inorder = [9, 3, 15, 20, 7]

    Output : [3, 9, 20, null, null, 15, 7]

    Explanation : The output tree is shown below.



Example 2

    Input : postorder = [5, 6, 4, 9, 2, 3] , inorder = [5, 4, 6, 3, 2, 9]

    Output : [3, 4, 2, 5, 6, null, 9]

    Explanation : The output tree is shown below.
*/


/*
# Intuition

The process of constructing a binary tree from inorder and postorder traversals involves understanding how these traversals reveal the tree's structure. The inorder traversal allows us to determine the left and right subtrees of each node, while the postorder traversal ensures that the root node is the last node visited. By utilizing these characteristics, the binary tree can be reconstructed uniquely. The fundamental approach employs a recursive algorithm that constructs the tree one node at a time. The root node is identified from the postorder traversal and located in the inorder traversal, which divides the array into left and right subtrees.
To optimize the process and avoid unnecessary duplication of arrays, variables (inStart, inEnd) and (postStart, postEnd) are used to define the boundaries of the current subtree within the inorder and postorder arrays, respectively. These variables delineate the sections of the arrays that pertain to the current subtree. By finding the root of a subtree within the inorder array, the left and right subtrees can be determined. Additionally, a hashmap is used to store the indices of elements in the inorder traversal, allowing for constant-time lookups and enhancing the efficiency of the reconstruction process.
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
    constructTree(postorder, postStart, postEnd, inorder, inStart, inEnd, inOrderMap){
        if(postStart < postEnd || inStart > inEnd){
            return null;
        }
        let root = new TreeNode(postorder[postStart]);
        let rootIndex = inOrderMap.get(postorder[postStart]);

        let rightTreeSize = inEnd-rootIndex;

        root.left = this.constructTree(
                                postorder,
                                postStart-rightTreeSize-1,
                                postEnd,
                                inorder,
                                inStart,
                                rootIndex-1,
                                inOrderMap
                            ) ;
        root.right = this.constructTree(
                                postorder,
                                postStart-1,
                                postStart-rightTreeSize,
                                inorder,
                                rootIndex+1,
                                inEnd,
                                inOrderMap
                            )
        return root;
    }
    buildTree(inorder, postorder) {
        if (inorder.length !== postorder.length) {
            return null;
        }
       let inOrderMap = new Map();
        for(let i=0; i< inorder.length; i++){
            inOrderMap.set(inorder[i], i);
        }
        return this.constructTree(postorder, postorder.length-1, 0, inorder, 0, inorder.length-1, inOrderMap);
    }
}

/*
# Complexity Analysis

Time Complexity
    O(n) where n is the number of nodes. The map initialization takes O(n) using a loop over n elements, and each node in the tree is visited exactly once during the recursive construction process.

Space Complexity
    O(n) where n is the number of nodes. This accounts for the space required by the HashMap to store node indices and the recursion stack depth, which is O(n) in the worst case for a skewed tree and O(log n) for a balanced tree.
*/