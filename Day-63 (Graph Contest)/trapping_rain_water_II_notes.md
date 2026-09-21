# Trapping Rain Water II --- DSA Notes

## Problem

Given a 2D grid of heights, find how much water can be trapped after
raining.

Unlike **Trapping Rain Water I**, this is a **2D** problem.

------------------------------------------------------------------------

## 1. Core Intuition

In 1D:

``` text
water at i = min(maxLeft, maxRight) - height[i]
```

In 2D, we cannot simply calculate the maximum height from left, right,
top, and bottom because water can escape through **any direction**.

### Key observation

Water can only be trapped if a cell is surrounded by a boundary/wall.

So think of the problem as:

> Start from the boundary and gradually move towards the inside.

The **lowest boundary cell should be processed first**.

This naturally leads to a:

## Min Heap / Priority Queue

------------------------------------------------------------------------

## 2. Why Min Heap?

Suppose we have:

``` text
      5
    3   4
      2
```

The water level is determined by the **lowest wall through which water
could escape**.

Therefore, we always want to process the cell having the **smallest
current height**.

``` text
Boundary cells
      ↓
   Min Heap
      ↓
Take smallest boundary
      ↓
Explore its neighbors
```

------------------------------------------------------------------------

## 3. Starting Point = All Boundary Cells

Every boundary cell is initially a possible place where water can
escape.

For an `m × n` matrix:

``` text
XXXXXXXXXX
X        X
X        X
X        X
XXXXXXXXXX
```

Put **all boundary cells** into the Min Heap.

Also mark them as:

``` text
visited = true
```

### Why mark visited while inserting?

Suppose two boundary cells have the same neighbor.

If you mark it only when popping, it could be inserted multiple times.

So:

``` text
When pushing into heap:
    visited[nr][nc] = true
```

This guarantees each cell enters the heap only once.

------------------------------------------------------------------------

## 4. What Does the Heap Store?

Store:

``` js
[height, row, col]
```

Example:

``` text
[
    [1, 0, 2],
    [2, 1, 3],
    [3, 4, 0]
]
```

The heap compares based on:

``` text
height
```

So the smallest height comes out first.

------------------------------------------------------------------------

## 5. Main Algorithm

``` text
1. Put every boundary cell into Min Heap.
2. Mark all boundary cells visited.
3. While heap is not empty:
       take the cell with minimum height

       check its 4 neighbours

       for every unvisited neighbour:

           mark visited

           if neighbour height < current water level:
               water can be trapped

           calculate new effective height

           push neighbour into heap
```

------------------------------------------------------------------------

## 6. Most Important Formula

Suppose current cell has height:

``` text
currentHeight
```

and neighbour has:

``` text
neighborHeight
```

### Case 1: Neighbor is lower

``` text
current = 5
neighbor = 2
```

We can trap:

``` text
5 - 2 = 3
```

So:

``` js
water += currentHeight - neighborHeight;
```

------------------------------------------------------------------------

### Case 2: Neighbor is higher

``` text
current = 5
neighbor = 8
```

No water can be trapped.

``` text
water += 0
```

------------------------------------------------------------------------

## 7. Effective Height --- VERY IMPORTANT

After processing a neighbour, what height should we put into the heap?

Not necessarily its original height.

Use:

``` js
newHeight = Math.max(currentHeight, neighborHeight);
```

### Why?

Suppose:

``` text
currentHeight = 5
neighborHeight = 2
```

We trap:

``` text
5 - 2 = 3
```

But after filling the cell with water, its **effective boundary height
becomes 5**.

So we push:

``` text
[5, neighborRow, neighborCol]
```

not:

``` text
[2, neighborRow, neighborCol]
```

This is one of the most important concepts in the problem.

------------------------------------------------------------------------

## 8. Combined Formula

Instead of writing separate cases:

``` js
if (neighborHeight < currentHeight) {
    water += currentHeight - neighborHeight;
}
```

you can write:

``` js
water += Math.max(0, currentHeight - neighborHeight);
```

Then:

``` js
const newHeight = Math.max(currentHeight, neighborHeight);
```

So the processing becomes:

``` js
water += Math.max(0, currentHeight - neighborHeight);

heap.push([
    Math.max(currentHeight, neighborHeight),
    nr,
    nc
]);
```

------------------------------------------------------------------------

## 9. Why `max(currentHeight, neighborHeight)`?

Think of this:

``` text
Boundary
  |
  | 5
  ↓
  5 ───────── water level
  |
  2 ← cell
```

The cell originally has height `2`.

After trapping water:

``` text
5
│~~~~~~~~ water
│
2
```

So for future cells, this location behaves like a wall of height:

``` text
5
```

Therefore:

