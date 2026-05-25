/*
# Problem Statement:
    You need to implement the Min Heap with the following given methods.

    insert (x) -> insert value x to the min heap
    getMin -> Output the minimum value from min heap
    exctractMin -> Remove the minimum element from the heap
    heapSize -> return the current size of the heap
    isEmpty -> returns if heap is empty or not
    changeKey (ind, val) -> update the value at given index to val (index will be given 0-based indexing)
    initializeHeap -> Initialize the heap

Example 1

    Input : operation = [ "initializeheap", "insert", "insert", "insert", "getMin", "heapSize", "isEmpty", "extractMin", "changeKey" , "getMin" ]

    nums = [ [4], [1], [10], [0, 16] ]

    Output : [ null, null, null, null, 1, 3, 0, null, null, 10 ]

    Explanation : In 1st operation we initialize the heap to empty heap.

    In 2nd, 3rd, 4th operation we insert 4, 1, 10 to the heap respectively. The heap after 4th operation will be -> [1, 4, 10].

    In 5th operation we output the minimum element from the heap i.e. 1.

    In 6th operation we output the size of the current heap i.e. 3.

    In 7th operation we output whether the heap is empty or not i.e. false (0).

    In 8th operation we remove the minimum element from heap. So the ne heap becomes -> [4, 10].

    In 9th operation we change the 0th index element to 16. So new heap becomes -> [16, 10]. After heapify -> [10, 16].

    In 10th operation we output the minimum element of the heap i.e. 10.

Example 2

    Input : operation = [ "initializeheap", "insert", "insert", "extractMin", "getMin", "insert", "heapSize", "isEmpty", "extractMin", "changeKey" , "getMin" ]

    nums = [ [4], [1], [1], [0, 2] ]

    Output : [ null, null, null, null, 4, null, 2, 0, null, null, 2 ]

    Explanation : In 1st operation we initialize the heap to empty heap.

    In 2nd, 3rd operation we insert 4, 1 to the heap respectively. The heap after 4th operation will be -> [1, 4].

    In 4th operation we remove the minimum element from heap. So the ne heap becomes -> [4].

    In 5th operation we output the minimum element of the heap i.e. 4.

    In 6th operation we operation we insert 1 to the heap. The heap after 6th operation will be -> [1, 4].

    In 7th operation we output the size of the current heap i.e. 2.

    In 8th operation we output whether the heap is empty or not i.e. false (0).

    In 9th operation we remove the minimum element from heap. So the ne heap becomes -> [4].

    In 10th operation we change the 0th index element to 2. So new heap becomes -> [2].

    In 11th operation we output the minimum element of the heap i.e. 2.

# Constraints

    1 <= n <= 105
    -105 <= nums[i] <= 105
*/


/*
# Intuition
Read more about min-heap - https://www.geeksforgeeks.org/dsa/introduction-to-min-heap-data-structure/
*/


// Solution
class Solution {
    constructor() {
        this.heap = [];
        this.count = 0;
    }
    initializeHeap() {
        this.heap = [];
        this.count = 0;
    }

    insert(key) {
        this.heap.push(key);
        let n = this.heapSize();
        this.heapifyUp(this.heap, n-1);
        return;
    }

    changeKey(index, new_val) {
        if(index >= this.heap.length) return null;

        let prev = this.heap[index];
        this.heap[index] = new_val;

        if(new_val < prev){
            // if value is less so needs to do heapify up
             this.heapifyUp(this.heap, index)
        }else{
            // heapifyDown
            this.heapifyDown(this.heap, index);
        }
        return;
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
}
