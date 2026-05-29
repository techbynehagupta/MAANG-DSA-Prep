/*
# Problem Statement:
    Given an array arr of n integers, partition the array into two subsets such that the absolute difference between their sums is minimized.


Example 1

    Input: arr = [1, 7, 14, 5]

    Output: 1

    Explanation: The array can be partitioned as [1, 7, 5] and [14], with an absolute difference of 1.

Example 2

    Input: arr = [3, 1, 6, 2, 2]

    Output: 0

    Explanation: The array can be partitioned as [3, 2, 2] and [6, 1], with an absolute difference of 0.


# Constraints

    1 ≤ n * sum of array elements ≤ 106
    0 < arr[i] <= 104
*/


/*
# Intuition
    * We are trying to split the array into 2 subsets such that their difference is minimum.
        Instead of explicitly creating two subsets, we only track the sum of one subset (sum). The second subset’s sum is automatically:
        totalSum - sum.

    * How do we calculate the difference?
        Suppose:

        Subset 1 sum = sum
        Subset 2 sum = totalSum - sum

        Difference =
        |(totalSum - sum) - sum|
        which simplifies to:
        |totalSum - 2 * sum|
        That’s why the base case returns:

        Math.abs(totalSum - 2 * sum)
    * At every index, we have 2 choices (Pick / Not Pick).
        * Pick current element → add arr[i] to current subset sum
        * Skip current element → keep sum unchanged
        We recursively explore all possible subset combinations.

    * We take the minimum difference from both choices.
        Since the goal is to minimize the difference, we use:

        Math.min(include, exclude)

        This ensures we always keep the best partition.

    * Memoization avoids recomputing the same state.
        The state is (i, sum):

        * i → current index
        * sum → subset sum formed so far

        If we already solved this state, we directly return the stored result from dp[i][sum], making the solution much faster.

    * One-line Visualization

        Think of it like:
        “Can I divide chocolates into 2 bags so that the weight difference between both bags becomes as small as possible?”
        At every chocolate → put it in bag 1 or leave it for bag 2, then choose the arrangement with the minimum difference.
*/


// Solution
// Solution - I (Memoisation)
class Solution {
    findMinDifference(arr, i, sum, totalSum, dp){
        if(i == arr.length){
            return Math.abs(totalSum - 2*sum);
        }
        if(dp[i][sum] != -1){
            return dp[i][sum];
        }
        return dp[i][sum] = Math.min(
            this.findMinDifference(arr, i+1, sum+ arr[i], totalSum, dp), 
            this.findMinDifference(arr, i+1, sum, totalSum, dp)
        );
    }

    minDifference(arr, n) {
        let totalSum = arr.reduce((acc, el)=> acc+el, 0);
        let dp = Array.from({length:n+1}, ()=> new Array(totalSum+1).fill(-1));
        this.findMinDifference(arr, 0, 0, totalSum, dp);
        for(let i=0; i < n; i++){
            console.log(...dp[i])
        }
        return dp[0][0]
    }
}
/*
# Complexity Analysis

Time Complexity
    O(n * S), where n is the number of elements and S is the totalSum. Initializing the DP table takes O(n * S). The recursive function visits each state (n * S) exactly once due to memoization, performing O(1) work per call. The final loop iterates n times over rows of size S, taking O(n * S).

Space Complexity
    O(n * S) to store the DP table of size (n+1) * (totalSum+1) and O(n) for the recursion stack depth.
*/

// Solution - II (Tabulation)
class Solution {
    findMinDifferenceTabulation(arr, n){
       let totalSum = arr.reduce((acc, el)=> acc+el, 0);
       let dp = Array.from({length:n+1}, ()=> new Array(totalSum+1).fill(0));

       for(let sum= 0; sum <= totalSum ; sum++){
           dp[n][sum] = Math.abs(totalSum - 2*sum);
       }

       for(let i= n-1; i >= 0 ; i--){
           for(let sum = 0 ; sum <= totalSum; sum++){
               dp[i][sum] = Math.min( 
                                   dp[i+1][sum+ arr[i]],
                                   dp[i+1][sum]
                               )
           }
       }
       return dp[0][0];
   }
   minDifference(arr, n) {
       return this.findMinDifferenceTabulation(arr, n)
   }
}



/*
# Complexity Analysis
Time Complexity
    O(n * S), where n is the number of elements and S is the total sum of the array. The algorithm initializes a 2D DP table of size (n+1) * (S+1) and uses nested loops to iterate through all states, performing constant time operations in each iteration.

Space Complexity
    O(n * S), where n is the number of elements and S is the total sum of the array. The space is required to store the (n+1) * (S+1) DP table for tabulation.
*/