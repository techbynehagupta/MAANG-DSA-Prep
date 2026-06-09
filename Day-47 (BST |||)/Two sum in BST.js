/*
# Problem Statement:
    Given the root of a binary search tree and an integer k.Return true if there exist two elements in the BST such that their sum is equal to k otherwise false.


Example 1

    Input : root = [5, 3, 6, 2, 4, null, 7] , k = 9

    Output : true

    Explanation :

    The BST contains multiple pair of nodes that sum up to k.

    3 + 6 => 9.

    5 + 4 => 9.

    2 + 7 => 9.

Example 2

    Input : root = [5, 3, 6, 2, 4, null, 7] , k = 14

    Output : false

    Explanation :

    There is no pair in given BST that sum up to k.

# Constraints

    1 <= Number of Nodes <= 104
    -104 <= Node.val <= 104
    -105 <= k <= 105
*/

/*
# Intuition

    - This problem can be solved using the same idea as the BST Iterator question from the same folder.

    - We create two BST iterators using stack:
    one iterator moves in increasing order using next(),
    and the other iterator moves in decreasing order using before().

    - This works like the two-pointer approach on a sorted array, because inorder traversal of BST gives sorted values.

    - If next() + before() == k, we return true.

    - If the sum is smaller than k, move the increasing iterator using next(); otherwise move the decreasing iterator using before().
*/


// Solution




/*
# Complexity Analysis

*/