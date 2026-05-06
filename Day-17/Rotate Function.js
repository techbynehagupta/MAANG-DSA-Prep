/*
# Problem Statement
You are given an integer array nums of length n.

Assume arrk to be an array obtained by rotating nums by k positions clock-wise. We define the rotation function F on nums as follow:

F(k) = 0 * arrk[0] + 1 * arrk[1] + ... + (n - 1) * arrk[n - 1].
Return the maximum value of F(0), F(1), ..., F(n-1).

The test cases are generated so that the answer fits in a 32-bit integer.

 

# Example 1:

Input: nums = [4,3,2,6]
Output: 26
Explanation:
F(0) = (0 * 4) + (1 * 3) + (2 * 2) + (3 * 6) = 0 + 3 + 4 + 18 = 25
F(1) = (0 * 6) + (1 * 4) + (2 * 3) + (3 * 2) = 0 + 4 + 6 + 6 = 16
F(2) = (0 * 2) + (1 * 6) + (2 * 4) + (3 * 3) = 0 + 6 + 8 + 9 = 23
F(3) = (0 * 3) + (1 * 2) + (2 * 6) + (3 * 4) = 0 + 2 + 12 + 12 = 26
So the maximum value of F(0), F(1), F(2), F(3) is F(3) = 26.

# Example 2:

Input: nums = [100]
Output: 0
 

# Constraints:

n == nums.length
1 <= n <= 105
-100 <= nums[i] <= 100


*/

// Solution

function rotate(nums){
    let sum = nums.reduce((acc, el)=>acc+el, 0);

    let n = nums.length;
    let Fk = new Array(n);
    Fk[0] = nums.reduce((acc, el, index)=>acc + el*index, 0);
    let max= Fk[0];
    for(let i=1, j = n-1; i<n; i++, j--){
        Fk[i] = Fk[i-1] + sum - n*nums[j];
        max = Math.max(max, Fk[i]);
    }
    return max;
}


/*
Intuition:

We are given a rotation function:
F(k) = 0 * arr[k][0] + 1 * arr[k][1] + ... + (n-1) * arr[k][n-1]

---

Step 1: Compute F(0)

Example:
nums = [4, 3, 2, 6]

F(0) = (0 * 4) + (1 * 3) + (2 * 2) + (3 * 6)
     = 0 + 3 + 4 + 18
     = 25

---

Step 2: Understand what changes on rotation

When we rotate the array clockwise by 1:
- Every element’s index increases by +1
- The last element moves to index 0

---

Step 3: Transition from F(k-1) → F(k)

If all elements shift right:
- Each element contributes +value once more → total +sum(nums)

But:
- The element that moves from last → front
  was previously multiplied by (n-1)
  and now becomes multiplied by 0

So we must subtract its full contribution:
→ subtract n * nums[j]

Why n and not (n-1)?
Because:
- We already added +nums[j] as part of total sum
- So net removal becomes n * nums[j]

---

Final Relation:

F(k) = F(k-1) + sum(nums) - n * nums[j]

Where:
- j moves from (n-1 → 0)

---

Example rotations:

nums = [4, 3, 2, 6]

F(0): indices → [0, 1, 2, 3]

F(1): [6, 4, 3, 2]
      indices → [0, 1, 2, 3]
      (6 moved from index 3 → 0)

F(2): [2, 6, 4, 3]
      (2 moved last in previous step)

F(3): [3, 2, 6, 4]

---

Key Takeaway:

- Compute F(0) and sum(nums)
- Use recurrence to compute next values in O(1)
- Overall complexity becomes O(n)
*/
