/*
# Problem Statement:
    Given an array of integers nums, convert it in-place into a min-heap.
    A binary min-heap is a complete binary tree where the key at the root is the minimum among all keys present in a binary min-heap and the same property is recursively true for all nodes in a Binary Tree.


Example 1

    Input: nums = [6, 5, 2, 7, 1, 7]

    Output: [1, 5, 2, 7, 6, 7]

    Explanation: nums[0] <= nums[1], nums[2]

    nums[1] <= nums[3], nums[4]

    nums[2] <= nums[5]

Example 2

    Input: nums = [2, 3, 4, 1, 7, 3, 9, 4, 6]

    Output: [1, 2, 3, 3, 7, 4, 9, 4, 6]

    Explanation: nums[0] <= nums[1], nums[2]

    nums[1] <= nums[3], nums[4]

    nums[2] <= nums[5], nums[6]

    nums[3] <= nums[7], nums[8]

# Constraints

    1 <= nums.length <= 105
    -104 <= nums[i] <= 104
*/


/*
# Approach
    1. Start from the last non-leaf node in the array, as leaf nodes are already min-heaps.
    2. Perform a downward heapify operation on each node, ensuring the heap property (the parent is smaller than its children) is maintained.
    3. The heapify operation compares the current node with its children, swaps it with the smallest child if necessary, and recursively heapifies the affected subtree.
    4. Once the iterations are over, the array represents a min-heap.

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
    heapifyDown(nums, ind){
        
        while(ind < nums.length){
            let left = this.getLeftChildInd(ind);
            let n = nums.length;
            if(left >= n){
                break;
            }

            let smallest = ind;

            if(nums[left] < nums[smallest]){
                smallest = left;
            } 

            let right = this.getRightChildInd(ind);

            if(right < n && nums[right] < nums[smallest]){
                smallest = right;
            }
            if(smallest != ind){
                this.swap(nums, smallest, ind);
                ind = smallest;
            }else{
                break;
            }
        }
        
    }
    buildHeap(nums){
        let n = nums.length;
        let lastNonLeafNode = Math.floor(n/2);
        for(let i = lastNonLeafNode; i>=0; i--){
            this.heapifyDown(nums, i);
        }
    }
    buildMinHeap(nums) {
        this.buildHeap(nums)
    }
}


/*
# Complexity Analysis

Time Complexity
    O(n) where n is the number of elements in the array. Although heapifyDown is O(log n), buildHeap performs n/4 calls to heapifyDown of depth 1, n/8 of depth 2, up to 1 of depth log n, resulting in a geometric series that converges to linear time complexity.

Space Complexity
    O(1) because the heap is constructed in-place using the input array, and only a constant amount of extra space is used for variables regardless of input size.
*/