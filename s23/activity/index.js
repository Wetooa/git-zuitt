console.log("Hello World");

/*
    1. In the s21 folder, create an activity folder, an index.html file inside of it and link the index.js file.
    2. Create an index.js file and console log the message Hello World to ensure that the script file is properly associated with the html file.
    3. Copy the activity code and instructions from your Instructor into your index.js.
*/

/*

4. Create an object for a Library User Card with properties such as: 
    - userId => A string
    - name => A string
    - age => A number 
    - address => A string
    - isActive => A boolean
    - borrowedBooks => An empty array to store titles of books borrowed.
*/

let userCard = {
  userId: "123",
  name: "Adrian Sajulga",
  age: 21,
  address: "Minglanilla Cebu",
  isActive: true,
  borrowedBooks: [],
};

/*

5. Update the given object for a Library Book Card with properties such as: 
    - bookId => A string
    - title => A string
    - description => A string
    - author => A string 
    - yearPublished => A string
    - isAvailable => A boolean
*/

let bookCard = {
  bookId: "123",
  title: "The Great Gatsby",
  description: "A novel by American writer F. Scott Fitzgerald",
  author: "F. Scott Fitzgerald",
  yearPublished: "1925",
  isAvailable: true,
  datesBorrowed: ["11-11-2021", "12-20-2021", "1-1-2023", "12-19-2024"],
};

/*
    6. Simulate a scenario where bookCard was borrowed 3 more times.
        - Update the bookCard by adding dates into the bookCard's datesBorrowed array.
        - Use array methods. Don't modify the original array.
*/

bookCard.datesBorrowed.push("12-20-2025", "1-1-2026", "12-19-2027");
console.log(bookCard);
