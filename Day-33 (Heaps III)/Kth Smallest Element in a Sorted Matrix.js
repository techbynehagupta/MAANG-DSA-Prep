/*
# Problem Statement:
    Given a sorted matrix of integers A of size N x M and an integer B.

    Each of the rows and columns of matrix A is sorted in ascending order, find the Bth smallest element in the matrix.

    NOTE: Return The Bth smallest element in the sorted order, not the Bth distinct element.





# Problem Constraints

    1 <= N, M <= 500

    1 <= A[i] <= 109

    1 <= B <= N * M



Example Input

    Input 1:

    A = [ [9, 11, 15],
        [10, 15, 17] ] 
    B = 6
    
    Input 2:

    A = [  [5, 9, 11],
            [9, 11, 13],
            [10, 12, 15],
            [13, 14, 16],
            [16, 20, 21] ]
    B = 12


Example Output

    Output 1: 17
    Output 2: 16


Example Explanation

    Explanation 1:
        6th smallest element in the sorted matrix is 17.

    Explanation 2:
        12th smallest element in the sorted matrix is 16.
*/


/*
# Intuition
    1. If somehow we can move either in downward or rightward direction since, the first minm element will be A[0][0]
    2. and next minm element will be getting either in A[0][1] or A[1][0] but the confusion is how to select
    3. If somehow we can have both and compare them - for this we can use min heap
    4. let's suppose 2nd minm is A[0][1] so the next minm ca be A[1][0] already in min heap or A[0][2], A[1][1]

# Visualisation

The matrix is sorted row-wise and column-wise:

    [
        [ 1,  5,  9],
        [10, 11, 13],
        [12, 13, 15]
    ]
    Step 1: Start from the smallest element

        Since movement is only right → or down ↓, the smallest element must always be:

            c0   c1   c2
        r0 [1]   5    9
        r1 10   11   13
        r2 12   13   15

        * First minimum = A[0][0] = 1

        Now, where can the next minimum come from?

        Only from:

        Right: A[0][1] = 5
        Down: A[1][0] = 10
            candidates
                ↓
            c0   c1   c2
        r0 [1]  (5)   9
        r1(10)  11   13
        r2 12   13   15

        Since we don’t know which is smaller in general → store both in Min Heap.

    **Step 2**: Extract smallest candidate

            Heap contains: [5, 10]

            Minimum = 5

                    c0   c1   c2
                r0  1   [5]   9
                r1 10   11   13
                r2 12   13   15

            Now after choosing 5, what are the new possibilities?

            From 5:
                Right → 9
                Down → 11
                But 10 is already waiting in heap.

            So heap becomes: [9, 10, 11]

            Visualization:

                    c0   c1   c2
                r0  1    5   (9)
                r1(10) (11) 13
                r2 12   13  15
    
    **Step 3**: Extract next minimum

            Heap: [9, 10, 11]

            Minimum = 9

                    c0   c1   c2
                r0  1    5   [9]
                r1 10   11   13
                r2 12   13   15

            New possibilities:
                Right → ❌ out of bounds
                Down → 13

            Heap: [10, 11, 13]


# Approach
    1. Insert first row or col- I am going with inserting first row elements with their col number in min heap
    2. We'll get the minm element (1st mins), insert the next element from that colm and find out minm (2nd minm) and do son do get kth smallest element
*/


