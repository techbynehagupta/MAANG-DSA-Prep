/*
# Problem Description

    You have a set of non-overlapping intervals. You are given a new interval [start, end], insert this new interval into the set of intervals (merge if necessary).

    You may assume that the intervals were initially sorted according to their start times.



# Problem Constraints

    0 <= |intervals| <= 105



# Input Format

    First argument is the vector of intervals

    second argument is the new interval to be merged



# Output Format

    Return the vector of intervals after merging



# Example Input

    Input 1:
    Given intervals [1, 3], [6, 9] insert and merge [2, 5].

    Input 2:
    Given intervals [1, 3], [6, 9] insert and merge [2, 6].

# Example Output

    Output 1:
    [ [1, 5], [6, 9] ]
    
    Output 2:
    [ [1, 9] ]


# Example Explanation

    Explanation 1:
    (2,5) does not completely merge the given intervals

    Explanation 2:
    (2,6) completely merges the given intervals

*/

function mergeIntervals(A, B){
    let sortedList = []
    let a1 = B[0];
    let b1 = B[1];

    for(let i=0; i<A.length; i++){
        let a2 = A[i][0];
        let b2 = A[i][1];
        if(b1 >= a2){
            if(a1 > b2){
                sortedList.push([a2, b2]);
            }else{
                a1 = a1 > a2 ? a2: a1;
                b1 =  b1 > b2 ? b1: b2;
            }
        }else{
            sortedList.push([a1,b1]);
            a1 = a2;
            b1 = b2;
        }
    }
    sortedList.push([a1, b1]);
    return sortedList;
}

console.log(mergeIntervals([[1, 3], [6, 9]], [2,5]));

console.log(mergeIntervals([[1, 3], [6, 9]], [2,6]));


// Time Complexity - O(n)
// Space Complexity - O(n) in worst case


/*
Approach 
[x,y]
[a,b]

possibility 
if y >= a
    then the interval will either be overlapping or seperate
    check y > b for seperate so list will be [a,b] and then [x,y] will be compared further
    else overlapping now check a > x then start would be x else a and y > b then end would be y else a 
if y < a
    then its obviously a seperate interval where [x,y] is smaller than [a,b]

*/