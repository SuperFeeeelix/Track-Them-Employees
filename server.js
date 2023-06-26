const inquirer = require("inquirer");
const mysql = require("mysql2");

// create a MySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Mexican$!9",
    database: "employeesTracker_db",
});

// connect to the database 
connection.connect((err) => {
    if(err) throw err;
    console.log("connected to the database!");
    //start the application
    start();
});

// Function to Start Employee Tracker Application
function start()
inquirer.prompt({
    type:"list",
    name:"action",
    message: "what would jesus do?",
    choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Add a Manager",
        "Update an employee role",
        "View Employees by Manager",
        "View Employees by Department",
        "Delete Departments | Roles | Employees",
        "View the total utilized budget of a department",
        "Exit",
    ],
})

// function to view all departments
.then((answer) => {
    switch (answer.action) {
        case "view all departments":
            // Call the function to handle view all departments
            viewAllDepartments();
            break;
        case "View all roles":
            // View all roles
            viewAllRoles();
            break;
        case "View all Employees":
            // View all employees
                viewAllEmployees();
                break;
        case "Add a department":
            // adds a department
                addDepartment();
                break;
        case "Add a role":
            //Adds a role 
                addRole();
                break;
        case "Add an employee":
            //Adds employee
                addEmployee();
                break;
        case "Add a manager":
            //Adds Manager
                addManager();
                break;
        case "Update an employee role":
            //Call the function to handle updating an employee's role
                updateEmployeeRole();
                break;
        case "View employees by manager":
            //Call the function to handle viewing employees by manager
                viewEmployeesByManager();
                break;
        case "View employees by department":
            //Call the function to handle viewing employess by department
                viewEmployeesByDepartment();
                break;
        case "Delete departments, roles, or employees":
            //Call the function to handle deleting departments, roles, or employees
                deleteData();
                break;
        case "View the total utilized budget of a department":
            //Call the function to handle viewing the total utilized budget
                viewBudgetByDepartment();
                break;
        case "Exit":
            // End the database connection and exit the application
            connection.end();
            console.log("Goodbye!!!!");
            break;
            default:
            console.log("invalid choice. Please try again.");
            start();

    }
});


