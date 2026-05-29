/*
# Problem Statement:
    Given an array arr of n integers and an integer K, count the number of subsets of the given array that have a sum equal to K. Return the result modulo (109 + 7).


Example 1

    Input: arr = [2, 3, 5, 16, 8, 10], K = 10

    Output: 3

    Explanation: The subsets are [2, 8], [10], and [2, 3, 5].

Example 2

    Input: arr = [1, 2, 3, 4, 5], K = 5

    Output: 3

    Explanation: The subsets are [5], [2, 3], and [1, 4].


# Constraints

    1 <= n <= 100
    1 <= arr[i] <= 103
    1 <= K <= 103
*/


/*
# Intuition
    * This problem asks: “How many subsets can make the target sum?”
        Unlike normal subset sum where we return true/false, here we need the count of valid subsets whose sum equals K.
    * At every element, we have 2 choices (Pick / Not Pick).

        * Include current element → reduce target:
            target - arr[i]
        * Exclude current element → keep target unchanged
        We explore both possibilities because multiple subsets may work.
    * Base cases define when a valid subset is found.
        * If target === 0 → we successfully formed the required sum → return 1 (one valid subset found).
        * If target < 0 or we reach the end of array → impossible path → return 0.

    * Instead of OR (||), we ADD results.
        Since we need the number of subsets, not existence:

            include + notInclude

        Example:

        * Include path gives 2 subsets
        * Exclude path gives 3 subsets
            Total = 5 valid subsets.
    * Memoization avoids recalculating the same (index, target) state.
        dp[i][target] stores the number of ways to form target from index i, reducing repeated work and improving performance.

    ⚠️ Important edge case:
    If the array contains 0s, this code may fail for some test cases because target == 0 immediately returns 1.
    Example:

    arr = [0,0,1], K = 1

    Actual answer = 4 subsets, because each 0 can be picked or skipped independently.
*/


// Solution
// Solution- I (memoisation)
class Solution {
    isSubsetSumMemoization(arr, i, target, dp) {
       let mod = 1e9 + 7;
       if (target == 0) {
           return 1;
       }
       if(target < 0|| i == arr.length){
           return 0;
       }
       if(dp[i][target] != -1){
           return dp[i][target];
       }
       let include = this.isSubsetSumMemoization(arr, i + 1, target-arr[i], dp)%mod;
       let notInclude =  this.isSubsetSumMemoization(arr, i + 1, target, dp)%mod;
       return dp[i][target] = (include + notInclude)%mod;
       
   }
   perfectSum(arr, K) {
       let n = arr.length;
       let dp = Array.from({length: n}, ()=> new Array(K+1).fill(-1))
       return this.isSubsetSumMemoization(arr, 0, K, dp);
   }
}

/*
# Complexity Analysis

Time Complexity
    O(n * K) where n is the number of elements and K is the target sum, because there are n * (K + 1) unique states in the memoization table and each state is computed exactly once in O(1) time.

Space Complexity
    O(n * K) for the initialization of the 2D dp array of size n * (K + 1) and an additional O(n) recursion stack space, resulting in O(n * K) total space complexity.
*/


// Solution - II (Tabulation)
class Solution {
    countSubsetsTabulation(arr, K) {
       let n = arr.length;
       let dp = Array.from({length: n+1}, ()=> new Array(K+1).fill(0))
       let mod = 1e9 + 7;


       for(let i = 0; i <= n; i++){
           dp[i][0] = 1;
       }
       for(let i = n-1; i >= 0 ; i--){
           for(let sum = 1; sum <= K; sum++){
               if(sum-arr[i] >=0 ){
                   dp[i][sum] = (dp[i+1][sum-arr[i]]%mod + dp[i+1][sum]%mod)%mod;
               }else{
                   dp[i][sum] =  dp[i+1][sum]%mod;
               }
               
           }
       }
       for(let i=0; i<= n ; i++){
           console.log([...dp[i]])
       }
       return dp[0][K];
   }
   perfectSum(arr, K) {
       return this.countSubsetsTabulation(arr, K);
   }
}



/*
# Complexity Analysis

Time Complexity
    O(n * K) where n is the length of the input array and K is the target sum. There are three loops: one of size n+1 to initialize the first column, one nested loop of size n * K to fill the DP table, and one loop of size n+1 to print the results.

Space Complexity
    O(n * K) because the algorithm creates a 2D array of dimensions (n+1) * (K+1) to store the intermediate subset counts.
*/