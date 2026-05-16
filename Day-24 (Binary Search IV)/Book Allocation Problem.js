/*
# Problem Statement:

    Given an array nums of n integers, where nums[i] represents the number of pages in the i-th book, and an integer m representing the number of students, allocate all the books to the students so that each student gets at least one book, each book is allocated to only one student, and the allocation is contiguous.
    Allocate the books to m students in such a way that the maximum number of pages assigned to a student is minimized. If the allocation of books is not possible, return -1.


Example 1

    Input: nums = [12, 34, 67, 90], m=2

    Output: 113

    Explanation: The allocation of books will be 12, 34, 67 | 90. One student will get the first 3 books and the other will get the last one.

Example 2

    Input: nums = [25, 46, 28, 49, 24], m=4

    Output: 71

    Explanation: The allocation of books will be 25, 46 | 28 | 49 | 24.


# Constraints

    1 <= n, m <= 104
    1 <= nums[i] <= 105
*/


/*

# Intuition
    We need to minimize the maximum pages assigned to a student, which hints at Binary Search on Answer.
    The answer range lies between:
    Minimum possible = largest book (max(arr)) because a book cannot be split.
    Maximum possible = total pages (sum(arr)) if one student takes all books.

    For every possible answer (mid), ask:

    Can we allocate books contiguously so that no student gets more than mid pages?

    If allocation is possible using ≤ m students, try a smaller maximum (end = mid - 1) because we want the minimum answer.
    If allocation is not possible, increase the limit (start = mid + 1) since students need more page capacity.
*/


// Solution
class Solution {
    countChild(nums, pages){
        let childCount =0;
        let currAllocation =0;
        for(let i=0; i< nums.length; i++){
            currAllocation += nums[i];
            if(currAllocation > pages){
                childCount++;
                currAllocation = nums[i];
            }
            // console.log(nums[i], childCount)
        }
        if(currAllocation != 0){
            childCount++;
        }
        return childCount;
    }
    findPages(nums, m) {
        if(m > nums.length){
            return -1;
        }
        let minPages = Math.max(...nums);
        let maxPages = nums.reduce((acc, el) => acc+el, 0);
        let res = -1;
        while(minPages <= maxPages){
            let currPages = minPages + Math.floor((maxPages-minPages)/2);
            let  childHavingCurrPages = this.countChild(nums, currPages);
            if(childHavingCurrPages <= m){
                res = currPages;
                maxPages = currPages-1;
            }else{
                minPages = currPages+1;
            }
        }
        return res;
    }

}



/*
# Complexity Analysis

Time Complexity
    O(n * log(S)), where n is the length of nums and S is the sum of elements in nums. The function findPages performs binary search on the range of pages [max(nums), sum(nums)], taking O(log(S)) iterations, and each iteration calls countChild, which performs a linear scan O(n).

Space Complexity
    O(1), excluding the input array, as the algorithm uses a constant amount of extra space for variables like minPages, maxPages, currPages, childCount, and currAllocation.
*/