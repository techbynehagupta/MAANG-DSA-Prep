/*
# Problem Statement:
    Given two strings s and t, return the number of distinct subsequences of s that equal t.
    A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters. For example, "ace" is a subsequence of "abcde" while "aec" is not.
    The task is to count how many different ways we can form t from s by deleting some (or no) characters from s. Return the result modulo 109+7.


Example 1

    Input: s = "axbxax", t = "axa"
    Output: 2
    Explanation: In the string "axbxax", there are two distinct subsequences "axa":
    (a)(x)bx(a)x
    (a)xb(x)(a)x

Example 2

    Input: s = "babgbag", t = "bag"

    Output: 5

    Explanation: In the string "babgbag", there are five distinct subsequences "bag":

    (ba)(b)(ga)(g)

    (ba)(bg)(ag)

    (bab)(ga)(g)

    (bab)(g)(ag)

    (babg)(a)(g)


# Constraints

    1 <= s.length, t.length <= 1000
*/

/*
Intuition
1. dp[i][j], stands for Number of ways to form the substring t[j...] using the remaining characters of s[i...]
2.  At every position, we try to match the current character of t
   with characters available in s.
3.  If s[i] == t[j], we have two choices:
   a. Take this character and match the next characters
      -> dp[i+1][j+1]
   b. Skip this character from s and continue searching
      -> dp[i+1][j]
4. If s[i] != t[j], we cannot use s[i], so the only option is
   to skip it and move forward in s
   -> dp[i+1][j]
5. When j reaches t.length, it means we successfully formed the
   entire string t, so return 1.

6. When i reaches s.length before matching all characters of t,
   no valid subsequence exists, so return 0.
 */


// Solution I
class Solution {
    distinctSubsequencesMemoisation(s, t, i, j, dp){
        if( j == t.length){
            // we found a subsequence
            return 1;
        }
        if(i >= s.length){
            // j is not rached and s reached last, i.e no subsequence
            return 0;
        }

        let mod = 1e9+7;
        if(dp[i][j] != -1){
            return dp[i][j];
        }
        if(s[i] === t[j]){
            // option is to take or ingore
            return (dp[i][j] = (this.distinctSubsequencesMemoisation(s, t, i+1, j+1, dp)%mod + this.distinctSubsequencesMemoisation(s, t, i+1, j, dp)%mod)%mod)
        }else{
            // if don't match we have to move forward
            return (dp[i][j] = this.distinctSubsequencesMemoisation(s, t, i+1, j, dp));
        }
    }
    distinctSubsequences(s, t) {
        let m = s.length, n = t.length;
        let dp = Array.from({length: m}, ()=> new Array(n).fill(-1));
        return this.distinctSubsequencesMemoisation(s, t, 0, 0, dp)
    }
}






/*
# Complexity Analysis

Time Complexity
    O(m*n), where m is the length of s and n is the length of t, because the memoization table of size m*n is filled once and each state performs constant time operations.

Space Complexity
    O(m*n), consisting of the dp table of size m*n to store results and the recursion stack depth which is O(m).

*/