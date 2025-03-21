//Important Note: Do not change the variable names.
//All required classes, variables and function names are listed in the exports.

console.log("Hello world!");

// Javascript Classes

class Author {
  constructor(name, age, address, isActive) {
    this.name = name;
    this.age = age;
    this.address = address;
    this.isActive = isActive;
  }
}

class Book {
  constructor(title, author, year, status = "Available") {
    this.title = title;
    this.author = author;
    this.year = year;
    this.status = status;
  }
}

// let author1 = new Author("James Andolfin", "New Jersey" , 67, false);
// let author2 = new Author("Haruki Murakami", "Japan" , 75, true);
//
// let book1 = new Book("Dune", "Frank Herbert", 1965);
// let book2 = new Book("Lord of the Rings", "JRR Tolkien", 1954);

//Debugging

class Employee {
  constructor(firstName, lastName, age, department, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.department = department;
    this.email = email;
    this.password = password;
  }

  login(email, password) {
    if (email !== this.email) {
      return "Incorrect Email";
    } else if (password !== this.password) {
      return "Incorrect Password";
    } else {
      return "Successful Login!";
    }
  }
}

class Project {
  constructor(name, description, budget, department, dateStarted, endDate) {
    this.name = name;
    this.description = description;
    this.budget = budget;
    this.department = department;
    this.dateStarted = dateStarted;
    this.endDate = endDate;
  }
}

/* Don't Modify */
let employee1 = new Employee(
  "Aiah",
  "Arceta",
  23,
  "Marketing",
  "aiahkins@gmail.com",
  "cherryOnTop",
);
console.log("Result of creating an instance of Employee class");
console.log(employee1);
console.log(
  "Result of using the login() method of an instance of Employee class",
);
console.log(employee1.login("aiahkins@gmail.com", "cherryOnTop"));
console.log(employee1.login("aiah@gmail.com", "cherryOnTop"));
console.log(employee1.login("aiahkins@gmail.com", "salaminsalamin"));

let project1 = new Project(
  "Project AI",
  "A small AI project",
  2500000,
  "Development Team",
  "08-14-2014",
  "08-09-2024",
);
console.log("Result of creating an instance of Project class");
console.log(project1);
