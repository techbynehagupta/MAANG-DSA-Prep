/*
# Problem Statement:
    A frog wants to climb a staircase with n steps. Given an integer array heights, where heights[i] contains the height of the ith step, and an integer k.
    To jump from the ith step to the jth step, the frog requires abs(heights[i] - heights[j]) energy, where abs() denotes the absolute difference. The frog can jump from the ith step to any step in the range [i + 1, i + k], provided it exists.
    Return the minimum amount of energy required by the frog to go from the 0th step to the (n-1)th step.


Example 1

    Input: heights = [10, 5, 20, 0, 15], k = 2

    Output: 15

    Explanation:

    0th step -> 2nd step, cost = abs(10 - 20) = 10

    2nd step -> 4th step, cost = abs(20 - 15) = 5

    Total cost = 10 + 5 = 15.

Example 2

    Input: heights = [15, 4, 1, 14, 15], k = 3

    Output: 2

    Explanation:

    0th step -> 3rd step, cost = abs(15 - 14) = 1

    3rd step -> 4th step, cost = abs(14 - 15) = 1

    Total cost = 1 + 1 = 2.


# Constraints

    1 <= n <= 104
    1 <= k <= 10
    0 <= heights[i] <= 104
*/


/*
# Intuition
Why greedy approach will not work:
    As the problem states to find the minimum energy required, the first approache that comes to our mind is greedy.
    In greedy we tend to make our moves greedily on each step, here the greedy move will be to select the path with minimum energy. But this approach will fail here as total energy required by the frog depends upon the path taken by the frog. If the frog just takes the minimum energy path in every stage it can happen that it eventually takes a path with greater energy after a certain number of jumps.

    The problem here is asking for the minimum possible energy and as discussed in the previous problem, this kind of problem can be solved using recusion.

    Using the steps described in previous problem, write the recursive solution:

Express the problem in terms of indexes: This can be easily done as there are array indexes [0,1,2,..., n-1]. As f(n-1) signifies the minimum amount of energy required to move from stair 0 to stair n-1. Therefore f(0) simply should give us the answer as 0(base case).

    Try all the choices to reach the goal: As the frog can make jump upto K steps. Therefore, we can set a for loop to run from 1 to K, and in each iteration, a function call will be made, corresponding to a step.

    Take the minimum of all the choices: As the problem statement asks to find the minimum total energy, return the minimum of all K choices. Also if the index is less than the number of steps, we can’t try the all that step.
*/


// Solution
class Solution {
    frogJumpTopDown(heights, k, i, dp) {
        const n = heights.length;

        if (i === n - 1) return 0;

        if (dp[i] !== -1) return dp[i];

        let minEnergy = Infinity;
        const limit = Math.min(i + k, n - 1);

        for (let j = i + 1; j <= limit; j++) {
            const jumpCost = Math.abs(heights[j] - heights[i]) + this.frogJumpTopDown(heights, k, j, dp);

            minEnergy = Math.min(
                minEnergy,
                jumpCost
            );
        }

        return (dp[i] = minEnergy);
    }
    frogJumpBottomsUp(heights, k) {
        let n = heights.length;
        let dp = new Array(n).fill(0);
    
        dp[n - 1] = 0;
    
        for (let i = n - 2; i >= 0; i--) {
            let minEnergy = Infinity;
    
            let j = i + 1;
    
            while (j < n && j <= i + k) {
                let jumpCost = Math.abs(heights[j] - heights[i]) + dp[j];
    
                minEnergy = Math.min(minEnergy, jumpCost);
    
                j++;
            }
    
            dp[i] = minEnergy;
        }
    
        return dp[0];
    }
    frogJump(heights, k) {
        let dp = new Array(heights.length).fill(-1);
        return this.frogJumpTopDown(heights, k, 0, dp)
    }
}



/*
# Complexity Analysis

Time Complexity
    O(n*k) where n is the number of heights and k is the jump limit. Each state in the dp array is visited once, and for each state, we iterate at most k times.

Space Complexity
    O(n) for the dp array used to store the results of subproblems and O(n) for the recursion stack in the top-down approach.
*/