/*
# Problem Statement:
You are given an array of people, people, which are the attributes of some people in a queue (not necessarily in order). Each people[i] = [hi, ki] represents the ith person of height hi with exactly ki other people in front who have a height greater than or equal to hi.

Reconstruct and return the queue that is represented by the input array people. The returned queue should be formatted as an array queue, where queue[j] = [hj, kj] is the attributes of the jth person in the queue (queue[0] is the person at the front of the queue).

 

Example 1:

Input: people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
Output: [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]
Explanation:
Person 0 has height 5 with no other people taller or the same height in front.
Person 1 has height 7 with no other people taller or the same height in front.
Person 2 has height 5 with two persons taller or the same height in front, which is person 0 and 1.
Person 3 has height 6 with one person taller or the same height in front, which is person 1.
Person 4 has height 4 with four people taller or the same height in front, which are people 0, 1, 2, and 3.
Person 5 has height 7 with one person taller or the same height in front, which is person 1.
Hencevia [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]] is the reconstructed queue.
Example 2:

Input: people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]
Output: [[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]
 

Constraints:

1 <= people.length <= 2000
0 <= hi <= 106
0 <= ki < people.length
It is guaranteed that the queue can be reconstructed.

*/


/*
# Intuition
    1. Since the smaller people are dependent on bigger people, If we sort it via decreasing order of height we can always 
    know for a person total greater people ahead  =total people ahead
    2. If 2 height are same then we sort it via increasing order of number of people ahead, as we need to stand in increasing order of number of people ahead
        ex- [7,1] can't never be before [7,0], [hi, ki] can never be ahead of [hi, kj] is kj < ki
    3. Now We can use 2 stack implementation to facilitate the positions, pushstack will contain incoming persons, while popstack will contain people popped out of push stack
    4. Push inital person in push stack
    5. For each person i = 1 to n 
    6. check how many people ahead of that person (x) = both stack size
    7. Now how many people can be ahead of incoming person in ki, so person needs to be send behind(y) = totalperson (x) - ki
    8. If pop stack contains the exact person then we don't need to do anything, simply push inside the push stack
    8. If person which needs to be send behind < pop stack size, it means we have removed extra person, push the person back in push stack and vice versa if opposite situation happens

*/


// Solution
/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function(people) {
    people.sort((a,b)=>{
       if(a[0] != b[0]){
        return b[0]-a[0]
       }
       return a[1]-b[1];
    })
    let pushStack = [];
    let popStack = []
    pushStack.push(people[0]);
    
    
    for(let i=1; i < people.length; i++){
        let [hi, ki] = people[i];

        let totalPeopleAhead = pushStack.length + popStack.length; 
        let totalPeopleToRemove = totalPeopleAhead- ki; 
        let peopleAlreadyRemoved = popStack.length; 
        let peopleToRemove = totalPeopleToRemove - peopleAlreadyRemoved; 
        while(peopleToRemove < 0){
            pushStack.push(popStack.pop());
            peopleToRemove++;
        }

        while(peopleToRemove > 0){
            popStack.push(pushStack.pop());
            peopleToRemove--;
        }
        pushStack.push(people[i]);
    }
    while(popStack.length > 0){
        pushStack.push(popStack.pop());
    }
    return pushStack;
};




/*
# Complexity Analysis
    1. TC - O(n^2)
        Sorting - O(nlogn)
        Traversal - O(n^2) - n for traveral and for each n it can happen that we're doing all elements movement

    2. SC - O(n)
        In worst case - both stack can contain total n elements maximum
*/