/*
# Problem Statement:
    Given an array arr of n integers, return true if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal else return false.


Example 1

    Input: arr = [1, 10, 21, 10]

    Output: True

    Explanation: The array can be partitioned as [1, 10, 10] and [21].

Example 2

    Input: arr = [1, 2, 3, 5]

    Output: False

    Explanation: The array cannot be partitioned into equal sum subsets.


# Constraints

    1 ≤ n ≤ 100
    1 ≤ arr[i] ≤ 1000
    n*sum of elements ≤ 105
*/


/*
# Intuition
    * The problem is converted into a Subset Sum problem.
        To split the array into 2 equal parts, both subsets must have the same sum. So instead of finding two subsets directly, we just check:
        “Can we find one subset whose sum = totalSum / 2?”
    * Quick optimization using total sum.
        First, we calculate the total array sum:
        If the sum is odd, equal partition is impossible because an odd number cannot be split into two equal integers → return false.
        If the sum is even, our target becomes sum / 2.
    * At every element, we make 2 choices:
    Either:
        * Take the current number → add it to sumSofar
        * Skip the current number → move ahead without adding
        This explores all possible subsets.
    * Base cases stop unnecessary work.
        * If sumSofar === target, we found one valid subset → return true.
        * If sumSofar > target or we reach the end of the array, this path cannot work → return false.
    * Memoization prevents repeated calculations.
        Many recursion paths revisit the same (index, sumSofar) state. dp[i][sumSofar] stores already-computed answers so we don’t solve the same subproblem again, making the solution much faster.
*/


// Solution
class Solution {
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
   equalPartition(n, arr) {
     if (n == 0) {
       return true;
     }
     if (n == 1) {
       return false;
     }
 
     let sum = arr.reduce((acc, el) => acc + el, 0);
     if (sum % 2 != 0) return false;
     let target = sum/2;
     
     let dp = Array.from({length: n+1}, ()=> new Array(target+1).fill(-1))
     return this.isSubsetSumMemoization(arr, 0, 0, target, dp);
   }
 }


/*
# Complexity Analysis

Time Complexity
    O(n * target), where n is the length of the array and target is the sum/2. The dp table has n * target states, and each state is computed exactly once.

Space Complexity
    O(n * target) for the 2D dp table initialization, plus O(n) stack space for recursion depth.
*/