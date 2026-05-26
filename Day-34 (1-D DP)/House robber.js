/*
# Problem Statement:
    A robber is targeting to rob houses from a street. Each house has security measures that alert the police when two adjacent houses are robbed. The houses are arranged in a circular manner, thus the first and last houses are adjacent to each other.
    Given an integer array money, where money[i] represents the amount of money that can be looted from the (i+1)th house. Return the maximum amount of money that the robber can loot without alerting the police.


Example 1

    Input: money = [2, 1, 4, 9]

    Output: 10

    Explanation:

    [2, 1, 4, 9] The underlined houses would give the maximum loot.

    Note that we cannot loot the 1st and 4th houses together.

Example 2

    Input: money = [1, 5, 2, 1, 6]

    Output: 11

    Explanation:

    [1, 5, 2, 1, 6] The underlined houses would give the maximum loot.


# Constraints

    1 <= money.length <= 105
    0 <= money[i] <= 1000
*/


/*
# Intuition
Here, the problem is asking for maximum money the theif can rob, so based on the discussion in previous articles, it is obvious that we think of recursion to solve this problem.
This problem can be tackled using the method outlined in the article on Maximum Sum of non-adjacent elements. It is strongly recommended that readers review that article before proceeding with this one.
*/


// Solution
class Solution {
    houseRobberHelper(nums){
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
    houseRobber(money) {
        if(money.length == 1){
            return money[0];
        }
       return Math.max(
            this.houseRobberHelper(money.slice(0, -1)), 
            this.houseRobberHelper(money.slice(1))
        )
    }
}




/*
# Complexity Analysis

Time Complexity
    O(n) because houseRobber calls houseRobberHelper twice with arrays of size n-1, each containing a single loop that iterates n-2 times, resulting in 2 * (n-2) iterations which simplifies to O(n).

Space Complexity
    O(n) because houseRobberHelper allocates a dp array of size n, and slice creates new array copies of size n-1.
*/