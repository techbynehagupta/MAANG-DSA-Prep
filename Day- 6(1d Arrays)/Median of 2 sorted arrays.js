/*
# Problem Statement:
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

 

Example 1:

Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
Example 2:

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

*/


/*
# Intuition
 Go throught notes.md file
*/


// Solution
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    return findMedianSortedArraysHelper(nums1, nums2)
   };
   
   function findMedianSortedArraysHelper(nums1, nums2){
         // Step 1: nums1 should be the smaller array
       if(nums1.length > nums2.length){
           [nums1, nums2] = [nums2, nums1];
       }
   
         // Step 2: Total elements and number needed on the left
       let total = nums1.length + nums2.length;
       const half = Math.floor((total+1)/2);
      
        // Step 3: Binary search on nums1
       let left = 0, right = nums1.length;
   
       while(left <= right){
           // Step 4: Partition nums1
           let partition1 = left + Math.floor((right-left)/2);
           // Step 5: Corresponding partition in nums2
           let partition2 = half - partition1;
   
           // Step 6: Values around the partitions
           let num1Left = partition1 == 0 ? -Infinity: nums1[partition1-1];
           let num2Left = partition2 == 0? -Infinity: nums2[partition2-1];
           let num1Right = partition1 == nums1.length ? Infinity: nums1[partition1];
           let num2Right = partition2 == nums2.length ? Infinity:  nums2[partition2];
   
           if(num1Left <= num2Right && num2Left <= num1Right){
               // we got the correct partion
                // Step 8: Odd number of elements
              if(total%2 != 0){
                 return Math.max(num1Left, num2Left);
              }
               // even number of elements
               // Step 8: Even number of elements
               const leftMax = Math.max(num1Left, num2Left);
               const rightMin = Math.min(num1Right, num2Right);
   
               return (leftMax + rightMin) / 2;
             
           }else if(num1Left > num2Right){
               right = partition1 -1;
           }else{
               left = partition1 +1;
           }
       }
   }
   



/*
# Complexity Analysis
   TC - O(log(min(m, n)))
   SC - O(1)
*/