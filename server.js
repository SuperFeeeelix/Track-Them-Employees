const inquirer = require("inquirer");
const mysql = require("mysql2");

// create a MySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3000,
    user: "root",
    password: "",
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

// function to view all roles
// function to view all employees

// function to add a department

// Function to add an employee

// Function to add a Manager

// function to update an employee role

// Function to View Employee By Manager

// Function to view Employees by Department
