/*
# Problem Statement:

    Given a string s partition string s such that every substring of partition is palindrome. Return all possible palindrome partition of string s.


Example 1

    Input : s = "aabaa"

    Output : [ [ "a", "a", "b", "a", "a"] , [ "a", "a", "b", "aa"] , [ "a", "aba", "a"] , [ "aa", "b", "a", "a"] , [ "aa", "b", "aa" ] , [ "aabaa" ] ]

    Explanation : Above all are the possible ways in which the string can be partitioned so that each substring is a palindrome.

Example 2

    Input : s = "baa"

    Output : [ [ "b", "a", "a"] , [ "b", "aa" ] ]

    Explanation : Above all are the possible ways in which the string can be partitioned so that each substring is a palindrome.

*/


/*

# Intuition

1. Partition string for every i index for i ranges from [0, n-1]
2. Check first partition whether its a palindrome or not [0, i]
3. If its not then there is no point of checking the rest half from [i+1, n-1]
4. if [0, i] is a palindrome then check how many palindrome you can form from rest of the 
string by partitioning it in diff ways

ex- "abcba"
At first level for(i<n)
i =0 break at i = 0[a] since a is a plaindrome recur[bcba]
i= 1 [ab] ab is not plaindrome so no further recurence
i=2 [abc] abc is not plaindrome so no further recurence
i=3 [abcb] abcb is not plaindrome so no further recurence
i= 4 [abcba] is a plaindrome recur("")

At second nested level
Recurring the string that got breaj into [a] [bcba]
i=0 [b] recur(cba), at same level i=1 [bc], bc is not a plaindrome recur(a)
following up for this nested query
i=0 [c] recur(ba)
i=0 [b] recur [a] 

                                 abcba
                               /       \
                            a           abcba
                           /              \
                        bcba              END
                       /    \
                      b      bcb
                     /         \
                  cba           a
                   |             \
                   c             END
                   |
                   ba
                   |
                   b
                   |
                   a
                   |
                  END

*/




// Solution
class Solution {
    _checkPalindrome(s, i, j){
         while(i < j){
            if(s[i] !== s[j]){
                return false;
            }
            i++;
            j--;
        }
        return true;
    }
    _partitionHelper(s, start, path, result){
        if(start == s.length){
            result.push([...path])
            return;
        }
        for(let end = start; end<s.length ; end++){
            if(this._checkPalindrome(s, start, end)){
                path.push(s.slice(start, end+1));
                this._partitionHelper(s, end+1, path, result);
                path.pop();
            }
        }
    }
    partition(s) {
        let result = [];
        this._partitionHelper(s, 0, [], result);
        return result;
    }
}

/*
# Complexity Analysis
Time Complexity- O(n² × 2^n)
    We try every possible partition of the string using backtracking. Since there are n−1 places to cut, total possible partitions are exponential (2^(n−1)). For every candidate substring, we validate palindrome in O(n) time, and substring creation also costs O(n). Hence overall time complexity becomes O(n² × 2^n)

    Space Complexity
    O(n), where n is the depth of the recursion stack. This does not account for the storage required for the output result list.
*/