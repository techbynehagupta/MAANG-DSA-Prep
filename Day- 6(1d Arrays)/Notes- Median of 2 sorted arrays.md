## Median of Two Sorted Arrays

The tricky part of this problem is that we have **two sorted arrays**, but we are not allowed to merge them because the required time complexity is:

```text
O(log(m + n))
```

So instead of merging, we use **binary search to find the correct partition**.

### 1. First, understand the median

For an odd number of elements:

```text
[1, 2, 3, 4, 5]
       ↑
    median
```

Median = `3`

For an even number of elements:

```text
[1, 2, 3, 4]
    ↑  ↑
```

There are two middle numbers.

```text
median = (2 + 3) / 2
       = 2.5
```

---

### 2. Our goal

Imagine putting a partition in both arrays:

```text
nums1 = [1, 3 | 8]
nums2 = [2, 4 | 9, 10]
```

We want:

```text
LEFT | RIGHT
```

such that:

* The LEFT side contains half of all elements.
* Every element on the LEFT is smaller than or equal to every element on the RIGHT.

Because both arrays are already sorted, we only need to check the numbers immediately around the partitions.

---

### 3. Always binary-search the smaller array

If:

```text
nums1 = [1, 3, 8]       → 3 elements
nums2 = [2, 4, 9, 10]   → 4 elements
```

we binary-search `nums1`.

Why?

* It keeps the partition calculation valid.
* It reduces the binary-search work.
* Complexity becomes `O(log(min(m, n)))`.

So we first make sure:

```js
if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
}
```

---

### 4. Calculate how many elements should be on the LEFT

Suppose:

```text
nums1 = [1, 3, 8]
nums2 = [2, 4, 9, 10]
```

Total elements:

```text
3 + 4 = 7
```

For 7 elements, we want 4 elements on the LEFT:

```text
LEFT = 4
RIGHT = 3
```

So:

```js
const half = Math.floor((total + 1) / 2);
```

The `+1` makes the LEFT side contain one extra element when the total is odd.

---

### 5. Choose a partition in `nums1`

We binary-search possible partition positions.

For:

```text
nums1 = [1, 3, 8]
```

possible partitions are:

```text
| 1 3 8
1 | 3 8
1 3 | 8
1 3 8 |
```

So:

```text
partition1 = 0, 1, 2, or 3
```

We use binary search:

```js
const partition1 =
    left + Math.floor((right - left) / 2);
```

Important:

> `partition1` tells us **how many elements we put on the LEFT**, not the index of the element.

For example:

```text
partition1 = 2

[1, 3 | 8]
```

Two elements are on the left.

---

### 6. Calculate the partition in `nums2`

Suppose:

```text
half = 4
partition1 = 2
```

We already took 2 elements from `nums1`.

Therefore we need:

```text
4 - 2 = 2
```

elements from `nums2`.

So:

```js
const partition2 = half - partition1;
```

Now:

```text
nums1 = [1, 3 | 8]
nums2 = [2, 4 | 9, 10]
```

LEFT contains:

```text
2 + 2 = 4 elements
```

Exactly what we wanted.

---

### 7. Look at the 4 important values

We only care about the values immediately around the partitions:

```text
nums1 = [1, 3 | 8]
              ↑

nums2 = [2, 4 | 9, 10]
              ↑
```

So:

```text
nums1Left  = 3
nums1Right = 8

nums2Left  = 4
nums2Right = 9
```

---

### 8. Check whether the partition is correct

We want everything on the LEFT to be smaller than everything on the RIGHT.

Because the arrays are sorted, we only need two checks:

```js
nums1Left <= nums2Right
nums2Left <= nums1Right
```

For our example:

```text
3 <= 9 ✅
4 <= 8 ✅

```

So the partition is correct.

---

### 9. What if the partition is wrong?

There are two possibilities.

#### Case 1: nums1Left > nums2Right

```text
nums1 = [1, 7 | 8, 9]
nums2 = [2, 3 | 5, 10]
```

nums1Left  = 7
nums2Right = 5

