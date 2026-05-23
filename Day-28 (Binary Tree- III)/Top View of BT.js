/*
# Problem Statement:
    Given the root of a binary tree, return the top view of the binary tree.
    The top view of a binary tree consists of the set of nodes visible when the tree is observed from above.
    Return the values of these nodes ordered from the leftmost to the rightmost position.
    If multiple nodes share the same horizontal distance from the root, only the node that appears first when traversing from left to right (i.e., the leftmost node) should be included in the result.


Example 1

    Input : root = [1, 2, 3, 4, 5, 6, 7]

    Output : [4, 2, 1, 3, 7]

Example 2

    Input : root = [10, 20, 30, 40, 60, 90, 100]

    Output : [40, 20, 10, 30, 100]
*/


/*
# Intuition
    The top view of a binary tree can be visualized by imagining vertical lines passing through the tree. Each vertical line represents a unique vertical position, with nodes to the right having positive indexes and nodes to the left having negative indexes. To find the top view, we need the nodes that are first encountered from each vertical position as we traverse the tree horizontally.

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
    topView(root) {
      let queue = [];
      let map = new Map();
      let leftMost = Infinity;
      let rightMost = -Infinity;
      let op = [];
  
      queue.push({ node: root, col: 0 });
      while (queue.length > 0) {
        let { node, col } = queue.shift();
        leftMost = Math.min(leftMost, col);
        rightMost = Math.max(rightMost, col);
        if (!map.has(col)) {
          map.set(col, node.data);
        }
        // push nbrs
        if (node.left) {
          queue.push({ node: node.left, col: col - 1 });
        }
        if (node.right) {
          queue.push({ node: node.right, col: col + 1 });
        }
      }
      for (let i = leftMost; i <= rightMost; i++) {
        op.push(map.get(i));
      }
      return op;
    }
  }
  

/*
# Complexity Analysis

Time Complexity
    O(n) where n is the number of nodes in the binary tree, because every node is visited exactly once during the BFS traversal, and the final loop iterates over the width of the tree which is at most n.

Space Complexity
    O(n) because the queue stores nodes in a breadth-first manner (max O(n) for a wide tree), the Map stores one value for every horizontal column (max O(n)), and the output array stores nodes at most equal to the number of nodes n.

*/