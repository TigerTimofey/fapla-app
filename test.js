// //1
// // function simpleArraySum(ar) {
// //   let sum = 0;

// //   for (let i = 0; i < ar.length; i++) {
// //   sum += ar[i];
// //   }
// //   console.log(sum)
// // }
// // simpleArraySum([3, 5, 1]);

// //2
// // a = [1, 2, 3];
// // b = [3, 2, 1];

// // function compareTriplets(a, b) {
// //   let newArr = [];
// //   let pointA = 0;
// //   let pointB = 0;

// //   for (let i = 0; i < a.length; i++) {
// //     if (a[i] > b[i]) {
// //       pointA++;
// //     } else if (a[i] < b[i]) {
// //       pointB++;
// //     } else {
// //       pointA += 0;
// //       pointB += 0;
// //     }

// //   }
// //   console.log([pointA, pointB]);
// // }

// // compareTriplets(a, b);

// //3
// // arr = [-4, 3, -9, 0, 4, 1];

// // function plusMinus(arr) {
// //   let arrLength = arr.length;
// //   let minus = 0;
// //   let plus = 0;
// //   let zero = 0;
// //   for (let i = 0; i < arrLength; i++) {
// //     if (arr[i] < 0) {
// //       minus++;
// //     } else if (arr[i] > 0) {
// //       plus++;
// //     } else {
// //       zero++;
// //     }
// //   }
// //   let plusRes = minus / arr.length;
// //   let minusRes = plus / arr.length;
// //   let zeroRes = zero / arr.length;
// //   let resultArray = [plusRes, minusRes, zeroRes];
// //   console.log(minusRes, plusRes, zeroRes);
// // }
// // plusMinus(arr);

// //4 елка

// function three() {
//   let str = " ";
//   let leaf = "*";
//   let n = 6;

//   for (let i = 1; i < n; i++) {
//     for (let j = 1; j < i; j++) {
//       str += leaf;
//     }
//     str += "\n";
//   }
//   console.log(str);
// }
// three();

// function staircase(n) {
//   let str = "";
//   let sign = "#";
//   for (let i = 1; i <= n; i++) {
//     for (let j = 1; j <= n - i; j++) {
//       str += " ";
//     }
//     for (let k = 1; k <= i; k++) {
//       str += sign;
//     }
//     str += "\n";
//   }
//   console.log(str);
// }
// staircase(5);

// // polidrom

// function palidrom(word) {
//   word = word.toLowerCase();
//   let check = [];
//   let wordArr = word.split("");

//   for (let i = 0; i < wordArr.length; i++) {
//     check.unshift(wordArr[i]);
//   }
//   let reversedWord = check.join("");
//   if (word == reversedWord) {
//     console.log(true);
//   } else {
//     console.log(false);
//   }
// }
// palidrom("tim");
// palidrom("abba");

// //polidrom easy
// function polidromNew(word) {
//   word = word.toLowerCase();
//   return word == word.split("").reverse().join("");
// }
// console.log(polidromNew("abba1"));

// function tree(n) {
//   let str = "";
//   for (let i = 0; i <= n; i++) {
//     for (let k = 0; k <= n - i; k++) {
//       str += "";
//     }
//     for (let j = 0; j <= i; j++) {
//       str += "*";
//     }
//     str += "\n";
//   }
//   console.log(str);
// }
// console.log(tree(4));

// function chrismas(n) {
//   let str = "";
//   for (let i = 0; i < n; i++) {
//     for (let k = 0; k < n - i; k++) {
//       str += " ";
//     }
//     for (let j = 0; j < i + 2; j++) {
//       str += "*";
//     }
//     str += "\n";
//   }
//   console.log(str);
// }

// chrismas(5);

// function staircaseOK(n) {
//   let str = "";
//   for (let i = 0; i < n; i++) {
//     for (let k = 0; k < n - i - 1; k++) {
//       str += " ";
//     }
//     for (let j = 0; j <= i; j++) {
//       str += "#";
//     }
//     str += "\n";
//   }
//   console.log(str);
// }
// staircaseOK(5);

