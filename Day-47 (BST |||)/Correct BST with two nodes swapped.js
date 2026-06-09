/*
# Problem Statement:
    Given the root of a binary search tree (BST), where the values of exactly two nodes of the tree were swapped by mistake.
    Recover the tree without changing its structure.


Example 1

    Input : root = [1, 3, null, null, 2]

    Output : [3, 1, null, null, 2]

    Explanation :

    3 cannot be a left child of 1 because 3 > 1. Swapping 1 and 3 makes the BST valid.


Example 2

    Input : root = [3, 1, 4, null, null, 2]

    Output : [2, 1, 4, null, null, 3]

    Explanation :

    2 cannot be in the right subtree of 3 because 2 < 3. Swapping 2 and 3 makes the BST valid.

# Constraints

    1 <= Number of Nodes <= 104
    -231 <= Node.val <= 231 - 1
*/


/*
# Intuition

    - Inorder traversal of a valid BST gives values in sorted order.

    - While doing inorder traversal, we keep a prev pointer to compare the current node with the previous visited node.

    - If current node value is smaller than prev node value, it means there is an inversion and two nodes are swapped.

    - There can be two cases:
    1. Adjacent nodes swapped → only one inversion
    2. Non-adjacent nodes swapped → two inversions

    - On the first inversion:
    prevEl = prev
    swappedEl = root

    - On the second inversion:
    swappedEl = root

    - Finally, swap the values of prevEl and swappedEl to recover the BST without changing its structure.
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
    first = null;
    second = null;
    prev = new TreeNode(-Infinity);
  
    recoverTreeBST(root) {
      if (!root) return null;
  
      this.recoverTreeBST(root.left);
  
      if (this.prev && this.prev.data > root.data) {
        if (!this.first) {
          this.first = this.prev;
        }
        this.second = root;
      }
      this.prev = root;
      
      this.recoverTreeBST(root.right);
    }
    recoverTree(root) {
      this.recoverTreeBST(root, new TreeNode(-Infinity));
  
      let temp = this.first.data;
      this.first.data = this.second.data;
      this.second.data = temp;
  
      return root;
    }
  }
  

/*
# Complexity Analysis

Time Complexity
    O(n) where n is the number of nodes in the tree, as the inorder traversal visits every node exactly once.

Space Complexity
    O(h) where h is the height of the tree, representing the maximum recursion depth on the call stack.
*/