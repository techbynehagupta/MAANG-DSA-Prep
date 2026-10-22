/*
# Problem Statement:
    Given a parentheses string s containing only the characters '(' and ')'. A parentheses string is balanced if:

    Any left parenthesis '(' must have a corresponding two consecutive right parenthesis '))'.
    Left parenthesis '(' must go before the corresponding two consecutive right parenthesis '))'.
    In other words, we treat '(' as an opening parenthesis and '))' as a closing parenthesis.

    For example, "())", "())(())))" and "(())())))" are balanced, ")()", "()))" and "(()))" are not balanced.
    You can insert the characters '(' and ')' at any position of the string to balance it if needed.

    Return the minimum number of insertions needed to make s balanced.

    

Example 1:

    Input: s = "(()))"
    Output: 1
    Explanation: The second '(' has two matching '))', but the first '(' has only ')' matching. We need to add one more ')' at the end of the string to be "(())))" which is balanced.
    Example 2:

    Input: s = "())"
    Output: 0
    Explanation: The string is already balanced.
    Example 3:

    Input: s = "))())("
    Output: 3
    Explanation: Add '(' to match the first '))', Add '))' to match the last '('.
    

Constraints:

    1 <= s.length <= 105
    s consists of '(' and ')' only.
 

*/


/*
# Intuition

Approach - Greedy + 2 pointer
The overall logic is to get the need of closing brackets if opening brackets are coming and insertion if closing brackets are exceeding our need
If we are having odd amount of need while encountering any opening bracking then we need to close the previous need by 1

ex- (()()))
i =0, need=2
i=1, need =4
i=2, need = 3 // encountered close brackets so need decrease by 1
i =3, need =4, insertion =1, now we encounter opening bracket but we have odd need, means for 1 opening bracket we got single closing bracket so we need to complete this requirement first before moving ahead
so insert 1 closing bracket so insertion++, and decrease need by 1
If visualised ( "())" ())), => "())" inserting the last closing bracket since we already got 1 clsoing bracket
i=4 need = 3
i=5, need =2
i=6, need = 1

Loop over we still need 1 bracket so we add it in out insertions



If I get closing brackets and 
    * I don't need it so I make insertion count 1 and increase the need by 1
    * I decrease the need by 1
If I get open braces
    * before increasing the need, I have to deal with older brackets need
    * If previous need is 1 that means we have to complete it because we have to add 1 more closing bracket
    * but if we previous need is 2 then we don't need to add anything right now and can add current requirement as well
    * I'll increase the need by 2


*/


// Solution
/**
 * @param {string} s
 * @return {number}
 */
var minInsertions = function(s) {
    let insertions = 0, need =0;

    for(let i=0; i <s.length; i++){
        if(s[i] == '('){
            // first close previous requrements if one closing bracket is already there
            if(need %2 !=  0){
                // odd need
                insertions += 1;
                need--;
            }
            // increase need by two
            need += 2;
        }else{
            // i need to close previous requirement first
            if(need == 0){
                // no opening brackets seen so we make insertion for opening bracket and increase need for that by 1
                insertions += 1
                need = 1;
            }
            else{
                need--;
            }
        }
        // console.log(i, s[i], need, insertions)
    }
    insertions += need;
    return insertions;
};



/*
# Complexity Analysis
    TC- O(n)
    SC- O(1)
*/