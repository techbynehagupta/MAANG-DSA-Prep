/*
# Problem Statement:
Given two integers start and goal. Flip the minimum number of bits of start integer to convert it into goal integer.
A bits flip in the number val is to choose any bit in binary representation of val and flipping it from either 0 to 1 or 1 to 0.


Example 1

    Input : start = 10 , goal = 7

    Output : 3

    Explanation : The binary representation of 10 is "1010".

    The binary representation of 7 is "111".

    If we flip the underlined bits in binary representation of 10 then we will obtain our goal.

Example 2

    Input : start = 3 , goal = 4

    Output : 3

    Explanation : The binary representation of 3 is "011".

    The binary representation of 4 is "100".

    So if we flip all the three bits of 3 then we will reach our goal number.


Constraints

    1 <= start , end <= 109
*/


/*
# Intuition
    XOR of two numbers will tell if the bits are different

    1. find the xor of both it'll set the bits which are different
    2. once we get the number, we can count sets bit out of it
*/



// Solution I
class Solution {
    minBitsFlip(start, goal) {
        let xor = start ^ goal;
        let flpCnt = 0;
        while(xor != 0){
            flpCnt += 1;
            xor = xor & (xor-1);
        }
        return flpCnt;
    }
}

/*
# Complexity Analysis

Time Complexity
    O(k) where k is the number of set bits in the XOR result, because the Brian Kernighan's algorithm iterates once for each set bit.

Space Complexity
    O(1) as only a fixed number of integer variables are used regardless of the input size.
*/


// Solution II

class Solution {
    minBitsFlip(start, goal) {
        let xor = start ^ goal;
        let flpCnt = 0;

        for(let i = 0; i < 32; i++){
            flpCnt = flpCnt + ((xor & (1 << i)) != 0 ? 1: 0);
        }

        return flpCnt;
    }
}

/*
Complexity Analysis
Time Complexity
    O(1) because the loop runs exactly 32 times regardless of the input values, representing a constant number of operations.

Space Complexity
    O(1) because the function only uses a fixed amount of auxiliary space (variables xor, flpCnt, and i) regardless of the input size.

*/