/*
# Problem Description

    You are given a collection of intervals A in a 2-D array format, where each interval is represented by a pair of integers `[start, end]`. The intervals are sorted based on their start values.

    Your task is to merge all overlapping intervals and return the resulting set of non-overlapping intervals.


# Problem Constraints

    1 <= len(A) <= 100000.
    1 <= A[i][0] <= A[i][1] <= 100000

    A is sorted based on the start value (A[i][0])



# Input Format

    First argument is a list of intervals in 2-Dimentional Array.



# Output Format

    Return the sorted list of intervals after merging all the overlapping intervals.



# Example Input

    Input 1:
    [ [1, 3], [2, 6], [8, 10], [15, 18] ]

    Input 2:
    [ [2, 10], [4, 9], [6, 7] ]


# Example Output

    Output 1:
    [ [1, 6], [8, 10], [15, 18] ]

    Output 2:
    [ [2, 10] ]


# Example Explanation

 Explanation 1:

    Merge intervals [1,3] and [2,6] -> [1,6].
    so, the required answer after merging is [1,6],[8,10],[15,18].
    No more overlapping intervals present.

    Explanation 2:
    Merge intervals [2, 10], [4, 9], [6, 7] as [2,10].
    Since [4, 9] and [6, 7] is overlapping inside the interval [2, 10].

    so, the required answer after merging is [2, 10].

*/


function mergeIntervals(A){
    let list =[];
    let a1= A[0][0], b1 = A[0][1];
    let n = A.length;
    for(let i=1; i<n ;i++ ){
        let a2 = A[i][0];
        let b2 = A[i][1];
        if(b1 >= a2){
            b1 = b1>b2 ? b1: b2;
        }else{
            list.push([a1,b1]);
            a1 = a2;
            b1 = b2;
        }
    }
    list.push([a1,b1]);
    return list;
}

// Time complexity - O(n)
// Space Complexity - O(n)