/*
# Problem Statement:
    Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

Example 1

    Input : root = [3, 9, 20, null, null, 15, 7]

    Output : [ [3] , [9, 20] , [15, 7] ]


Example 2

    Input : root = [1, 4, null, 4 2]

    Output : [ [1] , [4] , [4, 2] ]
*/


/*
# Intuition
    1. Create a queue
    2. Push root to the queue
    3. for each node in queue
        1. Pop it out
        2. Push its child
        3. Put the node in answer
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
    levelOrder(root) {
        if(!root) return [];
        let queue = [];
        let op= [];

        queue.push(root);
        while(queue.length > 0){
            let size = queue.length;
            let levelEl = [];
            while(size > 0){
                let node = queue.shift();
                if(node.left){
                    queue.push(node.left);
                }
                if(node.right){
                    queue.push(node.right)
                }
                levelEl.push(node.data);
                size--;
            }
            op.push([...levelEl]);
        }
        return op;
    }
}

/*
# Complexity Analysis

Time Complexity
    O(n) where n is the number of nodes in the tree, as each node is enqueued and dequeued exactly once.

Space Complexity
    O(w) where w is the maximum width of the binary tree, representing the maximum number of nodes stored in the queue at any given time.
*/