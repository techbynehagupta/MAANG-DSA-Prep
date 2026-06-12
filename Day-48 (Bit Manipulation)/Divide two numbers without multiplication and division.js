/*
# Problem Statement:
    Given the two integers, dividend and divisor. Divide without using the mod, division, or multiplication operators and return the quotient.
    The fractional portion of the integer division should be lost as it truncates toward zero.
    As an illustration, 8.345 and -2.7335 would be reduced to 8 and -2 respectively.
    Note: Assume we are dealing with an environment that could only store integers within the 32-bit signed integer range: [−231, 231 − 1]. For this problem, if the quotient is strictly greater than 231 - 1, then return 231 - 1, and if the quotient is strictly less than -231, then return -231.


Example 1

    Input : Dividend = 10 , Divisor = 3

    Output : 3

    Explanation : 10/3 = 3.33 , truncated to 3.

Example 2

    Input : Dividend = 7 , Divisor = -3

    Output : -2

    Explanation : 7/-3 = -2.33 , truncated to -2.


# Constraints

    -231 <= dividend , divisor <= 231 - 1
    divisor != 0
*/


/*
# Intuition

    Every number can be represented in binary, which means every quotient can be written as a sum of powers of 2.

    Instead of subtracting the divisor one by one from the dividend, we can subtract the largest possible multiple of the divisor in powers of 2.

    This helps us reach the answer much faster.

    For example:

    dividend = 22
    divisor = 3

    Normally, we know:

    22 / 3 = 7

    because:

    3 * 7 = 21

    Now, 7 can be written in binary form as:

    7 = 2^2 + 2^1 + 2^0
    7 = 4 + 2 + 1

    So:

    3 * 7 = 3 * (2^2 + 2^1 + 2^0)

    This can be expanded as:

    3 * 7 = (3 * 2^2) + (3 * 2^1) + (3 * 2^0)

    Now calculate the largest powers of 2 multiples of divisor:

    3 * 2^0 = 3
    3 * 2^1 = 6
    3 * 2^2 = 12
    3 * 2^3 = 24

    Here, 24 is greater than 22, so the largest valid value is:

    3 * 2^2 = 12

    Now subtract it from the dividend:

    22 - 12 = 10

    Again, find the largest multiple of 3 using powers of 2 that fits inside 10:

    3 * 2^1 = 6

    Subtract it:

    10 - 6 = 4

    Again, find the largest multiple of 3 that fits inside 4:

    3 * 2^0 = 3

    Subtract it:

    4 - 3 = 1

    Now the remaining value 1 is smaller than the divisor 3, so we stop.

    The answer is the sum of all powers of 2 used:

    2^2 + 2^1 + 2^0 = 4 + 2 + 1 = 7

    So:

    22 / 3 = 7

    and the remainder is:

    1

    Therefore, instead of subtracting 3 seven times, we subtracted bigger chunks:

    12, 6, 3

    This makes the solution much faster and avoids TLE.

*/


// Solution

class Solution {
    divide(dividend, divisor) {
        if(dividend == divisor) return 1;
        if(divisor == 1) return dividend;

        const INT_MIN = -(2 ** 31);      // -2147483648
        const INT_MAX = (2 ** 31) - 1;  

        if(dividend == INT_MIN && divisor == -1){
            return INT_MAX;
        }

        let isPositive = !((dividend >= 0 && divisor < 0) ||
                           (dividend < 0 && divisor > 0));

        let n = Math.abs(dividend);
        let d = Math.abs(divisor);

        let ans =0;
        while(n >= d){
            let i = 0;
            while(i < 31 && n >= (d * (1<<i))){
                i++;
            }
            // since i is 1 more
            i -=1;
            n -= (d * (1<<i));
            ans += 1<<i;
        }
        
        if(ans > INT_MAX){
            return isPositive ? INT_MAX: INT_MIN;
        }
        return isPositive ? ans : -ans;
    }
}


/*
# Complexity Analysis

Time Complexity
    O((log n)^2) where n is the dividend, because the outer loop runs O(log n) times and the inner loop performs a bit-shift search O(log n) times per iteration.

Space Complexity
    O(1) because the algorithm uses a fixed number of integer variables regardless of the input size.
*/