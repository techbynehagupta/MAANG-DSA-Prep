/*
# Problem Statement:
Given a positive integer n. Find and return its square root. If n is not a perfect square, then return the floor value of sqrt(n).


Example 1

    Input: n = 36

    Output: 6

    Explanation: 6 is the square root of 36.

Example 2

    Input: n = 28

    Output: 5

    Explanation: The square root of 28 is approximately 5.292. So, the floor value will be 5.

# Constraints

 0 <= n <= 231 - 1
*/

// Solution
class Solution {
    binarySearch(n){
        if(n==1 || n ==0){
            return n;
        }
        let start =1, end = n/2;
        let lowerbound = -1;
        while(start<= end){
            let mid = start + Math.floor((end-start)/2);
            let square = mid*mid;
            if(square == n){
                return mid;
            }
            else if(mid*mid > n){
                end = mid-1;
            }else{
                lowerbound = mid;
                start = mid+1;
            }
        }
        return lowerbound;
    }
    floorSqrt(n) {
      return this.binarySearch(n)
    }
}

/*
# Complexity Analysis

Time Complexity
    O(log n) because the algorithm performs a binary search on the range [1, n/2], halving the search space in each iteration of the while loop.

Space Complexity
    O(1) because the algorithm uses a fixed number of integer variables (start, end, mid, lowerbound, square) regardless of the size of the input n.
*/