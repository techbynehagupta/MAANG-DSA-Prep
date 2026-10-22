/*
# Problem Statement:
Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.

In other words, return true if one of s1's permutations is the substring of s2.

 

Example 1:

Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").
Example 2:

Input: s1 = "ab", s2 = "eidboaoo"
Output: false
 

Constraints:

1 <= s1.length, s2.length <= 104
s1 and s2 consist of lowercase English letters.
*/


/*
# Intuition
Exactly same as find all anagrams in a string question

s2 contains a permutation of s1, or false otherwise.

return true if one of s1's permutations is the substring of s2.

use fixed sie window to solve and compare, the problem will become 100x easier to think

*/


// Solution
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    if(s1.length > s2.length) return false;
    let s1Map = new Map();
    let s2Map = new Map();

    for(let i=0; i < s1.length; i++){
        s1Map.set(s1[i], (s1Map.get(s1[i]) || 0)+1);
    }

    for(let i = 0; i < s1.length; i++){
        s2Map.set(s2[i], (s2Map.get(s2[i]) || 0)+1);
    }
    if(checkIfBothMapsAreEqual(s1Map, s2Map)){
        return true;
    }

    for(let right = s1.length; right < s2.length; right++){
        // console.log("here")
        let left = right-s1.length;
        s2Map.set(s2[left], s2Map.get(s2[left])-1);
        if(s2Map.get(s2[left]) == 0){
            s2Map.delete(s2[left])
        }
        s2Map.set(s2[right], (s2Map.get(s2[right]) || 0)+1);
        if(checkIfBothMapsAreEqual(s1Map, s2Map)){
            return true;
        }
    }
    return false;
};

function checkIfBothMapsAreEqual(map1, map2){
    if(map1.size != map2.size){
        return false;
    }
    for(let [key, value] of map1.entries()){
        if(!map2.has(key)) return false;
        let value2 = map2.get(key);
        if(value != value2) return false;
    }
    return true;
}



/*
# Complexity Analysis

*/