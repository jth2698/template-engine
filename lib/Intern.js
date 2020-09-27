// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Intern extends Employee {
    constructor(school) {
        const name = Employee.name;
        const id = Employee.id;
        const email = Employee.email;
        super(name, id, email);
        this.role = "Intern";
        this.school = school;
    }

    getSchool() {
        return this.school;
    }
}

module.exports = Intern;