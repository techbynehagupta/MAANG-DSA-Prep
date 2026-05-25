/*
# Problem Statement:
    Given a min-heap in array representation named nums, convert it into a max-heap and return the resulting array.
    * A min-heap is a complete binary tree where the key at the root is the minimum among all keys present in a binary min-heap and the same property is recursively true for all nodes in the Binary Tree.
    * A max-heap is a complete binary tree where the key at the root is the maximum among all keys present in a binary max-heap and the same property is recursively true for all nodes in the Binary Tree.
    Since there can be multiple answers, the compiler will return true if it's correct, else false.


Example 1

    Input: nums = [10, 20, 30, 21, 23]

    Output: [30, 21, 23, 10, 20]

    Explanation:

    In the input min heap, 10 is the root (smallest).

    After conversion, 30 becomes the root (largest).

    Now every parent node is larger than its children:

    30 > 21, 30 > 23

    21 > 10, 23 > 20

    Hence it is a valid max heap.

Example 2

    Input: nums = [-5, -4, -3, -2, -1]

    Output: [-1, -2, -3, -4, -5]

    Explanation:

    In the input min heap, -5 is the root (smallest among negatives).

    After conversion, -1 becomes the root (largest among negatives).

    Now every parent node is larger than its children:

    -1 > -2, -1 > -3

    -2 > -4, -3 > -5

    Hence it is a valid max heap.


# Constraints

    1 <= nums.length <= 105
    -104 <= nums[i] <= 104
    nums represents a min-heap
*/


/*
# Intuition
A heap stored in an array is simply a complete binary tree arranged level by level. Even if the array currently represents a min-heap, its shape already satisfies the complete binary tree property.

So the only thing we need to fix is the heap order, not the structure.

To convert the min-heap into a max-heap:

- In a min-heap, every parent is smaller than its children.
- In a max-heap, every parent must be larger than its children.

A key observation:

- The bottom-most level already satisfies max-heap rules (leaf nodes have no children).
- Therefore, if we start from the last non-leaf node and apply MaxHeapify upward toward the root, the entire heap becomes a valid max-heap.

This bottom-up heapification is the optimal and standard method for building or transforming heaps.
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
    convertSubTreeToMaxHeap(nums, i){
        while(i < nums.length){
            let left = this.getLeftChildInd(i);
            let largest = i;
            if(nums[left] > nums[largest]){
                largest = left;
            }
            let right = this.getRightChildInd(i);
            if(right < nums.length && nums[right] > nums[largest]){
                largest = right;
            }
            if(i!= largest){
                this.swap(nums, i, largest);
                i = largest;
            }else{
                break;
            }
        }
    }
    minToMaxHeap(nums) {
        let n = nums.length;
        let lastNonLeafNode = Math.floor((n-1)/2);
        for(let i= lastNonLeafNode; i>=0; i--){
            this.convertSubTreeToMaxHeap(nums, i);
        }
        return nums;
    }
}



/*
# Complexity Analysis

Time Complexity
    O(n). The heapify process for all n nodes takes O(n) time because the number of nodes at height h is n/(2^(h+1)), resulting in a geometric series sum that converges to O(n).

Space Complexity
    O(1). The algorithm performs an in-place conversion of the array into a max heap, using only a constant amount of extra space for pointers and variables regardless of the input size.
*/