/*
    Mini Activity (5 mins)
    1. Create a switch statement that evaluates a day of the week and displays a message:
        - "Monday" → "Start of the work week!"
        - "Friday" → "End of the work week!"
        - "Saturday" / "Sunday" → "Weekend time!"
        - Any other day → "It's just another day."
    2. Try to run the code by declaring a day variable with a value of "Saturday", then check the output.
    3. Take a screenshot of the browser console output and send it in the chat.
*/

let day = "Saturday";

switch (day) {
  case "Monday":
    console.log("Start of the work week!");
    break;
  case "Friday":
    console.log("End of the work week!");
    break;
  case "Saturday":
  case "Sunday":
    console.log("Weekend time!");
    break;
  default:
    console.log("It's just another day.");
}
