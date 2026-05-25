/*
# Problem Statement:
    Given an array A of N numbers, you have to perform B operations. In each operation, you have to pick any one of the N elements and add the original value(value stored at the index before we did any operations) to its current value. You can choose any of the N elements in each operation.
    Perform B operations in such a way that the largest element of the modified array(after B operations) is minimized.
    Find the minimum possible largest element after B operations.

# Problem Constraints

    1 <= N <= 104
    0 <= B <= 104
    1 <= A[i] <= 104

Example Input

# Input 1:

    Input: A = [1, 2, 3, 4], B = 3
    Output 1: 4
    Explanation 1:
        Apply operation on element at index 0, the array would change to [2, 2, 3, 4]
        Apply operation on element at index 0, the array would change to [3, 2, 3, 4]
        Apply operation on element at index 0, the array would change to [4, 2, 3, 4]
        Minimum possible largest element after 3 operations is 4.

# Input 2:

    Input: A = [5, 1, 4, 2], B = 5
    Output 2: 5
    Explanation 2:
        Apply operation on element at index 1, the array would change to [5, 2, 4, 2]
        Apply operation on element at index 1, the array would change to [5, 3, 4, 2]
        Apply operation on element at index 1, the array would change to [5, 4, 4, 2]
        Apply operation on element at index 1, the array would change to [5, 5, 4, 2]
        Apply operation on element at index 3, the array would change to [5, 5, 4, 4]
        Minimum possible largest element after 5 operations is 5.
*/


/*
# Intuition
    1. If we know the next state of the array after addition of all value to itself, we can select minm from it
        1.a Ex - [5,1,4,2] nextState => [10,2,8,4] 2 is the mins, 
    2. For getting minm we can use min-heap to get it in O(1)
    3. To update the heap state with new element, insert new element with updated state
        3.a Ex: heap - [10,2,8,4] pull minm 
        3.2 After pulling mins [10,8,4] now for 2 new state will be 2+1(original value) 3 [To get the original value, store (state, index) in the heap , use index to get original value, check line 155]
        3.3 insert that in min heap [10,3,8,4] 
    4. Repeat the process till k operations
*/


// Solution
module.exports = { 
    //param A : array of integers
    //param B : integer
    //return an integer
       solve : function(A, B){
          return solution2(A, B)
       }
   };
   class Pair{
       constructor(value, index){
           this.value = value;
           this.index = index;
       }
   }
   
   class PriorityQueue{
        constructor(arr){
           this.heap = [...arr];
           this.buildHeap();
       }
       insert(pair){
           this.heap.push(pair);
           let n = this.heap.length;
           let index =  n-1;
           while(index>0){
               let parentIndex = Math.floor((index-1)/2)
               
               if(pair.value > this.heap[parentIndex].value) break;
   
               this.heap[index] = this.heap[parentIndex];
   
               index = parentIndex;
               
           }
           this.heap[index] = pair;
       }
       buildHeap() {
           let n = this.heap.length;
           for(let i= Math.floor((n-2)/2); i>= 0; i--){
               this.heapify(i);
           }
       }
       heapify(index){
           let n = this.heap.length;
           // If for a node, even left child doesn't exists it means its a leaf node so return
           if(n <= (2*index+1)) return ;
   
           let smallest = index;
           let leftNode = 2*index +1;
           let rightNode = 2*index +2;
           if(this.heap[smallest].value > this.heap[leftNode].value){
               smallest = leftNode;
           }
           if(n > rightNode && this.heap[smallest].value > this.heap[rightNode].value){
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
   
   function solution2(A, B){
       let nextState = A.map((el, index)=> new Pair(el+el, index));
       let pq = new PriorityQueue(nextState);
       let state = [...A];
   
       while(B){
           // for each B operation extract min
           let {value, index} = pq.remove();
           state[index] = value;
           pq.insert(new Pair(value+A[index], index))
           B--;
       }
       return getMaxm(state)
   }
   
   // Different Solution
   function solution1(A, B){
       // O(n^2)
       let state = [...A];
       while(B){
           let minm = Number.POSITIVE_INFINITY;
           let index = -1;
           for(let i=0; i<A.length; i++){
               updatedState = state[i] + A[i];
               if(minm > updatedState){
                   minm = updatedState;
                   index = i;
               }
           }
           state[index] = minm;
           B--;
       }
       // console.log(state)
       return getMaxm(state)
   }
   
   function getMaxm(A){
       let max = Number.NEGATIVE_INFINITY;
       for(el of A){
           if(max < el){
               max = el;
           }
       }
       return max;
   }

/*
# Complexity Analysis

Time Complexity - O(klogn + n)
   O(n) - Traverses the array once.
   O(n) - to build a heap for n elements
   O(k*logn) - extract min
   O(k*logn) - for insert
where n is no. of elements in Array and k is the no. of operations to perform

Space Complexity-  O(n)
    Extra space used:
    nextState array → O(n)
    PriorityQueue heap → O(n)
    state array → O(n)
    Recursive heapify() stack → O(log n)
*/