// Solution
module.exports = { 
    //param A : array of array of integers
    //param B : integer
    //return an integer
       solve : function(A, B){
           return kthSmallest(A, B)
       }
   };
   class Pair{
       constructor(value, row, col){
           this.value = value; 
           this.row= row;
           this.col = col;
       }
   }
   class MinHeap{
       constructor(){
           this.heap = [];
       }
        // Helper methods
       getParentIndex(i) {
           return Math.floor((i - 1) / 2);
       }
   
       getLeftChildIndex(i) {
           return 2 * i + 1;
       }
   
       getRightChildIndex(i) {
           return 2 * i + 2;
       }
   
       swap(i, j) {
           [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
       }
       insert(value, row, col){
           let pair = new Pair(value, row, col);
           this.heap.push(pair);
           let index = this.size();
           this.heapifyUp(index-1);
       }
       heapifyUp(index){
           if(index <=0) return;
           let parent = this.getParentIndex(index);
           if(this.heap[parent].value > this.heap[index].value){
               this.swap(parent, index);
               this.heapifyUp(parent);
           }
           return;
       }
       heapify(index) {
           if (index >= this.size()) return;
   
           let smallest = index;
           let leftChild = this.getLeftChildIndex(index);
           let rightChild = this.getRightChildIndex(index);
   
           if (leftChild < this.size() && 
               this.heap[leftChild].value < this.heap[smallest].value) {
               smallest = leftChild;
           }
   
           if (rightChild < this.size() && 
               this.heap[rightChild].value < this.heap[smallest].value) {
               smallest = rightChild;
           }
   
           if (smallest !== index) {
               this.swap(smallest, index);
               this.heapify(smallest);
           }
       }
       extractMin(){
           let lastIndex = this.size()-1;
           this.swap(0, lastIndex);
           let lastEl = this.heap.pop();
           this.heapify(0);
           return lastEl;
       }
       size(){
          return this.heap.length;
       }
   }
   
   // optimised only Blogn complexity
   function kthSmallest(A, k) {
       let n = A.length;
       let m = A[0].length;
   
       // Min heap: [value, row, col]
       let minHeap = new MinHeap();
       // push first row completelt with their col information
       for(let i=0; i< m; i++){
           minHeap.insert(A[0][i], 0, i);
       }
       // now for k times puch and pop depending on the value popped push the same column next value
       let j = k;
       let ans = -1;
       while(j > 0){
           let {value, row, col} = minHeap.extractMin();
           if(row < n-1){
               minHeap.insert(A[row+1][col], row+1, col);
           }
           ans = value;
           // console.log(minHeap)
           j--;
       }
       return ans;
   }
   
   
   // not optimised O(n*m*logn)
   function kthSmallestElement(matrix, k){
       let maxHeap = new MaxHeap();
       let n = matrix.length;
       let m = matrix[0].length;
       for(let i=0; i< n; i++){
           for(let j=0; j< m; j++){
               maxHeap.insert(matrix[i][j]);
               if(maxHeap.size() > k){
                   maxHeap.extractMax();
               }
           }
           // console.log(maxHeap)
       }
       return maxHeap.peek();
   }
   
   class MaxHeap {
     constructor() {
       this.heap = [];
     }
   
     // Helper methods
     getParentIndex(i) {
       return Math.floor((i - 1) / 2);
     }
   
     getLeftChildIndex(i) {
       return 2 * i + 1;
     }
   
     getRightChildIndex(i) {
       return 2 * i + 2;
     }
   
     swap(i, j) {
       [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
     }
   
     // Insert value
     insert(value) {
       this.heap.push(value);
       this.heapifyUp();
     }
   
     heapifyUp() {
       let index = this.heap.length - 1;
   
       while (
         index > 0 &&
         this.heap[index] > this.heap[this.getParentIndex(index)]
       ) {
         this.swap(index, this.getParentIndex(index));
         index = this.getParentIndex(index);
       }
     }
   
     // Remove max (root)
     extractMax() {
       if (this.heap.length === 0) return null;
       if (this.heap.length === 1) return this.heap.pop();
   
       const max = this.heap[0];
       this.heap[0] = this.heap.pop();
       this.heapifyDown();
   
       return max;
     }
   
     heapifyDown() {
       let index = 0;
       const length = this.heap.length;
   
       while (this.getLeftChildIndex(index) < length) {
         let largerChildIndex = this.getLeftChildIndex(index);
         const rightChildIndex = this.getRightChildIndex(index);
   
         if (
           rightChildIndex < length &&
           this.heap[rightChildIndex] > this.heap[largerChildIndex]
         ) {
           largerChildIndex = rightChildIndex;
         }
   
         if (this.heap[index] >= this.heap[largerChildIndex]) break;
   
         this.swap(index, largerChildIndex);
         index = largerChildIndex;
       }
     }
   
     // Peek max
     peek() {
       return this.heap[0] || null;
     }
   
     size() {
       return this.heap.length;
     }
   
     isEmpty() {
       return this.heap.length === 0;
     }
   }


/*
# Complexity Analysis
   Time Complexity: O((m+k)logm)
        1. Insert m elements from 1st row - O(mlogm)
        2. Main while loop run for k iteration extracting minm - O(k log m)
    
    Space Complexity: O(m)
        1. Heap at max will be storing m elements at a time - O(m)
        2. Recursive stack - logm (Can be improved by using iteration)

*/