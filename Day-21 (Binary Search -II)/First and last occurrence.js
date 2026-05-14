/*
# Problem Statement:
Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value. If the target is not found in the array, return [-1, -1].

Example 1

    Input: nums = [5, 7, 7, 8, 8, 10], target = 8

    Output: [3, 4]

    Explanation:The target is 8, and it appears in the array at indices 3 and 4, so the output is [3,4]

Example 2

    Input: nums = [5, 7, 7, 8, 8, 10], target = 6

    Output: [-1, -1]

    Expalantion: The target is 6, which is not present in the array. Therefore, the output is [-1, -1].

Example 3

    Input: nums = [5, 7, 7, 8, 8, 10], target = 5

    Output: [0, 0]

# Constraints

  0 <= nums.length <= 105
  -109 <= nums[i] <= 109
  nums is a non-decreasing array.
  -109 <= target <= 109
*/


/*

# Intuition

1. Same as the lowerbound and upperbound problem, but just needs to find for value = target not less or small
*/


// Solution
class Solution {

    binarySearch(nums, target, findFirst) {
        let start = 0;
        let end = nums.length - 1;
        let pos = -1;

        while (start <= end) {
            let mid = start + Math.floor((end - start) / 2);

            if (nums[mid] === target) {
                pos = mid;

                if (findFirst) {
                    end = mid - 1;   // move left
                } else {
                    start = mid + 1; // move right
                }

            } else if (nums[mid] < target) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }

        return pos;
    }
// Using 1 function for the searchRange
    searchRange(nums, target) {
        return [
            this.binarySearch(nums, target, true),
            this.binarySearch(nums, target, false)
        ];
    }
}

// Note - I have created one function for both, you can create seperate but this is a better version

/*
# Complexity Analysis
  Same as earlier - Binary Search I
*/