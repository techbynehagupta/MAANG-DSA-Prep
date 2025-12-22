/*
# Problem Description

    Given an unsorted integer array, A of size N. Find the first missing positive integer.
    Note: Your algorithm should run in O(n) time and use constant space.


# Problem Constraints

    1 <= N <= 1000000

    -109 <= A[i] <= 109



# Input Format

    First argument is an integer array A.



# Output Format

    Return an integer denoting the first missing positive integer.



# Example Input

    Input 1:
    [1, 2, 0]

    Input 2:
    [3, 4, -1, 1]

    Input 3:
    [-8, -7, -6]



# Example Output

    Output 1:
    3

    Output 2:
    2

    Output 3:
    1


# Example Explanation

    Explanation 1:

        A = [1, 2, 0]
        First positive integer missing from the array is 3.
        Explanation 2:

        A = [3, 4, -1, 1]
        First positive integer missing from the array is 2.
        Explanation 3:

        A = [-8, -7, -6]
        First positive integer missing from the array is 1.
*/


// With extra space
function findMissing(A){
    let map = new Array(A.length).fill(0);
    for(let i=0; i<A.length ; i++){
        if(A[i] > 0){
            map[A[i]-1] = A[i];
        }
    }
    for(let i=0; i<A.length; i++){
        if(A[i] == 0) return i+1;
    }
}

// Time Complexity - O(n)
// Space Complexity - O(n)


// Without extra space
function swap(A, i, j){
    [A[i], A[j]] = [A[j], A[i]]
}
function findMissingWithoutExtraSpace(A){
    for(let i=0; i<A.length; i++){
        // if A[i] is positive then it should be at its correct location
        let elAtCurrentLocation = A[i];
        let elAtDesiredLocation = A[A[i]-1];
        while(A[i] >0 && A[i]-1 != i && elAtCurrentLocation != elAtDesiredLocation){
            // swap A[i] location to i location
            swap(A, A[i]-1, i)
            elAtCurrentLocation = A[i];
            elAtDesiredLocation = A[A[i]-1];
        }
    }
    for(let i=0; i<A.length; i++){
        if(A[i]-1 != i) return i+1;
    }
    return A.length+1;
}

// Time Complexity - O(n)
// Spcae complexity - O(1)