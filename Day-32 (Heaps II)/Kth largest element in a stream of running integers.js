/*
# Problem Statement:

    Implement a class KthLargest to find the kth largest number in a stream. It should have the following methods:

    KthLargest(int k, int [] nums) Initializes the object with the integer k and the initial stream of numbers in nums
    int add(int val) Appends the integer val to the stream and returns the kth largest element in the stream.
    Note that it is the kth largest element in the sorted order, not the kth distinct element.


Example 1

    Input: [KthLargest(3, [1, 2, 3, 4]), add(5), add(2), add(7)]

    Output: [2, 3, 3, 4]

    Explanation: initial stream = [1, 2, 3, 4], k = 3.

    add(5): stream = [1, 2, 3, 4, 5] -> returns 3

    add(2): stream = [1, 2, 2, 3, 4, 5] -> returns 3

    add(7): stream = [1, 2, 2, 3, 4, 5, 7] -> returns 4

Example 2

    Input: [KthLargest(2, [5, 5, 5, 5], add(2), add(6), add(60)]

    Output: [5, 5, 5, 6]

    Explanation: initial stream = [5, 5, 5, 5], k = 2.

    add(2): stream = [5, 5, 5, 5, 2] -> returns 5

    add(6): stream = [5, 5, 5, 5, 2, 6] -> returns 5

    add(60): stream = [5, 5, 5, 5, 2, 6, 60] -> returns 6


# Constraints

    1 <= Number of instructions <= 1000
    -104 <= val & all initial values <= 104
    1 <= k <= 104
    k - 1 <= nums.length <= 103
    The stream will have at least k elements after any add call.
*/


/*
# Intuition
    A completely naive approach involves adding each new element to a list and sorting the list after every insertion to obtain the kth largest element. Although straightforward, this method incurs a time complexity of O(N logN) and a space complexity of O(N), making it inefficient for large data streams.

    An optimized approach stems from a key observation: maintaining only the k largest elements at any given time is sufficient. This significantly reduces the number of elements being processed, leading to improved performance in both time and space.
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
class KthLargest {
  constructor(k, nums) {
    this.minHeap = new MinHeap();
    this.k = k;
    
    for(const el of nums){
        this.add(el);
    }
  }

  add(val) {
    this.minHeap.insert(val);
    if(this.minHeap.heapSize() > this.k){
            this.minHeap.extractMin();
    }
    return this.minHeap.getMin();
  }
}



/*
# Complexity Analysis

Time Complexity
    O(N log k) where N is the number of elements in nums, because each insertion and extraction in a heap of size k+1 takes O(log k).

Space Complexity
    O(k) to store the heap containing at most k+1 elements.
*/