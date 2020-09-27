// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(github) {
        const name = Employee.name;
        const id = Employee.id;
        const email = Employee.email;
        super(name, id, email);
        this.role = "Engineer";
        this.github = github;
    }

    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;