/*
# Problem Statement:
Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order.

 

Example 1:

Input: s = "cbaebabacd", p = "abc"
Output: [0,6]
Explanation:
The substring with start index = 0 is "cba", which is an anagram of "abc".
The substring with start index = 6 is "bac", which is an anagram of "abc".
Example 2:

Input: s = "abab", p = "ab"
Output: [0,1,2]
Explanation:
The substring with start index = 0 is "ab", which is an anagram of "ab".
The substring with start index = 1 is "ba", which is an anagram of "ab".
The substring with start index = 2 is "ab", which is an anagram of "ab".
 

Constraints:

1 <= s.length, p.length <= 3 * 104
s and p consist of lowercase English letters.
*/


/*
# Intuition

Step1- Create 2 maps 1 pmap and other window map, instead of creating mao track all 26 values wiuld be better
2- pmap will contain the values of p with their count
3. Always keep a window of length p.length in s
4. whenever adding any charcter and removing any charcter update the count of windowMap and then compare both arrays if all values are same then push left+1 in ans

 */



// Solution
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    if(s.length < p.length){
        return [];
    }
    let pMap = new Array(26).fill(0);
    let windowMap = new Array(26).fill(0);
    let ans = [];

    for(let i =0; i < p.length; i++){
        let charIndex = p[i].charCodeAt(0)-97;
        pMap[charIndex]++;
    }

    for(let i=0 ; i < p.length; i++){
        // make windowsize of p length
        let charIndex = s[i].charCodeAt(0)-97;
        windowMap[charIndex]++;
    }

    if(checkMatches(pMap, windowMap)){
        ans.push(0);
    }
    
    for(let right = p.length; right < s.length; right++){
        // add right char and remove one char
        let left = right- p.length;
        let leftCharIndex = s[left].charCodeAt(0)-97;
        let rightCharIndex = s[right].charCodeAt(0)-97;

        windowMap[leftCharIndex]--;
        windowMap[rightCharIndex]++;

        if(checkMatches(pMap, windowMap)){
            ans.push(left+1);
        }

    }
    return ans;
};

function checkMatches(arr1, arr2){
    for(let i=0; i < 26; i++){
        if(arr1[i]!= arr2[i]){
            return false;
        }
    }
    return true;
}



/*
# Complexity Analysis
TC - O(26* (n+m)) = O(n+m)
SC- O(26)
*/