/*
# Problem Statement:
Given an array nums of size n, which denotes the positions of stalls, and an integer k, which denotes the number of aggressive cows, assign stalls to k cows such that the minimum distance between any two cows is the maximum possible. Find the maximum possible minimum distance.


Example 1

    Input: n = 6, k = 4, nums = [0, 3, 4, 7, 10, 9]

    Output: 3

    Explanation:

    The maximum possible minimum distance between any two cows will be 3 when 4 cows are placed at positions [0, 3, 7, 10]. Here the distances between cows are 3, 4, and 3 respectively.

    In no manner can we increase the minimum distance beyond 3.

Example 2

    Input : n = 5, k = 2, nums = [4, 2, 1, 3, 6]

    Output: 5

    Explanation: The maximum possible minimum distance between any two cows will be 5 when 2 cows are placed at positions [1, 6]. 

#Constraints

  2 <= n <= 105
  2 <= k <= n
  0 <= nums[i] <= 109
*/


/*
# Intuition
    1. Binary search works here since the search space is sorted
    2. Search space- From 1st stall to last stall how many cows can be placed, need to sort the array first
    3. Mindistance - minim distance b/w any 2 stalls out of all stalls
    4. MaxDistance -  max distance b/w any 2 stalls out of all stalls
    5. If we take a mid distance, how many cows can be placed at that much distance?
    6. If cows placed at mid distance >= cows we have, then we need to reduce the search space, by changing minDistance, as now we need to increse the distance as we want to know to max distance at which the k cows can be placed
    7. countCows- If we start from stall 1 and keep a distance of mid then how many max cows can be placed
*/


// Solution
class Solution {
    countCows(nums, currDistance){
        let cowPlaced =0;
        let lastCowPlacedAt = 0;
        for(let i=0; i<nums.length; i++){
            if(i==0){
                cowPlaced++;
                lastCowPlacedAt = nums[i];
            }else{
                if(nums[i]- lastCowPlacedAt >= currDistance){
                    cowPlaced++;
                    lastCowPlacedAt = nums[i];
                }
            }
        }
        return cowPlaced;
        
    }
    findMinDistance(nums){
        let minDistace = Infinity;
        for(let i=1; i< nums.length; i++){
            if(nums[i]- nums[i-1] < minDistace){
                minDistace = nums[i]- nums[i-1];
            }
        }
        return minDistace;
    }
    aggressiveCows(nums, k) {
        if(nums.length < k){
            return -1;
        }
        nums.sort((a,b)=>a-b);
        let minDistance = this.findMinDistance(nums)
        let maxDistance = nums[nums.length-1]- nums[0];
        let res = -1;
        while(minDistance <= maxDistance){
            let currDistance = minDistance + Math.floor((maxDistance-minDistance)/2);
            let cowsAtCurrDistance = this.countCows(nums, currDistance);
            console.log(currDistance, cowsAtCurrDistance);
            if(cowsAtCurrDistance >= k){
                res = currDistance;
                minDistance = currDistance+1;
            }else{
                maxDistance = currDistance-1;
            }
        }
        return res;
    }
}

/*
# Complexity Analysis

Time Complexity
    O(N log N + N log(max-min)), where N log N is for sorting, and N log(max-min) is the binary search execution where each step performs an O(N) linear scan.

Space Complexity
    O(1), assuming the sorting algorithm is in-place or constant stack space usage, as no additional data structures proportional to N are initialized.
*/