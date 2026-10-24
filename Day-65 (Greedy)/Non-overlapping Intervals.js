/*
# Problem Statement:
Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

Note that intervals which only touch at a point are non-overlapping. For example, [1, 2] and [2, 3] are non-overlapping.

 

Example 1:

Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.
Example 2:

Input: intervals = [[1,2],[1,2],[1,2]]
Output: 2
Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping.
Example 3:

Input: intervals = [[1,2],[2,3]]
Output: 0
Explanation: You don't need to remove any of the intervals since they're already non-overlapping.
 

Constraints:

1 <= intervals.length <= 105
intervals[i].length == 2
-5 * 104 <= starti < endi <= 5 * 104
*/


/*
# Intuition
    Code itself is self explanatory
    Goal is to remove interval which is minm in size, so sort by start time then end time

    1. Remove intervals in case of overlap, 2 types of overlap
        1.1 complete overlap - remove previous interval
        1.2 partial overlap - remove current interval
    2. Don't do anything in case of no overlap
*/


// Solution
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
    intervals.sort((i1, i2)=>{
        if(i1[0] == i2[0]){
            return i1[1]-i2[1];
        }
        return i1[0] - i2[0];
    })
    let removedIntervalsCount =0;
    let lastInterval = intervals[0];

    for(let i = 1; i < intervals.length; i++){
        let [ps, pe] = lastInterval;
        let [cs, ce] = intervals[i];
        
        if(cs < pe && pe < ce){
            // partially overallped
            // [ps, pe][cs, ce]=> [ps, cs, pe, ce]
            // Remove current interval so lastInterval will remin same
            removedIntervalsCount++;
        }
        else if(pe >= ce){
            // completely overallped [ps, cs, ce, pe]
            // so remove previous interval
            removedIntervalsCount++
            lastInterval = intervals[i]
        }
        else{
            // no overlap
            lastInterval = intervals[i]
        }
    }
    return removedIntervalsCount;
};



/*
# Complexity Analysis
    TC - O(n)
    SC - O(1)
*/