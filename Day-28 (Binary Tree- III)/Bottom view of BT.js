/*
# Problem Statement:
    Given root of binary tree, return the bottom view of the binary tree.
    The bottom view of a binary tree is the set of nodes visible when the tree is viewed from the bottom. Return nodes from the leftmost node to the rightmost node. Also if 2 nodes are outside the shadow of the tree and are at the same position then consider the node that appears later in level traversal.


Example 1

    Input : root = [20, 8, 22, 5, 3, null, 25, null, null, 10 ,14]

    Output : [5, 10, 3, 14, 25]

    Explanation : From left to right the path is as follows :

    First we encounter node with value 5.

    Then we have nodes 8 , 10 but from bottom only 10 will be visible.

    Next we have 20 , 3 but from bottom only 3 will be visible.

    Next we have 14 , 22 but from bottom only 14 will be visible.

    Then we encounter node with value 25.





Example 2

    Input : root = [20, 8, 22, 5, 3, 4, 25, null, null, 10 ,14]

    Output : [5, 10, 4, 14, 25]

    Explanation : From left to right the path is as follows :

    First we encounter node with value 5.

    Then we have nodes 8 , 10 but from bottom only 10 will be visible.

    Next we have 20 , 3 and 4. The 3 and 4 will be nodes visible from bottom but as the node 4 appears later from left to right , so only node 4 will be considered visible.

    Next we have 14 , 22 but from bottom only 14 will be visible.

    Then we encounter node with value 25.
*/


/*
# Intuition
    To determine the bottom view of a binary tree, we need to capture the nodes that are visible when observing the tree from below. This involves identifying nodes that appear at the lowest vertical level for each horizontal distance from the root. A Breadth-First Search (BFS) traversal is well-suited for this task, as it processes nodes level by level. By tracking the horizontal distance of each node from the root and storing the most recent node encountered at each distance in a map, we can accurately capture the bottom view. The horizontal distance helps in maintaining the vertical alignment of nodes, ensuring that we only keep the nodes that are visible from the bottom.
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
    bottomView(root) {
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
          map.set(col, node.data);
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
    O(n), where n is the number of nodes in the tree, because each node is visited exactly once during the BFS traversal and the final loop runs in O(w) where w is the width of the tree, resulting in O(n) total time.

Space Complexity
    O(n), because in the worst case (a skewed tree), the queue can store up to O(n) nodes and the Map stores O(n) unique column entries.

*/