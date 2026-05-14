/*
# Problem Statement:
Given an array nums sorted in non-decreasing order. Every number in the array except one appears twice. Find the single number in the array.


Example 1

    Input :nums = [1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6]

    Output:4

    Explanation: Only the number 4 appears once in the array.

Example 2

    Input : nums = [1, 1, 3, 5, 5]

    Output:3

    Explanation: Only the number 3 appears once in the array.

# Constraints

  n == nums.length
  1 <= n <= 104
  -104 <= nums[i] <= 104
*/


/*

# Intuition

1. Find mid check if mid is not the first or last value, otherwise that is the only answer otherwise mid would never have reached there
    
2. If mid is same as previous value 
    2.1is at odd position then no. woould be missing from right as [1,1,2,2,3] as we're stating from 
0-based indexing so each pair would be at even-odd position like (0-1)(2-3) 
    2.2 if at even position which can only be possible if no. is missing from left

3. If mid is similar as next value 
    3.1 mid at even then no. at right following same above logic
    4. if at odd then at left
4. If mid doesn't match with previous or next then that is the answer

*/


// Solution
class Solution {
    modifiedBS(nums){
        let n = nums.length;
        let s = 0, e = n-1;
        while(s<=e){
            let m = s + Math.floor((e-s)/2);
                if(m == 0 && m == n-1){
                    return nums[m];
                }
                // not first or last element
                if(nums[m-1] == nums[m]){
                    if(m%2 != 0){
                        // non-duplicated number lies on right
                        s = m+1;
                    }else{
                        // else on left
                        e = m-1;
                    }
                }else if(nums[m] == nums[m+1]){
                    if(m%2 == 0){
                        // right singleNonDuplicate
                        s = m+1;
                    }else{
                        e = m-1
                    }
                }else{
                    // if not matches with either front or back
                    return nums[m];
                }    
        }
    }
    singleNonDuplicate(nums){
        return this.modifiedBS(nums)
    }
}
