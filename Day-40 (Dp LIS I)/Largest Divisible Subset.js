/*
# Problem Statement:
    Given an array nums of positive integers, the task is to find the largest subset such that every pair (a, b) of elements in the subset satisfies a % b == 0 or b % a == 0.
    Return the subset in any order. If there are multiple solutions, return any one of them.

    Note: As there can be multiple correct answers, the compiler returns 1 if the answer is valid, else 0.


Example 1

    Input: nums = [3, 5, 10, 20]

    Output: [5, 10, 20]

    Explanation:

    The subset [5, 10, 20] satisfies the divisibility condition: 10 % 5 == 0 and 20 % 10 == 0.

Example 2

    Input: nums = [16, 8, 2, 4, 32]

    Output: [2, 4, 8, 16, 32]

    Explanation:

    The entire array forms a divisible subset since 32 % 16 == 0, 16 % 8 == 0, and so on.

Example 3

    Input: nums = [7, 14, 28, 3]

    Output:

    [7, 14, 28]
# Constraints

    1 <= nums.length <= 103
    1 <= nums[i] <= 106
*/

/*
Intution
    1. For each i find j which are satisfying th given conditon like LIS or mod
    2. Update the current dp with previous max answer + 1
    3. store the max
    4. Once the traversal is done make a ans array for op
    5. backtravsere the parent array from the lastIndex where maxium is found to get all the previous elements concluding that answer
 */



// Solution

class Solution {
    largestDivisibleSubset(nums) {
      // sort the array
      nums.sort((a, b)=>a-b);
  
      let dp = new Array(nums.length).fill(1);
      let parent = new Array(nums.length).fill(0).map((_, index) => index);
  
      let maxLen = 1, lastIndex = 0;
      for(let i = 1; i < nums.length ; i++){
          for(let j = 0 ; j < i ; j++){
              if(nums[i] % nums[j] == 0 && dp[j] + 1 > dp[i]){
                  dp[i] = dp[j] + 1;
                  parent[i] = j;
              }
          }
          if(maxLen < dp[i]){
              maxLen = dp[i];
              lastIndex = i;
          }
      }
  
      let subset = [];
      while(lastIndex != parent[lastIndex]){
          subset.push(nums[lastIndex]);
          lastIndex = parent[lastIndex];
      }
  
      subset.push(nums[lastIndex]);
  
      return subset;
    }
  }


/*
# Complexity Analysis

Time Complexity
    O(n^2) where n is the number of elements in nums; sorting takes O(n log n), the initialization loops take O(n), and the nested loops iterate O(n^2/2) times.

Space Complexity
    O(n) where n is the size of the input array; the dp array, parent array, and the resulting subset each require O(n) space.
*/