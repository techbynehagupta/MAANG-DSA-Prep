/*
# Problem Statement:
    Implement the BSTIterator class that represents an iterator over the in-order traversal of a binary search tree (BST):
    BSTIterator(TreeNode root) Initializes an object of the BSTIterator class. The root of the BST is given as part of the constructor. The pointer should be initialized to a non-existent number smaller than any element in the BST.
    boolean hasNext() Returns true if there exists a number in the traversal to the right of the pointer, otherwise returns false.
    int next() Moves the pointer to the right, then returns the number at the pointer.
    Notice that by initializing the pointer to a non-existent smallest number, the first call to the next() will return the smallest element in the BST.
    Assume that the next() calls will always be valid. That is, there will be at least a next number in the in-order traversal when the next() is called.


Example 1

    Input : [ "BSTIterator" , "next" , "next" , "hasNext" , "next" , "hasNext" , "next" , "hasNext" , "next" , "hasNext" ] , root = [7, 3, 15, null, null, 9, 20]

    Output : [3, 7, true, 9, true, 15, true, 20, false]

    Explanation :

    BSTIterator bSTIterator = new BSTIterator([7, 3, 15, null, null, 9, 20]);

    bSTIterator.next();  // return 3

    bSTIterator.next();  // return 7

    bSTIterator.hasNext(); // return True

    bSTIterator.next();  // return 9

    bSTIterator.hasNext(); // return True

    bSTIterator.next();  // return 15

    bSTIterator.hasNext(); // return True

    bSTIterator.next();  // return 20

    bSTIterator.hasNext(); // return False

Example 2

    Input : [ "BSTIterator" , "next" , "next" , "next", "hasNext" , "next" , "hasNext" ] , root = [7, 3, 15, null, null, 9, 20]

    Output : [3, 7, 9, true, 15, true]

    Explanation :

    BSTIterator bSTIterator = new BSTIterator([7, 3, 15, null, null, 9, 20]);

    bSTIterator.next();  // return 3

    bSTIterator.next();  // return 7

    bSTIterator.next(); // return 9

    bSTIterator.hasNext(); // return True

    bSTIterator.next();  // return 15

    bSTIterator.hasNext(); // return True


# Constraints

    1 <= Number of Nodes <= 104
    At most 104 calls will be made to next and hasNext.
    0 <= Node.val <= 1054
*/


/*
# Intuition

    - Inorder traversal of a BST gives values in sorted order, so next() should return nodes one by one in inorder sequence.

    - Instead of storing the complete inorder traversal, we use a stack to simulate inorder traversal step by step.

    - Initially, we push the root and all its left-side nodes into the stack, because the leftmost node is the first value in inorder traversal.

    - When next() is called, we pop the top node from the stack. This popped node is the current inorder value.

    - After popping a node, if it has a right child, we push that right child and all its left-side nodes into the stack.

    Example:

            7
        / \
        3   15
            /  \
            9    20

    Initial stack: [7, 3]

    next() pops 3 → answer is 3

    next() pops 7 → answer is 7  
    Now 7 has right child 15, so push 15 and all left nodes of 15: [15, 9]

    next() pops 9 → answer is 9

    This way, every next() gives the next value in sorted order without storing the full inorder array.
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
      this.stack = [root];
      // push all values to the left of root
      let curr = root;
      while(curr.left){
          this.stack.push(curr.left);
          curr = curr.left;
      }
    }
  
    hasNext() {
      return this.top();
    }
  
    next() {
      let top =  this.stack.pop();
      if(!top){
          return null
      }
      if(top.right){
          let right = top.right;
          this.stack.push(right);
  
          while(right.left){
              this.stack.push(right.left);
              right = right.left;
          }
      }
      return top.data;
    }
  
    top() {
      let n = this.stack.length;
      return n > 0 ? this.stack[n - 1] : null;
    }
  }


/*
# Complexity Analysis

Time Complexity
    O(h) for initialization where h is the height of the tree; O(1) amortized for next() as each node is pushed and popped exactly once.

Space Complexity
    O(h) where h is the maximum height of the tree, representing the stack storage.
*/