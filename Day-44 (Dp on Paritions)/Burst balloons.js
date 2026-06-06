/*
# Problem Statement:
    Given n balloons, indexed from 0 to n - 1, each balloon is painted with a number on it represented by an array nums. Burst all the balloons.
    If the ith balloon is burst, the coins obtained are nums[i - 1] * nums[i] * nums[i + 1]. If i - 1 or i + 1 goes out of bounds of the array, treat it as if there is a balloon with a 1 painted on it.
    Return the maximum coins that can be collected by bursting the balloons wisely.


Example 1

    Input : nums = [3, 1, 5, 8]

    Output : 167

    Explanation :

    nums = [3, 1, 5, 8] --> [3, 5, 8] --> [3, 8] --> [8] --> []

    coins = 3*1*5  +  3*5*8  + 1*3*8 + 1*8*1 = 167.

Example 2

    Input : nums = [1, 2, 3, 4]

    Output : 40

    Explanation :

    nums = [1, 2, 3, 4] --> [1, 2, 4] --> [1, 4] --> [4] --> []

    coins = 2*3*4 + 1*2*4 + 1*1*4 + 1*4*1 = 40.


# Constraints

    1 <= n <= 300
    1 <= nums[i] <= 100
*/



/*
Intitution
# Key Observation

    * If we try to decide which balloon to burst first, the remaining subproblems are not independent because bursting one balloon changes the neighbors of all other balloons.

    * Instead, think in reverse:

    * Assume a balloon is the last one to be burst in a range.

    * When a balloon is the last balloon remaining in a range, its left and right neighbors are already fixed, which makes the subproblems independent.

    # Reverse Thinking

    * Add virtual balloons 1 at both ends:

    [1, b1, b2, b3, b4, 1]

    * Suppose bk is the last balloon burst inside a range (l, r).

    * At that moment, every other balloon between l and r has already been removed, so the only neighbors of bk are:

    l and r

    * Therefore, the coins obtained from bursting bk last are:

    arr[l] * arr[k] * arr[r]

    * The remaining balloons are split into two completely independent subproblems:

    (l ... k)
    (k ... r)
    Example: [3,1,5,8]

    * After adding boundaries:

    [1, 3, 1, 5, 8, 1]

    * Suppose 5 is chosen as the last balloon to burst in the whole range.

    * Since it is burst last, all balloons between it and the boundaries have already disappeared.

    * Coins earned from bursting 5 last:

        1 × 5 × 1 = 5

    * Now 5 divides the problem into two independent ranges:

        [1, 3, 1, 5]
        [5, 8, 1]
    * Left Subproblem

    * Consider range:

        [1, 3, 1, 5]

    * Suppose 1 is the last balloon to burst in this range.

    * Its neighbors at that moment are guaranteed to be:

        1 and 5

    * Therefore:

        Coins = 1 × 1 × 5

    * This further splits into:

        [1, 3, 1]
        [1, 5]

    * The second range contains no balloon to burst (r - l <= 1), so it contributes 0.

    * Next Level

        For range:

        [1, 3, 1]

    * Suppose 3 is burst last.

    * Since 1 is already known to be the last balloon of the parent range, the boundaries of this range are fixed as:

    1 and 1

    Thus:

    Coins = 1 × 3 × 1
    Why This Works

    * When we choose a balloon as the last balloon to burst:

    * Its neighbors are fixed and known.
        Coins earned can be calculated immediately.
        The problem splits into two independent subproblems.
        This gives the recurrence:
        dp[l][r] =
        max(
            arr[l] * arr[k] * arr[r]
            + dp[l][k]
            + dp[k][r]
        )
        for every k in (l+1 ... r-1)

    * This is exactly why Burst Balloons is solved using interval DP / Matrix Chain Multiplication pattern.

 */



// Solution I (Memoisation)

class Solution {
    maxCoinsRecursive(nums, i, j, dp) {
      if (j - i <= 1) return 0;
      let coinsCollected = 0;
  
      if(dp[i][j] != -1){
          return dp[i][j];
      }
  
      for (let k = i + 1; k <= j - 1; k++) {
        let prev = nums[i];
        let curr = nums[k];
        let next = nums[j];
  
        let coins =
          prev * curr * next +
          this.maxCoinsRecursive(nums, i, k, dp) +
          this.maxCoinsRecursive(nums, k, j, dp);
  
        coinsCollected = Math.max(coinsCollected, coins);
      }
      return dp[i][j] = coinsCollected;
    }
    maxCoins(nums) {
      nums = [1, ...nums, 1];
      let n = nums.length;
      let dp = Array.from({ length: n }, () => new Array(n).fill(-1));
      return this.maxCoinsRecursive(nums, 0, nums.length - 1, dp);
    }
  }


/*
# Complexity Analysis

Time Complexity
    O(n^3) where n is the number of balloons. The DP table has O(n^2) states, and each state requires a loop that iterates O(n) times to calculate the split point k.

Space Complexity
    O(n^2) where n is the number of balloons. We allocate a 2D array of size (n+2)x(n+2) for memoization, plus O(n) space for the recursive call stack.
*/

// Solution II (Tabulation)

class Solution {
    maxCoinsTabulation(nums) {
      nums = [1, ...nums, 1];
      let n = nums.length;
      let dp = Array.from({ length: n }, () => new Array(n).fill(0));
  
      for (let i = n - 1; i >= 0; i--) {
        for (let j = i + 1; j < n; j++) {
          let coinsCollected = 0;
          for (let k = i + 1; k <= j - 1; k++) {
            let prev = nums[i];
            let curr = nums[k];
            let next = nums[j];
  
            let coins = prev * curr * next + dp[i][k] + dp[k][j];
  
            coinsCollected = Math.max(coinsCollected, coins);
          }
          dp[i][j] = coinsCollected;
        }
      }
  
        return dp[0][n - 1];
    }
    maxCoins(nums) {
      return this.maxCoinsTabulation(nums);
    }
  }

/*

Complexity Analysis

Time Complexity
    O(n^3), where n is the length of the input array. The initialization of the DP table takes O(n^2). The triple nested loops consist of an outer loop i (n iterations), a middle loop j (n-i iterations), and an inner loop k (j-i-1 iterations), resulting in a sum of O(n^3) operations.

Space Complexity
    O(n^2), where n is the length of the input array. The algorithm allocates a 2D array of size (n+2)x(n+2) to store the results of subproblems.
*/