/*
# Problem Statement:

*/


/*
# Intuition

*/


// Solution I (DP - Itertive and Recursive) TC - O(n^2)
var maxEarnings = function (meetings) {
    return maxMeetingEaringIterative(meetings)
};
function maxMeetingEaringIterative(nums) {
    let n = nums.length;
    nums.sort((a, b) => {
        if (a[0] != b[0]) {
            return a[0] - b[0];
        } else if (a[1] != b[1]) {
            return a[1] - b[1];
        } else {
            return b[2] - a[2];
        }
    })

    let dp = Array.from({ length: n + 1 }, () => new Map());
    let maxP = 0;

    for (let i = 0; i < n; i++) {
        let [st, et, profit] = nums[i];
        let maxProfit = 0;
        console.log("i=", i)
        for (let j = i; j >= 0; j--) {
            let previousEndTime = j == 0 ? 0: nums[j - 1][1];

            if (j == 0 || previousEndTime > st) {
                maxProfit = Math.max(maxProfit, profit)
            } else {
                maxProfit = Math.max(maxProfit, dp[j - 1].get(previousEndTime) + profit + (st - previousEndTime))
            }
        }
        dp[i].set(et, maxProfit);
        maxP = Math.max(maxP, maxProfit);
    }
    return maxP;

}

function maxMeetingEarnings(nums) {
    let n = nums.length;
    nums.sort((a, b) => {
        if (a[0] != b[0]) {
            return a[0] - b[0];
        } else if (a[1] != b[1]) {
            return a[1] - b[1];
        } else {
            return b[2] - a[2];
        }
    })
    let dp = Array.from({ length: n }, () => new Map());

    function maxMeetingEarningsHelper(i, minStartTime) {
        if (i == n) {
            return 0;
        }
        if (dp[i].get(minStartTime)) {
            return dp[i].get(minStartTime);
        }

        let maxProfit = 0;
        for (let j = i; j < n; j++) {
            if (nums[j][0] >= minStartTime) {
                // can be taken
                let idleTime = minStartTime != 0 ? nums[j][0] - minStartTime : 0;
                maxProfit = Math.max(maxProfit, nums[j][2] + maxMeetingEarningsHelper(j + 1, nums[j][1]) + idleTime)
            }
        }
        dp[i].set(minStartTime, maxProfit);
        return dp[i].get(minStartTime);
    }
    return maxMeetingEarningsHelper(0, 0)
}


/*
# Complexity Analysis

*/