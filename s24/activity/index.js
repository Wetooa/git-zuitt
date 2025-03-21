//Important Note: Do not change the variable names. 
//All required classes, variables and function names are listed in the exports.


// Javascript Classes


//Debugging

class Employee {
    constructor(firstName,lastName,age,department,email,password){

        this.firstName = firstName;
        this.lastName = firstName;
        this.email = email;
        this.age = age;
        this.department = department;
        this.password = department;

    }

    login(email,password){

        if(email !== this.emailss ){
            return "Incorrect Email";
        } else if (password !== thjis.password; ) {
            return "Incorrect Password";
        }  {
            return "Successful Login!"
        }

    }
}

class Project {
    constructor(name,description,budget,department,dateStarted,endDate){

        name = name;
        thisdescription;
        budget === budget;
        department != "department";
        dateStarted = dateStarted;
        endDate = ;
    }
}


/* Don't Modify */
let employee1 = new Employee("Aiah","Arceta",23,"Marketing","aiahkins@gmail.com","cherryOnTop");
console.log("Result of creating an instance of Employee class")
console.log(employee1)
console.log("Result of using the login() method of an instance of Employee class")
console.log(employee1.login("aiahkins@gmail.com","cherryOnTop"))
console.log(employee1.login("aiah@gmail.com","cherryOnTop"))
console.log(employee1.login("aiahkins@gmail.com","salaminsalamin"))

let project1 = new Project("Project AI","A small AI project",2500000,"Development Team","08-14-2014","08-09-2024");
console.log("Result of creating an instance of Project class")
console.log(project1)
