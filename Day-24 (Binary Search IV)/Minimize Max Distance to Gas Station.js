/*
# Problem Statement:

Given a sorted array arr of size n, containing integer positions of n gas stations on the X-axis, and an integer k, place k new gas stations on the X-axis.
The new gas stations can be placed anywhere on the non-negative side of the X-axis, including non-integer positions.
Let dist be the maximum distance between adjacent gas stations after adding the k new gas stations.
Find the minimum value of dist.
Your answer will be accepted if it is within 1e-6 of the true value.


Example 1

    Input: n = 10, arr = [1, 2, 3, 4, 5, 6 ,7, 8, 9, 10], k = 10

    Output: 0.50000

    Explanation:

    One of the possible ways to place 10 gas stations is [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10].

    Thus the maximum difference between adjacent gas stations is 0.5.

    Hence, the value of dist is 0.5.

    It can be shown that there is no possible way to add 10 gas stations in such a way that the value of dist is lower than this.

Example 2

    Input : n = 10, arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], k = 1

    Output: 1.00000

    Explanation:

    One of the possible ways to place 1 gas station is [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].
    New Gas Station is at 11.
    Thus the maximum difference between adjacent gas stations is still 1.
    Hence, the value of dist is 1.
    It can be shown that there is no possible way to add 1 gas station in such a way that the value of dist is lower than this. 

# Constraints

    10 <= n <= 5000 
    0 <= arr[i] <= 109
    arr is sorted in a strictly increasing order 
    0 <= k <= 105
*/


/*

# Intuition
The idea here is to use the Binary Search algorithm to optimize the approach. The primary objective of the Binary Search algorithm is to efficiently determine the appropriate half to eliminate, thereby reducing the search space by half. It does this by determining a specific condition that ensures that the target is not present in that half.

Observation:
Minimum possible answer: The minimum possible answer is obtained when all the gas stations are placed in a single location. In this case, the maximum distance will be 0.
Maximum possible answer: Stations will not be placed before the first or after the last station; instead, they will be placed in between the existing stations. Therefore, the maximum possible answer is determined by the maximum distance between two consecutive existing stations.
Upon closer observation, it can be recognized that the answer space ranges between [0, max(dist)] and it is sorted. Additionally, a pattern can be identified that allows the space to be divided into two halves: one consisting of potential answers and the other of non-viable options. Therefore, binary search will be applied on the answer space.

Changes in the binary search algorithm to apply it to the decimal answer space:
The traditional binary search algorithm used for integer answer space won't be effective in this case, as the answer space consists of decimal numbers. Changes need to be made to adjust some conditions to tailor the algorithm to this specific context. These changes are as follows:
The condition 'while(low <= high)' inside the 'while' loop won't work for decimal answers and might lead to a TLE (Time Limit Exceeded) error. To avoid this, the condition can be modified to 'while(high - low > 10^(-6))'. This ensures that only differences up to the 6th decimal place are considered. Any differences beyond this decimal precision won't be taken into account, as answers within 10^-6 of the actual answer are explicitly accepted by the question.
The operation 'low = mid + 1' is used to eliminate the left half. However, to ensure that we do not skip over potential decimal numbers and possibly miss the actual answer, 'low = mid' will be used instead.
Similarly, the operation 'high = mid - 1' is used to eliminate the right half. However, to ensure that potential decimal numbers are not overlooked and that the actual answer is not missed, 'high = mid' will be used instead.<.li>
*/


// Solution
class Solution {
    minimiseMaxDistance(arr, k) {
        let n = arr.length;
       let maxHeap = new MaxHeap();
       let howManyPlaced = new Array(n-1).fill(0);
       for(let i=1; i< arr.length; i++){
            let dist = arr[i]-arr[i-1];
            maxHeap.push([dist, i-1]);
       }
        while(k > 0){
            let [dist, i] = maxHeap.pop();
            
            let originalDist = arr[i+1]-arr[i];

            howManyPlaced[i] += 1;

            let newDist = originalDist/(howManyPlaced[i] + 1);

            maxHeap.push([newDist, i])
            k--;
            
        }
        let [dist, i ] = maxHeap.pop();
        return dist;
    }
}
// Max Heap Implementation
class MaxHeap {
  constructor() {
    this.heap = [];
  }
  
  // Swap helper
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
  
  // Push element into heap
  push(pair) {
    this.heap.push(pair);
    this.bubbleUp(this.heap.length - 1);
  }
  
  // Bubble up element at idx
  bubbleUp(idx) {
    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);
      // max-heap based on pair[0]
      if (this.heap[parent][0] >= this.heap[idx][0]) break;
      this.swap(parent, idx);
      idx = parent;
    }
  }
  
  // Pop max element
  pop() {
    if (this.heap.length === 0) return null;
    this.swap(0, this.heap.length - 1);
    const max = this.heap.pop();
    this.bubbleDown(0);
    return max;
  }
  
  // Bubble down element at idx
  bubbleDown(idx) {
    const length = this.heap.length;
    while (true) {
      let left = 2 * idx + 1;
      let right = 2 * idx + 2;
      let largest = idx;
      
      if (left < length && this.heap[left][0] > this.heap[largest][0]) {
        largest = left;
      }
      if (right < length && this.heap[right][0] > this.heap[largest][0]) {
        largest = right;
      }
      
      if (largest === idx) break;
      
      this.swap(largest, idx);
      idx = largest;
    }
  }
  
  // Peek max element
  top() {
    if (this.heap.length === 0) return null;
    return this.heap[0];
  }
}

/*
# Complexity Analysis

Time Complexity
    O(n + k log n) where n is the length of arr; initializing the heap takes O(n) and performing k heap operations (each pop and push) takes O(log n) time per operation.

Space Complexity
    O(n) for the howManyPlaced array and the maxHeap which stores n-1 elements.

*/