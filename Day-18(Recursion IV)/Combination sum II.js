/*
# Problem Statement:
    Given collection of candidate numbers (candidates) and a integer target.Find all unique combinations in candidates where the sum is equal to the target.There can only be one usage of each number in the candidates combination and return the answer in sorted order.
    e.g : The combination [1, 1, 2] and [1, 2, 1] are not unique.


Example 1

    Input : candidates = [2, 1, 2, 7, 6, 1, 5] , target = 8

    Output : [ [1, 1, 6] , [1, 2, 5] , [1, 7] , [2, 6] ]

    Explanation : The combinations sum up to target are

    1 + 1 + 6 => 8.

    1 + 2 + 5 => 8.

    1 + 7 => 8.

    2 + 6 => 8.

Example 2

    Input : candidates = [2, 5, 2, 1, 2] , target = 5

    Output : [ [1, 2, 2] , [5] ]

    Explanation : The combinations sum up to target are

    1 + 2 + 2 => 5.

    5 => 5.

# Constraints

    1 <= candidates.length <= 100
    1 <= candidates[i] <= 50
    1 <= target <= 30

*/


/*

# Intuition
    1. This problem uses backtracking to generate all possible combinations whose sum equals the target.
    2. At every index, we have 2 choices:
        Take the current number → include it in the combination and move to index + 1 (cannot reuse elements).
        Skip the current number → try the next element.
    3. Since duplicate numbers exist (like multiple 1s or 2s), we first sort the array so duplicates come together.
    4. While iterating, we skip duplicate elements at the same recursion level to avoid repeated combinations like [1,2,5] appearing multiple times.
    5. We maintain a path array to track the current combination being built.
    6. If currSum == target, we found a valid combination and store a copy of path.
    7. If currSum > target, we stop exploring that path (pruning) because adding more numbers will only increase the sum.

*/


// Solution
class Solution {
    _combinationSumHelper(candidates, index, currSum, goal, path, arr, set){
        if(currSum == goal){
            arr.push([...path])
            return;
        }
        if(currSum > goal || index >= candidates.length){
            return;
        }
        path.push(candidates[index]);
        this._combinationSumHelper(candidates, index+1, currSum+candidates[index], goal, path, arr, set);
        path.pop();
        while(candidates[index] == candidates[index+1]){
            index++;
        }
        this._combinationSumHelper(candidates, index+1, currSum, goal, path, arr, set);
    }
    combinationSum2(candidates, target) {
        candidates.sort((a,b)=>a-b);
        let set = new Set();
        let arr = []
        this._combinationSumHelper(candidates, 0, 0, target, [], arr, set);
        return arr
    }
}


/*
# Complexity

    Time Complexity: O(2ⁿ + N log N) 
        1. 2^n for recursion where n is #element in array
        2. NlogN for sorting
    
    Space Complexity: O(N)
        1. At any point of time the depth of tree would be n at maximum
*/