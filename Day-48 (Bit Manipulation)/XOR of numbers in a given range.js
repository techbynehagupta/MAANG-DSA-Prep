/*
# Problem Statement:
    Given two integers L and R. Find the XOR of the elements in the range [L , R].


Example 1

    Input : L = 3 , R = 5

    Output : 2

    Explanation : answer = (3 ^ 4 ^ 5) = 2.

Example 2

    Input : L = 1, R = 3

    Output : 0

    Explanation : answer = (1 ^ 2 ^ 3) = 0.


# Constraints

    1 <= L <= R <= 10^9
*/


/*
# Intuition
Note- 
    The XOR of numbers from 1 to n follows a pattern based on the value of n % 4.

    If n % 4 = 0, XOR from 1 to n is n.
    If n % 4 = 1, XOR from 1 to n is 1.
    If n % 4 = 2, XOR from 1 to n is n+1.
    If n % 4 = 3, XOR from 1 to n is 0.

TC- O(1)
    this.XORtillN(l-1)(x) = 1^2^ .... ^ l-1
    this.XORtillN(r) (y)= 1^2 ^ .... ^r

    x ^ y =  1^2^ .... ^ l-1 ^  1^2^ .... ^ r; since a^a = 0 thus 1 ...^l-1 ^ 1...^l-1 = 0 and remaining will be l ...^r

*/


// Solution
class Solution {  
    XORtillN(n) {
        if (n % 4 === 1) return 1;
        if (n % 4 === 2) return n + 1;
        if (n % 4 === 3) return 0;
        return n;
    }
    
    findRangeXOR(l, r) {
        return this.XORtillN(l-1) ^ this.XORtillN(r);
    }
}



/*
# Complexity Analysis

Time Complexity
    O(1) because the code performs a constant number of arithmetic and bitwise operations regardless of the size of the input n, l, or r.

Space Complexity
    O(1) because the algorithm only uses a fixed amount of extra memory for variable storage and does not allocate any data structures that scale with the input size.
*/