/*
# Problem Statement:
    Serialization is converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.
    Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. Ensure that a binary tree can be serialized to a string, and this string can be deserialized to the original tree structure.
    The encoded string should be as compact as possible.


Example 1

    Input : root = [2, 1, 3]

    Output : [2, 1, 3]

Example 2

    Input : root = [7, 3, 15, null, null, 9, 20]

    Output : [7, 3, 15, null, null, 9, 20]


# Constraints

    1 <= Number of Nodes <= 104
    0 <= Node.val <= 104
*/


/*
# Intuition
The concept of serializing a binary tree involves transforming its structure into a string format that preserves the hierarchical arrangement of nodes. By utilizing level-order traversal (BFS), we can ensure that nodes are processed in the order of their levels, which simplifies the reconstruction of the tree during deserialization. In this approach, each node's value is recorded in the string, while null nodes are represented by a special placeholder (e.g., "#") to maintain the integrity of the tree structure.

Approach
1. First, check if the tree is empty. If the root is null, return an empty string. Otherwise, initialize an empty string to hold the serialized data of the binary tree.
2. Utilize a queue for level-order traversal. Begin by initializing a queue and enqueueing the root node.
3. In the level-order traversal process: Dequeue a node from the queue. If the node is null, append "#" to the string. If the node is not null, append its value followed by a comma (",") to the string and enqueue its left and right children.
4. Continue this process until the queue is empty, and then return the final string which contains the complete serialized representation of the binary tree.
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
    serialize(root) {
      if(!root) return "";
  
      let queue = [];
      let str = [];
  
      queue.push(root);
      while(queue.length > 0){
          let node = queue.shift();
          if(node === null){
              str.push("#");
              continue;
          }
          str.push(node.data);
          queue.push(node.left);
          queue.push(node.right)
      }
      return str.join(",");
    }
  
    deserialize(data) {
      if(data == "") return null;
  
      let nodes = data.split(",");
  
      let root = new TreeNode(parseInt(nodes.shift()))
      let queue = [root];
      while(queue.length > 0){
          let node = queue.shift();
          
          let leftVal = nodes.shift();
          if(leftVal != "#"){
              let leftNode = new TreeNode(parseInt(leftVal));
              node.left = leftNode;
              queue.push(leftNode)
          }
          
          let rightVal = nodes.shift();
          if(rightVal != "#"){
              let rightNode = new TreeNode(parseInt(rightVal));
              node.right = rightNode;
              queue.push(rightNode);
          }
      }
      return root;
    }
  }
  

/*
# Complexity Analysis

Time Complexity
    O(n) where n is the number of nodes in the tree, as each node is visited once during traversal and queue operations.

Space Complexity
    O(n) where n is the number of nodes, as we store the nodes in the queue and the serialized array representation of the tree.
*/