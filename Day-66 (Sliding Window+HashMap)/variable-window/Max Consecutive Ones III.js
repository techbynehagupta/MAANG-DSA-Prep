/*
# Problem Statement:
Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.

 

Example 1:

Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: [1,1,1,0,0,1,1,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
Example 2:

Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
Output: 10
Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
 

Constraints:

1 <= nums.length <= 105
nums[i] is either 0 or 1.
0 <= k <= nums.length
*/


/*
# Intuition

Brute Force - Find all the subarrays and then calculate valid subarray with k zero 

Optimised using variable sliding window
1. Take 2 left = 0, right = 0
2. update right if current value is 1 or if curret value is 0 and k > 0
3. if currentvalue is 0 and k =0 then count the window size
4. Now shrink the window from left hand side till k becomes atleast 1 so that we can cater to this current zero
in our window

Sliding Format 
1. Add current value to window
2. Validate window
3. Calculate minimum and largest

*/


// Solution
var longestOnes = function(nums, k) {
    let left = 0;
    let maxWindowSize = 0;
    let zeroCount = 0;
    for(let right = 0; right < nums.length; right++){
        // add current value to window
        if(nums[right] == 0){
            zeroCount++;
        }
        // check for invalid winodw
       while(zeroCount > k){
        if(nums[left] == 0){
            zeroCount--;
        }
        left++;
       }
       // calculate window
       maxWindowSize = Math.max(maxWindowSize, right-left+1);
    }
    return maxWindowSize;
};



/*
# Complexity Analysis
    TC - O(n)
    SC- O(1)
*/