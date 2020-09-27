// Define and export the Engineer class.  
// This class inherits from Employee.

const Employee = require("./Employee");

class Engineer extends Employee {
    // Constructor has to include all values from "Employee" class plus the new value for the subclass
    constructor(name, id, email, github) {
        // "Super" calls the parent class and passes the parent class values as arguments.
        super(name, id, email);
        // Then "this" can be used to add new special values to the subclass.
        this.role = "Engineer";
        this.github = github;
    }

    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;