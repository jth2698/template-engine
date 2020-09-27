// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Manager extends Employee {
    constructor(officeNumber) {
        this.role = "Manager";
        this.officeNumber = officeNumber;
    }

    getRole() {
        return this.role;
    }

    getofficeNumber() {
        return this.officeNumber;
    }
}

module.exports = Manager;
