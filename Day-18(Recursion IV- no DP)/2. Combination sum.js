/*
# Problem Statement:
    Provided with a goal integer target and an array of unique integer candidates, provide a list of all possible combinations of candidates in which the selected numbers add up to the target. The combinations can be returned in any order.
    A candidate may be selected from the pool an infinite number of times. There are two distinct combinations if the frequency of at least one of the selected figures differs.
    he test cases are created so that, for the given input, there are fewer than 150 possible combinations that add up to the target.
    If there is no possible subsequences then return empty vector.


Example 1

    Input : candidates = [2, 3, 5, 4] , target = 7

    Output : [ [2, 2, 3] , [3, 4] , [5, 2] ]

Explanation :

    2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.

    5 and 2 are candidates, and 5 + 2 = 7.

    3 and 4 are candidates, and 3 + 4 = 7.

    There are total three combinations.

Example 2

    Input : candidates = [2], target = 1

    Output : []

Explanation : There is no way we can choose the candidates to sum up to target.

Example 3

    Input : candidates = [3, 4, 5, 6], target = 10

    Output:

    [ [3, 3, 4], [4, 6], [5, 5] ]

# Constraints

    1 <= candidates.length <= 30
    2 <= candidates[i] <= 40
    All elements of candidates are distinct.
    1 <= target <= 40

*/


/*

# Intuition
Intuition (Pointers with Example)
    1. We try to build combinations whose sum becomes equal to the target using backtracking.
    2. At every number, we have 2 choices:
        Take it → include it in the current combination and stay at the same index (because reuse is allowed).
        Skip it → move to the next index and try other numbers.
    3. We maintain a path array to track the current combination being formed.
    4. If currSum == target, we found a valid combination, so we store a copy of path.
    5. If currSum > target or all elements are exhausted, we stop exploring that path (pruning).
    6. Example: candidates = [2,3,6,7], target = 7
        Take 2 → [2] → [2,2] → [2,2,3] = 7 ✅
        Skip 2, skip 3, take 7 → [7] = 7 ✅
    7. Final answer becomes: [[2,2,3], [7]].
*/


// Solution
class Solution {
    _combinationSumHelper(A, index, currSum, goal, path, result){
        if(currSum == goal){
          result.push([...path]);
          return;
        }
        if(currSum > goal || index >= A.length){
            return;
        }
        path.push(A[index]);
        this._combinationSumHelper(A, index, currSum+A[index], goal, path, result);
        path.pop();
        this._combinationSumHelper(A, index+1, currSum, goal, path, result);
    }

    combinationSum(candidates, target) {
        if(candidates.length == 0 && target> 0) return [];
        if(target == 0) return [];
        let result = [];
        this._combinationSumHelper(candidates, 0, 0,  target, [], result);
        return result;
    }
}



/*
# Complexity
| Complexity           | Value          |
| -------------------- | -------------- |
| Time Complexity  | O(N^(T/M)) |
| Space Complexity | O(T/M)     |

Where:

    N = number of candidates
    T = target value
    M = smallest candidate value

Time Complexity
O(2^(T/M)), where T is the target and min(A) is the smallest element in the candidates array. The recursion tree branches twice at each step, and the depth of the tree is limited by the number of times the smallest element can fit into the target.
Space Complexity
O(T/M), representing the maximum depth of the recursion stack and the space required to store the current path array.


Example- Depth of tree is determined by
candidates = [2,3,6,7]
target = 7
smallest element = 2
Depth of tree can be 7/2 i.e, max 3-4 level 
*/