/*
# Problem Statement:
    Given an array nums, return the kth largest element in the array.


Example 1

    Input: nums = [1, 2, 3, 4, 5], k = 2

    Output: 4

Example 2

    Input: nums = [-5, 4, 1, 2, -3], k = 5

    Output: -5


# Constraints

    1 <= nums.length <= 105
    -1000 <= nums[i] <= 1000
    1 <= k <= nums.length
*/


/*
# Intuition
    A complete naive approach would be to sort the array and return the kth element from the end. This would take O(N*logN) time due to sorting the array.

    The problem is efficiently solved by leveraging the properties of a min-heap. Since only the K largest elements matter, a min-heap of size K is maintained. While processing any element, it is checked if it is among the K largest elements encountered so far. If it is, the smallest element is removed from the min-heap and the new element is inserted.
*/


// Solution
class MinHeap{
    constructor(){
        this.heap = []
    }
    getParentIndex(ind){
        return Math.floor((ind-1)/2);
    }
    getLeftChildInd(ind){
        return 2*ind+1;
    }
    getRightChildInd(ind){
        return 2*ind+2;
    }
    swap(arr, i, j){
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    insert(key) {
        this.heap.push(key);
        let n = this.heapSize();
        this.heapifyUp(this.heap, n-1);
        return;
    }
    heapifyUp(nums, ind){
        if(ind <= 0) return null;
        let parent = this.getParentIndex(ind);
        
        while(ind > 0 && nums[parent] > nums[ind]){
            this.swap(nums, parent, ind);
            ind = parent;
            parent = this.getParentIndex(ind);
        }
    }
     heapifyDown(nums, ind){
        
        while(ind < nums.length){
            let left = this.getLeftChildInd(ind);
            let n = nums.length;
            if(left >= n){
                break;
            }

            let smallest = ind;

            if(nums[left] < nums[smallest]){
                smallest = left;
            } 

            let right = this.getRightChildInd(ind);

            if(right < n && nums[right] < nums[smallest]){
                smallest = right;
            }
            if(smallest != ind){
                this.swap(nums, smallest, ind);
                ind = smallest;
            }else{
                break;
            }
        }
        
    }
    extractMin() {
        let n = this.heap.length;

        if(n == 0) return null;
        if(n == 1){
            return this.heap.pop();
        }

        this.swap(this.heap, 0, n-1);
        let el = this.heap.pop();
        this.heapifyDown(this.heap, 0);
        return el;
    }
    isEmpty() {
        return (this.heapSize() == 0);
    }
    getMin() {
        if(this.isEmpty()) return null;
        return this.heap[0];
    }

    heapSize() {
        return this.heap.length;
    }
}
class Solution {
    
    kthLargestElement(nums, k) {
        let minHeap = new MinHeap();
        for(let i=0; i<nums.length; i++){
            minHeap.insert(nums[i]);
            if(minHeap.heapSize() > k){
                minHeap.extractMin();
            }
        }
        return minHeap.getMin();
    }
}



/*
# Complexity Analysis

Time Complexity
    O(n log k) where n is the length of nums. The loop runs n times, and each insert/extractMin operation takes O(log k) because the heap size is capped at k.

Space Complexity
    O(k) to store up to k elements in the min-heap.
*/