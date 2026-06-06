/*
# Problem Statement:
    Given a wooden stick of length n units. The stick is labelled from 0 to n. Given an integer array cuts where cuts[i] denotes a position you should perform a cut at. Perform the cuts in any order, you can change the order of the cuts as you wish.
    The cost of one cut is the length of the stick to be cut, the total cost is the sum of costs of all cuts. When a stick is cut, it will be split into two smaller sticks (i.e. the sum of their lengths is the length of the stick before the cut). Return the minimum total cost of the cuts.


Example 1

    Input : n = 7, cuts = [1, 3, 4, 5]

    Output : 16

    Explanation : Using cuts order = [1, 3, 4, 5] as in the input leads to the following scenario:

    The first cut is done to a rod of length 7 so the cost is 7. The second cut is done to a rod of length 6 (i.e. the second part of the first cut), the third is done to a rod of length 4 and the last cut is to a rod of length 3. The total cost is 7 + 6 + 4 + 3 = 20.

    Rearranging the cuts to be [3, 5, 1, 4] for example will lead to a scenario with total cost = 16 (as shown in the example photo 7 + 4 + 3 + 2 = 16).



Example 2

    Input : n = 7, cuts = [1, 3, 6]

    Output : 14

    Explanation : The optimal order for cutting the stick is [3, 1, 6].

    The cost will be => 7 + 3 + 4 => 14.


# Constraints

    2 <= n <= 105
    1 <= cuts.length <= min(n-1, 100)
    1 <= cuts[i] <= n - 1
    All integers in cuts array are unique.
*/


/*
# Intuition
    Every time we make a cut on a stick segment, the cost equals the current segment's length, so we want to choose the order of cuts that minimizes the total cost.
    For a segment bounded by cuts[l] and cuts[r], we try every possible cut position k between them as the first cut to perform.
    Making the cut at k divides the stick into two smaller independent segments: (l, k) and (k, r), whose minimum costs are computed recursively.
    The total cost for choosing cut k is the current segment length cuts[r] - cuts[l] plus the minimum costs of the left and right segments.
    If r - l <= 1, there are no cuts left to perform inside the segment, so the cost is 0. We evaluate all possible first cuts and return the minimum total cost.
*/


// Solution I (Memoisation)
class Solution {
    minCostMemoisation(cuts, l, r, dp){
        if(r-l <= 1){
            // if no cut possible
            return 0;
        }
        if(dp[l][r] != -1){
            return dp[l][r];
        }
        let minCostCut = Infinity;
        for(let k = l+1; k <= r-1; k++){
            let cost = cuts[r] - cuts[l] + this.minCostMemoisation(cuts, l, k, dp) + this.minCostMemoisation(cuts, k, r, dp)
            minCostCut = Math.min(minCostCut, cost);
        }
        return dp[l][r] = minCostCut;
    } 
    minCost(n, cuts) {
        cuts.sort((a,b)=>a-b);
        cuts = [0, ...cuts, n];;

        let m = cuts.length

        let dp = Array.from({length: m+1}, ()=> new Array(m+1).fill(-1));
        return this.minCostMemoisation(cuts, 0, cuts.length-1, dp);
    }
}


/*
# Complexity Analysis

Time Complexity
    O(m^3) where m is the number of cuts plus 2; sorting takes O(m log m), and the memoized function fills an m x m table where each cell takes O(m) for the loop.

Space Complexity
    O(m^2) to store the DP table of size (m+1)x(m+1), plus O(m) for the recursion stack depth.
*/

// Solution II (Tabulation)
class Solution {
    minCostTabulation(cuts, n) {
      cuts.sort((a, b) => a - b);
      cuts = [0, ...cuts, n];
  
      let m = cuts.length;
  
      let dp = Array.from({ length: m + 1 }, () => new Array(m + 1).fill(0));
  
      for (let l = m - 1; l >= 0; l--) {
        for (let r = l; r <= m; r++) {
          let minCostCut = Infinity;
          for (let k = l + 1; k <= r - 1; k++) {
            let cost = cuts[r] - cuts[l] + dp[l][k] + dp[k][r];
            minCostCut = Math.min(minCostCut, cost);
          }
          dp[l][r] = minCostCut != Infinity ? minCostCut : 0;
        }
      }
  
      return dp[0][m-1];
    }
    minCost(n, cuts) {
      return this.minCostTabulation(cuts, n);
    }
  }

/*
Complexity Analysis

Time Complexity
    O(m^3) where m is the number of cuts plus two. The sorting takes O(m log m), the initialization of the dp table takes O(m^2), and the triple-nested loops iterate over l, r, and k, each bounded by m, resulting in O(m^3).

Space Complexity
    O(m^2) where m is the number of cuts plus two. The DP table is an m+1 by m+1 matrix, requiring O(m^2) space.

*/
  