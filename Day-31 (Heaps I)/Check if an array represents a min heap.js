/*
# Problem Statement:
    Given an array of integers nums. Check whether the array represents a binary min-heap or not. Return true if it does, otherwise return false.
    A binary min-heap is a complete binary tree where the key at the root is the minimum among all keys present in a binary min-heap and the same property is recursively true for all nodes in a Binary Tree.


Example 1

    Input: nums = [10, 20, 30, 21, 23]

    Output: true

    Explanation: Each node has a lower or equal value than its children.

Example 2

    Input: nums = [10, 20, 30, 25, 15]

    Output: false

    Explanation: The node with value 20 has a child with value 15, thus it is not a min-heap.

# Constraints

    1 <= nums.length <= 105
    -104 <= nums[i] <= 104
    The array represents a complete binary tree.
*/


/*
# Intuition
    To check if the given array represents a min-heap, all the nodes must follow the min-heap property.

    Min-Heap Property: Each node value must be smaller than the value of its immediate left and right children node.

    Since the leaf-nodes have no children, directly checking the min-heap property for the non-leaf nodes will be enough to check if the array represents a min heap.

# Approach:

    1. Iterate over the non-leaf nodes as the leaf-nodes follow the min-heap property by-default.
    2. For each non-leaf node, check if its left child or the right child (if they exist) has a smaller value than the parent node.
    3. If a child node is found having smaller value than the parent, then the parent node violates the min-heap property and the function can return the false.
    4. If all the node satisfy the min-heap property, the function returns true.
*/


// Solution
class Solution {
    getParentIndex(ind){
        return Math.floor((ind-1)/2);
    }
    getLeftChildInd(ind){
        return 2*ind+1;
    }
    getRightChildInd(ind){
        return 2*ind+2;
    }
    swap(arr, i, j){
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    checkSubtreeisMinHeap(nums, ind){
        let left = this.getLeftChildInd(ind);
        let smallest = ind;
        let n = nums.length;

        if(nums[left] < nums[smallest]){
            return false;
        } 

        let right = this.getRightChildInd(ind);

        if(right < n && nums[right] < nums[smallest]){
            return false;
        }
        return true;
        
    }
    isHeap(nums) {
        let n = nums.length;
        let lastNonLeafNode = Math.floor((n-1)/2);
        for(let i= lastNonLeafNode; i>=0; i--){
            let subTreeIsMinHeap = this.checkSubtreeisMinHeap(nums, i);
            if(subTreeIsMinHeap == false){
                return false;
            }
        }
        return true;
    }
}



/*
# Complexity Analysis

Time Complexity
    O(n), the loop runs from floor((n-1)/2) down to 0, visiting each internal node exactly once, where n is the number of elements in the array.

Space Complexity
    O(1), only a constant amount of extra space is used for variables n, lastNonLeafNode, i, subTreeIsMinHeap, left, smallest, and right, regardless of the input size.
*/