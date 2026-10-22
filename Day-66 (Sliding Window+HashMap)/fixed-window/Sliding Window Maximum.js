/*
# Problem Statement:
You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

 

Example 1:

Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
Example 2:

Input: nums = [1], k = 1
Output: [1]
 

Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
1 <= k <= nums.length
*/


/*
# Intuition
    1. use fixed size sliding window concept here
    2. Insert all k elements first and get max out of it
    3. for every further index, insert it in heap and check whether the top index is actually stale or valid, by calculating valid left index
        once you know the valid window boundary you can compare whether the max element is outside that boundary if yes then keep removing until you get a valid window element
    4. once you get valid element, push it in the output array and do same for all rest element till nums.length
*/


// Solution
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
 // [1,-1] k =1n =2
 // [[1, 0]]
 var maxSlidingWindow = function(nums, k) {
    let mH = new MaxHeapNew(); 
    let op= [];
    for(let i=0; i < Math.min(k, nums.length) ; i++){
        mH.insert([nums[i], i]);
    }
    op.push(mH.getMax()[0]);

    for(let right = k; right < nums.length; right++){
        let validLeft = right-k + 1;

        mH.insert([nums[right], right]);
        let [max, index] = mH.getMax();

        while(index < validLeft){
            mH.extractMax();
           ([max, index] = mH.getMax());
        }
        op.push(mH.getMax()[0]);
    }
    return op;
};


class MaxHeapNew {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    peek() {
        return this.heap.length === 0 ? null : this.heap[0];
    }

    insert([value, index]) {
        this.heap.push([value, index]);
        this.bubbleUp(this.heap.length - 1);
    }

    extractMax() {
        if (this.heap.length === 0) return null;

        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);

        return max;
    }

    bubbleUp(index) {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);

            if (this.heap[parent][0] >= this.heap[index][0]) break;

            [this.heap[parent], this.heap[index]] =
                [this.heap[index], this.heap[parent]];

            index = parent;
        }
    }

    bubbleDown(index) {
        const n = this.heap.length;

        while (true) {
            let largest = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;

            if (
                left < n &&
                this.heap[left][0] > this.heap[largest][0]
            ) {
                largest = left;
            }

            if (
                right < n &&
                this.heap[right][0] > this.heap[largest][0]
            ) {
                largest = right;
            }

            if (largest === index) break;

            [this.heap[index], this.heap[largest]] =
                [this.heap[largest], this.heap[index]];

            index = largest;
        }
    }

    remove(value) {
        const index = this.heap.indexOf(value);

        if (index === -1) return false;

        const last = this.heap.pop();

        // The removed element was the last element.
        if (index === this.heap.length) return true;

        this.heap[index] = last;

        const parent = Math.floor((index - 1) / 2);

        if (
            index > 0 &&
            this.heap[index][0] > this.heap[parent][0]
        ) {
            this.bubbleUp(index);
        } else {
            this.bubbleDown(index);
        }

        return true;
    }
    getMax(){
        return this.heap[0] || [];
    }
}





/*
# Complexity Analysis
    TC -  O(nlogn)
    1. Inserted k elements in max heap so O(klogk)
    2. For each next element we inserted the element in worst case if the array is in increasing order
        then we insert all elements and never remove any elements from heap, so size become n - insert all 
        n elements with logn time - O(nlogn) and get max is constant time
    SC - O(n)
*/


/* OPTIMISATION- monotonic deque
    TC - O(n)
    SC-  O(k)

*/