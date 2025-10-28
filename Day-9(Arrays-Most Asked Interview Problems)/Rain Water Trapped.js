/*
# Problem Description

    Imagine a histogram where the bars' heights are given by the array A. Each bar is of uniform width, which is 1 unit. When it rains, water will accumulate in the valleys between the bars.

    Your task is to calculate the total amount of water that can be trapped in these valleys.

# Example:

    The Array A = [5, 4, 1, 4, 3, 2, 7] is visualized as below. The total amount of rain water trapped in A is 11.

        Level 7:                         ||||
        Level 6:                         ||||
        Level 5: ||||  ----  ----  ----  ||||  ----  |||| 
        Level 4: ||||  ||||  ----  ||||  ||||  ----  |||| 
        Level 3: ||||  ||||  ----  ||||  ||||  ----  |||| 
        Level 2: ||||  ||||  ----  ||||  ||||  ----  |||| 
        Level 1: ||||  ||||  ||||  ||||  ||||  ||||  |||| 
                5     4     1     4     3     2     7
                i0    i1    i2    i3    i4    i5    i6
    Legend

    |||| = solid bar (height of that element)

    ---- = trapped water at that level

# Problem Constraints

    1 <= |A| <= 105
    0 <= A[i] <= 105



# Input Format

    First and only argument is the Integer Array, A.



# Output Format

    Return an Integer, denoting the total amount of water that can be trapped in these valleys



# Example Input

    Input 1:
    A = [0, 1, 0, 2]

    Input 2:
    A = [1, 2]


# Example Output

    Output 1:
    1

    Output 2:
    0


# Example Explanation

    Explanation 1:
    1 unit is trapped on top of the 3rd element.
    Rain Water Histogram
    Level 2:         ----  ||||
    Level 1:    ||||  ||||  ||||  ||||
                 0     1     0     2
                 i0    i1    i2    i3

    Explanation 2:
    No water is trapped.

    Level 2:         ||||
    Level 1:    ||||  ||||
                  1     2
                 i0    i1



 */
/*
    Brute Force Approach
    Calculate maxbar at left and right, find minimum of both and find difference between currentHeight-min(leftBar, rightBar);
    This approach is O(n^2) times as for each bar we have to calculate leftMaxBar and rightMaxBar which itself will take O(n) time
*/

// Optimised appoach- using stack findLeftMax and findRightmax for each bar simoultaneously
function rainWaterTrapped(A){
    let n = A.length;
    let leftMax = new Array(n);
    let rightMax = new Array(n);
    let stack =[];
    // constructing left max
    for(let i=0; i<n; i++){
        while(stack.length > 0 && top(stack) <= A[i]){
            stack.pop();
        }
        if(stack.length == 0){
            leftMax[i] = -1;
            stack.push(A[i]);
        }else{
            leftMax[i] = top(stack)
        }
    }
    stack = new Array();
    // constructing right max
    for(let i=n-1; i>=0; i--){
        while(stack.length >0 && top(stack) <= A[i]){
            stack.pop();
        }
        if(stack.length == 0){
            rightMax[i] = -1;
            stack.push(A[i]);
        }else{
            rightMax[i] = top(stack);
        }
    }
    // getting total water trapped
    let totalWater =0;
    for(let i=1; i<n-1; i++){
        totalWater += Math.max(Math.min(leftMax[i], rightMax[i]) - A[i], 0);
    }
    return totalWater;
}

function top(stack){
    let n = stack.length;
    return n ==0? null: stack[n-1];
}


// console.log(rainWaterTrapped([0, 1, 0, 2]));
// console.log(rainWaterTrapped([5, 4, 1, 4, 3, 2, 7]));
console.log(rainWaterTrapped([0,1,0,2,1,0,1,3,2,1,2,1]));

// Time Complexity - O(n)
// Space Complexity - 3*n => O(n)



// Simpler verion of code

function rainWaterTrapped(A){
    let n =A.length;
    let lA = [], rA=[];
    for(let i=0;i<n;i++){
        lA[i] = i==0? 0: Math.max(lA[i-1], A[i-1]); 
    }
    for(let i=n-1; i>=0; i--){
        rA[i] = i == (n-1)? 0: Math.max(rA[i+1], A[i+1])
    }
    let sum =0;
    for(let i=1; i<n-1; i++){
        let waterStored = Math.min(lA[i], rA[i]) - A[i] ; 
        sum += waterStored > 0 ? waterStored: 0; 
    }
    return sum;
}

// Time Complexity: O(n)
// Space Complexity: 2*n => O(n)