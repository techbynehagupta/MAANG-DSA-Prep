/*
# Problem Statement:
    Given a target node data and a root of binary tree. If the target is set on fire, determine the shortest amount of time needed to burn the entire binary tree.
    It is known that in 1 second all nodes connected to a given node get burned. That is its left child, right child, and parent.


Example 1

    Input : root = [1, 2, 3, 4, null, 5, 6, null, 7]. target = 1

    Output : 3

    Explanation : The node with value 1 is set on fire.

    In 1st second it burns node 2 and node 3.

    In 2nd second it burns nodes 4, 5, 6.

    In 3rd second it burns node 7.



Example 2

    Input : root = [1, 2, 3, null, 5, null, 4], target = 4

    Output : 4

    Explanation : The node with value 4 is set on fire.

    In 1st second it burns node 3.

    In 2nd second it burns node 1.

    In 3rd second it burns node 2.

    In 4th second it burns node 5.

# Constraints

    1 <= Number of Nodes <= 104
    -105 <= Node.val <= 105
    All Node.val values are unique.
*/


/*
# Intuition

1. Start by using BFS to establish a map where each node is associated with its parent. This mapping helps in tracking the parent of each node, facilitating upward traversal during the fire spread simulation.
2. Locate the node where the fire begins. This node will serve as the starting point for the BFS that simulates the spread of the fire through the tree.
3. Initiate another BFS from the starting node to model how the fire spreads through the tree. During this traversal, consider all possible directions: left, right, and upward, ensuring that each node is only processed once.
4. Keep track of the nodes that have already been visited to avoid redundant processing and to ensure that the BFS traversal is efficient.
5. Measure the farthest distance reached during the BFS to determine the total time needed for the fire to consume the entire tree. This distance, in terms of BFS levels, represents the time required for complete combustion.

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
    findStart(root, start){
        if(!root) return 0;
        if(root.data == start){
            return root;
        }
        return this.findStart(root.left, start) || this.findStart(root.right, start);
    }
    findParentPointers(root){
        let parentPtrs = new Map();
        let queue = [];

        queue.push(root);
        while(queue.length > 0){
            let node = queue.shift();

            if(node.left){
                queue.push(node.left);
                parentPtrs.set(node.left.data, node);
            }
            if(node.right){
                queue.push(node.right);
                parentPtrs.set(node.right.data, node);
            }
        }
        return parentPtrs;
    }
    timeToBurnTree(root, start) {
        start = this.findStart(root, start);
        if(!start) return;

        let parentMap = this.findParentPointers(root);
        let visited = new Set();

        let queue = [];
        let time = 0;

        queue.push(start);
        visited.add(start.data);

        while(queue.length > 0){
            let size = queue.length;
            while(size > 0){
                let node = queue.shift();
                if(node.left && !visited.has(node.left.data)){
                    queue.push(node.left);
                    visited.add(node.left.data);
                }
                if(node.right && !visited.has(node.right.data)){
                    queue.push(node.right);
                    visited.add(node.right.data);
                }
                if(parentMap.has(node.data)){
                    let parent = parentMap.get(node.data);
                    if(!visited.has(parent.data)){
                        queue.push(parent);
                        visited.add(parent.data);
                    }
                }
                size--;
            }
            time++;
        }  
        return time-1;
    }
}



/*
# Complexity Analysis

Time Complexity
    O(n) where n is the number of nodes. findStart visits every node once in worst case (O(n)), findParentPointers traverses every node once (O(n)), and the final BFS traverses every node and edge once (O(n)).

Space Complexity
    O(n) where n is the number of nodes. The parentMap stores n entries, the queue in BFS stores nodes at a level (max O(n)), and the visited Set stores up to n nodes.
*/