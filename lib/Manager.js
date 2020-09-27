// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Manager extends Employee {
    constructor(officeNumber) {
        const name = Employee.name;
        const id = Employee.id;
        const email = Employee.email;
        super(name, id, email);
        this.role = "Manager";
        this.officeNumber = officeNumber;
    }

    getofficeNumber() {
        return this.officeNumber;
    }
}

module.exports = Manager;
