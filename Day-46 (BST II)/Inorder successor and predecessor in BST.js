/*
# Problem Statement:
    Given the root node of a binary search tree (BST) and an integer key. Return the Inorder predecessor and successor of the given key from the provided BST.
    Note: key will always present in given BST.
    If predecessor or successor is missing then return -1.


Example 1

    Input : root = [5, 2, 10, 1, 4, 7, 12] , key = 10

    Output : [7, 12]


Example 2

    Input : root = [5, 2, 10, 1, 4, 7, 12] , key = 12

    Output : [10, -1]


# Constraints

    1 <= Number of Nodes <= 104
    1 <= Node.val <= 105
    All the values Node.val are unique.
*/


/*
# Intuition
    While searching for the key in the BST, every time we move right, the current node becomes a potential predecessor because it is smaller than the key.
    Similarly, every time we move left, the current node becomes a potential successor because it is greater than the key.
    If the key is found, the predecessor is the largest value in its left subtree (rightmost node of the left subtree).
    Likewise, the successor is the smallest value in its right subtree (leftmost node of the right subtree).
    By leveraging BST properties, we avoid traversing unnecessary nodes and directly move toward the answer.
*/


// Solution Iterative
class Solution {
    succPredBST(root, key) {
      let predecessor = -1;
      let successor = -1;
  
      let curr = root;
  
      while (curr !== null) {
        if (curr.data < key) {
          predecessor = curr.data;
          curr = curr.right;
        } else if (curr.data > key) {
          successor = curr.data;
          curr = curr.left;
        } else {
          // Find max in left subtree
          let left = curr.left;
          while (left !== null) {
            predecessor = left.data;
            left = left.right;
          }
  
          // Find min in right subtree
          let right = curr.right;
          while (right !== null) {
            successor = right.data;
            right = right.left;
          }
  
          break;
        }
      }
  
      return [predecessor, successor];
    }
  }



/*
# Complexity Analysis

Time Complexity: O(H) 
    — We traverse only along the height of the BST while searching for the key and finding the predecessor/successor.
Space Complexity: O(1) 
    — Only a few variables are used; no recursion or extra data structures are required.
*/