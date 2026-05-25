/*
# Problem Statement:
    In the recent expansion into grocery delivery, Flipkart faces a crucial challenge in effective inventory management. Each grocery item on the platform carries its own expiration date and profit margin, represented by two arrays, A and B of size N. A[i] denotes the time left before expiration date for the ith item, and B[i] denotes profit margin for the ith item. To mitigate potential losses due to expiring items, Flipkart is seeking a strategic solution.

    The objective is to identify a method to strategically buy certain items, ensuring they are sold before their expiration date, thereby maximizing overall profit. Can you assist Flipkart in developing an innovative approach to optimize their grocery inventory and enhance profitability?

    Your task is to find the maximum profit one can earn by buying groceries considering that you can only buy one grocery item at a time.

NOTE:
      You can assume that it takes 1 minute to buy a grocery item, so you can only buy the ith grocery item when the current time <= A[i] - 1.
    You can start buying from day = 0.
    Return your answer modulo 109 + 7.


# Problem Constraints

    1 <= N <= 105
    1 <= A[i] <= 109
    0 <= B[i] <= 109


Input Format

The first argument is an integer array A represents the deadline for buying the grocery items.
The second argument is an integer array B represents the profit obtained after buying the grocery items.



Output Format

Return an integer denoting the maximum profit you can earn.



Example Input

    Input 1:
    A = [1, 3, 2, 3, 3]
    B = [5, 6, 1, 3, 9]
    
    Input 2:
    A = [3, 8, 7, 5]
    B = [3, 1, 7, 19]


Example Output

    Output 1: 20
    Output 2: 30


Example Explanation

    Explanation 1:

    At time 0, buy item with profit 5.
    At time 1, buy item with profit 6.
    At time 2, buy item with profit 9.
    At time = 3 or after , you can't buy any item, as there is no item with deadline >= 4.
    So, total profit that one can earn is 20.

    Explanation 2:

    At time 0, buy item with profit 3.
    At time 1, buy item with profit 1.
    At time 2, buy item with profit 7.
    At time 3, buy item with profit 19.
    We are able to buy all items within their deadline. So, total profit that one can earn is 30.

*/


/*
# Intuition
1. Sort the given array by exp time.
2. For time t- 0 to n-1 
    2.1 Insert elements with less exp time in heap and include their profit, increment the time
    2.2 If t < curr exp time, remove the minm element from heap, remove its profit, as we want to have max profit if current item gives maxm profit, else our current item will be minm in heap
3. return profit%mod
*/


// Solution
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
        let largest = this.heap[parentIndex] > this.heap[childIndex] ? parentIndex: childIndex;
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
        if(this.heap[smallest] >  this.heap[left]){
            smallest = left;
        }
        if(this.heap[smallest] > this.heap[right]){
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
 //param B : array of integers
 //return an integer
	solve : function(A, B){
       return inventoryManagement(A, B)
	}
};
class Pair{
    constructor(exp, profit){
        this.exp = exp;
        this.profit = profit;
    }
}

function inventoryManagement(A, B){
    let items = [];
    for(let i=0; i< A.length; i++){
        let item = new Pair(A[i], B[i]);
        items.push(item);
    }

    items.sort((a,b)=>{
        return a.exp-b.exp;
    })

    let heap = new Heap();
    let profit = 0;
    let i=0, j =0;
    let mod = 1e9+7;
    while(i< items.length){
        heap.insert(items[i].profit);
        profit += items[i].profit;
        if(j >= items[i].exp){
            let minProfit = heap.remove();
            profit -= minProfit;
        }else{
            // only incrementing j when heap size increases
            j++;
        }
        i++;
    }
    return profit%mod;
}

/*
# Complexity Analysis
    Time Complexity - O(nlogn) 
        O(n) - Traverses all elements once., 
        O(nlogn) - Sorting n items
        O(nlogn) - Main loop: Runs n times.Inside each iteration: calling insert, 
        O(log n): Heap removal
    
    Space Complexity- O(n)

*/