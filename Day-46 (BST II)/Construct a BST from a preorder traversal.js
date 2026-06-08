/*
# Problem Statement:
    Given an array of integers preorder, which represents the preorder traversal of a BST (i.e., binary search tree), construct the tree and return its root.
    It is guaranteed that it is always possible to find a binary search tree with the given requirements for the given test cases.
    Note : As there can be many possible correct answers, the compiler outputs true if the solution is correct, else false.


Example 1

    Input : preorder = [8, 5, 1, 7, 10, 12]

    Output : [8, 5, 10, 1, 7, null, 12]


Example 2

    Input : preorder = [1, 3]

    Output : [1, null, 3]



# Constraints

    1 <= preorder.length <= 100
    1 <= preorder[i] <= 1000
    All the values of preorder are unique.
*/


/*
# Intuition
    In a BST, inorder traversal always gives values in sorted order.
    So, sort the given preorder array to get the inorder array.
    The first element of preorder is always the root of the current subtree.
    Find that root in inorder; elements on the left form the left subtree, and elements on the right form the right subtree.
    Recursively build left and right subtrees using the correct preorder index range.
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
    constructBST(preorder, inorder, i, start, end) {
      if (start > end) {
        return null;
      }
      
      let root = new TreeNode(preorder[i]);
      let rootIndex = -1;
  
      for (let i = start; i <= end; i++) {
        if (root.data == inorder[i]) {
          rootIndex = i;
          break;
        }
      }
  
      let leftSubtreeLength = rootIndex - start;
  
      root.left = this.constructBST(
        preorder,
        inorder,
        i + 1,
        start,
        rootIndex - 1,
      );
      root.right = this.constructBST(
        preorder,
        inorder,
        i + leftSubtreeLength + 1,
        rootIndex + 1,
        end,
      );
      return root;
    }
    bstFromPreorder(preorder) {
      let inorder = [...preorder];
      inorder.sort((a, b) => a - b);
  
      return this.constructBST(preorder, inorder, 0, 0, inorder.length - 1);
    }
  }

/*
# Complexity Analysis

Time Complexity: O(N log N + N²)
    Sorting takes O(N log N), and searching root index in inorder for every node can take O(N²) in the worst case.
Space Complexity: O(N + H)
    O(N) for the inorder array, and O(H) recursive stack space.
*/