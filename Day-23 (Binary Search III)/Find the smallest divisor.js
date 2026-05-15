/*
# Problem Statement:
    Given an array of integers nums and an integer limit as the threshold value, find the smallest positive integer divisor such that upon dividing all the elements of the array by this divisor, the sum of the division results is less than or equal to the threshold value.
    After dividing each element by the chosen divisor, take the ceiling of the result (i.e., round up to the next whole number).


Example 1

    Input: nums = [1, 2, 3, 4, 5], limit = 8

    Output: 3

    Explanation: We can get a sum of 15(1 + 2 + 3 + 4 + 5) if we choose 1 as a divisor. 

    The sum is 9(1 + 1 + 2 + 2 + 3) if we choose 2 as a divisor. Upon dividing all the elements of the array by 3, we get 1,1,1,2,2 respectively. Now, their sum is equal to 7 <= 8 i.e. the threshold value. So, 3 is the minimum possible answer.

Example 2

    Input: nums = [8,4,2,3], limit = 10

    Output: 2

    Explanation: If we choose 1, we get 17 as the sum. If we choose 2, we get 9 (4+2+1+2) <= 10 as the answer. So, 2 is the answer.



# Constraints

    1 <= nums.length <= 5 * 104
    1 <= nums[i] <= 106
    nums.length <= limit <= 106
*/


/*
# Intuition
    1. Identify the smallest and largest integer, smallest would be 1 and largest would be the maxium value of array, as when divided it'll make all number zero except the last one, for boundary case we can take max no. in array +1
    2. Now apply binary search as we'll be checking from smallest to largets and most optimal solution is in O(logn)
    3. Each time we have to check, that if we select mid as divisor then what is the sum coming after dividing each no. with our mid
    4. If we get sum that is <= limit, we can reduce our search space from small to mid-1 as we already have an answer but need to select the minimum one
*/


// Solution
class Solution {
    smallestDivisor(nums, limit) {
        let start = 1, end = Math.max(...nums);
        let result = limit;
        while(start <= end){
            let mid = start + Math.floor((end-start)/2);
            let sum = nums.reduce((acc, el)=> acc + Math.ceil(el/mid), 0);
            if(sum <= limit){
                result = mid;
                end = mid-1;
            }else{
                start = mid+1;
            }
        }
        return result;
    }
}

/*
# Complexity Analysis

Time Complexity
    O(n log m) where n is the length of nums and m is the maximum value in nums, because the binary search performs log(m) iterations and each iteration performs a reduce operation of O(n) plus a Math.max call of O(n).

Space Complexity
    O(1) because we only store a fixed number of integer variables regardless of input size, and the reduce function is computed in-place without creating additional data structures.
*/