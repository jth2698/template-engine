const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
const { type } = require("os");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

employees = [];

const allEmployeeQuestions = [
    {
        type: "list",
        choices: ["Manager", "Engineer", "Intern"],
        name: "type",
        message: "What type of employee are you adding to your team?"
    },
    {
        type: "input",
        name: "name",
        message: "Enter the employee's name."
    },
    {
        type: "input",
        name: "id",
        message: "Enter the employee's ID number."
    },
    {
        type: "input",
        name: "email",
        message: "Enter the employee's email address."
    }
]

const specialQuestions = [
    {
        type: "input",
        name: "manager",
        message: "What is the Manager's office number?"
    },
    {
        type: "input",
        name: "engineer",
        message: "What is the Engoineer's Github username?"
    },
    {
        type: "input",
        name: "intern",
        message: "What is the Intern's school?"
    }
]

function userPrompt() {

    const managerQuestion = specialQuestions[0];
    const engineerQuestion = specialQuestions[1];
    const internQuestion = specialQuestions[2];

    inquirer
        .prompt(allEmployeeQuestions)
        .then(response => {
            let name = response.name;
            let id = response.id;
            let email = response.email;
            if (response.type == "Manager") {
                inquirer.prompt(managerQuestion).then(response => {
                    let office = response.manager.value;
                    let employee = new Manager(name, id, email, office);
                    employees.push(employee);
                    addPrompt();
                })
            }
            if (response.type == "Engineer") {
                inquirer.prompt(engineerQuestion).then(response => {
                    let github = response.engineer.value;
                    let employee = new Engineer(name, id, email, github);
                    employees.push(employee);
                    addPrompt();
                })
            }
            if (response.type == "Intern") {
                inquirer.prompt(internQuestion).then(response => {
                    let school = response.school.value;
                    let employee = new Intern(name, id, email, school);
                    employees.push(employee);
                    addPrompt();
                })
            }
        })
}

function addPrompt() {
    inquirer
        .prompt([
            {
                type: "confirm",
                name: "choice",
                message: "Add another emplopyee?"
            }
        ])
        .then(response => {
            if (response.choice) {
                userPrompt();
            }
            else {
                render(employees)
            }
        })
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

userPrompt(); // NOTE - render function within userPrompt()

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
