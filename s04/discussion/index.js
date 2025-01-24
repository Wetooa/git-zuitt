console.log("ehe");

// Mini activity

const title = "The Three-Body Problem";
const author = "Cixin Liu";
const genre = "Science Fiction";

const yearPublished = 2006;
const numberOfPages = 400;

const isFiction = true;
const isAvailable = true;

const publisher = null;

const reviews = [
  "Great discussion on the topic!",
  "I found the points raised very insightful.",
  "Could use more examples to illustrate the concepts.",
  "Well structured and easy to follow.",
  "I disagree with some of the arguments presented.",
];

const favoriteBook = {
  title,
  author,
  genre,
  yearPublished,
  numberOfPages,
  isFiction,
  isAvailable,
  publisher,
  reviews,
};

console.log(favoriteBook);

/*
1. In the s04 folder, create an activity folder, an index.html file inside of it and link the index.js file.
2. Create an index.js file and console log the message "Hello World" to ensure that the script file is properly associated with the html file.
3. Copy the activity code from your Instructor. Paste the activity code to your index.js file.
 */

console.log("Hello World");

/*
4. Create the following variables to store the following company details:

    - Variable Name - Value Data Type:
        - companyName - String
        - companyEmail - String
        - companyContact - Number
        - employees - Array
        - companyAddress - Object

    - The employees array should contain at least 3 employee names as Strings.
    - The companyAddress object should contain the following key-value pairs:
        - street: <value>
        - city: <value>
        - state: <value>
*/

const companyName = "Tech Solutions Inc.";
const companyEmail = "info@techsolutions.com";
const companyContact = 1234567890;
const employees = ["Alice", "Bob", "Charlie"];
const companyAddress = {
  street: "123 Tech Lane",
  city: "Innovation City",
  state: "CA",
};

console.log("Company Profile:");
console.log(companyName);
console.log(companyEmail);
console.log(companyContact);
console.log(employees);
console.log(companyAddress);

/*
5. Research how to concatenate strings using + operator in Javascript. 

    - Create variable named intro to store a message.
        - Combine the string "Welcome to our company," and the companyName variable.
        - Log the message "Welcome to our company," and your companyName to the console.
        - Example: "Welcome to our company, XYZ Industries!"

*/

const intro = "Welcome to our company, " + companyName;

console.log(intro);

/*
6. Research how to determine the data type of each variable.
    - Add the variables of different primitive data types: 

        - Variable Name - Value:
        - str = "Twice"
        - num = 27
        - bool = true
        - arr = ["Dahyun", "Chaeyoung", "Mina"]
        - obj = { twice: "Dahyun" }

    - Use the operator to determine the data type of each variable.
    - Log the result to the console.
*/

const str = "Twice";
const num = 27;
const bool = true;
const arr = ["Dahyun", "Chaeyoung", "Mina"];
const obj = { twice: "Dahyun" };

console.log(typeof str);
console.log(typeof num);
console.log(typeof bool);
console.log(typeof arr);
console.log(typeof obj);

/*
7. Identify and implement the best practices of creating and using variables by avoiding errors and debugging the following codes. 
    - Log the values of each variable to follow/mimic the output.
*/

let clients = ["24Chicken", "Jollibee", "Mcdonald's", "Mang Inasal", "KFC"];
console.log("Our Clients are: ");
console.log(clients);

let employeeProfile = {
  userName: "ceo_mark",
  fullName: "Mark Jones",
  age: 40,
  position: "CEO",
  isActive: true,
};

console.log("My Employee Profile: ");
console.log(employeeProfile);

let deposits = [5000, 6000, 3000, 2000];
console.log("Your deposits: " + deposits);

let expenses = [1000, 2000, 500, 210];
console.log("Your expenses: " + expenses);

let isAdmin = true;
console.log("Is the current user an admin?: " + isAdmin);
