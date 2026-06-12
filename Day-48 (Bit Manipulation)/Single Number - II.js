/*
# Problem Statement:
    Given an array nums where each integer in nums appears thrice except one. Find out the number that has appeared only once.


Example 1

    Input : nums = [2, 2, 2, 3]

    Output : 3

    Explanation : The integers 3 has appeared only once.

Example 2

    Input : nums = [1, 0, 3, 0, 1, 1, 3, 3, 10, 0]

    Output : 10

    Explanation : The integers 10 has appeared only once.


# Constraints

    1 <= n <= 3*104
    -231 <= nums[i] <= 231 - 1
*/


/*
# Intuition
    1. We're going to check each bit from 0 to 32 of each number
    2. we're going to take the count of # of 1's at ith bit
    3. If a number is repeated 3 times when its ith bit will always be multiple of 3 while the number which is just coming one times will leave a as a result of %3 
        ex- [2,2,2,3, 5, 5, 5] sum of 
            - 0th bit is = 0 + 0 + 0 + 1 + 1 + 1 + 1 = 4 so 4%3 = 1 it means the number which is appaearing once contributing 1 bit at 0th position
            - 1st bit 1 + 1 + 1+ 1 + 0 + 0 + 0 = 4 same 1 bit contribution at 1st bit
            - 2nd bit 0 + 0 + 0 + 0 + 1 + 1 + 1 = 3%3 = 0 so 2nd bit contribution = 0
            - so the final number arrives as 011 i.e, 3 which is our answer

*/


// Solution
class Solution {
    singleNumber(nums) {
        let ans = 0;
        for(let i =0; i< 32; i++){
            let count =0;
            for(let j = 0; j < nums.length; j++){
                let bit = nums[j] & (1 << i);
                count +=  bit != 0 ? 1: 0;
            }

            count = count%3;
            ans += count == 1 ? (1 << i) : 0;
        }
        return ans;
    }
}

/*
# Complexity Analysis

Time Complexity
    O(32n) which simplifies to O(n), where n is the number of elements in nums, because the outer loop runs exactly 32 times and the inner loop iterates through all n elements.

Space Complexity
    O(1) because the variables ans, i, count, j, and bit occupy a constant amount of extra memory regardless of the input size.
*/