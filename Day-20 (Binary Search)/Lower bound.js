/*
# Problem Statement:
Given a sorted array of nums and an integer x, write a program to find the lower bound of x.
The lower bound algorithm finds the first and smallest index in a sorted array where the value at that index is greater than or equal to a given key i.e. x.

If no such index is found, return the size of the array.


Example 1

    Input : nums= [1,2,2,3], x = 2

    Output:1

    Explanation:

    Index 1 is the smallest index such that arr[1] >= x.

Example 2

    Input : nums= [3,5,8,15,19], x = 9

    Output: 3

    Explanation:

    Index 3 is the smallest index such that arr[3] >= x.

*/


/*
# Intuition
1. Modify the binary search to always store lowerbound while shrinking the array
to first half
As when shrinking to first half the mid will always be >= target, thus it'll always store the 
smallest value which is greater or equal to the target
*/


// Solution
class Solution {
    findLowerBound(nums, target){
        let start = 0, end = nums.length-1;
        let lowerBound = nums.length;
        while(start <= end){
            let mid = start + Math.floor((end-start)/2);
            if(nums[mid] < target){
                start = mid+1;
            }else{
                lowerBound = mid;
                end = mid-1;
            }
        }
        return lowerBound;
    }
    lowerBound(nums, x) {
      return this.findLowerBound(nums, x)
    }
}


/*
# Complexity Analysis

Time Complexity
    O(log n) because the algorithm performs a binary search which halves the search space in each iteration of the while loop

Space Complexity
    O(1) because the algorithm uses a fixed number of variables regardless of the input size

*/