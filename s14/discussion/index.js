/*
    Mini Activity (5 mins)
    1. Create a loop that prints each letter of myName variable individually. 
        - If the letter is a vowel, print the number 3 instead.
    2. Use the `.toLowerCase()` method to convert the current letter to lowercase before evaluation.
    3. Take a screenshot of the output in the browser console and send it in the chat.
*/

let myName = "Adrian Sajulga";

for (let i = 0; i < myName.length; i++) {
  let currentLetter = myName[i].toLowerCase();
  if (["a", "e", "i", "o", "u"].includes(currentLetter)) {
    console.log(3);
  } else {
    console.log(currentLetter);
  }
}
