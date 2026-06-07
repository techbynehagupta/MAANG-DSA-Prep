/*
# Problem Statement:
    Given the root node of a binary search tree (BST) and a value key. Return the root node of the BST after the deletion of the node with the given key value.
    Note: As there can be many correct answers, the compiler returns true if the answer is correct, otherwise false.


Example 1

    Input : root = [5, 3, 6, 2, 4, null, 7] , key = 3

    Output : [5, 4, 6, 2, null, null, 7]



Example 2

    Input : root = [5, 3, 6, 2, 4, null, 7] , key = 0

    Output : [5, 3, 6, 2, 4, null, 7]

    Explanation :

    The tree does not have node with value 0.


# Constraints

    1 <= Number of nodes <= 104
    -108 <= Node.val <= 108
    All values in tree are unique.
    -108 <= key <= 108
*/


/*
# Intuition
    1. Find the node in the tree where data is equal to given key
        a. If key is less then root.data then call the deleteNode on leftsubtree
        b. If the key is greater than root.data then call deleteNode on rightsubtree
        c. If the key is equal to the root's data then 
            c.1 see if one of the child don't exists then make the other child as the root and return it
            c.2 If both exists then update root with right child and Take the original leftchild and add it to the leftmost left child of root

        ex - 5
            / \
           4   7
              /
              6  

Now let's suppose 5 is the key then we have to delete 5
    left child is 4 and rightchild is 7
    1. Make root as the rightchild and take original leftchild and attach to the leftmost side of right child
     7
    / \
   N   6
       /
      4  

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
    inOrderTree(root) {
      if (!root) {
        return null;
      }
      this.inOrderTree(root.left);
      console.log(root.data);
      this.inOrderTree(root.right);
    }
    deleteNode(root, key) {
      if (!root) return null;
  
      if (key < root.data) {
        root.left = this.deleteNode(root.left, key);
      } else if (key > root.data) {
        root.right = this.deleteNode(root.right, key);
      } else {
        let left = root.left;
        let right = root.right;
  
        if (!left || !right) {
          // if either of left or right doesn't exists the other sibling becomes parent
          root = left || right;
        } else {
          // If both of them exists making left as parent
          if (!root.left) {
            return root.right;
          }
          if (!root.right) {
            return root.left;
          }
          // both children exists
          let leftChild = root.left;
          let rightChild = root.right;
  
          // Idea is to make rightChild as root and original left child will becomes the leftmost child of rightChild
          let curr = rightChild;
          while (curr.left) {
            curr = curr.left;
          }
          curr.left = leftChild;
          return rightChild;
        }
      }
      return root;
    }
  }
  

/*
# Complexity Analysis

Time Complexity
    O(h), where h is the height of the tree. In a balanced BST, h = log n, while in the worst case (skewed tree), h = n. This includes the while loop used to find the successor node.

Space Complexity
    O(h), where h is the height of the tree, representing the recursion stack depth during the traversal and deletion process.
*/