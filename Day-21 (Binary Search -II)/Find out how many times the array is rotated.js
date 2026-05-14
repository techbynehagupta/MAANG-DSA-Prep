/*
# Problem Statement:
    Given an integer array nums of size n, sorted in ascending order with distinct values. The array has been right rotated an unknown number of times, between 0 and n-1 (including). Determine the number of rotations performed on the array.


Example 1

    Input : nums = [4, 5, 6, 7, 0, 1, 2, 3]

    Output: 4

    Explanation: The original array should be [0, 1, 2, 3, 4, 5, 6, 7]. So, we can notice that the array has been rotated 4 times.

Example 2

    Input: nums = [3, 4, 5, 1, 2]

    Output: 3

    Explanation: The original array should be [1, 2, 3, 4, 5]. So, we can notice that the array has been rotated 3 times.

# Constraints

    n == nums.length
    1 <= n <= 104
    -104 <= nums[i] <= 104
    All the integers of nums are unique.
*/


/*

# Intuition
1. Problem is finding pivot as pivot position will tell how many times the array is rotated
*/


// Solution
class Solution {
    findPivot(nums){
       let start = 0, end = nums.length-1;
       let mid= start + Math.floor((end-start)/2);
       while(start < end){
           mid= start + Math.floor((end-start)/2);
           if(nums[mid] > nums[end]){
               // right side
               start = mid+1;
           }else{
               end = mid
           }
       }
       return start;
   }
   findKRotation(nums) {
     let pivot = this.findPivot(nums);
     return pivot;
   }
}
