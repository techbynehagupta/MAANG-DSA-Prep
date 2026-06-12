/*
# Problem Statement:
    Given an array of integers nums of unique elements. Return all possible subsets (power set) of the array.
    Do not include the duplicates in the answer.


Example 1

    Input : nums = [1, 2, 3]

    Output : [ [ ] , [1] , [2] , [1, 2] , [3] , [1, 3] , [2, 3] , [1, 2 ,3] ]

Example 2

    Input : nums = [1, 2]

    Output : [ [ ] , [1] , [2] , [1, 2] ]


# Constraints

    1 <= nums.length <= 10
    -10 <= nums[i] <= 10
*/


/*
# Intuition
  /*
  n = 3
  
  bit = 0 to 7
  000
  001
  010
  011
  100
  101
  110
  111
  if the bit at ith location is 1 push the element and leave it

  NOTE- DP would be more optimal way to solve this, but since we're doing bit manipulation we'll be solving using this
*/


// Solution
class Solution {
    powerSet(nums) {
      let bit = 0;
      let n = nums.length;
      let result = [];
      let max = 1 << n; // 3 digits so max combination till 7
  
      while (bit < max) {
          // for each n bit push the combination;
          let sub =[];
          for(let i=0; i < n; i++){
              if((bit & (1<<i) )!= 0){
                  sub.push(nums[i]);
              }
          }
          result.push([...sub]);
          bit++;
      }
      return result;
    }
  }
  




/*
# Complexity Analysis

Time Complexity
    O(n * 2^n), where n is the length of nums. The outer loop runs 2^n times to generate every subset, and the inner loop runs n times for each subset to check the bits.

Space Complexity
    O(n * 2^n), required to store the 2^n subsets, where the average subset size is n/2, resulting in a total storage requirement proportional to n * 2^n.
*/