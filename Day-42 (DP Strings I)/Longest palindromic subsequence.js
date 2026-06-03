/*
# Problem Statement:
    Given a string, Find the longest palindromic subsequence length in given string.
    A palindrome is a sequence that reads the same backwards as forward.
    A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.


Example 1

    Input: s = "eeeme"

    Output: 4

    Explanation: The longest palindromic subsequence is "eeee", which has a length of 4.

Example 2

    Input: s = "annb"

    Output: 2

    Explanation: The longest palindromic subsequence is "nn", which has a length of 2.

# Constraints

    1 ≤ s.length ≤ 1000
*/


/*
# Intuition
    1. Dp[i][j] stands for length of longest palindromic subsequence from i to j length.
    2. If the str[i] = str[j] then, they can be part of the palidrome so we add 2 and recursively solve the problem for i+1, j-1
    3. If they don't match then, atleast one of them can't be the part of the plaindrome, Therefore, we try both possibilities:
          - ignore the left charcater (i+1, j)
          - ignore the right charcater (i, j-1)
          - and take the maximum answer.
    4. Base Cases:
        - If i > j, no characters remain, so return 0.
        - If i == j, only one character remains, which itself is a palindrome
            of length 1.
    5. Since many overlapping subproblems occur, we store already computed
    answers in the dp table to avoid repeated calculations.
*/


// Solution I (Memoisation)
class Solution {
    LPS(s, i, j, dp) {
      if (i > j) {
        return 0;
      }
      if (i == j) {
        return 1;
      }
      if (dp[i][j] != -1) {
        return dp[i][j];
      }
  
      if (s[i] == s[j]) {
        return (dp[i][j] = 2 + this.LPS(s, i + 1, j - 1, dp));
      } else {
        return (dp[i][j] = Math.max(
          this.LPS(s, i + 1, j, dp),
          this.LPS(s, i, j - 1, dp),
        ));
      }
    }
  
    longestPalinSubseq(s) {
      let n = s.length;
      let dp = Array.from({ length: n }, () => new Array(n).fill(-1));
      return this.LPS(s, 0, n-1, dp);
    }
  }
  


/*
# Complexity Analysis

Time Complexity
    O(n^2) where n is the length of the string, as there are n*n unique states in the DP table, each computed in O(1) time.

Space Complexity
    O(n^2) for the 2D DP array of size n*n plus O(n) for the recursion stack depth.
*/


// Solution 2 (Tabulation)

class Solution {
  
    LPSTabulation(s){
      let n = s.length;
      let dp = Array.from({ length: n }, () => new Array(n).fill(0));
      let i =0, j =0;
      while(i <n && j < n){
          dp[i][j] = 1;
          i++;
          j++;
      }
  
      for(let i = n-1 ; i >= 0 ; i--){
          for(let j = i; j < n ; j++){
              if(i == j) continue;
              dp[i][j] = s[i] == s[j] ? 2 + dp[i+1][j-1]: Math.max(dp[i+1][j], dp[i][j-1])
          }
      }
      return dp[0][n-1];
    }
  
    longestPalinSubseq(s) {
      return this.LPSTabulation(s)
    }
  }
  
/*
Complexity Analysis

Time Complexity
    O(n^2) where n is the length of the string s. The initialization loop takes O(n), and the nested loops iterate through approximately n^2/2 cells, performing constant time operations in each.

Space Complexity
    O(n^2) where n is the length of the string s. The algorithm allocates a 2D array of size n x n to store the DP table.

*/