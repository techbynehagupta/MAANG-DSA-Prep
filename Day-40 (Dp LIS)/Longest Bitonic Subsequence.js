/*
# Problem Statement:
    Given an array arr of n integers, the task is to find the length of the longest bitonic sequence. A sequence is considered bitonic if it first increases, then decreases. The sequence does not have to be contiguous.


Example 1

    Input: arr = [5, 1, 4, 2, 3, 6, 8, 7]

    Output: 6

    Explanation: The longest bitonic sequence is [1, 2, 3, 6, 8, 7] with length 6.

Example 2

    Input: arr = [10, 20, 30, 40, 50, 40, 30, 20]

    Output: 8

    Explanation: The entire array is bitonic, increasing up to 50 and then decreasing.


# Constraints

    1 <= arr.length <= 103
    -106<= arr[i] <= 106
*/


/*
# Intuition

    1. A Bitonic Subsequence first increases and then decreases.
    2. For every index i, calculate:
    - LIS[i] = Longest Increasing Subsequence ending at i.
    - LDS[i] = Longest Decreasing Subsequence starting from i.
    3. Consider each index as the peak of the bitonic sequence.
    4. The length of the bitonic sequence with peak at i is:
        LIS[i] + LDS[i] - 1
    (-1 because the peak element is counted twice).
    5. Compute this value for every index and return the maximum length obtained.
*/


// Solution
class Solution {
    LongestBitonicSequence(arr) {
        let n = arr.length;
        let LIS = new Array(n).fill(1);
        let LDS = new Array(n).fill(1);

        for(let i = 1; i < n ; i++){
            for(let j = 0; j < i; j++){
                if(arr[j] < arr[i] && LIS[j] +1 > LIS[i]){
                    LIS[i] = LIS[j] + 1;
                }
            }
        }

        for(let i = n-2; i >= 0  ; i--){
            for(let j = n-1; j > i ; j--){
                if(arr[i] > arr[j] && LDS[j] + 1 > LDS[i]){
                    LDS[i] = LDS[j] + 1;
                }
            }
        }
        let max = 1;
        for(let i=0; i < n ; i++){
            if(max < LDS[i] + LIS[i]-1){
                max = LDS[i] + LIS[i]-1;
            }
        }
        return max;
    }
}

/*
# Complexity Analysis

Time Complexity
    O(n^2) because of two nested loops for LIS, two nested loops for LDS, and one single loop for the final calculation, resulting in 2*(n^2/2) + n operations.

Space Complexity
    O(n) because of the allocation of two arrays, LIS and LDS, each of size n, plus the initialization overhead for these arrays.
*/