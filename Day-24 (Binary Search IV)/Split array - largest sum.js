/*
# Problem Statement:
Given an integer array a of size n and an integer k. Split the array a into k non-empty subarrays such that the largest sum of any subarray is minimized. Return the minimized largest sum of the split.


Example 1

    Input: a = [1, 2, 3, 4, 5], k = 3

    Output:6

    Explanation: There are many ways to split the array a[] into k consecutive subarrays. The best way to do this is to split the array a[] into [1, 2, 3], [4], and [5], where the largest sum among the three subarrays is only 6.

Example 2

    Input: a = [3,5,1], k = 3

    Output: 5

    Explanation: There is only one way to split the array a[] into 3 subarrays, i.e., [3], [5], and [1]. The largest sum among these subarrays is 5.

# Constraints

    1 ≤ n ≤ 104
    1 ≤ k ≤ n
    1 ≤ a[i] ≤ 104
*/


/*
# Intuition

1. The idea is to utilize the Binary Search algorithm to find the optimal solution for this problem. The search range for the problem is [max, sum], where max represents the maximum element of the array, and sum denotes the total sum of all elements in the array. This range is inherently sorted, allowing binary search to efficiently determine the appropriate half to explore in each iteration, thereby reducing the search space by half.
2. In this specific problem, the condition for eliminating one half of the search space is based on whether the number of partitions exceeds the given limit. If it does, it indicates that the current value of 'mid' is too small, so the left half is eliminated. Otherwise, the current 'mid' value is a potential answer, which is stored, and the search continues in the right half.

*/


// Solution
class Solution {
    findSplits(A, sum){
        let currSum =0;
        let splits =0;
        for(let i=0; i< A.length; i++){
            currSum += A[i];
            if(currSum > sum){
                splits++;
                currSum = A[i];
            }
        }
        if(currSum > 0){
            splits++;
        }
        return splits;
    }
    largestSubarraySumMinimized(a, k) {
        let minSum = Math.max(...a);
        let maxSum = a.reduce((acc, el)=>acc+el, 0);

        if(a.length == k){
            return minSum;
        }
        if(k == 1){
            return maxSum;
        }

        let leastSum =0;
        while(minSum <= maxSum){
            let sum = minSum + Math.floor((maxSum-minSum)/2);
            let splitCount = this.findSplits(a, sum);
            if(splitCount <= k){
                leastSum = sum;
                maxSum = sum-1;
            }else{
                minSum = sum+1;
            }
        }
        return leastSum;
    }
}

/*
# Complexity Analysis

Time Complexity: 
    O(N * (log(sum - max) + 1)), where N is the size of the array, 'sum' is the sum of all array elements, and 'max' is the maximum element in the array. This complexity arises because binary search is applied within the range [max, sum], and the countPartitions() function is invoked for each value of 'mid'. Inside the countPartitions() function, a loop iterates N times for each call.

Space Complexity: 
    As no additional space is used, so the Space Complexity is O(1).
*/