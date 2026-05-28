/*
# Problem Statement:
    Given an array, arr, of n integers, where arr[i] represents the price of the stock on an ith day, determine the maximum profit achievable by completing at most two transactions in total.
    Holding at most one share of the stock at any time is allowed, meaning buying and selling the stock twice is permitted, but the stock must be sold before buying it again. Buying and selling the stock on the same day is allowed.


Example 1

    Input: arr = [4, 2, 7, 1, 11, 5]

    Output: 15

    Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 7), profit = 7 - 2 = 5. Then buy on day 4 (price = 1) and sell on day 5 (price = 11), profit = 11 - 1 = 10. Total profit is 5 + 10 = 15.

Example 2

    Input: arr = [1, 3, 2, 8, 4, 9]

    Output: 12

    Explanation: Buy on day 1 (price = 1) and sell on day 4 (price = 8), profit = 8 - 1 = 7. Then buy on day 5 (price = 4) and sell on day 6 (price = 9), profit = 9 - 4 = 5. Total profit is 7 + 5 = 12.


# Constraints

    1 <= n<= 105
    0 <= arr[i] <= 106
*/


/*
# Intuition
    1. It follows same approach of "Best time to buy and sell stock II.js" 
    2. The upgradation is adding maxSoldTimes, that we can only complete 2 transactions, so we update the dp to habe this extra state 
    3. we need an addition of 3 size array as maxSoldTimes state can be 0, 1, 2. where zero tells no more transactions can be done
*/


// Solution

// Solution -I Memoisation
class Solution {
    // buy 1- signifes, you are allowed to buy
    // buy 0- singnifies, you can;t buy
    buySellStock(arr, i, buy, dp, maxSoldTimes) {
      if (i == arr.length) {
        return 0;
      }
      if(maxSoldTimes == 0){
          dp[i][buy][maxSoldTimes] = 0; 
          return   dp[i][buy][maxSoldTimes];
      }
      if(dp[i][buy][maxSoldTimes] != -1){
          return   dp[i][buy][maxSoldTimes];
      }
      let profit =0;
  
      if(buy){
          profit = Math.max(
              this.buySellStock(arr, i+1, 0, dp, maxSoldTimes) - arr[i],
              this.buySellStock(arr, i+1, 1, dp, maxSoldTimes)
          )
      }else{
          profit = Math.max(
              this.buySellStock(arr, i+1, 1, dp, maxSoldTimes-1)+ arr[i],
              this.buySellStock(arr, i+1, 0, dp, maxSoldTimes)
          )
      }
      return   dp[i][buy][maxSoldTimes] = profit;
    }
    stockBuySell(arr, n) {
      let dp = Array.from({ length: n }, () =>
        Array.from({ length: 2 }, () => new Array(3).fill(-1)),
      );
      return this.buySellStock(arr, 0, 1, dp, 2);
    }
  }

// Solution 2- Tabulation
class Solution {
    // Tabulation
  // buy 1- signifes, you are allowed to buy
  // buy 0- singnifies, you can;t buy
  buySellStock(arr, n) {
    let dp = Array.from({ length: n+1 }, () =>
      Array.from({ length: 2 }, () => new Array(3).fill(0)),
    );
    
    for(let i =n-1; i >=0 ; i--){
        let profit =0;
        for(let buy = 1; buy >=0; buy--){
            for(let maxSoldTimes = 2; maxSoldTimes > 0; maxSoldTimes--){
                if(buy){
                    profit = Math.max(
                                dp[i+1][0][maxSoldTimes] - arr[i],
                                dp[i+1][buy][maxSoldTimes]
                            )
                }else{
                    profit = Math.max(
                                dp[i+1][1][maxSoldTimes-1] + arr[i],
                                dp[i+1][buy][maxSoldTimes]
                            )
                }
                dp[i][buy][maxSoldTimes] = profit;
            }
        }
    }
    return dp[0][1][2];
  }

  stockBuySell(arr, n) {
    return this.buySellStock(arr, n)
  }
}

// Solution-III Tabulation + Space optimisation
class Solution {
    // Tabulation
  // buy 1- signifes, you are allowed to buy
  // buy 0- singnifies, you can;t buy
  buySellStock(arr, n) {
    let dp = Array.from({ length: 2 }, () =>
      Array.from({ length: 2 }, () => new Array(3).fill(0)),
    );
    
    for(let i =n-1; i >=0 ; i--){
        let profit =0;
        for(let buy = 1; buy >=0; buy--){
            for(let maxSoldTimes = 2; maxSoldTimes > 0; maxSoldTimes--){
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
    return dp[0][1][2];
  }

  stockBuySell(arr, n) {
    return this.buySellStock(arr, n)
  }
}


/*
# Complexity Analysis

Time Complexity
    O(n * 2 * 2) = O(n), where n is the length of the array. The initialization takes O(n) and the triple nested loop runs for n * 2 * 2 iterations.

Space Complexity
    O(n * 2 * 3) = O(n), where n is the length of the array to store the dp table of size (n+1) x 2 x 3.

Space Optimsed Soltion will be - O(1) constant space as we removed n and replaced it with 2 size array
*/