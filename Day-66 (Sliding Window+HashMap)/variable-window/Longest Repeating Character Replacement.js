/*
# Problem Statement:
You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.

 

Example 1:

Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.
Example 2:

Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
There may exists other ways to achieve this answer too.
 

Constraints:

1 <= s.length <= 105
s consists of only uppercase English letters.
0 <= k <= s.length
*/


/*
# Intuition

I need to have a map
1. Increment right, add value to hashmap
2. find count of each value- if total value -max <=k then its a valid window note down and move forward

3. shrink left and do the same count -max <= k its 


*/


// Solution

var characterReplacement = function(s, k) {
    let left = 0, freq = new Map();
    let longestSubstring = 0;
    for(let right =0; right < s.length; right++){
        let ch = s[right];
        freq.set(ch, (freq.get(ch) || 0)+1);
        // validate window
        while(checkDiffChar(freq) > k){
            freq.set(s[left], freq.get(s[left])-1);
            left++;
        }
        longestSubstring = Math.max(longestSubstring, right-left+1);
    }
    return longestSubstring;
};

function checkDiffChar(map){
    let max = 0, total = 0;
    for(let [ch, count] of map.entries()){
        max = Math.max(max, count);
        total += count;
    }
    return total - max;
}



/*
# Complexity Analysis
    TC - O(26*n) = O(n)
        Because map can contain atmost 26 distinct charcters  and window can be expanded and shrink down atmost n time only
    SC - O(1) // map can only contai 26 diff charcters
*/