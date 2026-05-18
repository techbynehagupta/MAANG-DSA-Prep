/*
# Problem Statement:

Given an array arr of integers. A peak element is defined as an element greater than both of its neighbors.
Formally, if arr[i] is the peak element, arr[i - 1] < arr[i] and arr[i + 1] < arr[i].
Find the index(0-based) of a peak element in the array. If there are multiple peak numbers, return the index of any peak number.

Note: As there can be many peak values, "true" is given as output if the returned index is a peak number, otherwise the returned value of index.

Example 1

    Input : arr = [1, 2, 3, 4, 5, 6, 7, 8, 5, 1]

    Output: 7

    Explanation: In this example, there is only 1 peak that is at index 7.

Example 2

    Input : arr = [1, 2, 1, 3, 5, 6, 4]

    Output: 1

    Explanation: In this example, there are 2 peak numbers at indices 1 and 5. We can consider any of them.

*/


/*
# Intuition
    1. Compare arr[mid] with arr[mid + 1] to determine the direction where a peak exists.
    2. If arr[mid] < arr[mid + 1], the array is increasing, so a peak must exist on the right side → move start = mid + 1.
    3. If arr[mid] > arr[mid + 1], the array is decreasing, so the current element or left side contains a peak → move end = mid.
    4. We never discard a half that may contain a peak, ensuring the search space always has at least one valid peak.
    5. When start === end, only one element remains, which is guaranteed to be a peak element.
*/


// Solution
class Solution {
    findPeakElement(arr) {
        if(arr.length == 1){
            return 0;
        }
        let start =0, end = arr.length-1;
        let n = arr.length-1;
        while(start < end){
            let mid = start + Math.floor((end-start)/2);
            if(arr[mid] < arr[mid+1]){
                // move right
                start = mid+1
            }else{
                end = mid;
            }
        }
        return start;
    }
}

/*
# Complexity Analysis

Time Complexity
    O(log n) because the algorithm uses binary search, halving the search space in each iteration of the while loop.

Space Complexity
    O(1) because it only uses a constant amount of extra space for variables (start, end, n, mid) regardless of the input array size.

*/