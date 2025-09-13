/**
 * Task 1
 * Reverse a given integer number
 */
let num = 32243;
let result = "";
while (num > 0) {
  let digit = num % 10;
  result += digit;
  num = Math.floor(num / 10);
}
console.log("====================Task 1: Reverse Integer====================");
console.log(parseInt(result)); // Output: "34223"

/**
 * Task 2
 * Check if a given string is a palindrome or not
 */
function checkPalindrome(str) {
  // Remove non-alphanumeric characters and convert to lowercase
  // The regex can be updated to include other characters as needed
  const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  // Check if the cleaned string is equal to its reverse
  let high = cleanedStr.length - 1;
  let low = 0;
  while (low < high) {
    if (cleanedStr[low] !== cleanedStr[high]) {
      return false;
    }
    low++;
    high--;
  }

  return true;

  /**
   * Alternative method using built-in functions
   * const reversedStr = cleanedStr.split("").reverse().join("");
   * return cleanedStr === reversedStr;
   * */
}

console.log("====================Task 2: Palindrome====================");
let check1 = checkPalindrome("Madam"); // true
let check2 = checkPalindrome("Hello"); // false

console.log(check1);
console.log(check2);

/**
 * Task 3
 * Function to generate all combinations of substrings from a given string
 */
function generateCombinations(str) {
  const results = [];
  let n = str.length;
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < n; j++) {
      if (j + i <= n) {
        results.push(str.slice(j, j + i));
      }
    }
  }
  return results;
}

console.log("====================Task 3: Combinations====================");
let combinations = generateCombinations("frog");
console.log(combinations);

/**
 * Task 4
 * Return a string in the alphabetical order
 */
function alphabeticalOrder(str) {
  return str.split("").sort().join("");
}

console.log(
  "====================Task 4: Alphabetical Order===================="
);
let sortedString = alphabeticalOrder("webmaster");
console.log(sortedString); // Output: "abeemrstw"

/**
 * Task 5
 * Capitalize the first letter of each word in a given string
 */
function capitalizeString(str) {
  let words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  return words.join(" ");
}

console.log("====================Task 5: Capitalize====================");
let capitalized = capitalizeString("the quick brown fox");
console.log(capitalized); // Output: "The Quick Brown Fox"

/**
 * Task 6
 * Find the longest word in a given string
 */
function findLongestWord(str) {
  let longestWord = "";
  let words = str.split(" ");
  for (let word of words) {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  }
  return longestWord;
}

console.log("====================Task 6: Longest Word====================");
let longest = findLongestWord("Web Development Tutorial");
console.log(longest); // Output: "Development"

/**
 * Task 7
 * Count the number of vowels in a given string
 */
function countVowels(str) {
  let count = 0;
  const vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
  for (let char of str) {
    if (vowels.includes(char)) {
      count++;
    }
  }
  return count;
}

console.log("====================Task 7: Count Vowels====================");
let vowelCount = countVowels("The quick brown fox");
console.log(vowelCount); // Output: 5

/**
 * Task 8
 * Check if a number is prime or not
 */
function isPrime(num) {
  if (num <= 1) return false; // 0 and 1 are not prime numbers
  if (num <= 3) return true; // 2 and 3 are prime numbers
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

console.log("====================Task 8: Prime Number====================");
let primeCheck1 = isPrime(11); // true
let primeCheck2 = isPrime(15); // false
console.log(primeCheck1);
console.log(primeCheck2);

/**
 * Task 9
 * Get the type of an argument
 */
function getType(arg) {
  return typeof arg;
}

console.log("====================Task 9: Get Type====================");
let type1 = getType(42); // "number"
let type2 = getType("Hello"); // "string"
let type3 = getType(true); // "boolean"
let type4 = getType({}); // "object"
let type5 = getType(undefined); // "undefined"
console.log(type1);
console.log(type2);
console.log(type3);
console.log(type4);
console.log(type5);

/**
 * Task 10
 * Create an identity matrix of a given size n x n
 */
function createIdentityMatrix(n) {
  let matrix = [];
  for (let i = 0; i < n; i++) {
    matrix[i] = []; // Initialize the row
    for (let j = 0; j < n; j++) {
      if (i === j) {
        matrix[i][j] = 1; // Set diagonal elements to 1
      } else {
        matrix[i][j] = 0; // Set non-diagonal elements to 0
      }
    }
  }
  return matrix;
}

console.log("====================Task 10: Identity Matrix====================");
let identityMatrix = createIdentityMatrix(4);
console.table(identityMatrix); // Output: 4x4 identity matrix
