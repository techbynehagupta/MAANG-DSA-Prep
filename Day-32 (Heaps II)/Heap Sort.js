/*
# Problem Statement:
    Given an array of integers nums, sort the array in non-decreasing order using the heap sort algorithm. Sort the given array itself, there is no need to return anything.
    A sorted array in non-decreasing order is one in which each element is either greater than or equal to all the elements to its left in the array.


Example 1

    Input: nums = [7, 4, 1, 5, 3]

    Output: [1, 3, 4, 5, 7]

    Explanation:1 <= 3 <= 4 <= 5 <= 7.

    One possible way to get the sorted array using heapSort :

    [7, 4, 1, 5, 3] -> [3, 4, 1, 5, 7]

    -> [5, 4, 1, 3, 7] -> [3, 4, 1, 5, 7]

    -> [4, 3, 1, 5, 7] -> [1, 3, 4, 5, 7]

    -> [3, 1, 4, 5, 7] -> [1, 3, 4, 5, 7]

    -> [1, 3, 4, 5, 7] -> [1, 3, 4, 5, 7]

Example 2

Input: nums = [5, 4, 4, 1, 1]

Output: [1, 1, 4, 4, 5]

Explanation: 1 <= 1 <= 4 <= 4 <= 5.

Thus the array is sorted in non-decreasing order.


# Constraints

    1 <= nums.length <= 105
    -104 <= nums[i] <= 104
    nums[i] may contain duplicate values.
*/


/*
# Intuition
    The aim is to sort an array in ascending order. A straightforward method is to repeatedly pick out the largest element from the unsorted part of the array and place it at the end. Once the largest element is in its correct spot, the algorithm only needs to focus on the remaining (now smaller) unsorted portion.

    To efficiently get the largest element in constant time, the array can be organized into a Max Heap. A Max Heap is a special kind of binary tree where every parent node is greater than or equal to its children. In array form, the biggest element always ends up at index 0 (the root of the heap).
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
   heapifyDown(nums, ind, lastIndex){
       
       while(ind < lastIndex){
           let left = this.getLeftChildInd(ind);
           let n = lastIndex;
           if(left > n){
               break;
           }

           let largest = ind;

           if(nums[left] > nums[largest]){
               largest = left;
           } 

           let right = this.getRightChildInd(ind);

           if(right <= n && nums[right] > nums[largest]){
               largest = right;
           }
           if(largest != ind){
               this.swap(nums, largest, ind);
               ind = largest;
           }else{
               break;
           }
       }
       
   }
   buildHeap(nums){
       let n = nums.length;
       let lastNonLeafNode = Math.floor(n/2);
       for(let i = lastNonLeafNode; i>=0; i--){
           this.heapifyDown(nums, i, nums.length-1);
       }
   }
      
   heapSort(nums) {
       this.buildHeap(nums);
       let lastIndex = nums.length-1;
       while(lastIndex > 0){
           this.swap(nums, 0, lastIndex);
           lastIndex--;
           this.heapifyDown(nums, 0, lastIndex);
       }
   }
}



/*
# Complexity Analysis

Time Complexity
    O(n log n) because buildHeap takes O(n) and the main sorting loop performs n iterations, each calling heapifyDown which takes O(log n).

Space Complexity
    O(1) because the algorithm performs sorting in-place using only a constant amount of extra space for variables.
*/