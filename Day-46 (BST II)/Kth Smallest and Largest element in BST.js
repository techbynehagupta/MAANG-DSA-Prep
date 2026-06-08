/*
# Problem Statement:
    Given the root node of a binary search tree (BST) and an integer k.
    Return the kth smallest and largest value (1-indexed) of all values of the nodes in the tree.
    Return the 1st integer as kth smallest and 2nd integer as kth largest in the returned array.


Example 1

    Input : root = [3,1,4,null,2] , k = 1

    Output : [1, 4]

    Explanation :

    The 1st smallest value in given BST is 1.

    The 1st largest value in given BST is 4.

Example 2

    Input : root = [5, 3, 6, 2, null, null, null, 1] , k = 3

    Output : [3, 3]

    Explanation :

    The 3rd smallest value in given BST is 3.

    The 3rd largest value in given BST is 3.


# Constraints

    The number of nodes in the tree is n.
    1 <= k <= n <= 104
    0 <= Node.val <= 105
*/


/*
# Intuition
    1. Find inorder store it in the result array
    2. Traverse through the result array to get the kth largest and kth smallest 
*/


// Solution I (Using Inorder)
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
    findInorder(root, result){
        if(root == null){
            return;
        }
        this.findInorder(root.left, result);
        result.push(root.data);
        this.findInorder(root.right, result);
    }
    kLargesSmall(root, k) {
        let result = [];
        this.findInorder(root, result);
        let n = result.length;
        if(n < k){
            return [-1, -1];
        }
        return [result[k-1], result[n-k]]
    }
}


/*
# Complexity Analysis

Time Complexity
    O(n) where n is the total number of nodes in the binary tree, as the recursive inorder traversal visits every node exactly once to build the result array.

Space Complexity
    O(n) where n is the total number of nodes in the binary tree, required to store the node data in the result array and to maintain the call stack during recursion which depends on the tree height (O(n) in the worst case for a skewed tree).
*/



// Solution II 

/*
Intuition
    * In a BST, inorder traversal (Left → Root → Right) visits nodes in sorted ascending order. So, the kth node visited during inorder traversal is the kth smallest element.
    * Similarly, reverse inorder traversal (Right → Root → Left) visits nodes in sorted descending order. So, the kth node visited during reverse inorder traversal is the kth largest element.
    * Maintain a counter while traversing. Each time a node is processed, increment the counter. When the counter becomes k, store the current node's value as the answer.
    * Once the required kth element is found, stop exploring further nodes to avoid unnecessary traversal and improve efficiency.
    * Perform one inorder traversal to find the kth smallest, reset the counter, then perform one reverse inorder traversal to find the kth largest, and return both values.
*/



class Solution {
    count = 0;
    smallest = -1;
    largest = -1;
  
    kthSmallest(root, k) {
      if (root == null) {
        return 0;
      }
  
      this.kthSmallest(root.left, k);
  
      this.count++;
      if (this.count == k) {
        this.smallest = root.data;
        return;
      }
  
      if (this.smallest == -1) {
        this.kthSmallest(root.right, k);
      }
    }
    kthLargest(root, k) {
      if (root == null) {
        return 0;
      }
  
      this.kthLargest(root.right, k);
      
      this.count++;
      if (this.count == k) {
        this.largest = root.data;
        return;
      }
  
      if (this.largest == -1) {
        this.kthLargest(root.left, k);
      }
    }
    kLargesSmall(root, k) {
      this.kthSmallest(root, k);
      this.count = 0;
      this.kthLargest(root, k);
      return [this.smallest, this.largest]
    }
  }
  
/*
Complexity Analysis

Time Complexity
    O(N) where N is the number of nodes in the binary tree because both kthSmallest and kthLargest perform an in-order traversal that visits each node at most once.

Space Complexity
    O(H) where H is the height of the binary tree, representing the space complexity of the implicit recursion stack during the depth-first traversal.
*/