/*

# Single Number 

# Problem Description

    Given an array of integers, every element appears thrice except for one, which occurs once.

    Find that element that does not appear thrice.

    NOTE: Your algorithm should have a linear runtime complexity.

    Could you implement it without using extra memory?

# Problem Constraints

    2 <= |A| <= 5*106

    0 <= A[i] <= INTMAX

# Input Format

    First and only argument of input contains an integer array A.



# Output Format

    Return a single integer.

# Example Input

    Input 1:
    A = [1, 2, 4, 3, 3, 2, 2, 3, 1, 1]

    Input 2:
    A = [0, 0, 0, 1]

# Example Output

    Output 1:
    4

    Output 2:
    1

# Example Explanation

    4 occurs exactly once in Input 1.
    1 occurs exactly once in Input 2.
*/


/*
# Intuition

Since it's said that we can't use extra space we couldn't use hashmap. Similarly if we use sort
the complexity would go as high as O(nlogn)

To do it O(n) complexity we can use bit manipulation

The approach is to count each bit count at a particular position 
1. If the bit count at position n of all numbers is multiple of 3 then the number which is not appearing
multiple times will have 0 at 0th bit position
2. Similarily if the bit count at a particular position is not multiple of 3 it means that single number is contributing
to the position thus the bit will be 1 at nth position

Example - [1, 2, 2, 1, 2, 3, 1]
Binary format of each number
1 | 01
2 | 10
3 | 11

so we count all 1's at position 0 = 4 (3 from 1 and and 1 from 3)
2nd position = 4 (3 from 2 and 1 from 3)

Thus we can say at both position the count is not multiple of 3 which deduces the number to have 1 at both bits making it 11 =3

*/


// Code (In JavaScript)

function singleNumber2(A){
	let num =0;
	for(let i=0; i<32; i++){
		let count =0;
		for(let j = 0; j<A.length; j++){
			count += (A[j] >> i) & 1;
		}
		num += count%3 == 0 ? 0: (1<<i);
	}
    return num;
}



 
/*
# Time Complexity - O(n)

    Where n is the size of the array, as the first loop runs for constant time O(n*32) = O(n)
# Space Complexity - O(1)

    As asked in the question

*/