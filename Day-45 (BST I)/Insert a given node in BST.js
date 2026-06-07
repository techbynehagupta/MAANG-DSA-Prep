/*
# Problem Statement:
    Given the root node of a binary search tree (BST) and a value val to insert into the tree. Return the root node of the BST after the insertion.
    It is guaranteed that the new value does not exist in the original BST. Note that the compiler output shows true if the node is added correctly, else false.


Example 1

    Input : root = [4, 2, 7, 1, 3] , val = 5

    Output : [4, 2, 7, 1, 3, 5]


Example 2

    Input : root = [40, 20, 60, 10, 30, 50, 70] , val = 25

    Output : [40, 20, 60, 10, 30, 50, 70, null, null, 25]


# Constraints

    1 <= Number of nodes <= 104
    -108 <= Node.val <= 108
    All values in tree are unique.
    -108 <= val <= 108
    It is guaranteed that the val does not exists in original BST.
*/


/*
# Intuition

*/


// Solution I ( Recursive)
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
    insertIntoBSThelper(root, val) {
      if (root == null) {
        return new TreeNode(val);
      }
      if (val < root.data) {
        root.left = this.insertIntoBSThelper(root.left, val);
      } else {
        root.right = this.insertIntoBSThelper(root.right, val);
      }
      return root;
    }
    insertIntoBST(root, val) {
      this.insertIntoBSThelper(root, val);
      return root;
    }
  }
  



/*
# Complexity Analysis

Time Complexity
    O(h), where h is the height of the tree. The algorithm traverses one path from the root to a leaf, which takes O(h) time. In the worst case of a skewed tree, h = n; in a balanced tree, h = log n.

Space Complexity
    O(h), representing the maximum depth of the recursion stack during the search, which corresponds to the height of the tree.
*/


// Solution II (Iterative)
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
 // Iterative

 class Solution {
    insertIntoBST(root, val) {
      let tempRoot = root;
      while(tempRoot){
          if(val < tempRoot.data){
              if(tempRoot.left == null){
                  tempRoot.left = new TreeNode(val);
                  break;
              }
              tempRoot = tempRoot.left;
          }else{
              if(tempRoot.right == null){
                  tempRoot.right = new TreeNode(val);
                  break;
              }
              tempRoot = tempRoot.right;
          }
      }
      return root;
    }
  }
  
/*
Complexity Analysis

Time Complexity
    O(h), where h is the height of the binary search tree, as the algorithm traverses a single path from the root to a leaf node.

Space Complexity
    O(1), as the iterative approach uses a constant amount of extra space for the tempRoot pointer regardless of the tree size.

*/