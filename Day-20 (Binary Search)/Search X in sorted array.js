/*
# Problem Statement:
    Given a sorted array of integers nums with 0-based indexing, find the index of a specified target integer. If the target is found in the array, return its index. If the target is not found, return -1.


Example 1

    Input: nums = [-1,0,3,5,9,12], target = 9

    Output: 4

    Explanation: The target integer 9 exists in nums and its index is 4

Example 2

    Input: nums = [-1,0,3,5,9,12], target = 2

    Output: -1

    Explanation: The target integer 2 does not exist in nums so return -1

# Constraints
    1 <= nums.length <= 105
    -105 < nums[i], target < 105
    nums is sorted in ascending order.

*/


/*
# Intuition
1. Find mid of an array , if mid is equal to our target we return it
2. if our target is bigger than middle element then we shrink the array from middle+! to end 
3. Else we shring array to first half from start to mid-1
*/


// Solution
class Solution {
    binarySearch(nums, target){
        let start = 0, end = nums.length-1;
        while(start <= end){
            let mid = start + Math.floor((end-start)/2);
            if(nums[mid] == target){
                return mid;
            }else if(nums[mid] > target){
                // go to left side
                end = mid-1;
            }else{
                start = mid+1;
            }
        }
        return -1;
    }
    search(nums, target) {
       return this.binarySearch(nums, target);
    }
}




/*
# Complexity Analysis

Time Complexity
    O(log n) where n is the number of elements in nums, because the search space is halved in each iteration of the while loop.

Space Complexity
    O(1) because only a constant amount of extra space is used for variables (start, end, mid), and the algorithm performs no recursion or allocation proportional to n
*/