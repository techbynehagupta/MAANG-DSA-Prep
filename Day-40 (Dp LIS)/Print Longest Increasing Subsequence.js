/*
# Problem Statement:
    Given an array of n integers arr, return the Longest Increasing Subsequence (LIS) that is Index-wise Lexicographically Smallest.
    The Longest Increasing Subsequence (LIS) is the longest subsequence where all elements are in strictly increasing order.
    A subsequence A1 is Index-wise Lexicographically Smaller than another subsequence A2 if, at the first position where A1 and A2 differ, the element in A1 appears earlier in the array arr than corresponding element in S2.
    Your task is to return the LIS that is Index-wise Lexicographically Smallest from the given array.


Example 1

    Input: arr = [10, 22, 9, 33, 21, 50, 41, 60, 80]

    Output: [10, 22, 33, 50, 60, 80]

    Explanation: The LIS is [10, 22, 33, 41, 60, 80] and it is the index-wise lexicographically smallest.

Example 2

    Input: arr = [1, 3, 2, 4, 6, 5]

    Output: [1, 3, 4, 6]

    Explanation: Possible LIS sequences are [1, 3, 4, 6] and [1, 2, 4, 6]. Since [1, 3, 4, 6] is Index-wise Lexicographically Smaller, it is the result.


# Constraints

    1 <= arr.length <= 103
    -106 <= arr[i] <= 106
*/


 /*
  Intuition
  
  1. Let dp[i] represent the length of the Longest Increasing Subsequence (LIS)
     ending at index i.
  
  2. For every element arr[i], check all previous elements arr[j] where j < i.
  
  3. If arr[j] < arr[i], then arr[i] can extend the increasing subsequence
     ending at j. Update dp[i] if using j gives a longer subsequence:
  
         dp[i] = dp[j] + 1
  
  4. Along with updating dp[i], store the index j in the parent array.
     This helps us reconstruct the actual LIS later.
  
  5. While filling the dp array, keep track of:
     - the maximum LIS length found so far
     - the index where this maximum length ends (lastIndex)
  
  6. After the DP traversal is complete, start from lastIndex and
     repeatedly follow the parent pointers to retrieve all elements
     that form the LIS.
  
  7. Since the elements are collected from the end of the subsequence
     to the beginning, reverse the result before returning it.
  
 
  */


// Solution
class Solution {
    longestIncreasingSubsequence(arr) {
      let n = arr.length;
      let dp = new Array(n).fill(1);
      let parent = new Array(n).fill(0).map((_, index)=> index);
  
      let maxLen = 1, lastIndex = 0;
      for(let i = 1 ; i < n ; i++){
          for(let j = 0; j < i; j++){
              if(arr[j] < arr[i] && dp[j] +1 > dp[i]){
                 dp[i] = dp[j] + 1;
                 parent[i] = j;
              }
          }
          if(maxLen < dp[i]){
              maxLen = dp[i];
              lastIndex = i;
          }
      }
  
      let ans = [];
      while(lastIndex!= parent[lastIndex]){
          ans.push(arr[lastIndex]);
          lastIndex = parent[lastIndex]
      }
  
      ans.push(arr[lastIndex]);
      ans.reverse()
  
      return  ans;
    }
  }
  



/*
# Complexity Analysis
 Time Complexity: O(n²)
  Space Complexity: O(n)
*/