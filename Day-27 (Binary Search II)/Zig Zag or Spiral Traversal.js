/*
# Problem Statement:
    Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).


Example 1

    Input : root = [1, 2, 3, null, 4, 8, 5]

    Output : [ [1] , [3, 2], [4, 8, 5] ]

    Explanation : So at root we move from left to right.

    At next level we move in opposite direction i.e. from right to left.

    At next level again reverse the traversal i.e. from left to right.


Example 2

    Input : root = [3, 9, 20, null, null, 15, 7]

    Output : [ [3] , [20, 9], [15, 7] ]

    Explanation : So at root we move from left to right.

    At next level we move in opposite direction i.e. from right to left , from 20 to 9.

    At next level again reverse the traversal i.e. from left to right, from 15 to 7.
*/


/*

# Intuition
1. Use dequeue to insert it from one side and pop out from other side and do opposite for next time and so on
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

    zigzagLevelOrder(root) {
        if(!root) return null;
        let dequeue = [];
        let op = []
        let turn =1; // 1 means front side push

        dequeue.push(root);
        while(dequeue.length > 0){
            let size = dequeue.length;
            let subArray = [];
            while(size > 0){
                if(turn == 1){
                    // front insertion back out
                    let node = dequeue.shift();
                    subArray.push(node.data)

                    if(node.left) {
                        dequeue.push(node.left);
                    }
                    if(node.right){
                        dequeue.push(node.right)
                    }
                }else{
                    // back insertion front deletion
                    let node = dequeue.pop();
                    subArray.push(node.data);

                    if(node.right){
                        dequeue.unshift(node.right);
                    }
                    if(node.left){
                        dequeue.unshift(node.left);
                    }
                    
                }
                size--;
            }

            turn = 1- turn;
            op.push([...subArray]);
        }
        return op;
    }
}


/*
# Complexity Analysis

Time Complexity
    O(n^2) where n is the number of nodes, because the dequeue operations 'shift' and 'unshift' inside the loops perform O(k) work where k is the current level size, leading to summation of work across all levels.

Space Complexity
    O(n) where n is the number of nodes in the binary tree, as the dequeue stores at most the width of the tree, and the result array stores all n node values. 
*/