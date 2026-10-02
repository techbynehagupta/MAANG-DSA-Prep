/*
# Problem Statement:
    You are given an integer array nums.

    You start with an empty array ans. Repeat the following operation until nums is empty:

    Identify all distinct values currently present in nums.
    Remove one occurrence of every distinct value currently in nums, and append those values to ans in ascending order.
    Return the array ans.

    

    Example 1:

    Input: nums = [3,1,3,2,1,3]

    Output: [1,2,3,1,3,3]

    Explanation:

    Operation	Appended to ans	nums after	ans after
    1	1, 2, 3	[3, 1, 3]	[1, 2, 3]
    2	1, 3	[3]	[1, 2, 3, 1, 3]
    3	3	[]	[1, 2, 3, 1, 3, 3]
    nums is now empty, so the answer is [1, 2, 3, 1, 3, 3].

    Example 2:

    Input: nums = [7,7,4,4,4]

    Output: [4,7,4,7,4]

    Explanation:

    Operation	Appended to ans	nums after	ans after
    1	4, 7	[7, 4, 4]	[4, 7]
    2	4, 7	[4]	[4, 7, 4, 7]
    3	4	[]	[4, 7, 4, 7, 4]
    nums is now empty, so the answer is [4, 7, 4, 7, 4].

    

    Constraints:

    1 <= nums.length <= 100
    1 <= nums[i] <= 100
    */


/*
# Intuition
    1. We need to find out unique elements and their freq in the org array, for which we will make a map.
    2. Once we have the map we'll sort the keys in ascending order, otherwise If we traverse the map everytime, we have to sort out the unique values before pushing in asnwer
    3. We keep the sorted keys in active array, potraying that these keys exists in the map
    4. Traverse through each key and push it in ans array and decrease the freq in map
    5. If the freq of an element becomes zero it means it no longer exists in the map now we don't need to push it in the active array
    6. Create a temp next array, which will keep the track of the keys that still exists in the map to traverse them.
*/


// Solution I
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var rearrangeArray = function (nums) {
    let map = new Map();

    for (let i = 0; i < nums.length; i++) {
        map.set(nums[i], (map.get(nums[i]) || 0) + 1);
    }
    let active = [...map.keys()].sort((a, b) => a - b);
    let ans = [];

    while (active.length > 0) {
        let next = [];

        for (let num of active) {
            ans.push(num);

            let rem = map.get(num) - 1;
            if (rem > 0) {
                map.set(num, rem);
                next.push(num);
            } else {
                map.delete(num)
            }
        }
        active = next;
    }

    return ans;
};


/*
# Complexity Analysis
    TC - O(n+klogk)
        Storing all freq in map O(n) + sorting unique keys O(klogk) + Traversing through all k keys till all the keys are travsering(overall traversing all elements once again O(n))
    SC - O(k)
        Map - O(k) + Active O(k)

*/