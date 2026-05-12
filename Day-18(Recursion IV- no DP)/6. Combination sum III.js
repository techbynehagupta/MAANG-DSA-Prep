/*
# Problem Statement:
    Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

    Each number in candidates may only be used once in the combination.

    Note: The solution set must not contain duplicate combinations.

 

Example 1:

    Input: candidates = [10,1,2,7,6,1,5], target = 8
    Output: 
    [
    [1,1,6],
    [1,2,5],
    [1,7],
    [2,6]
    ]

Example 2:

    Input: candidates = [2,5,2,1,2], target = 5
    Output: 
    [
    [1,2,2],
    [5]
    ]
 

Constraints:

    1 <= candidates.length <= 100
    1 <= candidates[i] <= 50
    1 <= target <= 30


*/


/*

# Intuition

    1. Build the combination gradually instead of trying all possible sets at once.

    2.At every step, ask:

        “Can this current combination still become a valid answer?”

    3. Start with an empty set and try adding numbers one by one.
    4. Since each number can be used only once, after choosing a number, only consider larger numbers next.
        Example: after choosing 1, try 2, 3, 4...
        Avoids duplicates like [1,2,4] and [2,1,4].
    5. Keep track of:
        Current sum
        Current number of elements

    6. Stop exploring a path early (pruning) if:
        The sum becomes greater than n
        Number count becomes greater than k
        Because adding more numbers will only worsen the condition.

    7. A combination is valid only when both conditions match together:
        Length becomes exactly k
        Sum becomes exactly n
    8. If only one condition matches:
        Example: 3 numbers but sum ≠ n
        Example: sum = n but fewer/more than k numbers
        → discard that path.
        
        Example (k = 3, n = 7)
        Start: []
        Try 1 → [1]
        Add 2 → [1,2]
        Add 3 → [1,2,3] → sum = 6 ❌ (3 numbers reached but wrong sum)
        Backtrack
        Add 4 → [1,2,4] → sum = 7 ✅ valid answer
        Add 5 → [1,2,5] → sum = 8 ❌ exceeds target → stop immediately
        Core Idea

        Try → Check → Stop invalid paths early → Backtrack → Try next possibility.

        This avoids unnecessary work and efficiently finds all valid combinations.
*/


// Solution
class Solution {
    _combinationSum3Helper(k, n, i, sum, currSet, result){
        if(
            currSet.length > k || 
            sum > n 
        ){;
            return;
        }
        if(currSet.length == k && n == sum){
            result.push([...currSet]);
            return;
        }
        for(let ind = i; ind< Math.min(10, n); ind++){
            currSet.push(ind);
            this._combinationSum3Helper(k, n, ind+1, sum+ind, currSet , result);
            currSet.pop();
        }
    }
    combinationSum3(k, n) {
        if(n > 45){
            // as 1-9 gives the sum of max 45 so bigger no. than that can't be formed
            return [];
        }
        let result = [];
        this._combinationSum3Helper(k, n, 1, 0, [], result);
        return result;
    }
}



/*
# Complexity Analysis

Time Complexity
    O(C(9, k)), where C(9, k) is the number of combinations of 9 numbers taken k at a time, representing the total number of paths in the recursion tree.

Space Complexity
    O(k), representing the recursion depth and the space used to store the current combination (currSet).
*/