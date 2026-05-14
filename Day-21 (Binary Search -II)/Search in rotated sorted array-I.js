/*
# Problem Statement:
Given an integer array nums, sorted in ascending order (with distinct values) and a target value k. The array is rotated at some pivot point that is unknown. Find the index at which k is present and if k is not present return -1.


Example 1

    Input : nums = [4, 5, 6, 7, 0, 1, 2], k = 0

    Output: 4

    Explanation: Here, the target is 0. We can see that 0 is present in the given rotated sorted array, nums. Thus, we get output as 4, which is the index at which 0 is present in the array.

Example 2

    Input: nums = [4, 5, 6, 7, 0, 1, 2], k = 3

    Output: -1

    Explanation: Here, the target is 3. Since 3 is not present in the given rotated sorted array. Thus, we get the output as -1.

Example 3

    Input: nums = [4, 5, 6, 7, 0, 1, 2], k = 5

    Output:1

# Constraints

  1 <= nums.length <= 104
  -104 <= nums[i] <= 104
  All values of nums are unique.
  nums is an ascending array that is possibly rotated.
  -104 <= k <= 104
*/


/*
# Intuition
 1 Way
 1. Find the pivot element from where the array is rotated 
 2. Now check whether the target is in range of [0, pivot-1] or [pivot+1 to array length]

 2 Way
 1. Find out which part of the array is sorted by checking 
 2. arr[start] < arr[mid] (first-half sorted) check if the value is in range then move to left else move to the right
 2. or if the value is right sorted that is arr[mid] < arr[end] and then check if target is in range of mid-end then go right else left
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
     binarySearch(nums, target, s, e){
        let start = s, end = e;
        while(start <= end){
            let mid = start + Math.floor((end-start)/2);
            if(nums[mid] == target){
                return mid;
            }else if(nums[mid] > target){
                // go to left side
                end = mid-1;
            }else{
                start = mid+1;
            }
        }
        return -1;
    }
    search(nums, k) {
        let pivot = this.findPivot(nums);
        if(k == nums[pivot]) return pivot;
        let index = -1;
    
        if( nums[pivot] < k  && k <= nums[nums.length-1]){
           index=  this.binarySearch(nums,k,  pivot+1, nums.length-1)
        }else{
           index =  this.binarySearch(nums,k,  0, pivot-1)
        } 
        return index;
    }
}



/*
# Complexity Analysis
 Same as earlier - Binary Search I
*/