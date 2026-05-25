/*
# Problem Statement:
Given a sorted array of nums and an integer x, write a program to find the upper bound of x.
The upper bound of x is defined as the smallest index i such that nums[i] > x.
If no such index is found, return the size of the array.


Example 1

    Input : n= 4, nums = [1,2,2,3], x = 2

    Output:3

    Explanation:

    Index 3 is the smallest index such that arr[3] > x.

Example 2

    Input : n = 5, nums = [3,5,8,15,19], x = 9

    Output: 3

    Explanation:

    Index 3 is the smallest index such that arr[3] > x.

Example 3

    Input : n = 5, nums = [3,5,8,15,19], x = 3

    Output: 1

# Constraints

    1 <= nums.length <= 105
    -105 < nums[i], x < 105
    nums is sorted in ascending order.
*/


/*

# Intuition
1. Update the lowerbound function to just check for values > target not equal
*/


// Solution
class Solution {
    findUpperBound(nums, target){
        let start = 0, end = nums.length-1;
        let lowerBound = nums.length;
        while(start <= end){
            let mid = start + Math.floor((end-start)/2);
            if(nums[mid] <= target){
                start = mid+1;
            }else{
                lowerBound = mid;
                end = mid-1;
            }
        }
        return lowerBound;
    }
    upperBound(nums, x) {
       return this.findUpperBound(nums, x);
    }
}

/*
# Complexity Analysis

Time Complexity
    O(log n) because the algorithm performs a binary search by halving the search space in each iteration of the while loop.

Space Complexity
    O(1) because the algorithm only uses a fixed number of integer variables (start, end, lowerBound, mid) regardless of the input size.
*/