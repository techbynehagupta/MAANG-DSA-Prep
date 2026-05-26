/*
# Problem Statement:
    Given an integer array nums of size n. Return the maximum sum possible using the elements of nums such that no two elements taken are adjacent in nums.


Example 1

    Input: nums = [1, 2, 4]

    Output: 5

    Explanation:

    [1, 2, 4], the underlined elements are taken to get the maximum sum.

Example 2

    Input: nums = [2, 1, 4, 9]

    Output: 11

    Explanation:

    [2, 1, 4, 9], the underlined elements are taken to get the maximum sum.


# Constraints

    n == nums.length
    1 <= n <= 105
    0 <= nums[i] <= 1000
*/


/*
# Intuition
As discussed in the previous problems that rercursion can be used when the problem is asking for minimum/maximum of something. Here in this problem it is asking for maximum sum of subsequences, one approach that comes to our mind is to generate all subsequences and pick the one with the maximum sum.

To generate all the subsequences, we can use the pick/non-pick technique. This technique can be briefly explained as follows:

    At every index of the array, we have two options:
    First, to pick the array element at that index and consider it in our subsequence.
    Second, to leave the array element at that index and not to consider it in our subsequence.
    Now, we will try to form the recursive solution to the problem with the pick/non-pick technique. There is one more catch, the problem wants us to have only non-adjacent elements of the array in the subsequence, therefore we need to address that too. In order to do that, while moving ahead, we can keep a track if we took the last index or not.
*/


// Solution
class Solution {
    nonAdjacentTabulation(nums){
        let n = nums.length;

        if(n == 1){
            return nums[0];
        }
        
        let dp = new Array(n);
        dp[0] = nums[0];
        dp[1] = Math.max(dp[0], nums[1]);

        for(let i=2; i < n; i++){
            dp[i] = Math.max(dp[i-1], nums[i] + dp[i-2]);
        }

        return dp[n-1]
    }
    nonAdjacent(nums) {
        return this.nonAdjacentTabulation(nums);
    }
}



/*
# Complexity Analysis

Time Complexity
    O(n) where n is the number of elements in nums; the method performs a single initialization for the base cases and a loop iterating from index 2 to n-1.

Space Complexity
    O(n) where n is the number of elements in nums; an array dp of size n is allocated to store the maximum non-adjacent sum for each index.
*/