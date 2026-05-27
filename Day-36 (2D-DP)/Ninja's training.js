/*
# Problem Statement:
    A ninja has planned a n-day training schedule. Each day he has to perform one of three activities - running, stealth training, or fighting practice. The same activity cannot be done on two consecutive days and the ninja earns a specific number of merit points, based on the activity and the given day.
    Given a n x 3-sized matrix, where matrix[i][0], matrix[i][1], and matrix[i][2], represent the merit points associated with running, stealth and fighting practice, on the (i+1)th day respectively. Return the maximum possible merit points that the ninja can earn.


Example 1

    Input: matrix = [[10, 40, 70], [20, 50, 80], [30, 60, 90]]

    Output: 210

    Explanation:

    Day 1: fighting practice = 70

    Day 2: stealth training = 50

    Day 3: fighting practice = 90

    Total = 70 + 50 + 90 = 210

    This gives the optimal points.

Example 2

    Input: matrix = [[70, 40, 10], [180, 20, 5], [200, 60, 30]]

    Output: 290

    Explanation:

    Day 1: running = 70

    Day 2: stealth training = 20

    Day 3: running = 200

    Total = 70 + 20 + 200 = 290

    This gives the optimal points.


# Constraints

    1 <= n <= 104
    n == number of rows in matrix
    3 == number of columns in matrix
    0 <= matrix[i][j] <= 1000
*/


/*
# Intuition
    For each day, we choose the activity that gives the maximum total points, but we cannot repeat the same activity as the previous day.
    At every state (day, activity), we try all other valid activities for the next day and pick the one giving the best future score.
    We use DP to store already computed results so the same (day, activity) is not recalculated multiple times.
    The answer is built by combining the current day’s points + best possible points from upcoming days.
*/


// Solution
class Solution {
    selectActivity(matrix, n, m, day, activityNumber, dp){
        if(day >= n){
            return 0;
        }
        if(day != -1 && activityNumber != -1 && dp[day][activityNumber]!= -1){
            return dp[day][activityNumber];
        }
        let maxPoints = 0;
        for(let j = 0; j < m ; j++){
            if(j == activityNumber){
                continue;
            }
            let pointsEarned = this.selectActivity(matrix, n, m, day+1, j, dp);
            maxPoints = Math.max(
                            maxPoints,
                            pointsEarned
                        )
        }
        if(day == -1 || activityNumber == -1){
            return maxPoints;
        }
        return dp[day][activityNumber] = maxPoints + matrix[day][activityNumber];

    }
    ninjaTraining(matrix) {
        let n = matrix.length, m = matrix[0].length;
        let dp = Array.from({length: n}, ()=> new Array(m).fill(-1));
        return this.selectActivity(matrix, n, m , -1,  -1, dp);
    }
}


/*
# Complexity Analysis

Time Complexity
    O(n * m^2) where n is the number of rows and m is the number of columns. The initialization loop runs in O(m), and the nested loops iterate over n rows, m columns, and a constant search of m columns (k), resulting in O(n * m^2).

Space Complexity
    O(n * m) to store the dp table of size n rows and m columns.
*/