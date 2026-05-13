/*
# Problem Statement:
    Given a grid of n x m dimension grid of characters board and a string word.The word can be created by assembling the letters of successively surrounding cells, whether they are next to each other vertically or horizontally. It is forbidden to use the same letter cell more than once.

    Return true if the word exists in the grid otherwise false.


Example 1

    Input : board = [ ["A", "B", "C", "E"] , ["S" ,"F" ,"C" ,"S"] , ["A", "D", "E", "E"] ] , word = "ABCCED"

    Output : true




Example 2

    Input : board = [["A", "B", "C", "E"] , ["S", "F", "C", "S"] , ["A", "D", "E", "E"]] , word = "SEE"

    Output : true

Note- Open the link in browser to understand example visually
Link - https://leetcode.com/problems/word-search/description/

*/


/*

# Intuition
1. start by traversing each element of matrix if it matches, check further using diff function
2. Make a visited array mark a element true once its used in making the word
3. Go left, down, up, right only if the indexes are valid and is the ch matches with 
the ch in word and is not visited
4. once the whole word is traveresed return true else false
*/


// Solution
class Solution {
    dir = [{x:1, y:0}, {x:0, y:1},{x:-1, y:0}, {x:0, y:-1} ];

    _exist(board, word, i, j, k, used){
        if(k == word.length){
            return true;
        }
        if(
            i<0
            || j <0
            || i >= board.length 
            || j >= board[0].length
            || (board[i][j] != word[k])
            || used[i][j] == true
        ){
            return false;
        }
        let found = false;
        used[i][j] = true;
        for(let {x, y} of this.dir){
            found = found || this._exist(board, word, i+x, j+y, k+1, used);   
        }
        used[i][j] = false;
        return found;
        
    }
    exist(board, word) {
        let n = board.length;
        let m = board[0].length;

        let used = Array.from({length: n}, ()=> new Array(m).fill(false));
        let found = false;
        for(let i=0; i< n; i++){
            for(let j=0; j<m ;j++){
                if(board[i][j] == word[0]){
                    found = this._exist(board, word, i, j, 0, used);
                }
                if(found){
                    return true;
                }
            }
        }
        return false;
    }
}



/*
# Complexity Analysis

Time Complexity
    O(N × M × 4^L)- N*M outer loop and then for each charcater we are going in 4 directions till L length
    L: word length
    N*M- Matrix

Space Complexity - 
   O(N × M + L)- 
   N*M - for used array
   L- Recursion call, Max stack length at a time
*/