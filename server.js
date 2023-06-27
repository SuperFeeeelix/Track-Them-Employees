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
    const query = "SELECT * FROM role.id, role.title, departments.department_name, role.salary FROM role JOIN departments ON role.department_id = department.id";
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
    const query = 
    `SELECT * FROM e.id, e.first_name, e.last_name, r.title, d.department_name, r.salary,
     CONCAT(m.first_name, ' ', m.last_name) AS manager_name 
     FROM employee e 
     LEFT JOIN role r ON e.role_id = r.id 
     LEFT JOIN departments d ON r.department_id = d.id 
     LEFT JOIN employee m ON e.manager_id = m.id; `
    // Execute a SQL query using the connection.query() method
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.log(res);
        start();
    })

}

// function to add departments
function addDepartment() {
    // Prompt the user to enter the department details using inquirer
    inquirer
        .prompt({
            type: "input",
            name: "name",
            message: "Enter the name of the department you are trying to add:",
        })
    .then((answer) => {
    //Retrieve the users input from the answer object 
        const departmentName = answer.name;
     
    // Execute a SQL query using the connection.query() method to insert the department into the departments table
        const query = "INDERT INTO departments (department_name) VALUES (?)"
    connection.query(query, [departmentName], (err, res) => {
        if(err) throw err; 
        console.log("Department added successfully!!!");
        start();
    })
})
    
}

// Function to add roles
function addRole() {
  // Implement the logic to add a role to the database
  const query = "SELECT * FROM departments";
  connection.query(query, (err, res) => {
    if(err) throw err;
    // Prompt the user to enter the role details using inquirer
    inquirer
        .prompt([
        {
            type: "input",
            name: "Title",
            message: "Enter the title of the role",
        }, 
        {
            type: "input",
            name: "Salary",
            message: "Enter the desired salary for the role",
        },
        {
            type: "input",
            name: "Department",
            message: "What department for the role",
        },
        ])
  })
  .then((answers) => {
    const { title, salary, department } = answers;

    //Find the department_id based on the selected department name
    const selectedDepartment = res.find(
        (dep) => dep.department_name === department
    );
    const departmentId = selectedDepartment.id;
    // Execute a SQL query using the connection.query() method to insert the role into the role table
    connection.query(
        insertQuery,
        [title, salary, departmentId],
        (err, res) => {
            if (err) throw err;
            console.log("Role added successfully!");
            start();
        }
    );
  });

}

// Function to add employee's
function addEmployee() {
  // Implement the logic to add an employee to the database
const query = "SELECT * FROM role"; 
connection.query(query, (err, role) => {
    if (err) throw err;
    // Prompt the user to enter the employee details using inquirer
    inquirer
    .prompt([
        {
            type: "input",
            name: "firstName",
            message: "Enter the employee's first name",
        }, 
        {
            type: "input",
            name: "lastName",
            message: "Enter the employee's last name",
        },
        {
            type: "list",
            name: "role",
            choices: role.map((role) => role.title),
        },
        {
            type:"input",
            name: "messageId",
            message: "Enter the manager's ID (if applicable):",
            default: "NULL",
        },
    ])
    .then((answers) => {
        const { firstName, lastName, role, managerId } = answers;
        
        const selectedRole = role.find((r) => r.title === role);
        const roleId = selectedRole.id;
        // Execute a SQL query using the connection.query() method to insert the employee into the employee table
        const insertQuery =
        connection.query(
            insertQuery,
            [firstName, lastName, role, managerId],
            (err, res) => {
                if (err) throw err;
                console.log("employee may have been added successfully. Unfortunetly!");
                start();
            }
        );
    });
})
}

function addManager() {
    // Implement the logic to add a manager to the database
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "Enter the manager's first name:",
        },
        {
          type: "input",
          name: "lastName",
          message: "Enter the manager's last name:",
        },
      ])
      .then((answers) => {
        // Retrieve the user's input from the answers object
        const { firstName, lastName } = answers;
  
        // Execute a SQL query using the connection.query() method to insert the manager into the employee table
        const insertQuery =
          "INSERT INTO employee (first_name, last_name, manager_id) VALUES (?, ?, NULL)";
        connection.query(
          insertQuery,
          [firstName, lastName],
          (err, res) => {
            if (err) throw err;
            console.log("Manager added successfully!");
            start();
          }
        );
      });
  }
  

// Function to update employee role
function updateEmployeeRole() {
    // Implement the logic to update an employee's role in the database
    const query = "SELECT * FROM employee";
    connection.query(query, (err, employees) => {
      if (err) throw err;
      const employeeChoices = employees.map(
        (employee) =>
          `${employee.id} - ${employee.first_name} ${employee.last_name}`
      );
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Select the employee to update:",
            choices: employeeChoices,
          },
          {
            type: "input",
            name: "newRole",
            message: "Enter the new role for the employee:",
          },
        ])
        .then((answers) => {
          // Retrieve the user's input from the answers object
          const { employee, newRole } = answers;
  
          // Extract the employee ID from the selected employee choice
          const employeeId = employee.split(" - ")[0];
  
          // Execute a SQL query using the connection.query() method to update the employee's role
          const updateQuery =
            "UPDATE employee SET role_id = ? WHERE id = ?";
          connection.query(
            updateQuery,
            [newRole, employeeId],
            (err, res) => {
              if (err) throw err;
              console.log("Employee role updated successfully!");
              start();
            }
          );
        });
    });
  }
  
  // Function to view employees by manager
  function viewEmployeesByManager() {
    // Implement the logic to view employees by manager from the database
    const query = "SELECT * FROM employee";
    connection.query(query, (err, employees) => {
      if (err) throw err;
      const managerChoices = employees
        .filter((employee) => employee.manager_id === null)
        .map(
          (manager) =>
            `${manager.id} - ${manager.first_name} ${manager.last_name}`
        );
      inquirer
        .prompt([
          {
            type: "list",
            name: "manager",
            message: "Select the manager:",
            choices: managerChoices,
          },
        ])
        .then((answers) => {
          // Retrieve the user's input from the answers object
          const { manager } = answers;
  
          // Extract the manager ID from the selected manager choice
          const managerId = manager.split(" - ")[0];
  
          // Execute a SQL query using the connection.query() method to retrieve the employees by manager
          const viewQuery =
            "SELECT * FROM employee WHERE manager_id = ?";
        });
    });
}