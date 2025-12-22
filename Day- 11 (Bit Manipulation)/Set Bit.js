/*
 # Set Bit

# Problem Description

    You are given two integers A and B.
    Set the A-th bit and B-th bit in 0, and return output in decimal Number System.

# Note:
    The bit positions are 0-indexed, which means that the least significant bit (LSB) has index 0.


# Problem Constraints

    0 <= A <= 30
    0 <= B <= 30


# Input Format

    First argument A is an integer.
    Second argument B is an integer.


# Output Format

    Return an integer.


# Example Input

    Input 1:
    A = 3
    B = 5
    Input 2:
    A = 4
    B = 4


# Example Output

    Output 1:
    40
    Output 2:
    16


# Example Explanation

    For Input 1:
    The binary expression is 101000 which is 40 in decimal.
    For Input 2:
    The binary expression is 10000 which is 16 in decimal

*/


// Code

function setBit(A, B){
    let n =0;
    n = n | 1<<A;
    n = n | 1<<B;
    return n;
}
/*
    Explanation
    The intuition behind this code is to build a number from scratch by selectively turning ON specific bits, while keeping all other bits unchanged.

    The variable n starts as 0, which in binary means every bit is OFF. This gives a clean base where no bits are set initially.

    When we do 1 << A, we create a number where only the A-th bit is ON and all other bits are OFF. Using the OR (|) operator with n ensures that this bit gets turned ON. OR is used because:

    0 | 1 = 1 → the bit becomes set

    1 | 1 = 1 → the bit stays set

    0 | 0 = 0 → no unwanted changes

    So after n = n | (1 << A), the A-th bit is guaranteed to be ON.

    The same logic is applied again with 1 << B. OR-ing this mask with n turns ON the B-th bit without affecting the A-th bit or any other bit that may already be set.

*/
// Time Complexity - O(1)
// Space Complexity - O(1)