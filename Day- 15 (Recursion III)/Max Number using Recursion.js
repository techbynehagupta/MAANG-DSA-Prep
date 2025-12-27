/*
    # Max Number Using Recursion

# Problem Description

    Given an array A of size N, write a recursive function that returns the maximum element of the array.


# Problem Constraints

    1 <= N <= 100
    -1000 <= A[i] <= 1000


# Input Format

    The first line contains the array A.


# Output Format

    A single integer is the maximum value of the array.


# Example Input

    Input 1:
    A = [12, 10, 3, 4, 5]
    Input 2:
    A = [1, -5, 80, -40]


# Example Output

    Output 1:
    12

    Output 2:
    80


# Example Explanation

    Explanation 1:
    The Maximum element of the array A, [12, 10, 3, 4, 5] is 12
    Explanation 2:
    The Maximum element of the array A, [1, -5, 80, -40] is 80

*/

// Code (JavaScript)

function findMax(A, i){
	if(i >= A.length) return Number.NEGATIVE_INFINITY;
	return Math.max(A[i], findMax(A, i+1));
}
