/*
# Problem Statement:
    You are given an array of words where each word consists of lowercase English letters.
    wordA is a predecessor of wordB if and only if we can insert exactly one letter anywhere in wordA without changing the order of the other characters to make it equal to wordB.
    For example, "abc" is a predecessor of "abac", while "cba" is not a predecessor of "bcad".
    A word chain is a sequence of words [word1, word2, ..., wordk] with k >= 1, where word1 is a predecessor of word2, word2 is a predecessor of word3, and so on. A single word is trivially a word chain with k == 1.
    Return the length of the longest possible word chain with words chosen from the given list of words.


Example 1

    Input: words = ["a", "ab", "abc", "abcd", "abcde"]

    Output: 5

    Explanation: The longest chain is ["a", "ab", "abc", "abcd", "abcde"].

    Each word in the chain is formed by adding exactly one character to the previous word.

Example 2

    Input: words = ["dog", "dogs", "dots", "dot", "d", "do"]

    Output: 4

    Explanation: The longest chain is ["d", "do", "dot", "dots"].

    Each word is formed by inserting one character into the previous word.

# Constraints

    1 <= words.length <= 1000
    1 <= words[i].length <= 20
    words[i] only consists of lowercase English letters.
*/


/*
# Intuition
    1. dp[i] => length of longest predecessor from ith index
    2. For each i check 0 to i-1 to check the longest predecessor
    3. use checkpredessor to check predecessor (word1, word2)
*/


// Solution
class Solution {
    checkPredeccesor(word1, word2){
        if(Math.abs(word1.length-word2.length) != 1){
            return false;
        }
        let ptr1 = 0, ptr2 = 0;
        let diff = 0;
        while(ptr1 < word1.length && ptr2 < word2.length){
           if(word1[ptr1] === word2[ptr2]){
                ptr1++;
                ptr2++;
           }else{
                if(diff == 1){
                    return false;
                }
                ptr2++;
                diff++;
           }
        }
        return true;
    }
    // 
    longestStringChain(words) {
        words.sort((a,b)=>a.length-b.length);
        let n = words.length;
        let dp = new Array(n).fill(1);

        let maxLength = 1;

        for(let i = 1; i < n; i++ ){
            for(let j = 0; j < i ; j++){
                let isPredecessor= this.checkPredeccesor(words[j], words[i]);
                if(isPredecessor && dp[j] + 1 > dp[i]){
                    dp[i] = dp[j] + 1;
                }
            }
            if(maxLength < dp[i]){
                maxLength = dp[i];
            }
        }
        return maxLength;
    }
}


/*
# Complexity Analysis

Time Complexity
    O(N^2 * L + N log N), where N is the number of words and L is the average length of a word. Sorting takes O(N log N * L). The nested loops run N*(N-1)/2 iterations, and checkPredeccesor takes O(L) time per call.

Space Complexity
    O(N), required for the dp array of size N to store the chain lengths for each word.
*/