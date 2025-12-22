/*
# Problem Description

    Given an array A of length N, your task is to find the maximum possible sum of any non-empty contiguous subarray.

    In other words, among all possible subarrays of A, determine the one that yields the highest sum and return that sum.



# Problem Constraints

    1 <= N <= 106
    -1000 <= A[i] <= 1000



# Input Format

    The first and the only argument contains an integer array, A.



# Output Format

    Return an integer representing the maximum possible sum of the contiguous subarray.



# Example Input

    Input 1:
    A = [1, 2, 3, 4, -10] 
    
    Input 2:
    A = [-2, 1, -3, 4, -1, 2, 1, -5, 4] 


# Example Output

    Output 1:
    10 

    Output 2:
    6 


# Example Explanation

    Explanation 1:
    The subarray [1, 2, 3, 4] has the maximum possible sum of 10. 

    Explanation 2:
    The subarray [4,-1,2,1] has the maximum possible sum of 6. 
*/

// Solution by Kadane's Algorithm
function maxContigiousSubarray(A){
    let maxSum = Number.NEGATIVE_INFINITY;
    let sum =0;
    for(let i=0; i< A; i++){
        sum = sum+A[i];
        maxSum = Math.max(maxSum, sum);
        if(sum < 0){
            sum = 0;
        }
    }
}


// Time Complexity - O(n)
// Space Complexity  - O(1)

