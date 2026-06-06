/*
# Problem Statement:
    Given a string s, partition s such that every substring of the partition is a palindrome.Return the minimum cuts needed for a palindrome partitioning of s.


Example 1

    Input : s = "aab"

    Output : 1

    Explanation : The palindrome partitioning ["aa", "b"] could be produced using 1 cut.

Example 2

    Input : s = "abaaba"

    Output : 0

    Explanation : The complete string can be considered as a partition as the string itself is palindrome.

    There are other ways to partition the string but it requires more number of cuts.


# Constraints

    1 <= s.length <= 2000
    s consist of only lowercase English letters
*/


/*
# Intuition
    We need to divide the string into the minimum number of cuts such that every part becomes a palindrome.
    For every substring s[i...j], if it is already a palindrome, no cut is needed, so we return 0.
    Otherwise, we try every possible partition point k between i and j.
    We only make a cut after k if the left part s[i...k] is a palindrome, because that gives us one valid palindrome partition.
    The answer is 1 + minimum cuts needed for the remaining right part, and dp[i][j] stores already solved substrings to avoid recalculating them.
*/


// Solution I (2D- DP)
// 2- d dp
class Solution {
    minCutMemo(s, i, j, dp) {
      if (i >= j) {
        return 0;
      }
  
      if (dp[i][j] != -1) {
        return dp[i][j];
      }
  
      if (this.checkPalindrome(s, i, j)) {
        return (dp[i][j] = 0);
      }
  
      let totalCuts = Infinity;
      for (let k = i; k <= j - 1; k++) {
        let isPlaindrome = this.checkPalindrome(s, i, k);
        if (!isPlaindrome) {
          continue;
        }
        let cuts =
          1 + this.minCutMemo(s, i, k, dp) + this.minCutMemo(s, k + 1, j, dp);
        totalCuts = Math.min(totalCuts, cuts);
      }
      return (dp[i][j] = totalCuts == Infinity ? 0 : totalCuts);
    }
  
    checkPalindrome(str, i, j) {
      while (i < j) {
        if (str[i] != str[j]) {
          return false;
        }
        i++;
        j--;
      }
      return true;
    }
  
    minCut(s) {
      let n = s.length;
      let dp = Array.from({ length: n }, () => new Array(n).fill(-1));
      return this.minCutMemo(s, 0, n - 1, dp);
    }
  }



/*
# Complexity Analysis

Time Complexity
    O(n^3) where n is the length of string s. The DP table has n^2 states. For each state, the loop runs O(n) times and inside the loop, the palindrome check takes O(n), resulting in O(n^3) total complexity.

Space Complexity
    O(n^2) due to the memoization table of size n x n, plus O(n) space on the recursion call stack.
*/


// Solution II (1D-DP)

// 1D dp
class Solution {
    minCutMemo(s, i, dp, pal) {
      if (i == s.length) {
        return 0;
      }
  
      if (dp[i] != -1) {
        return dp[i];
      }
  
      let totalCuts = Infinity;
      for (let j = i ; j < s.length ; j++) {
        if(pal[i][j]){
          totalCuts = Math.min(totalCuts, 1+ this.minCutMemo(s, j+1, dp, pal))
        }
      }
      return (dp[i] = totalCuts == Infinity ? 0 : totalCuts);
    }
  
    checkPalindrome(s, pal) {
      let n = s.length;
      for(let i= 0; i< n; i++){
          pal[i][i] = true;
      }
      for(let i = n-1; i>=0 ; i--){
          for(let j = i; j < n ; j++){
              pal[i][j] = s[i] == s[j] ?  pal[i+1][j-1] : false;
          }
      }
      return pal;
    }
  
    minCut(s) {
      let n = s.length;
      let pal = Array.from({length: n+1}, ()=> new Array(n+1).fill(-1));
  
      this.checkPalindrome(s, 0, n-1, pal);
      let dp = new Array(n).fill(-1);
      return this.minCutMemo(s, 0, dp, pal);
    }
  }

/*
Complexity Analysis

Time Complexity
    O(n^3) - The state space is O(n^2), and for each state, we iterate up to O(n) in the loop combined with an O(n) checkPalindrome call inside the loop, resulting in O(n^3) overall complexity.

Space Complexity
    O(n^2) - The DP table requires O(n^2) space to store results for every substring (i, j), and the recursion stack can go up to O(n) depth.
*/