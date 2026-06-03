/*
# Problem Statement:
    Given two strings str1 and str2, find the minimum number of insertions and deletions in string str1 required to transform str1 into str2.
    Insertion and deletion of characters can take place at any position in the string.


Example 1

    Input: str1 = "kitten", str2 = "sitting"

    Output: 5

    Explanation: To transform "kitten" to "sitting", delete "k" to get "itten", insert "s" at the beginning to get "sitten", delete "e" to get "sittn", then insert "i" to get "sittin", and insert "g" at the end to get "sitting".To transform "kitten" to "sitting", delete "k" and insert "s" to get "sitten", then insert "i" to get "sittin", and insert "g" at the end to get "sitting".

Example 2

    Input: str1 = "flaw", str2 = "lawn"

    Output: 2

    Explanation: To transform "flaw" to "lawn", delete "f" and insert "n" at the end. Hence minimum number of operations required is 2".


# Constraints

    1 ≤ str1.length, str2.length ≤ 1000
*/


/*
# Intuition
    
    1. We are trying to convert str1 into str2 using insertions and deletions.

    2. If str1[i] == str2[j], both characters already match, so no operation
    is needed. We move to the next characters in both strings.

    3. If str1[i] != str2[j], we have two choices:
    - Delete str1[i] and move i forward
    - Insert str2[j] into str1 and move j forward

    4. Since we perform one operation in the current step, we add 1 and take
    the minimum of both choices.

    5. Base Cases:
    - If str1 is finished, insert all remaining characters of str2.
    - If str2 is finished, delete all remaining characters of str1.

    6. Memoization stores dp[i][j], meaning minimum operations required to
    convert str1[i...] into str2[j...].
*/


// Solution I (Memoisation)
class Solution {
    minOperationsRecursive(str1, str2, i, j, dp) {
      if (i >= str1.length) {
        return str2.length - j;
      }
      if (j >= str2.length) {
        return str1.length - i;
      }
      if (dp[i][j] != -1) {
        return dp[i][j];
      }
      if (str1[i] == str2[j]) {
        return (dp[i][j] = this.minOperationsRecursive(
          str1,
          str2,
          i + 1,
          j + 1,
          dp,
        ));
      } else {
        return (dp[i][j] =
          1 +
          Math.min(
            this.minOperationsRecursive(str1, str2, i + 1, j, dp),
            this.minOperationsRecursive(str1, str2, i, j + 1, dp),
          ));
      }
    }
    minOperations(str1, str2) {
      let m = str1.length,
        n = str2.length;
      let dp = Array.from({ length: m }, () => new Array(n).fill(-1));
      return this.minOperationsRecursive(str1, str2, 0, 0, dp);
    }
  }
  


/*
# Complexity Analysis

Time Complexity
    O(m*n), where m is the length of str1 and n is the length of str2, because each state (i, j) is computed exactly once due to memoization.

Space Complexity
    O(m*n), consisting of the memoization table (m*n) and the recursion stack depth (m+n).
*/


/**
 Intuition

    Think of LCS as:

    The part that survives the transformation.

    Everything in str1 that's not in the LCS must be deleted.

    Everything in str2 that's not in the LCS must be inserted.

    That's why:

    deletions = m - LCS
    insertions = n - LCS 
*/

  

// Solution - II (Tabulation)

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
      return dp[0][0];
    }
    minOperations(str1, str2) {
      let commonChars = this.lcsTabulation(str1, str2);
      let alterations = str1.length - commonChars + str2.length  -commonChars;
      return alterations;
    }
}
  /*
# Complexity Analysis

Time Complexity
    O(m*n), where m and n are the lengths of str1 and str2. The array initialization loop runs in O(m*n) and the nested loops iterate over the grid once, resulting in O(m*n) operations.

Space Complexity
    O(m*n) because the tabulation requires a 2D array of size (m+1) * (n+1) to store the intermediate LCS values.

*/