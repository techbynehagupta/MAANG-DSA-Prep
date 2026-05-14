/*
# Problem Statement:
Given an integer array nums of size N, sorted in ascending order with distinct values, and then rotated an unknown number of times (between 1 and N), find the minimum element in the array.


Example 1

    Input : nums = [4, 5, 6, 7, 0, 1, 2, 3]

    Output: 0

    Explanation: Here, the element 0 is the minimum element in the array.

Example 2

    Input : nums = [3, 4, 5, 1, 2]

    Output: 1

    Explanation:Here, the element 1 is the minimum element in the array.


# Constraints

    n == nums.length
    1 <= n <= 104
    -104 <= nums[i] <= 104
    All the integers of nums are unique.
    nums is sorted and rotated between 1 and n times.
*/


/*
# Intuition
1. problem is of finding pivot, which we did in search in rotated array I
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
   findMin(arr) {
      return arr[this.findPivot(arr)];
   }
}
