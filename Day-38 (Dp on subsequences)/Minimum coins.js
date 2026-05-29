/*
# Problem Statement:
    Given an integer array of coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that are needed to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1. There are infinite numbers of coins of each type


Example 1

    Input: coins = [1, 2, 5], amount = 11

    Output: 3

    Explanation: 11 = 5 + 5 + 1. We need 3 coins to make up the amount 11.

Example 2

    Input: coins = [2, 5], amount = 3

    Output: -1

    Explanation: It's not possible to make amount 3 with coins 2 and 5. Since we can't combine the coin 2 and 5 to make the amount 3, the output is -1.


# Constraints

    n=number of distinct denominations
    1 <= n <= 100
    1 <= coins[i], amount <= 103
*/


/*
# Intuition
    * Refer earlier questions for intution
*/


// Solution -  I (Recursion)
class Solution {
    // Plain recursion
  minCoins(coins, i, amount) {
    if(amount == 0){
        return 0;
    }
    if(amount < 0 || i == coins.length){
        return Infinity;
    }
    
    let include = amount >= coins[i] ? 1 + this.minCoins(coins, i, amount-coins[i]): Infinity;
    let exclude = this.minCoins(coins, i+1, amount);
    return Math.min(include, exclude);
  }
  MinimumCoins(coins, amount) {
    let minDenominations = this.minCoins(coins, 0, amount);
     return  minDenominations == Infinity ? -1 : minDenominations;
  }
}


/*
# Complexity Analysis

    Time Complexity:O(2N), as each element has 2 choices, and there are N elements in the array.

    Space Complexity:O(N), the stack space will be O(N), the maximum depth of the stack.
*/

// Solution - II (Memoisation)
class Solution {
    // top down memoisation
  minCoinsMemoisation(coins, i, amount, dp) {
    if (amount == 0) {
      return 0;
    }
    if (amount < 0 || i == coins.length) {
      return Infinity;
    }
    if(dp[i][amount] != -1){
        return dp[i][amount];
    }

    let include =
      amount >= coins[i]
        ? 1 + this.minCoinsMemoisation(coins, i, amount - coins[i], dp)
        : Infinity;
    let exclude = this.minCoinsMemoisation(coins, i + 1, amount, dp);
    return dp[i][amount] = Math.min(include, exclude);
  }

  MinimumCoins(coins, amount) {
    let n = coins.length;
    let dp = Array.from({ length: n }, () => new Array(amount + 1).fill(-1));
    let minDenominations = this.minCoinsMemoisation(coins, 0, amount, dp);
    return minDenominations == Infinity ? -1 : minDenominations;
  }
}

/*
# Complexity Analysis

Time Complexity
    O(n * amount) because the memoization table of size n * (amount + 1) is filled exactly once, and each state calculation takes O(1) time after the initialization loop which takes O(n * amount).

Space Complexity
    O(n * amount) because the memoization table requires O(n * amount) storage, plus O(n + amount) recursion stack space.
*/

// Solution - III (Tabulation)
class Solution {
    // Bottoms-up Tabulation
    minCoinsTabulation(coins, amount) {
      let n = coins.length;
      let dp = Array.from({ length: n + 1 }, () =>
        new Array(amount + 1).fill(Infinity),
      );
  
      for (let i = 0; i <= n; i++) {
        dp[i][0] = 0;
      }
  
      for(let i = n-1; i >= 0 ; i--){
          for(let amt = 0; amt <= amount; amt++){
              if(amt >= coins[i]){
                  dp[i][amt] = Math.min(1 + dp[i][amt-coins[i]], dp[i+1][amt])
              }else{
                  dp[i][amt] = dp[i+1][amt];
              }
          }
      }
      return dp[0][amount];
    }
    MinimumCoins(coins, amount) {
      let minDenominations = this.minCoinsTabulation(coins, amount);
      return minDenominations == Infinity ? -1 : minDenominations;
    }
  }
  
/*
# Complexity Analysis

Time Complexity
    O(n * amount) where n is the number of coins, as we iterate through a 2D array of size (n+1) * (amount+1) to fill table entries.

Space Complexity
    O(n * amount) required to store the 2D array of size (n+1) * (amount+1) for the tabulation table.
*/