// function test(n) {
//   let str = "";
//   for (let i = 0; i < n; i++) {
//     for (let k = 0; k < n - i - 1; k++) {
//       str += " ";
//     }
//     for (let j = 0; j <= i; j++) {
//       str += "*";
//     }
//     str += "\n";
//   }
//   console.log(str);
// }

// test(5);

// function miniMaxSum(arr) {
//   // Write your code here
//   let mainArr = arr.slice();
//   let sumMin = 0;
//   let sumMax = 0;

//   arr.pop();
//   for (let i = 0; i < arr.length; i++) {
//     sumMin += arr[i];
//   }
//   mainArr.shift();
//   console.log("min", sumMin);
//   for (let k = 0; k < mainArr.length; k++) {
//     sumMax += mainArr[k];
//   }
//   console.log("max", sumMax);
// }

// miniMaxSum([1, 2, 3, 4, 5]);

// function miniMaxSumBetter(arr) {
//   arr.sort((a, b) => a - b);

//   let minSum = 0;
//   let maxSum = 0;

//   for (let i = 0; i < arr.length - 1; i++) {
//     minSum += arr[i];
//   }
//   for (let i = 1; i < arr.length; i++) {
//     maxSum += arr[i];
//   }
//   console.log(minSum, maxSum);
// }

// function birthdayCakeCandles(candles) {
//   // Write your code here
//   let count = 0;
//   candles.sort((a, b) => a - b);

//   for (let i = 0; i <= candles.length; i++) {
//     if (candles[i] > candles[i + 1] || candles[i] === candles[i + 1]) {
//       count++;
//     }
//   }
//   console.log(count);
// }

// birthdayCakeCandles([2, 1, 4, 4, 4]);

// function birthdayCakeCandlesDO(candles) {
//   let count = 0;
//   candles.sort((a, b) => b - a); // Sort in descending order

//   const tallest = candles[0]; // Get the height of the tallest candle

//   for (let i = 0; i < candles.length; i++) {
//     if (candles[i] === tallest) {
//       count++; // Increment count for each tallest candle
//     } else {
//       break; // Break the loop as soon as we encounter a shorter candle
//     }
//   }

//   return count; // Return the count of tallest candles
// }

// function mass(candles) {
//   let count = 0;
//   candles.sort((a, b) => b - a);
//   let tallest = candles[0];
//   for (let i = 0; i < candles.length; i++) {
//     if (tallest === candles[i]) {
//       count++;
//     } else {
//       break;
//     }
//   }
//   return count;
// }

// console.log(mass([1, 2, 3, 3]));

// function timeConversion(s) {
//   let hour = parseInt(s.slice(0, 2));

//   let minute = s.slice(3, 5);
//   let second = s.slice(6, 8);
//   let meridiem = s.slice(8);

//   if (meridiem === "PM" && hour !== 12) {
//     hour += 12;
//   } else if (meridiem === "AM" && hour === 12) {
//     hour = 0;
//   }

//   let hourFormatted = hour.toString().padStart(2, "0");

//   return hourFormatted + ":" + minute + ":" + second;
// }

// console.log(timeConversion("07:05:45PM"));

// function time(s) {
//   let hour = parseInt(s.slice(0, 2));
//   let minutes = s.slice(3, 5);
//   let seconds = s.slice(6, 8);
//   let dayNight = s.slice(8, 11);

//   if (dayNight === "PM") {
//     hour += 12;
//   } else {
//     hour += 0;
//   }
//   return `${hour}:${minutes}:${seconds}`;
// }
// console.log(time("12:01:00AM"));

// function timeConversion2(s) {
//   let hour = parseInt(s.slice(0, 2));
//   let minute = s.slice(3, 5);
//   let second = s.slice(6, 8);
//   let meridiem = s.slice(8);

//   if (meridiem === 'PM' && hour !== 12) {
//       hour += 12;
//   } else if (meridiem === 'AM' && hour === 12) {
//       hour = 0;
//   }

//   let hourFormatted = hour.toString().padStart(2, '0');

