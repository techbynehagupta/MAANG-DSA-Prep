/*
# Problem Statement:
    Given a chain of matrices A1, A2, A3,.....An, you have to figure out the most efficient way to multiply these matrices. In other words, determine where to place parentheses to minimize the number of multiplications.
    Given an array nums of size n. Dimension of matrix Ai ( 0 < i < n ) is nums[i - 1] x nums[i].Find a minimum number of multiplications needed to multiply the chain.


Example 1

    Input : nums = [10, 15, 20, 25]

    Output : 8000

    Explanation : There are two ways to multiply the chain - A1*(A2*A3) or (A1*A2)*A3.

    If we multiply in order- A1*(A2*A3), then number of multiplications required are 11250.

    If we multiply in order- (A1*A2)*A3, then number of multiplications required are 8000.

    Thus minimum number of multiplications required is 8000.

Example 2

    Input : nums = [4, 2, 3]

    Output : 24

    Explanation : There is only one way to multiply the chain - A1*A2.

    Thus minimum number of multiplications required is 24.

# Constraints

    2 <= n <= 100
    1 <= nums[i] <= 100
*/


/*
# Intuition
    We are given a chain of matrices, and our goal is to find the minimum number of scalar multiplications needed to multiply them together.
    For every subproblem (i, j), we try making each matrix k (where i ≤ k < j) the last multiplication point, effectively splitting the chain into two smaller parts: (i, k) and (k+1, j).
    The cost of choosing a split at k is the cost of multiplying the left part, the right part, and then multiplying their resulting matrices: nums[i-1] * nums[k] * nums[j].
    We recursively compute the minimum cost for all possible splits and keep the smallest one.
    The base case is when i == j, meaning there is only one matrix left, so no multiplication is required and the cost is 0.
*/


// Solution I (Memoisation)
class Solution {
    matrixMultiplicationMemoisation(nums, i, j, dp) {
      if (i == j) {
        return 0;
      }
      if(dp[i][j] != -1){
          return dp[i][j];
      }
      let minMultiplications = Infinity;
      for (let k = i; k < j; k++) {
        let sum =
          (nums[i - 1] * nums[k] * nums[j] )+
          this.matrixMultiplicationMemoisation(nums, i, k, dp) +
          this.matrixMultiplicationMemoisation(nums, k + 1, j, dp);
          
         minMultiplications = sum < minMultiplications ? sum : minMultiplications;
      }
      return dp[i][j] = minMultiplications;
    }
    matrixMultiplication(nums) {
      let n = nums.length;
      let dp = Array.from({length: n}, ()=> new Array(n).fill(-1));
      return this.matrixMultiplicationMemoisation(nums, 1, nums.length-1, dp);
    }
  }
  


/*
# Complexity Analysis

Time Complexity
    O(n^3) where n is the length of the input array. The DP table has n^2 states, and each state requires a loop iterating up to n times.

Space Complexity
    O(n^2) for the initialization of the n x n DP table and the recursion stack depth of O(n).

*/


// Solution II (Tabulation)
class Solution {
    matrixMultiplicationTabulation(nums) {
      let n = nums.length;
      let dp = Array.from({length: n}, ()=> new Array(n).fill(0));
  
      for(let i = n-1; i>= 0 ; i--){
          for(let j = i; j < n; j++){
              let minMultiplications = Infinity;
              for(let k = i; k < j; k++){
                  let sum = nums[i - 1] * nums[k] * nums[j] + dp[i][k] + dp[k+1][j];
                  minMultiplications = Math.min(minMultiplications, sum);
              }
  
              dp[i][j] = minMultiplications == Infinity ? 0: minMultiplications;
          }
      }
      return dp[1][n-1]
    }
    matrixMultiplication(nums) {
      return this.matrixMultiplicationTabulation(nums);
    }
  }

/*
# Complexity Analysis

Time Complexity
    O(n^3) where n is the length of the input array. The initialization loops take O(n^2), and the triple nested loops run for i from n to 0, j from i to n, and k from i to j, resulting in a summation of operations roughly equivalent to n^3/6.

Space Complexity
    O(n^2) where n is the length of the input array, due to the creation of the 2D DP table of size n x n to store intermediate results.
  
*/