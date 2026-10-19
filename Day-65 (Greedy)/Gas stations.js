/*
# Problem Statement:
134. Gas Station

There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i].

You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays gas and cost, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique.

 

Example 1:

    Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
    Output: 3
    Explanation:
    Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
    Travel to station 4. Your tank = 4 - 1 + 5 = 8
    Travel to station 0. Your tank = 8 - 2 + 1 = 7
    Travel to station 1. Your tank = 7 - 3 + 2 = 6
    Travel to station 2. Your tank = 6 - 4 + 3 = 5
    Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.
    Therefore, return 3 as the starting index.

Example 2:

Input: gas = [2,3,4], cost = [3,4,3]
Output: -1
    Explanation:
    You can't start at station 0 or 1, as there is not enough gas to travel to the next station.
    Let's start at station 2 and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
    Travel to station 0. Your tank = 4 - 3 + 2 = 3
    Travel to station 1. Your tank = 3 - 3 + 3 = 3
    You cannot travel back to station 2, as it requires 4 unit of gas but you only have 3.
    Therefore, you can't travel around the circuit once no matter where you start.
    

Constraints:

n == gas.length == cost.length
1 <= n <= 105
0 <= gas[i], cost[i] <= 104
The input is generated such that the answer is unique.
*/


/*
# Intuition
    1. Start from any index and check index further in circular manner to see if you can complete the journey - O(n^2)

    2nd Approach
    1. If the total gas < total cost, It never be possible to complete the journey because the minm fuel required (totalcost) is not there
    2. If totalGas >= totalCost, a answer is possible and given in question only 1 answer is possible and how that can be?
        2.1 Multiple answers can be possible if the ideal state gas is there which is >= cost at every station, because
        then we can start from any station and have atleast minm amount of gas to reach next station
        2.2 Since it says only 1 unique answer is there, it must have changed the netGasCost = gas[i]-cost[i] to < 0 at some places
        to  >= 0 at some places so that a unique answer can be formed
    3. So If we start from index i and go till n and at each station if 
        3.1 The net gas < 0 then those indexes can't be the answer, the answer can be next possible index
        3.2 If we till last index and no answer is found, the last station is the guranteed ans because in question it is mentioned
        that a unique answer exists and we have confirmed that by checking totalGas >= totalCost

    Note - We're using elimination for solution finding as we know atleast 1 solution exist if totalGas >= totalCost
        station where netGas < 0 can never be the starting points
        we have to go from 0 to n-1 to check valid starting point

*/


// Solution
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
    let n = gas.length;
    let costToMoveToNextStation = new Array(n);

    for(let i=0; i < n ; i++){
        // i to i+1 ststion
        costToMoveToNextStation[i] = gas[i]-cost[i];
    }

    // 0 =(-2)=> 1 =(-2)=> 2 =(-2)=>3 =(3)=> 4 =(3)=>0
    for(let i=0; i < n; i++){
        let start = i;
        let currGas = costToMoveToNextStation[i];
        let  j = (i + 1)%n;
      
        // j = 3, currGas = 0
        while(currGas > 0 && start != j){
            currGas += costToMoveToNextStation[j];
            j = (j + 1)%n;

        }
        if(start == j && currGas >=0){
            return start;
        }
    }
    return -1;
};



/*
# Complexity Analysis
     TC - O(n^2)
     SC- O(1)
*/

// Solution 2

var canCompleteCircuit = function(gas, cost) {
    let totalGas = gas.reduce((acc, el)=> acc + el, 0);
    let totalCost = cost.reduce((acc, el)=> acc + el, 0);

    if(totalGas < totalCost){
        // never be any viable solution present 
        return -1;
    }

    let start = 0;
    let n = gas.length;
    let netGas =0;
    for(let i=0; i < n ; i++){
        netGas += gas[i] - cost[i];
        if(netGas < 0){
            netGas =0;
            start = i+1;
        }  
    }
    return start;
};

/*
TC - O(n)
SC - O(1)

*/