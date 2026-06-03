/*
# Problem Statement:
    Given two strings str1 and str2, find the length of their longest common subsequence.
    A subsequence is a sequence that appears in the same relative order but not necessarily contiguous and a common subsequence of two strings is a subsequence that is common to both strings.


Example 1

    Input: str1 = "bdefg", str2 = "bfg"

    Output: 3

    Explanation: The longest common subsequence is "bfg", which has a length of 3.

Example 2

    Input: str1 = "mnop", str2 = "mnq"

    Output: 2

    Explanation: The longest common subsequence is "mn", which has a length of 2.


# Constraints

    n=str1.length
    m=str2.length
    1<= n, m <=103
    str1 and str2 are in lowercase alphabet
*/


/*
# Intuition
    Since subsequence is not contigious we can follow the steps to check the longest subsequence
    1. If the characters of both the strings are equal, we can count that in answer and move on to next chars in both strings
    2. If the character doesn't match then we can ignore either the string1 char or string2 char, to follow the same steps to know the lonest subsequence from (i+1, j) or (i, j+1)

*/


// Solution I (Memoisation)
class Solution {
    lcsRecursive(str1, str2, m, n, dp){
        if(m >= str1.length || n >= str2.length){
            return 0;
        }
        if(dp[m][n] != -1){
            return dp[m][n];
        }
        if(str1[m] == str2[n]){
          return  dp[m][n] = 1 + this.lcsRecursive(str1, str2, m+1, n+1, dp)
        }else{
            return dp[m][n] =  Math.max(
                this.lcsRecursive(str1, str2, m+1, n, dp),
                this.lcsRecursive(str1, str2, m, n+1, dp)
            )
        }
    }
    lcs(str1, str2) {
        let len1 = str1.length, len2 = str2.length;

        if(len1 == 0 || len2 == 0){
            return 0;
        }

        let dp = Array.from({length: len1}, ()=> new Array(len2).fill(-1));
        
        return this.lcsRecursive(str1, str2, 0, 0, dp)
    }
}


/*
# Complexity Analysis (Memoisation) I

Time Complexity
    O(m*n) where m and n are the lengths of str1 and str2 respectively, as each state in the (m+1)x(n+1) DP table is computed at most once due to memoization.

Space Complexity
    O(m*n) to store the DP table of size m*n, plus O(min(m, n)) recursion stack space in the worst case.
*/

// Solution II (Tabulation)
class Solution {
    lcsTabulation(str1, str2) {
      let len1 = str1.length,
        len2 = str2.length;
  
      if (len1 == 0 || len2 == 0) {
        return 0;
      }
  
      let dp = Array.from({ length: len1 + 1 }, () =>
        new Array(len2 + 1).fill(0),
      );
  
      for (let i = len1 - 1; i >= 0; i--) {
        for (let j = len2 - 1; j >= 0; j--) {
          if (str1[i] == str2[j]) {
            dp[i][j] = 1 + dp[i + 1][j + 1];
          } else {
            dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
          }
        }
      }
      return dp[0][0]
    }
    lcs(str1, str2) {
      return this.lcsTabulation(str1, str2);
    }
  }

  
/*
Complexity Analysis

Time Complexity
    O(m * n) where m and n are the lengths of str1 and str2 respectively, due to the initialization of the (m+1)*(n+1) matrix and the nested loops iterating over each cell exactly once.

Space Complexity
    O(m * n) where m and n are the lengths of str1 and str2 respectively, as the algorithm allocates a 2D array of size (m+1) * (n+1) to store the intermediate subproblem results.

*/