/*
# Problem Statement:
    Given an integer n, there is a staircase with n steps, starting from the 0th step.
    Determine the number of unique ways to reach the nth step, given that each move can be either 1 or 2 steps at a time.


Example 1

    Input: n = 2

    Output: 2

    Explanation:

    There are 2 unique ways to climb to the 2nd step:

    1) 1 step + 1 step

    2) 2 steps

Example 2

    Input: n = 3

    Output: 3

    Explanation:

    There are 3 unique ways to climb to the 3rd step:

    1) 1 step + 1 step + 1 step

    2) 2 steps + 1 step

    3) 1 step + 2 steps


# Constraints

    1 <= n <= 45
*/


/*
# How to Identify a DP problem:

1. When encountering a problem, it's crucial to recognize if it can be approached using dynamic programming (DP) techniques. This is especially relevant when the problem exhibits certain characteristics that align with the strengths of dynamic programming. Some common indicators that suggest a problem might be suitable for dynamic programming include:

    * Problem asking for count the total number of ways.
    * Given multiple ways of performing a task, it is asked which way will yield the minimum or maximum output.
2. If the question asks for either of the above two points mentioned earlier, recursion can be applied to attempt solving the problem. Once the recursive solution is obtained, it can be converted into a dynamic programming approach.

# Observation:
    The problem statement asks to count the total ways one can jump from the 0th step to the nth step by jumping either 1 or 2 steps at a time. Since the question requires counting total ways, recursion can be applied, and eventually, this problem can also be solved using dynamic programming.


# How to write ruccurence relation:
    Once the problem has been identified, the following three steps comes handy in solving the problem:

        * Try to represent the problem in terms of indexes.
        * Try all possible choices/ways at every index according to the problem statement.
        * If the question states "count all the ways," then the sum of all choices/ways should be returned. If the question asks to find "the maximum/minimum", then the choice/way with the maximum/minimum output should be returned.

# Solution using recursion:

1. In recursion, top-down approach is followed, so try getting the answer that is required, then go to the base case and come back.
2. To represent the problem in terms of indices, assume n stairs as indices from 0 to N. The recusive call will basically return all the ways to reach the nth step.
3. In order to consider all possible actions at an index, the choices available are either to jump 1 step or 2 steps, so proceed accordingly.
4.Now, to count all the ways, return the sum of all the choices in our recursive function.

*/


// Solution
class Solution {
    climbStairsTopDown(n, dp){
        if(n == 1 || n== 2){
            dp[n] = n;
            return n;
        }
        if(dp[n] != -1){
            return dp[n];
        }
        dp[n] = this.climbStairsTopDown(n-1, dp) + this.climbStairsTopDown(n-2, dp);
        return dp[n];
    }
    climbStairsBottomUp(n){
        if(n == 1 || n==2){
            return n;
        }
        let dp = new Array(n+1).fill(-1);
        dp[1] = 1;
        dp[2] = 2;

        for(let i= 3; i <=n ; i++){
            dp[i] = dp[i-1] + dp[i-2];
        }
        return dp[n];
    }
    climbStairs(n) {
        // Top down Implementation (Memoisation)
        // let dp = new Array(n+1).fill(-1);
        // return this.climbStairsTopDown(n, dp)

        // Bottom up implementation (Tabulation)
        return this.climbStairsBottomUp(n);
    }
}



/*
# Complexity Analysis

Time Complexity
    O(n) because the initialization loop runs in O(n) and the main loop in climbStairsBottomUp iterates from 3 to n, performing constant time additions in each step.

Space Complexity
    O(n) because a dp array of size n+1 is allocated to store results for every integer up to n.

*/