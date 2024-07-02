function insertionSort(nums : Array<number>) {

    for (let index = 1; index < nums.length; index++) {
        let position = index - 1;
        let tempValue = nums[index];
        while (position >= 0) {
            if (nums[position] > tempValue) {
                nums[position + 1] = nums[position];
                position -= 1;
            } else {
                break;
            }

            nums[position + 1] = tempValue;
        }
    }
    return nums;
}

insertionSort([5, -1, 9, 2, 0]); // [-1,0,2,5,9]
