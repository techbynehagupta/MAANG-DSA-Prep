/*

# Problem Statement:
    Given an array nums of n integers. Return array of sum of all subsets of the array nums.
    Output can be returned in any order.


Example 1

    Input : nums = [2, 3]

    Output : [0, 2, 3, 5]

    Explanation :

    When no elements is taken then Sum = 0.

    When only 2 is taken then Sum = 2.

    When only 3 is taken then Sum = 3.

    When element 2 and 3 are taken then sum = 2+3 = 5.

Example 2

    Input : nums = [5, 2, 1]

    Output : [0, 1, 2, 3, 5, 6, 7, 8]

    Explanation :

    When no elements is taken then Sum = 0.

    When only 5 is taken then Sum = 5.

    When only 2 is taken then Sum = 2.

    When only 1 is taken then Sum = 1.

    When element 2 and 1 are taken then sum = 2+1 = 3.
    */

/*
# Intiution
    For intuition refer previous problem and try to solve this on you own
*/
// Solution
class Solution {
    _subsetSumsHelper(nums, i, sum, result){
        if(i == nums.length){
            result.push(sum);
            return;
        }
        this._subsetSumsHelper(nums, i+1, sum + nums[i], result);
        this._subsetSumsHelper(nums, i+1, sum, result);
    }
    subsetSums(nums) {
        let result = [];
        this._subsetSumsHelper(nums, 0, 0, result);
        return result;
    }
}



/*
# Complexity Analysis

    Time Complexity
        O(2^n) because the recursive function branches into two calls for each element in the input array of size n, forming a binary recursion tree with 2^(n+1) - 1 total nodes.

    Space Complexity
        O(n) because the recursion stack depth reaches n, and the auxiliary space for the result array is O(2^n) to store all possible subset sums.
*/