/*
# Problem Statement:
    Given two strings str1 and str2, find the shortest common supersequence.
    The shortest common supersequence is the shortest string that contains both str1 and str2 as subsequences.


Example 1

    Input: str1 = "mno", str2 = "nop"

    Output: "mnop"

    Explanation: The shortest common supersequence is "mnop". It contains "mno" as the first three characters and "nop" as the last three characters, thus including both strings as subsequences.

Example 2

    Input: str1 = "dynamic", str2 = "program"

    Output: "dynprogramic"

    Explanation: The shortest common supersequence is "dynprogramic". It includes all characters from both "dynamic" and "program", with minimal overlap. For example, "dynamic" appears as "dyn...amic" and "program" appears as "...program..." within "dynprogramic".


# Constraints

    1 <= str1.length, str2.length <= 1000
    str1 and str2 consist of lowercase English letters.
*/


/*
Intuition:
    1. First, find the Longest Common Subsequence (LCS) between the two strings, as these characters are already common and should appear only once in the final answer.
    2. Use three pointers: one for str1, one for str2, and one for the LCS string.
    3. For each LCS character, append all non-LCS characters from both strings before it, then append the LCS character itself.
    4. This preserves the relative order of characters in both strings while avoiding duplication of common characters.
    5. After processing the entire LCS, append any remaining characters from both strings to obtain the Shortest Common Supersequence.
*/


// Solution
class Solution {
    LCS(str1, str2, i, j, dp) {
      if (i >= str1.length || j >= str2.length) {
        return "";
      }
      if(dp[i][j] != -1){
          return dp[i][j];
      }
      if (str1[i] == str2[j]) {
        return (dp[i][j] = str1[i] + this.LCS(str1, str2, i + 1, j + 1, dp));
      } else {
        let op1 = this.LCS(str1, str2, i + 1, j, dp);
        let op2 = this.LCS(str1, str2, i, j + 1, dp);
        return dp[i][j] = op1.length > op2.length ? op1 : op2;
      }
    }
  
    shortestCommonSupersequence(str1, str2) {
      let dp = Array.from({length: str1.length}, ()=> new Array(str2.length).fill(-1));
      let lcs = this.LCS(str1, str2, 0, 0, dp);
  
      let ans = "";
      let i = 0; // str1 pointer
      let j = 0; // str2 pointer
      let k = 0; // LCS pointer
  
      while(k < lcs.length){
          while(str1[i] != lcs[k]){
              ans += str1[i];
              i++;
          }
          while(str2[j] != lcs[k]){
              ans += str2[j];
              j++;
          }
          ans += lcs[k];
          i++;
          j++;
          k++;
      }
      ans += str1.slice(i) + str2.slice(j);
      return ans;
    }
  }
  

/*
# Complexity Analysis

Time Complexity
    O(N*M) where N is length of str1 and M is length of str2. DP initialization takes O(N*M), memoized LCS recursion visits each state exactly once taking O(N*M), and the reconstruction loop runs in O(N+M) time.

Space Complexity
    O(N*M) where N is length of str1 and M is length of str2. The DP table stores N*M entries, and the recursion stack depth reaches O(N+M). Additionally, storing the LCS string and result string requires O(N*M) space in the worst case.
*/