``` text
effectiveHeight = max(previousBoundary, currentCellHeight)
```

------------------------------------------------------------------------

## 10. Example

Consider:

``` js
[
  [5, 5, 5, 5],
  [5, 1, 1, 5],
  [5, 1, 1, 5],
  [5, 5, 5, 5]
]
```

Boundary:

``` text
5 5 5 5
5       5
5       5
5 5 5 5
```

Interior cells have height `1`.

Water level:

``` text
5
```

Each interior cell can hold:

``` text
5 - 1 = 4
```

There are 4 interior cells.

Answer:

``` text
4 × 4 = 16
```

------------------------------------------------------------------------

## 11. Why We Process the Smallest Boundary First

Imagine:

``` text
10  10  10
10   2   5
10   3  10
```

The cell with height `5` cannot necessarily hold water up to `10`.

We need to consider the **lowest escape boundary**.

That's why the Min Heap is crucial:

``` text
smallest boundary
       ↓
process it first
       ↓
expand inward
       ↓
update effective water boundary
```

------------------------------------------------------------------------

## 12. Connection to Dijkstra

A useful way to remember the problem:

### Dijkstra

``` text
Take smallest distance
        ↓
Expand neighbors
        ↓
Update their best distance
```

### Trapping Rain Water II

``` text
Take smallest boundary height
        ↓
Expand neighbors
        ↓
Update their effective boundary height
```

The heap plays a similar role.

------------------------------------------------------------------------

## 13. Why BFS Alone Doesn't Work

Normal BFS uses:

``` text
Queue
```

and processes based on:

``` text
number of edges
```

But here we need to process based on:

``` text
minimum height
```

Therefore:

``` text
BFS ❌
Min Heap ✅
```

This is essentially a **priority-queue-based flood fill**.

------------------------------------------------------------------------

## 14. Four Directions

For every popped cell:

``` js
const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
];
```

For each:

``` js
nr = row + dr;
nc = col + dc;
```

Check:

``` text
1. Inside grid?
2. Already visited?
```

If valid:

``` text
mark visited
calculate trapped water
push into heap
```

------------------------------------------------------------------------

## 15. Important Implementation Detail

### Mark a cell visited when inserting it into the heap

``` js
if (!visited[nr][nc]) {
    visited[nr][nc] = true;
    heap.push(...);
}
```

This ensures:

``` text
Every cell → pushed once
```

------------------------------------------------------------------------

## 16. Pseudocode

``` text
Create minHeap

Add all boundary cells to heap
Mark boundary cells visited

water = 0

while heap is not empty:

    [height, row, col] = heap.pop()

    for each of 4 directions:

        find neighbor

        if outside:
            continue

        if already visited:
            continue

        mark neighbor visited

        water += max(0, height - neighborHeight)

        newHeight = max(height, neighborHeight)

        heap.push(newHeight, neighbor)

return water
```

------------------------------------------------------------------------

## 17. Complexity

Let:

``` text
M = number of rows
N = number of columns
```

Total cells:

``` text
M × N
```

Every cell is:

``` text
visited once
pushed into heap once
popped from heap once
```

Each heap operation:

``` text
O(log(MN))
```

Therefore:

``` text
Time = O(MN log(MN))
```

Space:

``` text
Visited = O(MN)
Heap    = O(MN)
```

Therefore:

``` text
Space = O(MN)
```

------------------------------------------------------------------------

# Revision Cheat Sheet

When you see:

> **2D grid + trapping water + arbitrary heights**

Think:

``` text
                    Trapping Rain Water II
                              |
                         2D Grid
                              |
                    Water can escape
                    through the boundary
                              |
                  Add ALL boundary cells
                              |
                         Min Heap
                              |
                  Take lowest boundary
                              |
                     Explore 4 neighbours
                              |
                 ┌────────────┴────────────┐
                 ↓                         ↓
        neighbour < height        neighbour >= height
                 ↓                         ↓
        trap water                 no water
                 ↓
     water += height - neighbour
                 |
                 ↓
 effectiveHeight = max(height, neighbour)
                 |
                 ↓
          push into Min Heap
```

## ⭐ Things to Remember

-   **2D → don't try left/right max like Rain Water I.**
-   Start from **all boundary cells**.
-   Use a **Min Heap**.
-   Always process the **lowest current boundary**.
-   Mark `visited` **when pushing into heap**.
-   Water trapped:

``` js
Math.max(0, currentHeight - neighborHeight)
```

-   New effective height:

``` js
Math.max(currentHeight, neighborHeight)
```

-   Explore **4 directions**.
-   Every cell is processed once.
-   Complexity:

``` text
O(M × N × log(M × N))
```

-   Think of it as **Dijkstra / priority-queue flood fill**.
