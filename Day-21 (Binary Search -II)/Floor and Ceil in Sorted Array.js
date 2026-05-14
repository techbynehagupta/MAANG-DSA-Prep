/*
# Problem Statement:
Given a sorted array nums and an integer x. Find the floor and ceil of x in nums. The floor of x is the largest element in the array which is smaller than or equal to x. The ceiling of x is the smallest element in the array greater than or equal to x. If no floor or ceil exists, output -1.


Example 1

    Input : nums =[3, 4, 4, 7, 8, 10], x= 5

    Output: 4 7

    Explanation: The floor of 5 in the array is 4, and the ceiling of 5 in the array is 7.

Example 2

    Input : nums =[3, 4, 4, 7, 8, 10], x= 8

    Output: 8 8

    Explanation: The floor of 8 in the array is 8, and the ceiling of 8 in the array is also 8.

Example 3

    Input : nums = [2, 4, 6, 8, 10, 12, 14], x= 1

    Output:
    [-1, 2]

# Constraints

  1 <= nums.length <= 105 
  0 < nums[i], x < 105 
  nums is sorted in ascending order.
*/


/*
# Intuition

1. It's the mix of upperbound and lowerbound where you need to find largest value <= target and smallest value >= target
*/


// Solution
class Solution {
    findFloorAndCeil(nums, x){
        let start = 0, end = nums.length-1;
        let floor = -1, ceil= -1;
        while(start <= end){
           let mid = start + Math.floor((end-start)/2);
           if(nums[mid] == x){
                floor = mid;
                ceil = mid;
                return [nums[floor], nums[ceil]];
           }else if(nums[mid] < x){
                floor = mid;
                start = mid+1;
            }else{
                ceil = mid;
                end = mid-1;
            }
        }
        if(floor != -1 && ceil != -1){
            return [nums[floor], nums[ceil]];
        }
        return floor == -1 ? [floor, nums[ceil]]: [nums[floor], ceil];
    }
    getFloorAndCeil(nums, x) {
        return this.findFloorAndCeil(nums, x);
    }
}

/*
# Complexity Analysis
 Same as earlier - Binary Search I
*/