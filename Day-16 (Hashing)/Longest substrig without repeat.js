/*
# Longest Substring Without Repeat

# Problem Description

    Determine the "GOOD"ness of a given string A, where the "GOOD"ness is defined by the length of the longest substring that contains no repeating characters. The greater the length of this unique-character substring, the higher the "GOOD"ness of the string.

    Your task is to return an integer representing the "GOOD"ness of string A.

    Note: The solution should be achieved in O(N) time complexity, where N is the length of the string.



# Problem Constraints

    1 <= size(A) <= 106

    String consists of lowerCase,upperCase characters and digits are also present in the string A.



# Input Format

    Single Argument representing string A.



# Output Format

    Return an integer denoting the maximum possible length of substring without repeating characters.



# Example Input

    Input 1:
    A = "abcabcbb"

    Input 2:
    A = "AaaA"


# Example Output

    Output 1:
    3

    Output 2:
    2


# Example Explanation

    Explanation 1:
    Substring "abc" is the longest substring without repeating characters in string A.
   
    Explanation 2:
    Substring "Aa" or "aA" is the longest substring without repeating characters in string A.
*/

// Solution Code

function LSWR(A){
	let map = new Map();
	let maxLength =1;
	let left = 0;
	for(let i=0; i <A.length; i++){
		if(map.has(A[i]) && map.get(A[i]) >= left){
            left = map.get(A[i]) +1; 
        }
        map.set(A[i], i);
        maxLength = Math.max(maxLength, i-left+1);
	}
	return maxLength;
}
// One-Line Intuition (Interview Friendly)

// We expand the window using i, and whenever a duplicate appears inside the window, we shrink it from the left just enough to remove the duplicate.

// Code Explanation
/*
1. Map Initialization
   A `Map` is used to store each character’s most recent index while traversing the string.

2. Sliding Window Setup

   * `left` represents the starting index of the current window.
   * The window `[left, i]` always contains unique characters only.

3. Traverse the String
   Iterate through the string using index `i`, which acts as the right boundary of the window.

4. Handle Character Repetition

   * If the current character already exists in the map
   * AND its last occurrence lies inside the current window (`map.get(A[i]) >= left`)
   * Move the `left` pointer to one position right of the previous occurrence.

   This ensures the window remains valid (no repeated characters).

5. Update Character Position
   Store or update the current character’s index in the map.

6. Update Maximum Length
   Calculate the current window length using:

   i - left + 1

   Update `maxLength` if this window is larger than any previously seen.

7. Return the Result
   After the traversal, `maxLength` contains the length of the longest substring without repeating characters.


*/

// Complexity 
/*
1. Time Complexity - O(n) {Only one time traversing the loop}
2. Space Complexity - O(n) {If complete string is unique}
*/
