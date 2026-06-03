/*
# Problem Statement:
    Given a string s, find the minimum number of insertions needed to make it a palindrome. A palindrome is a sequence that reads the same backward as forward. You can insert characters at any position in the string.


Example 1

    Input: s = "abcaa"
    Output: 2
    Explanation: Insert 2 characters "c", and "b" to make "abcacba", which is a palindrome.

Example 2

    Input: s = "ba"
    Output: 1
    Explanation: Insert "a" at the beginning to make "aba", which is a palindrome.


# Constraints

    1 <= s.length <= 1000,
    s consists of only lowercase English letters
*/


/*
# Intuition
    1. We use dp, where dp[i][j] stands for the minimum no. of insertions needed to make the string plaindrome from i to j index
    2. If the character at both end matches, they can be the part of plaindrome, so no insertion is needed at
   these positions. we'll be simply solving  for a smaller sub problem from i+!, j-1
    3. If the charcater doesn't match, we have to insert either the char in str1 or str2, so we have 2 choices
        a. Insert s[i] near j and solve (i+1, j)
        b. Insert s[j] near i and solve (i, j-1)
    4. since 1 insertion is performed at the current step we'll be adding 1 to the minimum of above 2 choices
    5. Base Case:
        - If i >= j, the substring has at most one character, which is
            already a palindrome, so 0 insertions are needed.

    6. Memoization is used to store answers for overlapping substrings,
   avoiding repeated computations.

*/


// Solution I (Memoisation)
class Solution {
    minInsertionRecursive(s, i, j, dp) {
      if(i >= j){
          return 0;
      }
      if(dp[i][j] != -1){
          return dp[i][j];
      }
      if (s[i] == s[j]) {
        return (dp[i][j] = this.minInsertionRecursive(s, i + 1, j - 1, dp));
      } else {
        return (dp[i][j] = (
          1 +
          Math.min(
            this.minInsertionRecursive(s, i + 1, j, dp),
            this.minInsertionRecursive(s, i, j - 1, dp),
          )
        ));
      }
    }
    minInsertion(s) {
      let n = s.length;
      let dp = Array.from({length:n}, ()=> new Array(n).fill(-1));
      return this.minInsertionRecursive(s, 0, n-1, dp)
    }
  }
  
  /*
  We can also solve this problem by finding longest plaindromic subsequcne and then subtracting it from the string length
  
  ex- abdca
  here ada is the longest subsequnce ie.3 and n = 5, 5-3  = 2 is the no. of minimum minm insertion we would be needing for making it plaindromic
   */

/*
Complexity Analysis

Time Complexity
    O(n^2) where n is the length of the string, because the dp table has n*n states and each state is computed once in O(1) time after the initial filling of the O(n^2) table.

Space Complexity
    O(n^2) where n is the length of the string, required for the dp table initialization and the recursion stack depth of O(n).
*/

// Solution II (Tabulation)
class Solution {
    minTabulation(s){
      let n = s.length;
      let dp = Array.from({length:n}, ()=> new Array(n).fill(0));
  
      for(let i = n-1; i >= 0; i--){
          for(let j = i+1; j < n ; j++){
              dp[i][j] = s[i] == s[j] ? dp[i+1][j-1] : 1 + Math.min(dp[i+1][j], dp[i][j-1]);
          }
      }
      return dp[0][n-1]
  
    }
    minInsertion(s) {
      return this.minTabulation(s)
    }
  }

/*
Complexity Analysis

Time Complexity
    O(n^2) where n is the length of the string, due to the nested loops initializing and filling an n by n DP table.

Space Complexity
    O(n^2) to store the n by n DP table in memory.
*/

  // Solution III (Space optimised)
  class Solution {
    // space optimsied
  minTabulation(s) {
    let n = s.length;
    let dp = Array.from({ length: 2 }, () => new Array(n).fill(0));

    for (let i = n - 1; i >= 0; i--) {
      for (let j = i + 1; j < n; j++) {
        dp[i % 2][j] =
          s[i] == s[j]
            ? dp[(i + 1) % 2][j - 1]
            : 1 + Math.min(dp[(i + 1) % 2][j], dp[i%2][j - 1]);
      }
    }
    return dp[0][n - 1];
  }
  minInsertion(s) {
    return this.minTabulation(s);
  }
}




/*
# Complexity Analysis

Time Complexity
    O(n^2) where n is the length of string s. The init loop to create the dp table takes O(n), and the nested loops iterate through n*(n-1)/2 pairs, resulting in O(n^2) time complexity.

Space Complexity
    O(n) where n is the length of string s. The dp table uses a fixed-size 2xN array, occupying 2n space, which simplifies to O(n).
*/