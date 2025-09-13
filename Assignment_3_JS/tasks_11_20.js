/**
 * Task 11
 * Find the second largest and second smallest number in an array
 */
function findSecondLargestAndSmallest(arr) {
  if (arr.length < 2) {
    return "Array must contain at least two distinct numbers.";
  }
  let uniqueArr = [...new Set(arr)]; // Remove duplicates
  uniqueArr.sort((a, b) => a - b); // Sort the array in ascending order
  if (uniqueArr.length < 2) {
    return "Array must contain at least two distinct numbers.";
  }
  let secondSmallest = uniqueArr[1];
  let secondLargest = uniqueArr[uniqueArr.length - 2];
  return {
    secondSmallest,
    secondLargest,
  };
}

console.log(
  "====================Task 11: Second Largest and Smallest===================="
);
let numbers = [1, 2, 3, 4, 5];
let result = findSecondLargestAndSmallest(numbers);
console.log(
  `Second Smallest: ${result.secondSmallest}, Second Largest: ${result.secondLargest}`
); // Output: Second Smallest: 2, Second Largest: 4

/**
 * Task 12
 * Check if a number is a perfect number
 */
function isPerfectNumber(num) {
  if (num <= 1) return false; // 0 and 1 are not perfect numbers
  let sum = 0;
  for (let i = 1; i <= num / 2; i++) {
    if (num % i === 0) {
      sum += i;
    }
  }
  return sum === num;
}

console.log("====================Task 12: Perfect Number====================");
let perfectCheck1 = isPerfectNumber(6); // true
let perfectCheck2 = isPerfectNumber(10); // false
console.log(perfectCheck1);
console.log(perfectCheck2);

/**
 * Task 13
 * Compute factors of a given number
 */
function computeFactors(num) {
  if (num <= 0) return []; // No factors for non-positive numbers
  let factors = [];
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) {
      factors.push(i);
    }
  }
  return factors;
}

console.log("====================Task 13: Compute Factors====================");
let factors = computeFactors(28); // [1, 2, 4, 7, 14, 28]
console.log(factors);

/**
 * Task 14
 * Give a specific amount of change in coins
 * Assumptions:
 *  1. The coin denominations are provided in an array
 *  2. The amount is a non-negative integer.
 */
function giveChange(amount, coins) {
  coins.sort((a, b) => b - a); // Sort coins in descending order
  let result = [];
  let i = 0;
  while (amount > 0) {
    if (amount >= coins[i]) {
      amount -= coins[i];
      result.push(coins[i]);
    } else if (i === coins.length - 1 && amount < coins[i]) {
      break;
    } else {
      i++;
    }
  }
  return amount === 0
    ? result
    : "Change cannot be made with the given coin denominations.";
}

console.log("====================Task 14: Give Change====================");
let change = giveChange(46, [25, 10, 5, 2, 1]);
console.log(change); // Output: [25, 10, 10, 1]

/**
 * Task 15
 * Compute bn, b is the base and n is the exponent
 */
function computePower(b, n) {
  return Math.pow(b, n);
}
console.log("====================Task 15: Compute Power====================");
let power1 = computePower(2, 3); // 8
let power2 = computePower(5, 0); // 1
console.log(power1);
console.log(power2);

/**
 * Task 16
 * Find the unique characters in a string
 */
function findUniqueCharacters(str) {
  let strArray = str.split("");
  // using Set to store unique characters, its complexity is O(n)
  let characterSet = new Set(strArray); // Using Set to store unique characters
  return Array.from(characterSet).join("");

  /** Alternatively, using filter method
   * It's complexity is O(n^2) due to indexOf inside filter
        return strArray
            .filter((char, index) => strArray.indexOf(char) === index)
            .join("");*/

  /**
   * Alternatively, using includes method, but its complexity is O(n^2)
   * because includes method inside for loop
   
        let uniqueChars = [];
        for (let char of strArray) {
            if (!uniqueChars.includes(char)) {
            uniqueChars.push(char);
            }
        }
        return uniqueChars.join("");
  */

  /**
   * Alternatively, using Map to store character counts
   * Its complexity is O(n)
   * 
        let charMap = new Map();
        for (let char of strArray) {
            if (!charMap.has(char)) {
            charMap.set(char, 1);
            }
        }
        let uniqueChars = [];
        for (let [char, count] of charMap) {
            uniqueChars.push(char);
        }
        return uniqueChars.join("");
   */
}

console.log(
  "====================Task 16: Unique Characters===================="
);
let uniqueChars = findUniqueCharacters("thequickbrownfoxjumpsoverthelazydog");
console.log(uniqueChars); // Output: "thequickbrownfx"

/**
 * Task 17
 * Get number of occurrences of each letter in specified string
 */
function countLetterOccurrences(str) {
  let letterCount = {};
  for (let char of str) {
    if (char !== " ") {
      // Ignoring spaces
      letterCount[char] = (letterCount[char] || 0) + 1;
    }
  }
  return letterCount;
}

console.log(
  "====================Task 17: Letter Occurrences===================="
);
let letterOccurrences = countLetterOccurrences("banana hello world");
console.log(letterOccurrences); // Output: { b: 1, a: 3, n: 2, h: 1, e: 1, l: 3, o: 2, w: 1, r: 1, d: 1 }

/**
 * Task 18
 * Binary Search implementation
 */
function binarySearch(arr, target) {
  arr.sort((a, b) => a - b); // Ensure the array is sorted
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return `Element ${target} found at index ${mid}`; // Target found
    } else if (arr[mid] < target) {
      left = mid + 1; // Search in the right half
    } else {
      right = mid - 1; // Search in the left half
    }
  }
  return `Element ${target} not found.`; // Target not found
}

console.log("====================Task 18: Binary Search====================");
let searchArray = [34, 7, 23, 32, 5, 62];
let target1 = 23;
let target2 = 100;
let result1 = binarySearch(searchArray, target1);
let result2 = binarySearch(searchArray, target2);
console.log(result1); // Output: Index of 23 in the sorted array
console.log(result2); // Output: -1 (not found)

/**
 * Task 19
 * Return elements greater than a specified number in an array
 */
function elementsGreaterThan(arr, threshold) {
  return arr.filter((num) => num > threshold);
}
console.log(
  "====================Task 19: Elements Greater Than Specified Number===================="
);
let greaterElements = elementsGreaterThan([1, 5, 8, 10, 12, 15], 10);
console.log(greaterElements); // Output: [12, 15]

/**
 * Task 20
 * Generate random alphanumeric string of specified length
 */
function generateRandomString(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

console.log(
  "====================Task 20: Generate Random Alphanumeric String===================="
);
let randomString = generateRandomString(15);
console.log(randomString); // Output: Random string of length 15
