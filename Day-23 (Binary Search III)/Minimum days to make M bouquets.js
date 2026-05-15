/*
# Problem Statement:
Given n roses and an array nums where nums[i] denotes that the 'ith' rose will bloom on the nums[i]th day, only adjacent bloomed roses can be picked to make a bouquet. Exactly k adjacent bloomed roses are required to make a single bouquet. Find the minimum number of days required to make at least m bouquets, each containing k roses. Return -1 if it is not possible.


Example 1

    Input: n = 8, nums = [7, 7, 7, 7, 13, 11, 12, 7], m = 2, k = 3

    Output: 12

    Explanation: On the 12th the first 4 flowers and the last 3 flowers would have already bloomed. So, we can easily make 2 bouquets, one with the first 3 and another with the last 3 flowers.

Example 2

    Input: n = 5, nums = [1, 10, 3, 10, 2], m = 3, k = 2

    Output: -1

    Explanation: If we want to make 3 bouquets of 2 flowers each, we need at least 6 flowers. But we are given only 5 flowers, so, we cannot make the bouquets.

#Constraints

    1 <= n <= 105
    1 <= nums[i] <= 109
    1 <= m <= 106
    1 <= k <= n
*/


/*

# Intuition
    1. Binary search works here since the search space is sorted
    2. Search space- No of days from when the first roses will blossom to all roses will blossom
    3. Min days- first roses will blossom
    4. Max Days- All roses will blossom
    5. Find day when m*k roses will blossom , but adjacent 
    6. for finding adjacent blossom roses, use sliding window to find adjacent roses (similar problem to how many ones's are together in array)
    7. Ex-  [7, 7, 7, 7, 13, 11, 12, 7] for 7th day we can say our array would look like
        [1,1,1,1, 0, 0, 0, 1] where 1 indicate rose is blossomed while 0 is not blossomed
        pply sliding window to find max adjacent roses and form bouquet out of it
    8. If no. of bouqet formed at a particular day is >= needed bouqets, that means we can minimize our search space to [start, currDays-1]

*/


// Solution
class Solution {
    countBouquets(n, nums, day, k){
        let left = -1, right = 0;
        let bouqetFormed =0;
        while(right < n){
            if(nums[right] >day){
                let windowSize = right-left-1;
                bouqetFormed += Math.floor(windowSize/k);
                left = right;
            }
            right++;
        }
        let windowSize = right-left-1;
        bouqetFormed += Math.floor(windowSize/k);
        return bouqetFormed;
    }
    roseGarden(n, nums, k, m) {
        if(n < k*m){
            // total no. of roses is less than the no. of roses needed 
            return -1;
        }
        let minDays = Math.min(...nums);
        let maxDays = Math.max(...nums);
        let res = maxDays;
        while(minDays <= maxDays){
            let currDay = minDays + Math.floor((maxDays-minDays)/2);
            let bouqetFormed = this.countBouquets(n, nums, currDay, k);
            if(bouqetFormed >= m){
                res = currDay;
                maxDays = currDay-1;
            }else{
                minDays = currDay+1;
            }
        }
        return res;
    }
   
}


/*
# Complexity Analysis

Time Complexity
    O(n log(max(nums)-min(nums))), where n is the number of elements in nums and the log factor comes from the binary search range of days; findHowManyBouqets iterates through the array once in O(n) per binary search step.

Space Complexity
    O(1), as the algorithm uses a fixed number of variables (left, right, bouqetFormed, minDays, maxDays, res, currDay) regardless of the input size.


*/