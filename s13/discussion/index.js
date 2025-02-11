/*
 
    Mini Activity (5 mins)
 
    1. Create a countdown that starts at 10 and prints only odd numbers afterward.
    2. Store the number 10 in a variable named "num".
    3. When the countdown reaches 1, print "Done!".
    4. Take a screenshot of the output in the browser console and send it in the chat.
 
    Expected output:
    10  
    9  
    7  
    5  
    3  
    1  
    Done!
 
*/

let num = 10;
while (num >= 1) {
  console.log(num);
  num -= num === 10 ? 1 : 2;
}
console.log("Done!");
