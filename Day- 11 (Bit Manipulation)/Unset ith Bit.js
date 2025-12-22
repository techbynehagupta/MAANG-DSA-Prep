/*
# Unset i-th bit

# Problem Description

    You are given two integers A and B.
    If B-th bit in A is set, make it unset.
    If B-th bit in A is unset, leave as it is.
    Return the updated A value.

# Note:
    The bit position is 0-indexed, which means that the least significant bit (LSB) has index 0.


# Problem Constraints

    1 <= A <= 109
    0 <= B <= 30


# Input Format

    First argument A is an integer.
    Second argument B is an integer.


# Output Format
    Return an integer.


# Example Input

    Input 1:
    A = 4
    B = 1
    Input 2:
    A = 5
    B = 2


# Example Output

    Output 1:
    4
    Output 2:
    1


# Example Explanation

    For Input 1:
    Given N = 4 which is 100 in binary. The 1-st bit is already unset
    For Input 2:
    Given N = 5 which is 101 in binary. We unset the 2-nd bit
    It becomes 001 which is 1 in Decimal.
*/

//Code

function unsetIthBit(A, B){
    if(A & 1<<B){
           A = A ^ 1<<B;
       }
       return A;

}

//  Explanation 
/*
To unset the i-th bit, the intuition is to target only that specific bit while leaving all other bits untouched.

We first create a number where only the i-th bit is set by left-shifting 1 (1 << i). This gives us a mask that points exactly to the bit we care about.

Before changing anything, we check whether the i-th bit in the original number is already set. Using AND (&) helps here because:

1 & 1 = 1 → the bit is set

1 & 0 = 0 → the bit is not set

If the result is non-zero, we know the bit is currently 1.

Now comes the role of XOR (^). XOR is useful because it flips bits:

1 ^ 1 = 0 → a set bit becomes unset

0 ^ 1 = 1 → an unset bit becomes set

Since the mask has 1 only at the i-th position, XOR affects only that bit and nothing else. When the bit is already set, XOR with the mask turns it into 0, effectively unsetting it. All other bits remain unchanged because XOR with 0 does nothing.

That’s why XOR works well here: it precisely toggles the target bit without disturbing the rest of the number.

*/

// Time Complexity - O(1)
// Space Complexity - O(1)