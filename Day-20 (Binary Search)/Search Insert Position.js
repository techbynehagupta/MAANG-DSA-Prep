/*
# Problem Statement:
Given a sorted array of nums consisting of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

Example 1

    Input: nums = [1, 3, 5, 6], target = 5

    Output: 2

    Explanation: The target value 5 is found at index 2 in the sorted array. Hence, the function returns 2.

Example 2

    Input: nums = [1, 3, 5, 6], target = 2

    Output: 1

    Explanation: The target value 2 is not found in the array. However, it should be inserted at index 1 to maintain the sorted order of the array.

Example 3

    Input: nums = [1, 3, 5, 6], target = 7

    Output: 4

# Constraints

  1 <= nums.length <= 105
  -105 <= nums[i] <= 105
  nums contains distinct values sorted in ascending order.
  -105<= target <= 105
*/


/*

# Intuition
1. It's the same problem (just rephrased) as lowerbound, need to find the smallest no. that is >= target let's say x
2. As x will be at the position where new element needs to be inserted and x has to shift one position to maintain the array sorted
*/


// Solution
class Solution {
    searchInsert(nums, target) {
       let start = 0, end = nums.length-1;
        let inserPos = nums.length;
        while(start <= end){
           let mid = start + Math.floor((end-start)/2);
           if(nums[mid] < target){
            start = mid+1;
           }else{
                inserPos = mid;
                end = mid-1;
           }
        }
        return inserPos;
    }
}

/*
# Complexity Analysis

Time Complexity
    O(log n) where n is the length of the input array because the algorithm implements a binary search that halves the search space in each iteration.

Space Complexity
    O(1) because the algorithm uses a fixed number of integer variables (start, end, inserPos, mid) regardless of the input size.
*/