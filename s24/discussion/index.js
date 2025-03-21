let scores = [10, 25, 30, 45, 5];

let doubled = scores.map((score) => {
  return score * 2;
});

console.log(`Doubled scores: ${doubled}`);

let filtered = scores.filter((score) => {
  return score > 20;
});

console.log(`Filtered scores: ${filtered}`);

class Car {
  constructor(brand, name, year) {
    this.brand = brand;
    this.name = name;
    this.year = year;
  }
}

let toyota = new Car("Toyota", "Corolla", 2022);
let honda = new Car("Honda", "Civic", 2023);

console.log(toyota);
console.log(honda);

class Student {
  constructor(name, age, grades, school) {
    this.name = name;
    this.age = age;
    this.grades = grades;
    this.school = school;
  }

  getStudentInfo() {
    return `Student: ${this.name} - Age: ${this.age} - School: ${this.school}`;
  }

  calculateAverage() {
    return this.grades.reduce((a, b) => a + b, 0) / this.grades.length;
  }

  hasPassed() {
    return this.calculateAverage() >= 75;
  }
}

let student1 = new Student("Alice", 18, [85, 90, 78, 92], "XYZ High School");
let student2 = new Student("Bob", 19, [70, 65, 80, 74], "ABC University");

console.log(student1.getStudentInfo());
console.log(
  `Student's Average Grade: ${student1.calculateAverage()} - Passed: ${student1.hasPassed()}`,
);

console.log(student2.getStudentInfo());
console.log(
  `Student's Average Grade: ${student2.calculateAverage()} - Passed: ${student2.hasPassed()}`,
);
