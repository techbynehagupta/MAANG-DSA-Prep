/*
# Problem Statement:
    Given a string str and a pattern pat, implement a pattern matching function that supports the following special characters:
    '?' Matches any single character.
    '*' Matches any sequence of characters (including the empty sequence).
    The pattern must match the entire string.


Example 1

    Input: str = "xaylmz", pat = "x?y*z"

    Output: true

    Explanation: 

    The pattern "x?y*z" matches the string "xaylmz":

    - '?' matches 'a'

    - '*' matches "lm"

    - 'z' matches 'z'

Example 2

    Input: str = "xyza", pat = "x*z"

    Output: false

    Explanation: 

    The pattern "x*z" does not match the string "xyza" because there is an extra 'a' at the end of the string that is not matched by the pattern.


# Constraints

    0 <= length of(str, pattern) <= 200
*/


// Solution
class Solution {
    wildCardRecursive(s, p, i, j, dp){
        if(i == s.length && j == p.length ){
            return true;
        }
        if(i == s.length){
            let onlyStars = true;
            while(j < p.length){
                if(p[j] != '*'){
                    onlyStars = false;
                }
                j++;
            }
            return onlyStars;
        }
        if(j == p.length){
            return false;
        }
        if(dp[i][j] != -1){
            return dp[i][j];
        }
        if(s[i] == p[j] || p[j] == '?'){
            return dp[i][j] = this.wildCardRecursive(s, p, i+1, j+1, dp);
        }else if(p[j] == '*'){
            // 2 choices 
            // 1. take nothing from s and move ahead in pattern
            // 2. select a charcater and move on to next character in s
            return dp[i][j] = this.wildCardRecursive(s, p, i, j+1, dp) || this.wildCardRecursive(s, p, i+1, j, dp);
        }else{
            return  dp[i][j] = false;
        }
    }
    wildCard(str, pat) {
        let m = str.length, n = pat.length;
        let dp = Array.from({length: m}, ()=> new Array(n).fill(-1))
        return this.wildCardRecursive(str, pat, 0, 0, dp)
    }
}




/*
# Complexity Analysis

Time Complexity
    O(m*n) where m is the length of str and n is the length of pat, as each cell in the dp table is computed once. The initial loop in the base case iterates at most n times, but does not increase total complexity.

Space Complexity
    O(m*n) for the dp table, plus O(m+n) for the recursion stack depth.
*/


// Solution II
class Solution {
    wildCardTabulation(s, p){
        let m = s.length, n = p.length;
        let dp = Array.from({length: m+1}, ()=> new Array(n+1).fill(false))

        dp[m][n] = true;

        for(let j = n-1; j >=0 ; j--){
            if(p[j] != '*'){
                break;
            }
            dp[m][j] = true;
        }

        for(let i = m-1; i>= 0 ; i--){
            for(let j = n-1; j>=0 ; j--){
                if(s[i] == p[j] || p[j] == '?'){
                    dp[i][j] = dp[i+1][j+1]
                }else if(p[j] == '*'){
                    dp[i][j] = dp[i][j+1] ||  dp[i+1][j];
                }else{
                    dp[i][j] = false;
                }
            }
        }
        return dp[0][0]
    }
    wildCard(str, pat) {
        return this.wildCardTabulation(str, pat);
    }
}