Therefore: 7 can't be at the left side of array, as we want all elements at left side <= right side
7 <= 5 ❌


#We have:
```text
LEFT              RIGHT

... 7      |      5 ...
    ↑              ↑

```text

A 7 is sitting on the LEFT while a smaller 5 is on the RIGHT.

So we need to move 7 out of the LEFT.

How?

Take fewer elements from nums1.

Therefore move the partition in nums1 LEFT:

nums1 = [1 | 7, 8, 9]

So:
```text
if (nums1Left > nums2Right) {
    right = partition1 - 1;
}
```
--- 

#### Case 2: nums2Left > nums1Right

nums1Right smaller:

```text
nums1 = [1 | 4, 8, 9]
nums2 = [2, 3, 7 | 10]
```

Now:

nums2Left  = 7
nums1Right = 4

Therefore:

7 <= 4 ❌

Look at what happened:

```text

LEFT              RIGHT

... 7      |      4 ...
    ↑              ↑
```

A 7 is on the LEFT while a smaller 4 is on the RIGHT.

But this time the 7 came from nums2.

We need to move 7 from the LEFT to the RIGHT.

Since partition2 is calculated as:

partition2 = half - partition1

the way to put more elements into the LEFT from nums1 is to move partition1 RIGHT.

So:
```text
else {
    left = partition1 + 1;
}
```
The easiest way to understand the direction

Don't memorize:

> → left
> → right

Instead ask:

nums1Left > nums2Right
nums1Left = TOO BIG

We have taken too many elements from nums1.

➡️ Take fewer from nums1.

➡️ Move partition1 LEFT.

right = partition1 - 1;
nums2Left > nums1Right
nums2Left = TOO BIG

We have taken too few elements from nums1.

➡️ Take more from nums1.

➡️ Move partition1 RIGHT.

left = partition1 + 1;
So the binary-search logic is simply:

### 10. Once the partition is correct, find the median

#### Odd number of elements

Example:

```text
nums1 = [1, 3 | 8]
nums2 = [2, 4 | 9, 10]
```

LEFT:

```text
1, 3, 2, 4
```

The largest value on the LEFT is:

```text
max(3, 4) = 4
```

So:

```js
median = Math.max(nums1Left, nums2Left);
```

---

### 11. Even number of elements

Suppose:

```text
nums1 = [1, 2 | 5]
nums2 = [3 | 4]
```

The two middle numbers are:

```text
2 and 3
```

We get them using:

```js
leftMax = Math.max(nums1Left, nums2Left);
rightMin = Math.min(nums1Right, nums2Right);
```

Then:

```js
median = (leftMax + rightMin) / 2;
```

---

### 12. Handle empty sides

Sometimes the partition is at the beginning:

```text
| 1 2 3
```

There is no value on the LEFT.

We use:

```js
- Infinity
```

Sometimes the partition is at the end:

```text
1 2 3 |
```

There is no value on the RIGHT.

We use:

```js
Infinity
```

This lets our comparisons continue working without special cases everywhere.

---

### 13. The entire thought process

When solving this problem, think:

```text
1. Make nums1 the smaller array.

2. Find how many elements belong on LEFT.

3. Binary-search where to partition nums1.

4. Calculate partition2 automatically.

5. Look at the 4 values around the partitions.

6. Is the partition correct?
       ↓
   YES → calculate median

   NO → move partition
          ↓
       too far right → LEFT
       too far left  → RIGHT
```

### The one picture to remember

```text
              LEFT          RIGHT

nums1       [ ...... | ...... ]
                     ↑
                partition1

nums2       [ ...... | ...... ]
                     ↑
                partition2
```

Correct partition means:

```text
nums1Left <= nums2Right
AND
nums2Left <= nums1Right
```

Once you find that partition:

```text
ODD:
median = max(left values)

EVEN:
median = (max(left values) + min(right values)) / 2
```

That's the whole problem.

The code looks complicated mainly because we have to handle the **edge cases where a partition is at the beginning or end of an array**. The actual idea is just:

> **Find the boundary that divides all numbers into a correct LEFT half and RIGHT half.**
