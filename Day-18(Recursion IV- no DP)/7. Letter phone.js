/*
# Problem Statement:
    Given a string consisting of digits from 2 to 9 (inclusive). Return all possible letter combinations that the number can represent.
    Mapping of digits to letters is given in first example.


Example 1

    Input : digits = "34"

    Output : [ "dg", "dh", "di", "eg", "eh", "ei", "fg", "fh", "fi" ]

    Explanation : The 3 is mapped with "def" and 4 is mapped with "ghi".

    So all possible combination by replacing the digits with characters are shown in output.



Example 2

    Input : digits = "3"

    Output : [ "d", "e", "f" ]

    Explanation : The 3 is mapped with "def".

# Constraints

    1 <= digits.length <= 4
    digts[i] contains digitd from [2,9].

*/


/*

# Intuition

*/


// Solution
class Solution {
    _letterCombinationsHelper(digits, mapping, index, str, result){
        if(index == digits.length){
            result.push(str);
            return;
        }
        for(let i=0; i < mapping.get(digits[index]).length; i++){
            let ch = mapping.get(digits[index])[i];
            this._letterCombinationsHelper(digits, mapping, index+1, str+ch, result);
        }

    }
    letterCombinations(digits) {
        let digitMapping = new Map();
        digitMapping.set('2', ['a', 'b', 'c']);
        digitMapping.set('3', ['d', 'e', 'f']);
        digitMapping.set('4', ['g', 'h', 'i']);
        digitMapping.set('5', ['j', 'k', 'l']);
        digitMapping.set('6', ['m', 'n', 'o']);
        digitMapping.set('7', ['p', 'q', 'r', 's']);
        digitMapping.set('8', ['t', 'u', 'v']);
        digitMapping.set('9', ['w', 'x', 'y', 'z']);

        let result = [];
        this._letterCombinationsHelper(digits, digitMapping, 0, '', result);
        return result;
    }
}



/*
# Complexity Analysis

Time Complexity
    O(4^n * n), where n is the length of digits. There are 8 total digit mappings with a max length of 4. The recursion tree branches up to 4 times per level for depth n, and string concatenation takes O(n) per leaf node.

Space Complexity
    O(n), required for the recursion stack depth of n and the storage of the temporary string built during each recursive call.
*/