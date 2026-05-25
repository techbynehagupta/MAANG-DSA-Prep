/*
# Problem Statement:
    Given a list containing head pointers of N sorted linked lists.
    Merge these given sorted linked lists and return them as one sorted list.



# Problem Constraints
    1 <= total number of elements in given linked lists <= 100000


Example Testcases

    Input 1:

    1 -> 10 -> 20
    4 -> 11 -> 13
    3 -> 8 -> 9

    Output 1:  1 -> 3 -> 4 -> 8 -> 9 -> 10 -> 11 -> 13 -> 20
    Explanation 1: The resulting sorted Linked List formed after merging is 1 -> 3 -> 4 -> 8 -> 9 -> 10 -> 11 -> 13 -> 20.


    Input 2:

    10 -> 12
    13
    5 -> 6

    Output 2: 5 -> 6 -> 10 -> 12 ->13
    Explanation 2: The resulting sorted Linked List formed after merging is 5 -> 6 -> 10 -> 12 ->13.
*/


/*
# Intuition
    1. Insert first nodes of all list into minheap
    2. Get the minm element, push the next node of extracted minm node
    3. Make a dummy head and tail, use tail pointer to make the extracted node point to next extracted node, till all nodes are removed repeat this process
*/


// Solution
// Definition for singly-linked list.
//			function Node(data){
//				this.data = data
//				this.next = null
//			}

class Heap{
    constructor(){
        this.heap = [];
    }
    insert(el){
        this.heap.push(el);
        this.bubbleUp(this.heap.length-1);
    }
    bubbleUp(childIndex){
        if(childIndex < 1) return ;
        let parentIndex = Math.floor((childIndex-1)/2);
        let largest = this.heap[parentIndex].data > this.heap[childIndex].data ? parentIndex: childIndex;
        if(largest != childIndex){
            this.swap(parentIndex, childIndex);
            this.bubbleUp(parentIndex);
        }
    }
    peek(){
        return this.heap[0];
    }
    size(){
        return this.heap.length;
    }
    remove(){
        let n = this.heap.length;
        this.swap(0, n-1);
        let removedEl = this.heap.pop();
        this.heapify(0);
        return removedEl;
    }
    heapify(index){
        let smallest = index;
        let left = 2*index +1;
        let right = 2*index +2;
        if(left >= this.size()) return;
        if(this.heap[smallest].data >  this.heap[left].data){
            smallest = left;
        }
        if(this.heap[right] && this.heap[smallest].data > this.heap[right].data){
            smallest = right;
        }
        if(smallest != index){
            this.swap(smallest, index);
            this.heapify(smallest);
        }

    }
    swap(i, j){
        let temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
     }
}

module.exports = {
  //param A : array of integers
  //return the head node in the linked list
  mergeKLists: function (A) {
      return mergeLists(A)
  },
};

function mergeLists(list){
    if(list.length  == 0) return;
    let dummyHead = new Node(-1);
    let tail = dummyHead;

    let heap = new Heap();
    // creating heap
    for(let i=0; i< list.length; i++){
        heap.insert(list[i])
    }
    while(heap.size() > 0){
        let node = heap.remove();
        if(node.next){
            heap.insert(node.next);
        }
        tail.next = node;
        tail = tail.next;
    }
    return dummyHead.next;
}



/*
# Complexity Analysis
    Time Complexity - O(klogk)+O(Nlogk)
        Since usually N >> k, dominant term is:
        Final TC = O(N log k)
    Explanation - 
        1. Initial heap creation - O(k log k), inserting k nodes in heap each take logk time
        2. While loop extracting minm and adding new node in min heap - O(N log k) (Since there are N total nodes, loop runs N times.)
    
    Space Complexity - O(k)
    Explanation: 
        Maximum heap size = k
        Recursive calls: bubbleUp() and heapify() are recursive. Heap height = log k (We can improve this by using iterative method)
*/