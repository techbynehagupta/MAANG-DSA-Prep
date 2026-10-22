/*
# Problem Statement:
    Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.

    

    Example 1:

    Input: target = 7, nums = [2,3,1,2,4,3]
    Output: 2
    Explanation: The subarray [4,3] has the minimal length under the problem constraint.
    Example 2:

    Input: target = 4, nums = [1,4,4]
    Output: 1
    Example 3:

    Input: target = 11, nums = [1,1,1,1,1,1,1,1]
    Output: 0
    

    Constraints:

    1 <= target <= 10^9
    1 <= nums.length <= 10^5
    1 <= nums[i] <= 10^4
*/


/*
# Intuition
1. we take two pointers left and right,
2. we keep on expanding right till the sum becomes >= target
3. whenever sum becomes >= target we save the min length
4. sum becomes > target, shrink the window until sum becomes < target, while shrinking is sum becomes >= target update the min length as well

*/


// Solution
var minSubArrayLen = function(target, nums) {
    let left =0;
    let sum =0, minLength = Infinity;
    for(let right = 0; right < nums.length; right++){
        sum += nums[right];
        while(sum >= target){
            minLength = Math.min(minLength, right-left+1);
            sum-= nums[left];
            left++;
        }
    }
    return minLength == Infinity ? 0: minLength;
};




/*
# Complexity Analysis
    TC- O(n)
    SC- O(1)
*/