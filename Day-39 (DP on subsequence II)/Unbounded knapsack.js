/*
# Problem Statement:
    Given two integer arrays, val and wt, each of size N, representing the values and weights of N items respectively, and an integer W, representing the maximum capacity of a knapsack, determine the maximum value achievable by selecting a subset of the items such that the total weight of the selected items does not exceed the knapsack capacity W. The goal is to maximize the sum of the values of the selected items while keeping the total weight within the knapsack's capacity.
    An infinite supply of each item can be assumed.


Example 1

    Input: val = [5, 11, 13], wt = [2, 4, 6], W = 10

    Output: 27

    Explanation: Select 2 items with weights 4 and 1 item with weight 2 for a total value of 11+11+5 = 27.

Example 2

    Input: val = [10, 40, 50, 70], wt = [1, 3, 4, 5], W = 8

    Output: 110

    Explanation: Select items with weights 3 and 5 for a total value of 40 + 70 = 110.


# Constraints

    1 ≤ N ≤ 500
    1 ≤ W ≤ 1000
    1 ≤ wt[i] ≤ 500
    1 ≤ val[i] ≤ 500
*/


// Solution I Memoisation
class Solution {
    unboundedKnapsackMemoisation(wt, val, n, i, W, dp) {
      if (n == i || W <= 0) {
        return 0;
      }
  
      if(dp[i][W] != -1){
          return dp[i][W];
      }
      let take =
        W >= wt[i]
          ? val[i] + this.unboundedKnapsackMemoisation(wt, val, n, i, W - wt[i], dp)
          : 0;
      let notTake = this.unboundedKnapsackMemoisation(wt, val,n , i + 1, W, dp);
  
      return dp[i][W] = Math.max(take, notTake);
    }
    unboundedKnapsack(wt, val, n, W) {
      let dp = Array.from({length: n}, ()=> new Array(W+1).fill(-1));
      return this.unboundedKnapsackMemoisation(wt, val, n, 0, W, dp);
    }
  }
  
/*
# Complexity Analysis

Time Complexity
    O(n * W) because the memoization table of size n * (W + 1) is filled at most once, and each state performs constant time recursive branching logic.

Space Complexity
    O(n * W) due to the memoization table allocation and the recursion stack depth which can reach O(n + W) in the worst case, but is dominated by the DP table size.
*/

// Solution II Tabulation

class Solution {
    unboundedKnapsackRecursion(wt, val, n, W){
       let dp = Array.from({length: n+1}, ()=> new Array(W+1).fill(0));
  
      for(let i = n-1; i>=0 ; i--){
          for(let wgt = 1; wgt <= W ; wgt++){
              dp[i][wgt] = Math.max(
                              wgt >= wt[i] ? val[i] + dp[i][wgt-wt[i]]: 0,
                              dp[i+1][wgt]
                          )
          }
      }
      return dp[0][W];
  
    }
    unboundedKnapsack(wt, val, n, W) {
      return this.unboundedKnapsackRecursion(wt, val, n, W);
    }
  }
  


/*
# Complexity Analysis

Time Complexity
    O(n * W) where n is the number of items and W is the capacity, because the algorithm initializes a 2D array of size (n+1)*(W+1) and uses nested loops to iterate through all states exactly once.

Space Complexity
    O(n * W) because the function allocates a 2D array of size (n+1) rows and (W+1) columns to store intermediate results for the dynamic programming table.
*/