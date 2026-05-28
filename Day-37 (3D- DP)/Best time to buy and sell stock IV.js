/*
# Problem Statement:
    Given an array, arr, of n integers, where arr[i] represents the price of the stock on an ith day, determine the maximum profit achievable by completing at most k transactions in total. Holding at most one share of the stock at any given time is allowed, meaning buying and selling the stock k times is permitted, but the stock must be sold before buying it again. Buying and selling the stock on the same day is allowed.


Example 1

    Input: arr = [3, 2, 6, 5, 0, 3], k = 2

    Output: 7

    Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6 - 2 = 4. Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3 - 0 = 3. Total profit is 4 + 3 = 7.

Example 2

    Input: arr = [1, 2, 4, 2, 5, 7, 2, 4, 9, 0], k = 3

    Output: 15

    Explanation: Buy on day 1 (price = 1) and sell on day 3 (price = 4), profit = 4 - 1 = 3. Then buy on day 4 (price = 2) and sell on day 6 (price = 7), profit = 7 - 2 = 5. Then buy on day 7 (price = 2) and sell on day 9 (price = 9), profit = 9 - 2 = 7. Total profit is 3 + 5 + 7 = 15.


# Constraints

    1 <= n<= 103
    0 <= arr[i] <= 104
    0 <= k <= 100
*/


/*
# Intuition
    1. It is same as Best time to buy and sell stock III, the onlu updation is now we can make k transactions instead of fix transaction of 2
*/


// Solution
class Solution {
    // Tabulation
  // buy 1- signifes, you are allowed to buy
  // buy 0- singnifies, you can;t buy
  buySellStock(arr, n, k) {
    let dp = Array.from({ length: 2 }, () =>
      Array.from({ length: 2 }, () => new Array(k+1).fill(0)),
    );
    
    for(let i =n-1; i >=0 ; i--){
        let profit =0;
        for(let buy = 1; buy >=0; buy--){
            for(let maxSoldTimes = k; maxSoldTimes > 0; maxSoldTimes--){
                if(buy){
                    profit = Math.max(
                                dp[(i+1)%2][0][maxSoldTimes] - arr[i],
                                dp[(i+1)%2][buy][maxSoldTimes]
                            )
                }else{
                    profit = Math.max(
                                dp[(i+1)%2][1][maxSoldTimes-1] + arr[i],
                                dp[(i+1)%2][buy][maxSoldTimes]
                            )
                }
                dp[i%2][buy][maxSoldTimes] = profit;
            }
        }
    }
    return dp[0][1][k];
  }

  stockBuySell(arr, n, k) {
    return this.buySellStock(arr, n, k)
  }
}


/*
# Complexity Analysis

Time Complexity
    O(n * k) because the algorithm utilizes three nested loops: one iterating through n elements, one iterating through the buy state (2 iterations), and one iterating through the maximum transactions k.

Space Complexity
    O(k) because the dp table is initialized with a fixed size of 2 * 2 * (k+1), which simplifies to O(k) space complexity regardless of n.
*/