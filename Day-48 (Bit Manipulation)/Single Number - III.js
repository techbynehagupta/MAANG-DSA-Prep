/*
# Problem Statement:
    Given an array nums of length n, every integer in the array appears twice except for two integers. Identify and return the two integers that appear only once in the array. Return the two numbers in ascending order.
    For example, if nums = [1, 2, 1, 3, 5, 2], the correct answer is [3, 5], not [5, 3].


Example 1

    Input : nums = [1, 2, 1, 3, 5, 2]

    Output : [3, 5]

    Explanation : The integers 3 and 5 have appeared only once.

Example 2

    Input : nums = [-1, 0]

    Output : [-1, 0]

    Explanation : The integers -1 and 0 have appeared only once.

# Constraints

    2 <= nums.length <= 105
    -3*105 <= nums[i] <= 3*105
Every integer in nums appears twice except two integers.
*/


/*
# Intuition
    1. The idea is to seperate out 2 different number into 2 different array so that we can use xor trick as every other number is repeadted even no. of times excluding the unique one
    2. How to seperate using the rightmost set bit
        1. if we take xor of all numbers we can get xor of 2 unique numbers present and we can differentiate them using the rightmost set bit
        2. find the pos of rightmost set bit and use that 2 seperate them into 2 different arrays
    3. do xor of both the arrays seperately the unique number will come out, as it turns into single number-I

*/


// Solution
class Solution {
    singleNumber(nums) {
      let xor = 0;
      for (let el of nums) {
        xor = el ^ xor;
      }
      
      // find the rightmost set bit
      let pos = -1;
      for (let i = 0; i < 32; i++) {
        if ((xor & (1 << i)) != 0) {
          pos = i;
          break;
        }
      }
  
      // seperate the unique numbers using rightmost set bit
      let arr1 = [];
      let arr2 = [];
      for (let i = 0; i < nums.length; i++) {
        if ((nums[i] & (1 << pos)) != 0) {
          arr1.push(nums[i]);
        } else {
          arr2.push(nums[i]);
        }
      }
  
      // Xor of both arrays to bring out unique numbers
      let num1 = 0,
        num2 = 0;
      for (let i = 0; i < arr1.length; i++) {
        num1 ^= arr1[i];
      }
      for (let j = 0; j < arr2.length; j++) {
        num2 ^= arr2[j];
      }
  
      return num1 > num2 ? [num2, num1] : [num1, num2];
    }
  }



/*
# Complexity Analysis

Time Complexity
    O(n), where n is the number of elements in nums. The first loop runs n times, the second loop runs 32 times (constant), the third loop runs n times, and the final two loops together run n times, resulting in 3n + 32 operations.

Space Complexity
    O(n), required for the arrays arr1 and arr2 which collectively store all n elements from the input array.
*/