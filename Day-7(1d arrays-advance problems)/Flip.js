/*
# Problem Description

    You are given a binary string A(i.e., with characters 0 and 1) consisting of characters A1, A2, ..., AN. In a single operation, you can choose two indices, L and R, such that 1 ≤ L ≤ R ≤ N and flip the characters AL, AL+1, ..., AR. By flipping, we mean changing character 0 to 1 and vice-versa.

    Your aim is to perform ATMOST one operation such that in the final string number of 1s is maximized.

    If you don't want to perform the operation, return an empty array. Else, return an array consisting of two elements denoting L and R. If there are multiple solutions, return the lexicographically smallest pair of L and R.

    NOTE: Pair (a, b) is lexicographically smaller than pair (c, d) if a < c or, if a == c and b < d.


# Problem Constraints

    1 <= size of string <= 100000



# Input Format

    First and only argument is a string A.



# Output Format

    Return an array of integers denoting the answer.



# Example Input

    Input 1:
    A = "010"

    Input 2:
    A = "111"


# Example Output

    Output 1:
    [1, 1]

    Output 2:
    []


# Example Explanation

    Explanation 1:
    A = "010"

    Pair of [L, R] | Final string
    _______________|_____________
    [1 1]          | "110"
    [1 2]          | "100"
    [1 3]          | "101"
    [2 2]          | "000"
    [2 3]          | "001"

    We see that two pairs [1, 1] and [1, 3] give same number of 1s in final string. So, we return [1, 1].

    Explanation 2:
    No operation can give us more than three 1s in final string. So, we return empty array [].

*/

/*

11011100001
1 - [0,1]
11- [0,1]
110- [1, 0]
1101 - [1,1]
11011 - [0, 1]
110111 - [0,1]
00001 - [4, 1]
maxium number of contigious zeroes such that number of 1's coming amongst them is less than total number of 1s

*/

function flip(A){
    let left = 0;
    let finalOp = new Array(2);
    let maxZeros = 0;
    let zeroes = 0, ones = 0;
    for(let i=0 ; i< A.length; i++){
        A[i] == 1? ones++: zeroes++;
        let diff = zeroes-ones;
        if(diff < 0){
            ones = 0;
            zeroes = 0;
            left = i+1;
        }
        if(maxZeros < diff){
            maxZeros = diff;
            finalOp[0] = left+1;
            finalOp[1] = i+1;
        }
    }
    return finalOp[0] ? finalOp: [];
}

console.log(flip([1,0,0,1,0,1,1,0,1]))

// Time Complexity - O(n)
// Space Complexity - O(1)


/*
# Approach
    When you flip:

    You gain a 1 for every 0 you flip.

    You lose a 1 for every 1 you flip.

    So basically, you want to find a subarray where the difference
    👉 “(number of 0s) − (number of 1s)”
    is maximum.

    That’s because this difference tells you how many extra 1s you’ll get overall if you flip that part.
*/