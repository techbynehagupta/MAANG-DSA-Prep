/*
# Problem Statement:
    Given two strings str1 and str2, find the length of their longest common substring.
    A substring is a contiguous sequence of characters within a string.


Example 1

    Input: str1 = "abcde", str2 = "abfce"

    Output: 2

    Explanation: The longest common substring is "ab", which has a length of 2.

Example 2

    Input: str1 = "abcdxyz", str2 = "xyzabcd"

    Output: 4

    Explanation: The longest common substring is "abcd", which has a length of 4.


# Constraints

    n=str1.length
    m=str2.length
    1<= n, m <=103
    str1 and str2 are in lowercase alphabet
*/


/*
# Intuition
    1. If use dp[i][j] which defines length of longest common substring ending at str1[i-1] and str2[j-1]
    2. If the current charcater matches then we expand the previous common substring ending at i-1, j-1 so
         dp[i][j] = 1 + dp[i-1][j-1].
    3. If the matching breaks, then we put dp[i][j] = 0 as the continuity breaks 
    4. While filling the DP table, we keep track of the maximum value seen,
        because the longest common substring can end at any position.
    5. The maximum value stored during the traversal represents the length
   of the longest common substring present in both strings.
*/


// Solution (Tabulation)
class Solution {
    LCSTabulation(str1, str2){
       let n = str1.length, m = str2.length;
       let dp = Array.from({length: n+1}, ()=> new Array(m+1).fill(0));
       let max = 0;
       for(let i = 1; i <= n; i++){
          for(let j = 1; j<= m ; j++){
              dp[i][j] = str1[i-1] == str2[j-1] 
                          ? 1 + dp[i-1][j-1]
                          : 0;
              max = Math.max(max, dp[i][j]);
          }
       }
       return max;
      
    }
    longestCommonSubstr(str1, str2) {
      return this.LCSTabulation(str1, str2);
    }
  }
  


/*
# Complexity Analysis

Time Complexity
    O(n*m) where n is the length of str1 and m is the length of str2; the initialization of the 2D array takes O(n*m) and the nested loops iterate n*m times.

Space Complexity
    O(n*m) due to the allocation of the 2D DP table of size (n+1) * (m+1).
*/