/*
# Problem Statement:
    Given two strings start and target, you need to determine the minimum number of operations required to convert the string start into the string target. The operations you can use are:
        * Insert a character: Add any single character at any position in the string.
        * Delete a character: Remove any single character from the string.
        * Replace a character: Change any single character in the string to another character.
        * The goal is to transform start into target using the fewest number of these operations.


Example 1

    Input: start = "planet", target = "plan"

    Output: 2

    Explanation: 

    To transform "planet" into "plan", the following operations are required:

    1. Delete the character 'e': "planet" -> "plan"

    2. Delete the character 't': "plan" -> "plan"

    Thus, a total of 2 operations are needed.

Example 2

    Input: start = "abcdefg", target = "azced"

    Output: 4

    Explanation: 

    To transform "abcdefg" into "azced", the following operations are required:

    1. Replace 'b' with 'z': "abcdefg" -> "azcdefg"

    2. Delete 'd': "azcdefg" -> "azcefg"

    3. Delete 'f': "azcefg" -> "azceg"

    4. Replace 'g' with 'd': "azceg" -> "azced"

    Thus, a total of 4 operations are needed.


# Constraints

    1 ≤ start.length, target.length ≤ 1000
*/


/*

# Intuition
  
  1. dp[i][j] represents the minimum number of operations required to convert
     start[i...] into target[j...].
  
  2. At every position, we compare the current characters start[i] and target[j].
  
  3. If start[i] == target[j], no operation is needed for this character.
     So we move both pointers ahead:
     dp[i][j] = dp[i+1][j+1]
  
  4. If start[i] != target[j], we have 3 choices:
  
     a. Insert:
        Insert target[j] into start.
        Now target[j] is matched, so move j ahead while i remains same.
        Cost = 1 + dp[i][j+1]
  
     b. Delete:
        Delete start[i].
        Now move to the next character of start while target[j] remains same.
        Cost = 1 + dp[i+1][j]
  
     c. Replace:
        Replace start[i] with target[j].
        Now both characters are matched, so move both pointers ahead.
        Cost = 1 + dp[i+1][j+1]
  
  5. Since we need the minimum number of operations, we take:
     dp[i][j] = 1 + min(insert, delete, replace)
  
  6. Base cases:
     - If both strings are completed, return 0.
     - If start is completed but target is still left,
       we need to insert all remaining characters of target:
       return target.length - j.
     - If target is completed but start is still left,
       we need to delete all remaining characters of start:
       return start.length - i.
  
   */
  



// Solution I
class Solution {
    editDistanceRecursive(s, t, i, j, dp) {
      if (s.length == i && t.length == j) {
        // no extra operations required
        return 0;
      }
      if (j >= t.length) {
        // target is acheived so extra characters needs to be deleted
        return s.length - i;
      }
      if (i >= s.length) {
        //initla string gone expty we need to insert remaining characters
        return t.length - j;
      }
  
      if (dp[i][j] != -1) {
        return dp[i][j];
      }
  
      if (s[i] == t[j]) {
        return (dp[i][j] = this.editDistanceRecursive(s, t, i + 1, j + 1, dp));
      } else {
        // 1. Insertion, 2. Deletion, 3. Replace
        return (dp[i][j] =
          1 +
          Math.min(
            this.editDistanceRecursive(s, t, i, j + 1, dp),
            this.editDistanceRecursive(s, t, i + 1, j, dp),
            this.editDistanceRecursive(s, t, i + 1, j + 1, dp),
          ));
      }
    }
    editDistance(start, target) {
      let m = start.length,
        n = target.length;
      let dp = Array.from({ length: m }, () => new Array(n).fill(-1));
      return this.editDistanceRecursive(start, target, 0, 0, dp);
    }
  }

/*
# Complexity Analysis

Time Complexity
    O(m*n) where m is the length of the start string and n is the length of the target string, because each state (i, j) is computed exactly once due to memoization.

Space Complexity
    O(m*n) for the dp table, plus O(max(m, n)) for the recursion stack depth.
*/

// Solution II
class Solution {
    editDistanceTabulation(s, t) {
      let m = s.length, n = t.length;
      let dp = Array.from({ length: m+1 }, () => new Array(n+1).fill(0));
  
      for(let i = 0; i<= m; i++){
          dp[i][n] = m-i;
      }
      for(let j = 0; j <= n ; j++){
          dp[m][j] = n-j;
      }
  
      for(let i = m-1; i >= 0; i--){
          for(let j = n-1; j>=0 ; j--){
              if(s[i] == t[j]){
                  dp[i][j] = dp[i+1][j+1];
              }else{
                  dp[i][j] = 1  + Math.min(
                      dp[i][j+1],
                      dp[i+1][j],
                      dp[i+1][j+1]
                  )
              }
          }
      }
      return dp[0][0];
    }
    editDistance(start, target) {
      return this.editDistanceTabulation(start, target);
    }
  }

/*
Complexity Analysis

Time Complexity
    O(m*n) where m is the length of s and n is the length of t. The complexity is determined by the nested loops: initialization of the 2D array takes O(m*n), the two boundary initialization loops take O(m+n), and the main nested loops for filling the DP table take O(m*n).

Space Complexity
    O(m*n) where m is the length of s and n is the length of t. The algorithm creates a 2D array of size (m+1) * (n+1) to store the edit distance results for all subproblems.

*/
  
