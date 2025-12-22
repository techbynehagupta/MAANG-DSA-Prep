/*
# Number of 1 Bits

# Problem Description

    Write a function that takes an integer and returns the number of 1 bits present in its binary representation.


# Problem Constraints

    1 <= A <= 109


# Input Format

    First and only argument contains integer A


# Output Format

    Return an integer


# Example Input

    Input 1:
    11
    Input 2:
    6


# Example Output

    Output 1:
    3
    Output 2:
    2


# Example Explanation

    Explaination 1:
    11 is represented as 1011 in binary.
    Explaination 2:
    6 is represented as 110 in binary.


*/


function numberOf1Bits(A){
	let count = 0;
	while(A){
		if((A & 1) ==1) count++;
		A = A>>1
	}
    return count;
}

// TimeComplexity - O(1) as number of bits in a number can't be greater than 32 
// Space Complexity - O(1)