/*
    Mini Activity: (5 mins)
    1. Create a fruit array with the elements: ["apple", "banana", "cherry"].
   2. Print the initial value of the fruit array and its length.
    3. Remove the last element of fruit array.
    4. Print the updated fruit array and its length.
    5. Take a screenshot of the browser console and send it in the chat.
 
    Expected output:
    Initial Fruit Array: apple,banana,cherry
    Initial Fruit Array Length: 3
    Updated Fruit Array: apple,banana
    Updated Fruit Array Length: 2
*/

let fruitArray = ["apple", "banana", "cherry"];

console.log("Initial Fruit Array:", fruitArray.join(","));
console.log("Initial Fruit Array Length:", fruitArray.length);

fruitArray.pop();

console.log("Updated Fruit Array:", fruitArray.join(","));
console.log("Updated Fruit Array Length:", fruitArray.length);
