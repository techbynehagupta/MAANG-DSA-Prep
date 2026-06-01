/*
# Problem Statement:
    Given an array nums of n integers and an integer target, build an expression using the integers from nums where each integer can be prefixed with either a '+' or '-' sign.
    The goal is to achieve the target sum by evaluating all possible combinations of these signs.
    Determine the number of ways to achieve the target sum and return your answer with modulo 109+7.


Example 1

    Input: nums = [1, 2, 7, 1, 5], target = 4

    Output: 2

    Explanation: There are 2 ways to assign symbols to make the sum of nums be target 4.

    +1 + 2 + 7 - 1 - 5 = 4

    -1 + 2 + 7 + 1 - 5 = 4

Example 2

    Input: nums = [1], target = 1

    Output: 1

    Explanation: There is only one way to assign symbols to make the sum of nums be target 1.

# Constraints

    1 ≤ n ≤ 100
    0 ≤ nums[i] ≤ 1000
    0 <= sum(A[i]) <= 104
    -1000 <= target <= 1000
*/


/*
# Intuition
    The first approach that comes to our mind is to generate all subsequences and try both options of placing ‘-’ and ‘+’ signs and count the expression if it evaluates the answer.This surely will give us the answer but we can try something familiar to the concept we studied in the article Count Partitions with Given Difference
*/


// Solution I Recursion
class Solution {
    targetSumrecursion(n, target, nums, i){
        if(target == 0 && i == n){
            return 1;
        }
        if(i == n){
            return 0;
        }


        let add = this.targetSumrecursion(n, target-nums[i], nums, i+1);
        let sub = this.targetSumrecursion(n, target+nums[i], nums, i+1);
        return add + sub;
    }
    targetSum(n, target, nums) {
        return this.targetSumrecursion(n, target, nums, 0);
    }
}


/*
# Complexity Analysis
    Time Complexity:O(2N), As each index has 2 choices and there are total of N elements.

    Space Complexity:O(N), As we are using recursive stack space of O(N).
*/


// Solution II Memoisation
class Solution {
    targetSumMemoisation(n, nums, i, sum, target, dp, total){
        let mod= 1e9 + 7;
        if(sum == target && i == n){
            return 1;
        }
        if(i == n){
            return 0;
        }
        let col = sum < 0 ? -1*sum - 1:  total + sum;
        if( dp[i][col]!= -Infinity){
            return dp[i][col];
        }

        let add = this.targetSumMemoisation(n, nums, i+1, sum+nums[i], target, dp, total);
        let sub = this.targetSumMemoisation(n, nums, i+1, sum-nums[i], target, dp, total);
        return dp[i][col] = (add%mod +sub%mod)%mod;
      
    }
    targetSum(n, target, nums) {
        let total = nums.reduce((acc, el)=> acc+el, 0);
        if (Math.abs(target) > total) {
            return 0;
        }
        let dp = Array.from({length: n+1}, ()=> new Array((2*total) + 1).fill(-Infinity));
        let ans =  this.targetSumMemoisation(n, nums, 0, 0, target, dp, total);
        return ans;
    }
}

/*
# Complexity Analysis
Time Complexity
    O(n * totalSum), where n is the number of elements and totalSum is the sum of all elements in nums. The DP table has n rows and (2 * totalSum + 1) columns, and each cell is computed exactly once in O(1) time.
Space Complexity
    O(n * totalSum), required to store the dp table of size (n + 1) * (2 * totalSum + 1) and the recursion stack depth of O(n).
*/
