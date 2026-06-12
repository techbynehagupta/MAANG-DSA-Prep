/*
# Problem Statement:
    Given an array of nums of n integers. Every integer in the array appears twice except one integer. Find the number that appeared once in the array.


Example 1

    Input : nums = [1, 2, 2, 4, 3, 1, 4]

    Output : 3

    Explanation : The integer 3 has appeared only once.

Example 2

    Input : nums = [5]

    Output : 5

    Explanation : The integer 5 has appeared only once.


# Constraints

    1 <= n <= 105
    -3*105 <= nums[i] <= 3*105
*/


/*
# Intuition
    [a,a, b, c, b]
    xor = a ^ a ^ b ^ c ^ b
    xor = (a ^ a ) ^ (b ^ b) ^ c
    and we know a ^ a = 0
    xor = c
*/


// Solution
class Solution {
    singleNumber(nums) {
        let ans= 0;
        for(let el of nums){
            ans =  ans ^ el;
        }
        return ans;
    }
}

/*
# Complexity Analysis

Time Complexity
    O(n) where n is the length of the nums array, as the loop iterates through each element exactly once.

Space Complexity
    O(1) because the space complexity remains constant as only one integer variable 'ans' is used regardless of the input size.
*/