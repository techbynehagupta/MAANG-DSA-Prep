/*
# Problem Statement:
    Given an integer array nums, find the number of Longest Increasing Subsequences (LIS) in the array.


Example 1

    Input: nums = [1, 3, 5, 4, 7]

    Output: 2

    Explanation: There are two LIS of length 4:

    [1, 3, 4, 7]

    [1, 3, 5, 7].

Example 2

    Input: nums = [2, 2, 2, 2, 2]

    Output: 5

    Explanation: All elements are the same, so every single element can form an LIS of length 1. There are 5 such subsequences.

Example 3

    Input: nums = [10, 9, 2, 5, 3, 7, 101, 18]

    Output: 4

# Constraints

    1 <= nums.length <= 103
    -106 <= nums[i] <= 106
*/


/*
# Intuition
    1. For every index i, store:
    - LIS[i] = length of the longest increasing subsequence ending at i.
    - countDP[i] = number of LIS having length LIS[i] ending at i.
    2. If a longer subsequence is found through j, update LIS[i] and inherit countDP[j].
    3. If another subsequence gives the same LIS length, add its count to countDP[i].
    4. Track the overall maximum LIS length.
    5. Sum the counts of all indices whose LIS length equals the maximum length.
*/


// Solution
class Solution {
    numberOfLIS(arr) {
      let n = arr.length;
      let LIS = new Array(n).fill(1);
      let countDP = new Array(n).fill(1);
  
      let max = 1;
      for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
  
          if (arr[j] < arr[i]) {
            if (LIS[j] + 1 > LIS[i]) {
              LIS[i] = LIS[j] + 1;
              countDP[i] = countDP[j];
            } else if (LIS[i] == LIS[j] + 1) {
              countDP[i] += countDP[j];
            }
          }
  
        }
        max = Math.max(LIS[i], max);
      }
  
      let count = 0;
      for (let i = 0; i < n; i++) {
        if (max == LIS[i]) {
          count += countDP[i];
        }
      }
  
      return count;
    }
  }
  



/*
# Complexity Analysis

Time Complexity
    O(n^2), where n is the length of arr, because the nested loops iterate through all pairs (j, i) where 0 <= j < i < n, resulting in n(n-1)/2 operations.

Space Complexity
    O(n), where n is the length of arr, due to the initialization of two arrays (LIS and countDP) each of size n.
*/