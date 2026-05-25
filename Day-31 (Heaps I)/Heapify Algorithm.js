/*
# Problem Statement:
    Given an array nums representing a min-heap and two integers ind and val, set the value at index ind (0-based) to val and perform the heapify algorithm such that the resulting array follows the min-heap property.
    Modify the original array in-place, no need to return anything.


Example 1

    Input: nums = [1, 4, 5, 5, 7, 6], ind = 5, val = 2

    Output: [1, 4, 2, 5, 7, 5]

    Explanation: After setting index 5 to 2, the resulting heap in array form = [1, 4, 5, 5, 7, 2]

    Parent of nums[5] = nums[2] = 5 > nums[5] = 2, so they are swapped.

    Final array = [1, 4, 2, 5, 7, 5]

Example 2

    Input: nums = [2, 4, 3, 6, 5, 7, 8, 7], ind = 0, val = 7

    Output: [3, 4, 7, 6, 5, 7, 8, 7]

    Explanation: After setting index 0 to 7, the resulting heap in array form =[7, 4, 3, 6, 5, 7, 8, 7]

    The parent of nums[2] = nums[0] = 7 > nums[2] = 3, so they are swapped. No further swaps are needed.

    Final array = [3, 4, 7, 6, 5, 7, 8, 7]

# Constraints

    1 <= nums.length <= 105
    -104 <= nums[i] <= 104
    0 <= ind < nums.length
    -104 <= val <= 104

*/


/*
# Intuition
1. When a value is updated at a particular index, the array following the min-heap property consistently gets distorted. To make the array consistent again, the heapify algorithm is used.
2. When a particular index value is updated, there can be two cases:

 * Updated value is greater than the initial value: For a min-heap array, this updated value must actually belong to its bottom subtree. Hence, the array is heapified downwards.
 * Updated value is smaller than the initial value: For a min-heap array, this updated value must actually belong to the upper levels of the tree. Hence, the array is heapified upwards.

3. While heapifying upwards or downwards, the value of the nodes are updated such that the value of parent node is always lesser than the values of its children nodes.
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
    heapifyUp(nums, ind){
        let parent = this.getParentIndex(ind);
        
        while(ind > 0 && nums[parent] > nums[ind]){
            this.swap(nums, parent, ind);
            ind = parent;
            parent = this.getParentIndex(ind);
        }
    }
    heapifyDown(nums, ind){
        let left = this.getLeftChildInd(ind);
        let n = nums.length;

        if(left >= n){
            return ;
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
            this.heapifyDown(nums, smallest);
        }
    }
    swap(arr, i, j){
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    heapify(nums, ind, val) {
        if(ind >= nums.length || nums[ind] == val) return;

        let prev = nums[ind];
        nums[ind] = val;

        if(val < prev){
            // if value is less so needs to do heapify up
             this.heapifyUp(nums, ind)
        }else{
            // heapifyDown
            this.heapifyDown(nums, ind);
        }
    }
}


/*
# Complexity Analysis

Time Complexity
    O(log n) where n is the size of the heap. heapifyUp and heapifyDown both traverse the height of the tree, which is logarithmic relative to the number of nodes.

Space Complexity
    O(log n) where n is the size of the heap. The space complexity is driven by the recursive call stack of heapifyDown, which can reach a depth of log n in the worst case.
*/