/*
# Problem Statement:
A monkey is given n piles of bananas, where the 'ith' pile has nums[i] bananas. An integer h represents the total time in hours to eat all the bananas.
Each hour, the monkey chooses a non-empty pile of bananas and eats k bananas. If the pile contains fewer than k bananas, the monkey eats all the bananas in that pile and does not consume any more bananas in that hour.
Determine the minimum number of bananas the monkey must eat per hour to finish all the bananas within h hours.


Example 1

    Input: n = 4, nums = [7, 15, 6, 3], h = 8

    Output: 5

    Explanation: If Koko eats 5 bananas/hr, he will take 2, 3, 2, and 1 hour to eat the piles accordingly. So, he will take 8 hours to complete all the piles.  

Example 2

    Input: n = 5, nums = [25, 12, 8, 14, 19], h = 5

    Output: 25

    Explanation: If Koko eats 25 bananas/hr, he will take 1, 1, 1, 1, and 1 hour to eat the piles accordingly. So, he will take 5 hours to complete all the piles.

# Constraints

  1 <= n <= 104
  n <= h <= 109
  1 <= nums[i] <= 109
*/


/*
# Intuition
* Same as finding smallest divisor, please refer to that problem
*/


// Solution
class Solution {
    minimumRateToEatBananas(nums, h) {
        let start = 1, end = Math.max(...nums);
        let res = h;
        while(start <= end){
            let k = start + Math.floor((end-start)/2);
            let hours = nums.reduce((acc, el)=>{
                return acc + Math.ceil(el/k);
            }, 0)
            if(hours <= h){
                res = k;
                end = k-1;
            }else{
                start = k+1
            }
        }
        return res;
    }
}


/*
# Complexity Analysis

Time Complexity
    O(n * log(max(nums))) where n is the length of nums, because Math.max(...nums) and the reduce function take O(n) and the binary search runs for log(max(nums)) iterations.

Space Complexity
    O(1) because the variables start, end, res, k, and hours use constant extra space regardless of the input size.

*/