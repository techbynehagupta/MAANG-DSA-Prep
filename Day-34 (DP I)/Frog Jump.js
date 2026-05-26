/*
# Problem Statement:
    A frog wants to climb a staircase with n steps. Given an integer array heights, where heights[i] contains the height of the ith step.
    To jump from the ith step to the jth step, the frog requires abs(heights[i] - heights[j]) energy, where abs() denotes the absolute difference. The frog can jump from any step either one or two steps, provided it exists.
    Return the minimum amount of energy required by the frog to go from the 0th step to the (n-1)th step.


Example 1

    Input: heights = [2, 1, 3, 5, 4]

    Output: 2

Explanation:

    One possible route can be,

    0th step -> 2nd Step = abs(2 - 3) = 1

    2nd step -> 4th step = abs(3 - 4) = 1

    Total = 1 + 1 = 2.

Example 2

    Input: heights = [7, 5, 1, 2, 6]

    Output: 9

Explanation:

    One possible route can be,

    0th step -> 1st Step = abs(7 - 5) = 2

    1st step -> 3rd step = abs(5 - 2) = 3

    3rd step -> 4th step = abs(2 - 6) = 4

    Total = 2 + 3 + 4 = 9.

# Constraints

    1 <= n <= 104
    0 <= heights[i] <= 104
*/


/*
# Intuition
    To determine the minimum energy required for a frog to jump from the first to the last stair, two strategies can be considered: greedy and dynamic programming. The greedy approach is insufficient because the frog's total energy expenditure depends on the path chosen. Opting for the least costly path at each step may lead to more expensive jumps in the future. Therefore, evaluating all possible paths using dynamic programming is necessary to find the optimal solution.

# Approach
    1. Define the problem in terms of indices. The array indexes [0, 1, 2, ..., n-1] represent the stairs. The function f(n-1) represents the minimum energy needed to jump from stair 0 to stair n-1. The base case is f(0) = 0.
    2. Explore all possible choices to reach the target stair. The frog can jump either one step or two steps. The cost of each jump is derived from the height array, and the remaining cost is obtained through recursive calls.
    3. Return the minimum energy from the possible choices in Step 2. Since the goal is to minimize the total energy, the function should return the lesser of the two computed energies. At index 1, only one recursive call is possible, as the second choice is not feasible. The base case for this scenario is reaching the 0th stair.
*/


// Solution
class Solution {
    frogJumpTopDown(heights, i, dp){   
        if(i+1 >= heights.length){
            return 0;
        }
        if(dp[i] != -1){
            return dp[i];
        }
        let energyInOneStep = Math.abs(heights[i+1]-heights[i]) + this.frogJumpTopDown(heights, i+1, dp);

        if(i+2 >= heights.length){
            dp[i] = energyInOneStep;
            return dp[i];
        }
        let energyInTwoStep = Math.abs(heights[i+2]-heights[i]) + this.frogJumpTopDown(heights, i+2, dp);

        dp[i] =  Math.min(energyInOneStep, energyInTwoStep);
        return dp[i];
    }
    frogJump(heights) {
        let dp = new Array(heights.length).fill(-1);
       return this.frogJumpTopDown(heights, 0, dp);
    }
}

/*
# Complexity Analysis

Time Complexity
    O(n) where n is the number of elements in heights, as the initialization loop takes O(n) and the memoized recursion visits each index i exactly once due to the dp array lookup.

Space Complexity
    O(n) for the dp array of size n and the recursion stack depth which can be up to n in the worst case.
*/