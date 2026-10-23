/*
# Problem Statement:
Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

 

Example 1:

Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
Example 2:

Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.
Example 3:

Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.
 

Constraints:

m == s.length
n == t.length
1 <= m, n <= 105
s and t consist of uppercase and lowercase English letters.
*/


/*
# Intuition
1. increment right
2. check if the charcater exists in hashmap if yes then decrement its count
3. If count become zero means we got all the occurence of a charcater required
    thus increment counter
4. if our counter becomes = size of map  (unique charcaters) then its the string
we take the lengtha and try shrinking the window not the length till the window is valid
 when we remove a charcter and its count become greater than zero then decrement the count to illustrate that we need occurene of that particular charcter so try increasing right 
 window is valid till count = map.size

*/


// Solution
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
    if (s.length < t.length) return "";

    let map = new Map();
    for (let i = 0; i < t.length; i++) {
        map.set(t[i], (map.get(t[i]) || 0) + 1);
    }
    let counter = 0;
    let left = 0;
    let start = -1, minWindowLength = Infinity;

    for (let right = 0; right < s.length; right++) {
        let ch = s[right];
        // same charcter found then decrease the frequency and increment counter
        if (map.has(ch)) {
            map.set(ch, map.get(ch) - 1);
            // one chrcater acheived completely
            if (map.get(ch) == 0) {
                counter++;
            }
        }
        // check valid window
        while (map.size == counter) {
            if (minWindowLength > right - left + 1) {
                start = left;
                minWindowLength = right - left + 1
            }
            if (map.has(s[left])) {
                map.set(s[left], map.get(s[left]) + 1);
                if (map.get(s[left]) > 0) {
                    // we need this element more
                    counter--;
                }
            }
            left++;
        }
    }
    return minWindowLength == Infinity ? "" : s.substring(start, start+minWindowLength);
};



/*
# Complexity Analysis
    TC - O(m+n)
    SC- O(n)
*/