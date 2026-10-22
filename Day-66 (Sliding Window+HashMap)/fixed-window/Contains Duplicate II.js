/*
# Problem Statement:
Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.

 

Example 1:

Input: nums = [1,2,3,1], k = 3
Output: true
Example 2:

Input: nums = [1,0,1,1], k = 1
Output: true
Example 3:

Input: nums = [1,2,3,1,2,3], k = 2
Output: false
 
*/


/*
# Intuition

we have to see if any window with size. = 1 to k+1 contains any duplicate element
map contain count >2 in this window size then return true
*/


// Solution
var containsNearbyDuplicate = function(nums, k) {
    let map = new Map();
    let n = nums.length;
    for(let i=0; i <= Math.min(k, n-1); i++){
        map.set(nums[i], (map.get(nums[i]) || 0)+1);
        if(map.get(nums[i]) > 1){
            return true;
        }
    }
    for(let right = k+1; right < nums.length; right++){
        // remove from window
        let left = right- (k+1);
        map.set(nums[left], map.get(nums[left])-1);
        map.set(nums[right],(map.get(nums[right]) || 0) +1);

        if(map.get(nums[right]) > 1){
            return true;
        }
    }
    return false;
};




/*
# Complexity Analysis
TC - O(n)
SC - O(m), where m is the unique values in window of size k+1
*/