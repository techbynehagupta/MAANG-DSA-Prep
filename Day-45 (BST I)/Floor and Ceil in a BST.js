/*
# Problem Statement:
    Given a root of binary search tree and a key(node) value, find the floor and ceil value for that particular key value.
    Floor Value Node: Node with the greatest data lesser than or equal to the key value. 
    Ceil Value Node: Node with the smallest data larger than or equal to the key value.
    If a particular floor or ceil value is not present then output -1.


Example 1

Input : root = [8, 4, 12, 2, 6, 10, 14] , key = 11

Output : [10, 12]



Example 2

Input : root = [8, 4, 12, 2, 6, 10, 14] , key = 15

Output : [14, -1]


# Constraints

    1 <= Number of Nodes <= 5000
    1 <= Node.val <= 107
    1 <= key <= 107
*/


/*
# Intuition
    * A BST stores smaller values in the left subtree and larger values in the right subtree, which helps us eliminate half of the remaining nodes at every step.
    * If the current node's value is smaller than the key, it can be a potential floor, so we store it and move right to look for a larger valid floor.
    * If the current node's value is greater than the key, it can be a potential ceil, so we store it and move left to look for a smaller valid ceil.
    * If we find a node whose value equals the key, then both floor and ceil are the key itself.
    * By following only one root-to-leaf path, we efficiently determine the closest smaller and larger values without traversing the entire tree.
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

// Iterative solution
class Solution {
    floorCeilOfBST(root, key) {
        let floor = -1, ciel = -1;
        let tempRoot = root;
        while(tempRoot){
            if(tempRoot.data == key){
                floor = tempRoot.data;
                ciel = tempRoot.data;
                break;
            }
            if(key < tempRoot.data){
                ciel = tempRoot.data;
                tempRoot = tempRoot.left;
            }else{
                floor = tempRoot.data;
                tempRoot = tempRoot.right;
            }
        }
        return [floor, ciel]
    }
}


/*
# Complexity Analysis

Time Complexity
    O(h), where h is the height of the binary search tree. In the worst case (a skewed tree), this is O(n), and in a balanced tree, it is O(log n).

Space Complexity
    O(1) because the algorithm uses only a constant amount of extra space for the floor, ciel, and tempRoot variables regardless of input size.
*/