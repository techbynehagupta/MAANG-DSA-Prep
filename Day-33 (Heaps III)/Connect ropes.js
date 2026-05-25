/*
# Problem Statement:
    You are given an array A of integers that represent the lengths of ropes.
    You need to connect these ropes into one rope. The cost of joining two ropes equals the sum of their lengths.
    Find and return the minimum cost to connect these ropes into one rope.


Example Input 1

    Input 1: A = [1, 2, 3, 4, 5]
    Output 1: 33

    Explanation 1:

    Given array A = [1, 2, 3, 4, 5].
    Connect the ropes in the following manner:
    1 + 2 = 3
    3 + 3 = 6
    4 + 5 = 9
    6 + 9 = 15

    So, total cost  to connect the ropes into one is 3 + 6 + 9 + 15 = 33.

Example Input 2
    Input 2: A = [5, 17, 100, 11]
    Output 1: 182

    Explanation 2:

    Given array A = [5, 17, 100, 11].
    Connect the ropes in the following manner:
    5 + 11 = 16
    16 + 17 = 33
    33 + 100 = 133

    So, total cost  to connect the ropes into one is 16 + 33 + 133 = 182.

# Problem Constraints

    1 <= length of the array <= 100000
    1 <= A[i] <= 1000
*/


/*
# Intuition
    Total cost will be minimum, if we're always going to add 2 min rope lengths together

# Approach
    1. Build min heap
    2. remove 2 minm length ropes
        2.1 Add their sum to the cost and add new rope length into heap for further addition
*/


// Solution
class PriorityQueue {
    constructor(){
        this.heap = [];
    }
    insert(value){
        this.heap.push(value);
        let n = this.heap.length;
        let index =  n-1;
        while(index>0){
            let parentIndex = Math.floor((index-1)/2)
            
            if(value > this.heap[parentIndex]) break;

            this.heap[index] = this.heap[parentIndex];

            index = parentIndex;
            
        }
        this.heap[index] = value;
    }
    buildHeap(A) {
        let n = A.length;
        for(let i=0; i<n; i++){
            this.insert(A[i]);
        }
    }
    heapify(index){
        let n = this.heap.length;
        // If for a node, even left child doesn't exists it means its a leaf node so return
        if(n < (2*index+1)) return ;

        let smallest = index;
        let leftNode = 2*index +1;
        let rightNode = 2*index +2;
        if(this.heap[smallest] > this.heap[leftNode]){
            smallest = leftNode;
        }
        if(n > rightNode && this.heap[smallest] > this.heap[rightNode]){
            // check if right node exists
            smallest = rightNode
        }
        if(smallest != index){
            this.swap(smallest, index);
            this.heapify(smallest);
        }
    }
    size(){
        return this.heap.length;
    }
    remove(){
        let n = this.heap.length;
        if(n == 0) return -1;
        this.swap(0, n-1);
        let el = this.heap.pop();
        this.heapify(0);
        return el;
    }
    swap(i, j){
        let temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }
    display(){
        console.log(this.heap);
    }

}
module.exports = { 
 //param A : array of integers
 //return an integer
	solve : function(A){
        let pq= new PriorityQueue()
        pq.buildHeap(A);
        let cost = 0;
        // console.log(this.heap);
        while(pq.heap.length > 1){
            let min1 = pq.remove();
            let min2 = pq.remove();
            let newRope = min1+min2;
            cost += newRope;
            // console.log(min1, min2)
            pq.insert(newRope);
        }
        return cost;
	}
};

/*
# Complexity Analysis

    Time Complexity - O(nlogn)
        O(n + nlogn), n to build heap + nlogn time to remove n-1 min elements from heap
    Space Complexity- O(n)
        O(n + logn) - n - Heap size + logn for recursion stack
    Where n is the input array size
*/