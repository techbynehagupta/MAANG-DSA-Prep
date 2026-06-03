/*
# Problem Statement:
    Given an integer array nums, return the length of the longest strictly increasing subsequence.
    A subsequence is a sequence derived from an array by deleting some or no elements without changing the order of the remaining elements. For example, [3, 6, 2, 7] is a subsequence of [0, 3, 1, 6, 2, 2, 7].
    The task is to find the length of the longest subsequence in which every element is greater than the previous one.


Example 1

    Input: nums = [10, 9, 2, 5, 3, 7, 101, 18]

    Output: 4

    Explanation: The longest increasing subsequence is [2, 3, 7, 101], and its length is 4.

Example 2

    Input: nums = [0, 1, 0, 3, 2, 3]

    Output: 4

    Explanation: The longest increasing subsequence is [0, 1, 2, 3], and its length is 4


# Constraints

    1 <= nums.length <= 105
    -106 <= nums[i] <= 106
*/


/*
# Intuition
    1. Intition is again same whether to take the element to form LIS or not
*/


// Solution I - Recursion
class Solution {
    LISRecursive(nums, i, prevInd){
       if(nums.length == i){
           return 0;
       }

       let take = 0;
       if( prevInd == -1 || nums[prevInd] < nums[i]){
           take = 1 + this.LISRecursive(nums, i+1, i);
       }
       let notTake = this.LISRecursive(nums, i+1, prevInd);
       return Math.max(take, notTake);
   }
   LIS(nums) {
      return this.LISRecursive(nums, 0, -1)
   }
}


/*
# Complexity Analysis

Time Complexity - O(2^n)
    As for every element we have 2 options either to take it or not, so recusive tree will gro exponentially

Space Complexity - O(n) -Space for Auxiallry recursion stack
*/


// Solution II - Tabulation 
class Solution {
    LISTabulation(nums){
        let n = nums.length;
        let dp = new Array(n).fill(1);

        let max = 0;
        for(let i = n-1; i >= 0 ; i--){
            for(let j = i+1; j < n ; j++){
                if(nums[i] < nums[j]){
                    dp[i] = Math.max(dp[i], dp[j]+1);
                }
            }
            max = Math.max(max, dp[i]);
        }
        return max;
    }
    LIS(nums) {
      return this.LISTabulation(nums)
    }
}

/*
# Complexity Analysis

Time Complexity - O(n^2)
    As both is running till n and for every i, j runs from i to n

Space Complexity - O(n) - Space for dp size
*/


// Solution III - Space Optimised using Binary Search

/*
    Intutition
    1. If we can just find LIS and 
        a. If the next element coming in LIS is greater than last element we push it
        b. If not and its middle element, we can find its upperbound and replace it with it, so that in one sequence we're considing all the sequences


    Ex - [2, 1, 4, 5, 3, 7], LIS = []
        1. First element add it to LIS = [2]
        2. for i = 1, arr[i] = 1, which is < last added element (1< 2) so find the upperbound of 1 in the LIS and replace it, LIS = [1]
        3. arr[i] = 4, LIS = [1], 1 < 4 push it in LIS = [1, 4]
        4. arr[i] = 5, 4 < 5 LIS = [1, 4, 5]
        5. arr[i] = 3, now 3 belongs btw the subsequence find its upperbound, i,e, 4 and replace it [1, 3, 5]
        6. arr[i] = 7, LIS = [1, 3, 5, 7]

*/

class Solution {
    findUpperBound(arr, target){
        let start = 0, end = arr.length-1;
        let upperBound = -1;
        while(start <= end){
            let mid = start + Math.floor((end-start)/2);
            if(arr[mid] >= target){
                upperBound = mid;
                end = mid-1;
            }else{
                start = mid+1;
            }
        }
        return upperBound;
    }
    LISDPSpaceOptimised(nums){
        // using binary search
        let n = nums.length;
        let arr = [nums[0]];

        for(let i=1; i < n ; i++){
            let pos = this.findUpperBound(arr, nums[i]);
            if(pos == -1){
                arr.push(nums[i]);
            }else{
                arr[pos] = nums[i];
            }
        }
        return arr.length;
    }
    LIS(nums) {
      return this.LISDPSpaceOptimised(nums);
    }
}