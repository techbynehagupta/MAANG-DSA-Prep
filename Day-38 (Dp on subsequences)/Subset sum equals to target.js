/*
# Problem Statement:
    Given an array arr of n integers and an integer target, determine if there is a subset of the given array with a sum equal to the given target.


Example 1

    Input: arr = [1, 2, 7, 3], target = 6

    Output: True

    Explanation: There is a subset (1, 2, 3) with sum 6.

Example 2

    Input: arr = [2, 3, 5], target = 6

    Output: False

    Explanation: There is no subset with sum 6.


# Constraints

    1 <= n = 100
    1<= arr[i] <= 100
    0<= target <= 5*103
*/


/*
# Intuition
    * At every index, we have only 2 choices: either pick the current element and add it to sumSofar, or skip it. This creates a decision tree of all possible subsets.
    * Goal is to reach the target sum. If sumSofar === target, we immediately return true because we found a valid subset.
    * Pruning unnecessary paths: If sumSofar > target, there’s no point continuing because adding more elements will only increase the sum. Also, if we reach the end of the array (i == arr.length) without finding the target, return false.
    * Memoization avoids recalculating the same state. Since the same (index, sumSofar) combination can appear multiple times, we store results in dp[i][sumSofar] to save time.
    * If either choice works, answer is true. We use OR (||) because finding even one valid subset is enough:
        * Include current element
        * Exclude current element
        If any path returns true, the subset exists.
*/


// Solution
// Solution - I (Recursive)
class Solution {
    isSubsetSumRecursive(arr, i, sumSofar, target) {
      if (target == sumSofar) {
        return true;
      }
      if(sumSofar > target || i == arr.length){
          return false;
      }
      return (
        this.isSubsetSumRecursive(arr, i + 1, sumSofar + arr[i], target) ||
        this.isSubsetSumRecursive(arr, i + 1, sumSofar, target)
      );
    }
    isSubsetSum(arr, target) {
      return this.isSubsetSumRecursive(arr, 0, 0, target);
    }
  }

/*
# Complexity Analysis (Recursion)

Time Complexity: O(2(N)), where N is the length of the array. As for each index, there are two possible options.

Space Complexity:O(N), at maximum, the depth of the recursive stack can go up to N.

*/ 

  // Solution - II (Memoisation)

  class Solution {
    // Memoization
  isSubsetSumMemoization(arr, i, sumSofar, target, dp) {
    if (target == sumSofar) {
        return true;
    }
    if(sumSofar > target || i == arr.length){
        return false;
    }
    if(dp[i][sumSofar] != -1){
        return dp[i][sumSofar];
    }
    return dp[i][sumSofar] =  (
      this.isSubsetSumMemoization(arr, i + 1, sumSofar + arr[i], target, dp) ||
      this.isSubsetSumMemoization(arr, i + 1, sumSofar, target, dp)
    );
  }
  isSubsetSum(arr, target) {
    let n = arr.length;
    let dp = Array.from({length: n}, ()=> new Array(target).fill(-1))
    return this.isSubsetSumMemoization(arr, 0, 0, target, dp);
  }
}
/*
# Complexity Analysis (Memoisation)

Time Complexity
    O(n * target) because the memoization table of size n * target is filled at most once, and each state takes O(1) time to compute after the initialization loop which also takes O(n * target).

Space Complexity
    O(n * target) because the dp table is initialized with size n * target and the recursion stack depth is at most n.

*/


