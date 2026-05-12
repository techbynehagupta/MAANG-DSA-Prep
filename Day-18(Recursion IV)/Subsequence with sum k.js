/*
# Problem Statement:

    Given an array nums and an integer k. R﻿eturn true if there exist subsequences such that the sum of all elements in subsequences is equal to k else false.


Example 1

    Input : nums = [1, 2, 3, 4, 5] , k = 8

    Output : Yes

    Explanation : The subsequences like [1, 2, 5] , [1, 3, 4] , [3, 5] sum up to 8.

Example 2

    Input : nums = [4, 3, 9, 2] , k = 10

    Output : No

    Explanation : No subsequence can sum up to 10.


    Now your turn!

    Input : nums = [1, 10, 4, 5] , k = 16

Output:

    Pick your answer

# Constraints

    1 <= nums.length <= 20
    1 <= nums[i] <= 100
    1 <= k <= 2000

*/


/*
# Intuition
    
    The core idea is:

    For every element, we have only 2 choices:

    Take it into our subsequence
    Skip it

    So the algorithm tries all possible subsequences and checks whether any of them sum to goal.

    Example
        nums = [1,2,3]
        goal = 5

    At every number
                        []
               /          \
            take1         skip1
            [1]              []
         /      \         /      \
      take2   skip2    take2    skip2
      [1,2]    [1]      [2]      []

      Eventually, one path becomes: [2,3] → sum = 5

*/


// Solution
class Solution {
    _findSubSequenceSum(A, index, currSum, goal){
        if(currSum == goal){
            return true;
        }
        if(currSum > goal || index >= A.length){
            return false;
        }
        return this._findSubSequenceSum(A, index+1, currSum+A[index], goal) ||
                this._findSubSequenceSum(A, index+1, currSum, goal);
    }
    checkSubsequenceSum(nums, k) {
        if(nums.length == 0 && k> 0) return false;
        if(k == 0) return true;
        return this._findSubSequenceSum(nums, 0, 0,  k)
    }
}

/*
# Complexity
    | Complexity | Value     |
    | ---------- | --------- |
    | Time       | **O(2ⁿ)** |
    | Space      | **O(n)**  |

*/