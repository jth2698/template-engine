const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve("./", "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
const { type } = require("os");



// Create empty array to hold all employee objects
employees = [];

// Create variable for questions that will be asked for all employees
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

// Create separate variable for special questions that will be asked depending on employee type 
const specialQuestions = [
    {
        type: "input",
        name: "office",
        message: "What is the Manager's office number?"
    },
    {
        type: "input",
        name: "github",
        message: "What is the Engoineer's Github username?"
    },
    {
        type: "input",
        name: "school",
        message: "What is the Intern's school?"
    }
]

// Create function to handle the user prompt questions
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

            // Three if statements to handle employee type
            if (response.type == "Manager") {
                //applicable question from specialQuestions array to be asked to get final data point
                inquirer.prompt(managerQuestion).then(response => {
                    let office = response.office;
                    // Once all data has been passed through inquirer, generate applicable object
                    let employee = new Manager(name, id, email, office);
                    // Push object to employees array
                    employees.push(employee);
                    // Call function to ask whether there are additional employees to add (see below)
                    addPrompt();
                })
            }
            if (response.type == "Engineer") {
                inquirer.prompt(engineerQuestion).then(response => {
                    let github = response.github;
                    let employee = new Engineer(name, id, email, github);
                    employees.push(employee);
                    addPrompt();
                })
            }
            if (response.type == "Intern") {
                inquirer.prompt(internQuestion).then(response => {
                    let school = response.school;
                    let employee = new Intern(name, id, email, school);
                    employees.push(employee);
                    addPrompt();
                })
            }
        })
}

function addPrompt() {
    inquirer
        // Use inquirer confirm feature to ask whether additional employees should be added
        .prompt([
            {
                type: "confirm",
                name: "add",
                message: "Add another employee?"
            }
        ])
        .then(response => {
            if (response.add) {
                // If true, call userPrompt function again (results in another prompt and push to the employees array)
                userPrompt();
            }
            else {
                // If false, render the HTML file
                const htmlFile = render(employees);
                // Write HTML file to the new output directory
                fs.writeFile(outputPath, htmlFile, (err) => {
                    // If there is an error in the writeFile function, this throws the error
                    if (err) throw err;
                    // Otherwise, console.log to the use that the HTML file has been saved in the output directory
                    console.log("The html file has been saved in ./output");
                });
            }
        })
}

// Call userPrompt to start the process outlined above
userPrompt();
