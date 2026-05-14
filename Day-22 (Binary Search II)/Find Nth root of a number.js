/*
# Problem Statement:
Given two numbers N and M, find the Nth root of M. The Nth root of a number M is defined as a number X such that when X is raised to the power of N, it equals M. If the Nth root is not an integer, return -1.


Example 1

    Input: N = 3, M = 27

    Output: 3

    Explanation: The cube root of 27 is equal to 3.

Example 2

    Input: N = 4, M = 69

    Output:-1

    Explanation: The 4th root of 69 does not exist. So, the answer is -1.

Example 3

    Input: N = 4, M = 81

    Output: 3

# Constraints

  1 <= N <= 30
  1 <= M <= 109

*/


/*

# Intuition
Why m/n ?

Sice we're looking for nth root of a number it can never be bigger than m/n as like we're doing n pieces of m but still 1/n piece would still be biiger than sqrt(m, n)
ex- 3^4 = 81

*/


// Solution
class Solution {
    binarySearch(n, m){
       if(m==1 || m ==0){
           return m;
       }
       let start =1, end = Math.ceil(m/n);
       let lowerbound = -1;
       while(start<= end){
           let mid = start + Math.floor((end-start)/2);
           let pow = Math.pow(mid, n);
           if(pow == m){
               return mid;
           }
           else if(pow > m){
               end = mid-1;
           }else{
               start = mid+1;
           }
       }
       return lowerbound;
   }
   NthRoot(n, m) {
     return this.binarySearch(n, m);
   }
}



/*
# Complexity Analysis

Time Complexity
    O(log(m/n)) because the binary search range is [1, m/n], and each iteration halves the search space.

Space Complexity
    O(1) because only a fixed number of integer variables are used regardless of input size.
*/