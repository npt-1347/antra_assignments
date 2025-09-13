/**
 * Task 21
 * Write a Javascript function to get all possible subsets of a fixed length from a given array.
 * Assumptions:
 *  1. The input array contains unique elements.
 *  2. The subset length is a non-negative integer less than or equal to the length of the array.
 *  3. The order of elements in the subsets does not matter.
 * Used recursion to generate subsets
 */
function getSubsets(arr, subsetSize) {
  let results = [];
  if (subsetSize < 0 || subsetSize > arr.length) {
    return results; // Return empty array for invalid subset sizes
  } else {
    const backtrack = (start, path) => {
      if (path.length === subsetSize) {
        results.push([...path]);
        return;
      }
      for (let i = start; i < arr.length; i++) {
        path.push(arr[i]);
        backtrack(i + 1, path);
        path.pop();
      }
    };

    backtrack(0, []);
    return results;
  }
}

console.log(
  "====================Task 21: Subsets of Fixed Length===================="
);
let subsets = getSubsets([1, 2, 3], 2);
console.log(subsets); // [[1,2], [1,3], [2,3]]

/**
 * Task 22
 * Count occurrences of a specified letter in a string
 */
function countLetterOccurrences(str, letter) {
  let count = 0;
  for (let char of str) {
    if (char === letter) {
      count++;
    }
  }
  return count;
}

console.log(
  "====================Task 22: Count Letter Occurrences===================="
);
let countOccurences = countLetterOccurrences("microsoft.com", "o");
console.log(countOccurences); // 3

/**
 * Task 23
 * Find first non-repeated character in a string
 */
function firstNonRepeatedCharacter(str) {
  let charCount = new Map();
  for (let char of str) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }
  for (let char of str) {
    if (charCount.get(char) === 1) {
      return char;
    }
  }
  return null; // Return null if all characters are repeated
}
console.log(
  "====================Task 23: First Non-Repeated Character===================="
);
let firstNonRepeated = firstNonRepeatedCharacter("abacddbec");
console.log(firstNonRepeated); // Output: "e"

/**
 * Task 24
 * Bubble sort algorithm to sort an array of numbers in descending order
 * Assumption: The input array contains numbers only.
 */
function bubbleSortDescending(arr) {
  let n = arr.length;
  let swapped;
  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] < arr[j + 1]) {
        // Swap if the element found is less than the next element
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break; // If no two elements were swapped in the inner loop, then break
  }
  return arr;
}
console.log(
  "====================Task 24: Bubble Sort Descending===================="
);
let sortedArray = bubbleSortDescending([
  12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213,
]);
console.log(sortedArray); // Output: [3223, 546, 455, 345, 234, 213, 122, 98, 84, 64, 23, 12, 9, 4, 1]

/**
 * Task 25
 * Return the longest country name from the array of country names
 */

function Longest_Country_Name(countries) {
  let countryName = "";
  for (let country of countries) {
    if (country.length > countryName.length) {
      countryName = country;
    }
  }
  return countryName;
}

console.log(
  "====================Task 25: Longest Country Name===================="
);
let longestCountry = Longest_Country_Name([
  "Australia",
  "Germany",
  "United States of America",
]);
console.log(longestCountry); // Output: "United States of America"

/**
 * Task 26
 * Find longest substering in a given string without repeating characters
 */
function longestSubstringWithoutRepeatingChars(str) {
  let n = str.length;
  let longest = "";
  let characterArray = [];
  for (let i = 0; i < n; i++) {
    let char = str[i];
    let index = characterArray.indexOf(char);
    if (index !== -1) {
      characterArray.splice(0, index + 1); // Remove characters up to and including the repeated character
    }
    characterArray.push(char);
    if (characterArray.length > longest.length) {
      longest = characterArray.join("");
    }
  }
  return longest;
}

console.log(
  "===============Task 26: Longest Substring Without Repeating Characters==============="
);
let longestSubstring = longestSubstringWithoutRepeatingChars("abcabcbb");
console.log(longestSubstring); // Output: "abc"

/**
 * Task 27
 * Find the longest palindrome a given string
 */
function findLongestPalindrome(str) {
  let longestPalindrome = "";
  let high, low;

  for (let i = 0; i < str.length; i++) {
    low = i;
    high = i;
    // for odd palindromic string
    while (low >= 0 && high < str.length && str[low] === str[high]) {
      low--;
      high++;
    }

    if (longestPalindrome.length < high - low) {
      longestPalindrome = str.substring(low + 1, high);
    }

    //for even palindromic string
    low = i;
    high = i + 1;
    while (low >= 0 && high < str.length && str[low] === str[high]) {
      low--;
      high++;
    }
    if (longestPalindrome.length < high - low) {
      longestPalindrome = str.substring(low + 1, high);
    }
  }
  return longestPalindrome;
}

console.log("===============Task 27: Find Longest Palindrome===============");
let evenLongestPalindrome = findLongestPalindrome("afternoon");
let oddLongestPalindrome = findLongestPalindrome("banana");
console.log(`Even longest Palindrome ${evenLongestPalindrome}`);
console.log(`Odd longest Palindrome ${oddLongestPalindrome}`);

/**
 * Task 28
 * A javascript program to return a javascript function.
 */
function greetingFunction(printStr) {
  return function printFunction(name) {
    console.log(printStr + " " + name);
  };
}

console.log(
  "===============Task 28: Program Returning Function==============="
);
let greetings = greetingFunction("Welcome");
greetings("Amelia");

/**
 * Task 29
 * A javascript function to return function name
 */

function getFunctionName(func) {
  if (typeof func === "function") {
    return func.name;
  } else {
    return "Parameter is not a function.";
  }
}

console.log("===============Task 28: Get Function Name===============");
function doable() {
  return true;
}
let funcName = getFunctionName(doable);
console.log(funcName);
