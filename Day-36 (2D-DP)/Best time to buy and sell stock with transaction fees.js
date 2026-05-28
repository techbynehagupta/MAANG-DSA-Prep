/*
# Problem Statement:
    Given an array arr where arr[i] represents the price of a given stock on the ith day. Additionally, you are given an integer fee representing a transaction fee for each trade. The task is to determine the maximum profit you can achieve such that you need to pay a transaction fee for each buy and sell transaction. The Transaction Fee is applied when you sell a stock.
    You may complete as many transactions. You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before buying again).


Example 1

    Input: arr = [1, 3, 4, 0, 2], fee = 1

    Output: 3

    Explanation: Buy at day 1, sell at day 3, then, buy at day 4, sell at day 5.

    Profit calculation: ((4 - 1) - 1) + ((2 - 0) - 1) = 2 + 1 = 3.

Example 2

    Input: arr = [1, 3, 2, 8, 4, 9], fee = 2

    Output: 8

    Explanation: Buy at day 1 (price = 1), sell at day 4 (price = 8), then Buy at day 5 (price = 4), sell at day 6 (price = 9),

    Profit calculation: ((9 - 4) - 2) + ((8 - 1) - 2)= 8.


# Constraints

    1 <= n<= 105
    0 <= arr[i] ,fee<= 104
*/


/*
# Intuition
    1. It's the same as other problems instead of maintaining k transactions, we deduct a same amount of fee on every transaction complete.
    2. For more better clarity refer to Best time to buy and sell stock with transaction fees.js Intuition
*/


// Solution
class Solution {
    tabulationSolution(arr, n, fee) {
      let dp = Array.from({ length: n + 1 }, () => new Array(2).fill(0));
  
      for (let i = n - 1; i >= 0; i--) {
          let profit = 0;
        for (let buy = 1; buy >= 0; buy--) {
          if (buy) {
            profit = Math.max(dp[i + 1][0] - arr[i], dp[i + 1][buy]);
          } else {
            profit = Math.max(dp[i + 1][1] + arr[i] - fee, dp[i + 1][buy]);
          }
          dp[i][buy] = profit;
        }
      }
      return dp[0][1];
    }
    stockBuySell(arr, n, fee) {
      return this.tabulationSolution(arr, n, fee);
    }
  }
  



/*
# Complexity Analysis

*/