/* 
    1. In the s20 folder, create an activity folder, an index.html file inside of it and link the index.js file.
    2. Create an index.js file and console log the message Hello World to ensure that the script file is properly associated with the html file.
    3. Copy the activity code and instructions from your Instructor into your index.js.
*/

console.log("Hello world!");

/*
    Create functions which can manipulate our arrays.
*/
/*
    4. Create a function called displayValues() which is able to receive an array of numbers and display cubed values in the console.
        - Use the forEach() method to print the square of each number on a new line.
*/

function displayValues(values) {
  values.forEach((num) => console.log(Math.pow(num, 3)));
}

/* Don't Modify For Testing*/
console.log("Result of displayValues function");
displayValues([1, 2, 3, 4, 5]);

/*
    5. Write a function called celsiusToFahrenheit that takes an array of Celsius temperatures as input returns an array of converted values to Fahrenheit.
        - Create a new variable inside the function called convertedArray.
        - Use the map() method to convert each temperature to Fahrenheit and save it into the variable. 
        - return the convertedArray variable.
*/

function celsiusToFahrenheit(temperatures) {
  const convertedArray = temperatures.map((temp) => (temp * 9) / 5 + 32);
  return convertedArray;
}

/* Don't Modify For Testing*/
console.log("Result of celsiusToFahrenheit function");
console.log(celsiusToFahrenheit([10, 20, 30, 40, 50]));
/*
    6. Write a function called areAllEven that takes an array of numbers as input and returns a boolean which determines if all the numbers given are even or not.
        - Create a new variable inside the function called isEven.
        - Use the every() method to check if all the numbers are even and save the result into the variable. 
        - Return the isEven variable.

*/

function areAllEven(numbers) {
  const isEven = numbers.every((num) => num % 2 === 0);
  return isEven;
}

/* Don't Modify For Testing*/
console.log("Result of areAllEven function");
console.log(areAllEven([2, 4, 6, 8, 10]));
/*
    7. Write a function called hasDivisibleBy8 that takes an array of numbers as input returns a boolean which determines if the array contains at least one number divisible by 8.
    - Create a new variable called hasDivisible
    - Use the some() method to check if at least one of the given values is divisible by 8, save the result in the hasDivisible variable.
        - Look up the use of the some() method
    - Return the hasDivisible variable.

*/

function hasDivisibleBy8(numbers) {
  const hasDivisible = numbers.some((num) => num % 8 == 0);
  return hasDivisible;
}

/* Don't Modify For Testing*/
console.log("Result of hasDivisibleBy8 function");
console.log(hasDivisibleBy8([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
