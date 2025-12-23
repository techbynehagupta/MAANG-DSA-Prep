/*
# Subarrays with OR 1

# Problem Description

    You are given a binary array A of length N where each element is either 0 or 1.

    Your task is to count the number of subarrays where the bitwise OR of all the elements in the subarray is 1.


# Problem Constraints
    1 <= N <= 104
    A[i] is either 0 or 1


# Input Format

    The First and the only argument is an Integer Array where each element is either 0 or 1.


# Output Format

    Return a single Integer representing the number of subarrays where the bitwise OR is 1


# Example Input

    Input 1:
    A = [0, 0, 1, 1, 0]
    Input 2:
    A = [0, 0, 0]


# Example Output

    Output 1:
    11
    Output 2:
    0


# Example Explanation

    Explanation 1:
    The only subarrays with OR = 1 are
    [0, 0, 1], [0, 0, 1, 1], [1], [1], [1, 1], [1, 0], [1, 1, 0], [0, 0, 1, 1, 0], [0, 1], [0, 1, 1], [0, 1, 1, 0] 
    Explanation 2:
    There is no subarray, whose bitwise OR is 0.


*/

/*
# Explanation
    To count subarray with bitwise OR as 1, only 1 value out of all the elements needs to be 1
    So if we count total number of arrays with all zeroes and subtract it from total number of subarrays
    we'll get count of the subarrays where bitwise OR is 1
*/
// Code (In JavaScript)

function subArrayWithOr(A){
    let n = A.length;
    let count =0, subarraysWithZeroes = 0;
    for(let i=0; i<n; i++){
        if(A[i] == 0){
            count++;
        }else{
            subarraysWithZeroes += (count * (count+1))/2;
            count =0;
        }
    }
    let totalSubArrays = (n*(n+1))/2;
    subarraysWithZeroes += (count * (count+1))/2;
    let subarraysWith1 = totalSubArrays - subarraysWithZeroes;
    return subarraysWith1;       
}