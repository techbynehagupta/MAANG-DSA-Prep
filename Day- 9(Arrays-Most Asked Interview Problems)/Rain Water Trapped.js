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
	left = findLeftMax(A);
	right = findRightMax(A);
	let totalWaterTrapped = 0;
	for(let i=0; i< A.length; i++){
		let min = Math.min(left[i], right[i]);
		totalWaterTrapped +=  min > 0 ? min- A[i] : 0;
	}
	return totalWaterTrapped;
}



function findLeftMax(A){
	let arr = [], stack = [];
	for(let i =0; i< A.length; i++){
		while(stack.length != 0 && top(stack) < A[i]){
			stack.pop();
		}
		if(stack.length == 0){
			arr[i] = -1;
			stack.push(A[i]);
		}else{
			arr[i] = top(stack);
		}
	}
	return arr;
}


function findRightMax(A){
	let arr =[], stack = [];
	for(let i = A.length-1; i>=0; i--){
		while(stack.length != 0 && top(stack) < A[i]){
			stack.pop()
		}
		if(stack.length == 0){
			arr[i] = -1;
			stack.push(A[i]);
		}else{
			arr[i] = top(stack);
		}
	}
	return arr;
}

function top(stack){
	let n = stack.length;
	return n > 0 ?  stack[n-1] : null;
}

// Time Complexity: O(n)
// Space Complexity: 2*n => O(n)