/*
# Problem Description

    Given a 2D Matrix A of dimensions N*N, we need to return the sum of all possible submatrices.



# Problem Constraints

    1 <= N <=30
    0 <= A[i][j] <= 10



# Input Format

    Single argument representing a 2-D array A of size N x N.



# Output Format

    Return an integer denoting the sum of all possible submatrices in the given matrix.



# Example Input

    Input 1:
    A = [ [1, 1]
        [1, 1] ]

    Input 2:
    A = [ [1, 2]
        [3, 4] ]


# Example Output

    Output 1:
    16
    Output 2:
    40


# Example Explanation

    Example 1:
    Number of submatrices with 1 elements = 4, so sum of all such submatrices = 4 * 1 = 4
    Number of submatrices with 2 elements = 4, so sum of all such submatrices = 4 * 2 = 8
    Number of submatrices with 3 elements = 0
    Number of submatrices with 4 elements = 1, so sum of such submatrix = 4
    Total Sum = 4+8+4 = 16

    Example 2:
    The submatrices are [1], [2], [3], [4], [1, 2], [3, 4], [1, 3], [2, 4] and [[1, 2], [3, 4]].
    Total sum = 40
*/

// Approach is to find contribution of a number in all submatrices
/*


##  1D Case — Understanding the Core Idea

Consider an array:
`A = [1, 2, 3, 4]`

Let’s find how many **subarrays** include a particular element (say `A[i]`).

---

### Step 1: Count how many subarrays include `A[i]`

For index `i` (0-based) and total length `n`:

* **Left choices (start point):**
  Subarray can start anywhere from index `0` to `i`
  → number of choices = `i + 1`

* **Right choices (end point):**
  Subarray can end anywhere from index `i` to `n - 1`
  → number of choices = `n - i`

So total subarrays including `A[i]` =
[
(i + 1) * (n - i)
]

 Example:
For `A = [1, 2, 3, 4]`, `i = 1` (element = 2)
[
(1 + 1) * (4 - 1) = 2 * 3 = 6
]
That matches your list: `[1,2], [1,2,3], [1,2,3,4], [2], [2,3], [2,3,4]`

---

### Step 2: Compute total contribution

If each subarray’s sum contributes `A[i]` once for each occurrence,
then total contribution of `A[i]` =
[
A[i] * (i + 1) * (n - i)
]

Example:
For element `2` → contribution = `2 * 6 = 12`.

---

##  2D Case — Extending the Same Idea

Now consider a 2D matrix:

[

1  2  3 
4  5  6 
7  8  9

]

Let’s find the **contribution of each element** (say element at position `(i, j)`).

---

### Step 1: Count submatrices that include `(i, j)`

Each submatrix is defined by:

* top-left corner `(r1, c1)`
* bottom-right corner `(r2, c2)`
  where `r1 ≤ i ≤ r2` and `c1 ≤ j ≤ c2`

So:

* Possible top-left corners:

  * Row choices: `i + 1` (from 0 to i)
  * Column choices: `j + 1` (from 0 to j)
    → total = `(i + 1) * (j + 1)`

* Possible bottom-right corners:

  * Row choices: `n - i` (from i to n-1)
  * Column choices: `m - j` (from j to m-1)
    → total = `(n - i) * (m - j)`

Therefore, total submatrices including `(i, j)` =
[
(i + 1) * (j + 1) * (n - i) * (m - j)
]

---

### Step 2: Compute contribution

Each submatrix sum includes `A[i][j]` once for each submatrix containing it,
so contribution =
[
A[i][j] * (i + 1) * (j + 1) * (n - i) * (m - j)
]

---

###  Example:

Take element `5` at `(1, 1)` (0-based) in 3x3 matrix

[
(1 + 1) * (1 + 1) * (3 - 1) * (3 - 1) = 2 * 2 * 2 * 2 = 16
]
So 5 appears in 16 different submatrices.

Total contribution of 5 = `5 * 16 = 80`.

---

Summary of Formulae

| Case | Position | Subarrays/Submatrices Count | Contribution                      |
| ---- | -------- | --------------------------- | --------------------------------- |
| 1D   | `i`      | `(i+1)*(n-i)`               | `A[i]*(i+1)*(n-i)`                |
| 2D   | `(i, j)` | `(i+1)*(j+1)*(n-i)*(m-j)`   | `A[i][j]*(i+1)*(j+1)*(n-i)*(m-j)` |

NOTE- Refer to notes for more clarity Page number- 5
*/


function sumOfAllSubmatrices(A){
    let rowLength = A.length;
    let colLength = A[0].length;
    let contribution =0;
    for(let i=0; i<rowLength; i++){
        for(let j=0; j<colLength; j++){
            contribution += A[i][j]*(i+1)*(j+1)*(rowLength-i)*(colLength-j)
        }
    }
    return contribution;
}
console.log(sumOfAllSubmatrices([[1,1],[1,1]]))
console.log(sumOfAllSubmatrices([[1,2],[3,4]]))


// Time Complexity - O(n)
// Space Complexity - O(n)