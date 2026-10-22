/*
# Problem Statement:
    Same question as - Day-16 (Hashing)/Longest substrig without repeat.js
    Given a string s, find the length of the longest substring without duplicate characters.

 

    Example 1:

    Input: s = "abcabcbb"
    Output: 3
    Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.
    Example 2:

    Input: s = "bbbbb"
    Output: 1
    Explanation: The answer is "b", with the length of 1.
    Example 3:

    Input: s = "pwwkew"
    Output: 3
    Explanation: The answer is "wke", with the length of 3.
    Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
    

    Constraints:

    0 <= s.length <= 105
    s consists of English letters, digits, symbols and spaces.
*/


/*
# Intuition
1- make a map and a left and right pointer
2- increment right pointer check if it exists in map, if it does then check whether its inside the current valid window i.e, >= left
3- If not then just update map
4- if inside valid window update left to lastPos + 1 and map value to current index

The logic is to always maintain a valid window btw left and right pointers and map contains the last location of charcter seen overall. If outside valid window then just update map for stale entry else update the left to maintail valid winodw and map to the last position

Note - While shrinking we don't need to remove charcaters from map as we can check the map entryusing left pointer
if its inside left and right, its not stale while if its stale it'll be lesser than left so we can ignore it

*/


// Solution
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let map = new Map();
    let left = 0;
    let longestSubstring = 0;
    for(let right =0; right < s.length; right++){
        if(map.has(s[right])){
            // if map alreayd contains value
            let lastPos = map.get(s[right]);
            if(lastPos >= left){
                // inside valid window then update left
                left = lastPos +1;
            }
        }
        map.set(s[right], right);
        longestSubstring = Math.max(longestSubstring, right-left+1);
    }
    return longestSubstring;
};



/*
# Complexity Analysis
    TC - O(n);
    SC - O(n)
*/