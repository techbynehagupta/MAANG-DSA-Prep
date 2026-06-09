/*
# Problem Statement:
    Given the root of a binary search tree and an integer k.Return true if there exist two elements in the BST such that their sum is equal to k otherwise false.


Example 1

    Input : root = [5, 3, 6, 2, 4, null, 7] , k = 9

    Output : true

    Explanation :

    The BST contains multiple pair of nodes that sum up to k.

    3 + 6 => 9.

    5 + 4 => 9.

    2 + 7 => 9.

Example 2

    Input : root = [5, 3, 6, 2, 4, null, 7] , k = 14

    Output : false

    Explanation :

    There is no pair in given BST that sum up to k.

# Constraints

    1 <= Number of Nodes <= 104
    -104 <= Node.val <= 104
    -105 <= k <= 105
*/

/*
# Intuition

    - This problem can be solved using the same idea as the BST Iterator question from the same folder.

    - We create two BST iterators using stack:
    one iterator moves in increasing order using next(),
    and the other iterator moves in decreasing order using before().

    - This works like the two-pointer approach on a sorted array, because inorder traversal of BST gives sorted values.

    - If next() + before() == k, we return true.

    - If the sum is smaller than k, move the increasing iterator using next(); otherwise move the decreasing iterator using before().
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
class BSTIterator {
    constructor(root) {
      this.stack = [];
      this.reverseStack = [];
  
      this.fill(root);
      this.fillReverse(root);
    }
    fill(root) {
      if(!root) return;
  
      this.stack.push(root);
  
      let curr = root;
      while (curr.left) {
        this.stack.push(curr.left);
        curr = curr.left;
      }
  
    }
    fillReverse(root) {
      if(!root) return;
  
      this.reverseStack.push(root);
  
      let curr = root;
      while(curr.right){
          this.reverseStack.push(curr.right);
          curr= curr.right;
      }
    }
  
    hasNext() {
      return this.top(this.stack);
    }
    hasBefore() {
      return this.top(this.reverseStack)
    }
  
    next() {
      if (!this.top(this.stack)) {
        return null;
      }
  
      let top =  this.stack.pop();
      let curr = top.right;
      this.fill(curr);
  
      return top.data;
    }
  
    before() {
      if(!this.top(this.reverseStack)){
          return null;
      }
      let top = this.reverseStack.pop();
      let curr = top.left;
      this.fillReverse(curr);
  
      return top.data;
    }
  
    top(stack) {
      let n = stack.length;
      return n > 0 ? stack[n - 1] : null;
    }
  }
  
  class Solution {
    twoSumBST(root, target) {
      let iterator = new BSTIterator(root);
  
      let next  = iterator.next();
      let before = iterator.before();
      while(next && before && next != before){
          let sum =  next + before;
          if(sum == target){
              return true;
          } else if(sum < target){
              next = iterator.next();
          }else{
              before = iterator.before();
          }
      }
      return false;
    }
  }
  
/*
# Complexity Analysis

Time Complexity
    O(n) where n is the number of nodes in the BST, because initialization traverses the height of the tree (O(h)) for both stacks, and the two-pointer approach visits each node at most once.

Space Complexity
    O(n) where n is the number of nodes in the BST, as the two stacks each store up to O(h) nodes, and in the worst case (a skewed tree), h equals n.
*/