//   return hourFormatted + ":" + minute + ":" + second;
// }

// console.log(timeConversion("07:05:45PM"));

// function findLargestSquareSize(samples) {
//   let rows = samples.length;
//   let cols = samples[0].length;
//   let maxSize = 0;

//   // Initialize a DP matrix to store the size of the largest square ending at (i,j)
//   let dp = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

//   // Copy the first row and first column from samples matrix to dp matrix
//   for (let i = 0; i < rows; i++) {
//       dp[i][0] = samples[i][0];
//       maxSize = Math.max(maxSize, dp[i][0]); // Update maxSize if the element is 1
//   }
//   for (let j = 0; j < cols; j++) {
//       dp[0][j] = samples[0][j];
//       maxSize = Math.max(maxSize, dp[0][j]); // Update maxSize if the element is 1
//   }

//   // Fill up the dp matrix
//   for (let i = 1; i < rows; i++) {
//       for (let j = 1; j < cols; j++) {
//           if (samples[i][j] === 1) {
//               dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
//               maxSize = Math.max(maxSize, dp[i][j]); // Update maxSize if the element is 1
//           } else {
//               dp[i][j] = 0; // If the element is 0, it cannot form a square
//           }
//       }
//   }

//   return maxSize;
// }

// // Example usage:
// let samples = [
//   [1, 1, 1, 1, 1],
//   [1, 1, 1, 0, 0],
//   [1, 1, 1, 0, 0],
//   [1, 1, 1, 1, 1]
// ];
// console.log(findLargestSquareSize(samples)); // Output: 3

// async function transferAmount(name, city) {
//   let maxCredit = 0;
//   let maxDebit = 0;

//   const response = await fetch(`https://jsonmock.hackerrank.com/api/transactions?page=1`);
//   const data = await response.json();

//   const filteredTransactions = data.data.filter(transaction => {
//       return transaction.userName === name && transaction.location.city === city;
//   });

//   filteredTransactions.forEach(transaction => {
//       if (transaction.txnType === 'credit') {
//           const amount = parseFloat(transaction.amount.replace(/[^0-9.-]+/g,""));
//           if (amount > maxCredit) {
//               maxCredit = amount;
//           }
//       } else if (transaction.txnType === 'debit') {
//           const amount = parseFloat(transaction.amount.replace(/[^0-9.-]+/g,""));
//           if (amount > maxDebit) {
//               maxDebit = amount;
//           }
//       }
//   });

//   return [
//       '$' + maxCredit.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
//       '$' + maxDebit.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
//   ];
// }

// // Usage example:
// transferAmount('Bob Martin', 'Bourg')
//   .then(amounts => {
//       console.log(amounts); // Output the maximum credit and debit amounts
//   })
//   .catch(error => {
//       console.error('Error retrieving transfer amounts:', error);
//   });

//   async function transferAmount(name, city) {
//     let maxCredit = 0;
//     let maxDebit = 0;

//     const response = await fetch(`https://jsonmock.hackerrank.com/api/transactions?page=1`);
//     const data = await response.json();

//     const filteredTransactions = data.data.filter(transaction => {
//         return transaction.userName === name && transaction.location.city === city;
//     });

//     filteredTransactions.forEach(transaction => {
//         if (transaction.txnType === 'credit') {
//             const amount = parseFloat(transaction.amount.replace(/[^0-9.-]+/g,""));
//             if (amount > maxCredit) {
//                 maxCredit = amount;
//             }
//         } else if (transaction.txnType === 'debit') {
//             const amount = parseFloat(transaction.amount.replace(/[^0-9.-]+/g,""));
//             if (amount > maxDebit) {
//                 maxDebit = amount;
//             }
//         }
//     });

//     return [
//         '$' + maxCredit.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
//         '$' + maxDebit.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
//     ];
// }

// // Usage example:
// transferAmount('Bob Martin', 'Bourg')
//     .then(amounts => {
//         console.log(amounts); // Output the maximum credit and debit amounts
//     })
//     .catch(error => {
//         console.error('Error retrieving transfer amounts:', error);
//     });
