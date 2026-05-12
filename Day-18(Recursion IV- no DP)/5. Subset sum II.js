/*
# Problem Statement:
    Given an integer array nums, which can have duplicate entries, provide the power set.
    Duplicate subsets cannot exist in the solution set. Return the answer in any sequence.


Example 1

    Input : nums = [1, 2, 2]

    Output : [ [ ] , [1] , [1, 2] , [1, 2, 2] , [2] , [2, 2] ]

Example 2

    Input : nums = [1, 2]

    Output : [ [ ], [1] , [2] , [1, 2] ]


Constraints

    1 <= nums.length <= 10
    -10 <= nums[i] <= 10

*/


/*

# Intuition
For this problem refer to combination sum II problem and try to come up with your own solution
*/


// Solution

class Solution {
    _subsetSumsHelper(nums, i, currSet, result){
        if(i == nums.length){
            result.push([...currSet]);
            return;
        }
        currSet.push(nums[i]);
        this._subsetSumsHelper(nums, i+1, currSet , result);
        currSet.pop(nums[i]);
        while(nums[i] == nums[i+1]){
            i++;
        }
        this._subsetSumsHelper(nums, i+1, currSet, result);
    }
    subsetsWithDup(nums) {
        let result = [];
        nums.sort((a,b)=>a-b);
        this._subsetSumsHelper(nums, 0, [], result);
        return result;
    }
}

/*
# Complexity Analysis

Time Complexity
    O(2^n) because the algorithm explores the decision tree of subsets where each element is either included or excluded; the sorting takes O(n log n), but the recursive generation dominates as it explores 2^n branches in the worst case where all elements are unique.

Space Complexity
    O(n) because the recursion depth of the helper function is equal to the number of elements in nums, which determines the maximum size of the call stack and the space used to store the current subset.

*/