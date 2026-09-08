/*
# Problem Statement:
    Given any source point, (C, D) and destination point, (E, F) on a chess board of size A x B, we need to find whether Knight can move to the destination or not.


    The above figure details the movements for a knight ( 8 possibilities ).

    If yes, then what would be the minimum number of steps for the knight to move to the said point. If knight can not move from the source point to the destination point, then return -1.

    NOTE: A knight cannot go out of the board.



    Problem Constraints

    1 <= A, B <= 500



Input Format

    The first argument of input contains an integer A.
    The second argument of input contains an integer B.
    The third argument of input contains an integer C.
    The fourth argument of input contains an integer D.
    The fifth argument of input contains an integer E.
    The sixth argument of input contains an integer F.



Output Format

    If it is possible to reach the destination point, return the minimum number of moves.
    Else return -1.



Example Input

    Input 1:

    A = 8
    B = 8
    C = 1
    D = 1
    E = 8
    F = 8
    Input 2:

    A = 2
    B = 4
    C = 2
    D = 1
    E = 4
    F = 4


Example Output

    Output 1:

    6
    Output 2:

    -1


Example Explanation

    Explanation 1:

    The size of the chessboard is 8x8, the knight is initially at (1, 1) and the knight wants to reach position (8, 8).
    The minimum number of moves required for this is 6.
    Explanation 2:

    It is not possible to move knight to position (4, 4) from (2, 1)
*/


/*
# Intuition
1. Same question as other graph question, if we find out possible positions to move and use bfs to find minm moves
    possible moves 
    [i+2, j+1], [i+2, j-1]
    or [i-2, j+1], [i-2, j-1]
    [i+1, j+2],  [i-1, j+2]
     [i+1, j-2],  [i-1, j-2] I can use BFS 8*8 matrix minm number of moves to reach destination
   
     [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [-1, 2], [1, -2], [-1, -2]]
*/


// Solution
module.exports = { 
    //param A : integer
    //param B : integer
    //param C : integer
    //param D : integer
    //param E : integer
    //param F : integer
    //return an integer
       knight : function(A, B, C, D, E, F){
           // n = A, m = B
           let q = new Queue();
           q.enqueue([C, D]);
           let moves = 0;
           let visited = Array.from({length: A+1}, ()=> new Array(B+1).fill(false));
   
           while(q.size() > 0 ){
               let level = q.size();
               let dirs = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [-1, 2], [1, -2], [-1, -2]];
               while(level > 0){
                  let [i, j] = q.dequeue();
                   if(i == E && j == F){
                       return moves;
                   }
                  for(let [x, y] of dirs){
                      let newX = i + x;
                      let newY = j + y;
   
                      if(newX > 0 && newX <= A && newY >0 && newY <= B){
                         
                          if(!visited[newX][newY]){
                               q.enqueue([newX, newY]);
                               visited[newX][newY] = true; 
                          }
                      }
                  }
                   level--;
               }
               moves++;
           }
           return -1;
       }
   };
   
   class Queue {
       constructor() {
           this.queue = [];
           this.front = 0;
       }
   
       enqueue(value) {
           this.queue.push(value);
       }
   
       dequeue() {
           if (this.isEmpty()) return null;
   
           return this.queue[this.front++];
       }
   
       peek() {
           if (this.isEmpty()) return null;
   
           return this.queue[this.front];
       }
   
       isEmpty() {
           return this.front >= this.queue.length;
       }
   
       size() {
           return this.queue.length - this.front;
       }
   }
   


/*
# Complexity Analysis
   TC - O(A*E)
   SC - O(A*E)
*/