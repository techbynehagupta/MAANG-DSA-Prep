/*
# Problem Statement:
    You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array fruits where fruits[i] is the type of fruit the ith tree produces.

    You want to collect as much fruit as possible. However, the owner has some strict rules that you must follow:

    You only have two baskets, and each basket can only hold a single type of fruit. There is no limit on the amount of fruit each basket can hold.
    Starting from any tree of your choice, you must pick exactly one fruit from every tree (including the start tree) while moving to the right. The picked fruits must fit in one of your baskets.
    Once you reach a tree with fruit that cannot fit in your baskets, you must stop.
    Given the integer array fruits, return the maximum number of fruits you can pick.

    

Example 1:

    Input: fruits = [1,2,1]
    Output: 3
    Explanation: We can pick from all 3 trees.
    Example 2:

    Input: fruits = [0,1,2,2]
    Output: 3
    Explanation: We can pick from trees [1,2,2].
    If we had started at the first tree, we would only pick from trees [0,1].
    Example 3:

    Input: fruits = [1,2,3,2,2]
    Output: 4
    Explanation: We can pick from trees [2,3,2,2].
    If we had started at the first tree, we would only pick from trees [1,2].
    

Constraints:

    1 <= fruits.length <= 105
    0 <= fruits[i] < fruits.length
*/


/*
# Intuition
1. Create a map 
2. use left and right pointer to validate the window
3. add new fruit into basket
4. validate the basket size if greater than 2 then i have to correct the basket by shringking the window till the basket size becomes 2
5. Take the maxm basket size once basket is valid
6. To calculate number of fruits use a counter while adding increment the counter, while removing the fruit decrement the counter, and always store max value in ,axFruits variable
*/


// Solution
var totalFruit = function(fruits) {
    let basket = new Map();
    let left = 0;
    let fruitsCount = 0, maxFruits = 0;

    for(let right = 0; right< fruits.length ; right++){

        // add element
        basket.set(fruits[right], (basket.get(fruits[right]) || 0)+1);
        fruitsCount++;

        // validate window
        while(basket.size > 2){
            basket.set(fruits[left], basket.get(fruits[left])-1);
            fruitsCount--;

            if(basket.get(fruits[left]) == 0){
                basket.delete(fruits[left])
            }
            left++;
        }
        // calculate max fruits
        maxFruits = Math.max(maxFruits, fruitsCount);
    }
    return maxFruits;
};



/*
# Complexity Analysis
    TC- O(n)
    SC - O(n)
*/