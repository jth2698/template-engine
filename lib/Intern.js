// Define and export the Intern class.
// This class inherits from Employee.

const Employee = require("./Employee");

class Intern extends Employee {
    // Constructor has to include all values from "Employee" class plus the new value for the subclass
    constructor(name, id, email, school) {
        // "Super" calls the parent class and passes the parent class values as arguments.
        super(name, id, email);
        // Then "this" can be used to add new special values to the subclass.
        this.role = "Intern";
        this.school = school;
    }

    getSchool() {
        return this.school;
    }
}

module.exports = Intern;