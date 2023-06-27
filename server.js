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
            console.log("invalid choice. Please try again and again if you have to but don't quit.");
            start();

    }
});

// Function to view all deparments
function viewAllDepartments() {
    const query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(res);
        start();
    });
}

// Function to view all roles
function viewAllRoles() {
    // Implement the logic to view all roles from the database
    const query = "SELECT * FROM role.title, role.id, departments.department_name, role.salary FROM role JOIN departments ON role.department_id = department.id";
    // Execute a SQL query using the connection.query() method
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        start();
    })
}

// Function to view all roles
function viewAllEmployees() {
    // Implement the logic to view all employees from the database
    const query = "SELECT * FROM "
    // Execute a SQL query using the connection.query() method
    // Display the results to the user 
}

// function to add departments
function addDepartment() {
    // Implement the logic to add a department to the database
    // Prompt the user to enter the department details using inquirer
    // Execute a SQL query using the connection.query() method to insert the department into the departments table
    // Display a success message to the user
}

// Function to add roles
function addRole() {
  // Implement the logic to add a role to the database
  // Prompt the user to enter the role details using inquirer
  // Execute a SQL query using the connection.query() method to insert the role into the role table
  // Display a success message to the user

}

// Function to add employee's
function addEmployee() {
  // Implement the logic to add an employee to the database
  // Prompt the user to enter the employee details using inquirer
  // Execute a SQL query using the connection.query() method to insert the employee into the employee table
  // Display a success message to the user
}

// Function to add a manager
function addManager() {
  // Implement the logic to add a manager to the database
  // Prompt the user to enter the manager details using inquirer
  // Execute a SQL query using the connection.query() method to insert the manager into the employee table
  // Display a success message to the user
}


// Function to update employee role
function updateEmployeeRole() {
  // Implement the logic to update an employee's role in the database
  // Prompt the user to select the employee and enter the new role using inquirer
  // Execute a SQL query using the connection.query() method to update the employee's role
  // Display a success message to the user
}

// Function to view employees by manager
function viewEmployeesByManager() {
  // Implement the logic to view employees by manager from the database
  // Prompt the user to select a manager using inquirer
  // Execute a SQL query using the connection.query() method to retrieve the employees by manager
  // Display the results to the user
}

// Function to view employee by department
function viewEmployeesByDepartment() {
  // Implement the logic to view employees by department from the database
  // Prompt the user to select a department using inquirer
  // Execute a SQL query using the connection.query() method to retrieve the employees by department
  // Display the results to the user
}

// Function to delete data
function deleteData() {
  // Implement the logic to delete departments, roles, or employees from the database
  // Prompt the user to select the data type to delete and provide further details using inquirer
  // Execute a SQL query using the connection.query() method to delete the selected data
  // Display a success message to the user
}


// Function to view budget by department
function viewBudgetByDepartment() {
  // Implement the logic to view the total utilized budget of a department from the database
  // Prompt the user to select a department using inquirer
  // Execute a SQL query using the connection.query() method to calculate the budget
  // Display the total budget to
}