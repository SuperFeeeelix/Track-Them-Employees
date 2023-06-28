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
    
});


// Function to Start Employee Tracker Application
inquirer.prompt([
    {
        type: "list",
        name: "action",
        message: "what would jesus do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Add a Manager",
            "Update Employee Role",
            "View Employees By Manager",
            "View Employees By Department",
            "Delete Departments | Roles | Employees",
            "View the total utilized budget of a department",
            "Exit",
        ],
    },
]).then((answer) => {
    switch (answer.action) {
        case "View All Departments":
            // Call the function to handle view all departments
                viewAllDepartments();
            break;
        case "View All Roles":
            // View all roles
                viewAllRoles();
            break;
        case "View All Employees":
            // View all employees
                viewAllEmployees();
                break;
        case "Add a Department":
            // adds a department
                addDepartment();
                break;
        case "Add a Role":
            //Adds a role 
                addRole();
                break;
        case "Add an Employee":
            //Adds employee
                addEmployee();
                break;
        case "Add a Manager":
            //Adds Manager
                addManager();
                break;
        case "Update Employee Role":
            //Call the function to handle updating an employee's role
                updateEmployeeRole();
                break;
        case "View Employees By Manager":
            //Call the function to handle viewing employees by manager
                viewEmployeesByManager();
                break;
        case "View Employees By Department":
            //Call the function to handle viewing employess by department
                viewEmployeesByDepartment();
                break;
        case "Delete departments | Roles | Employees":
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

    }
});

// Function to view all deparments
function viewAllDepartments() {
    const query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(res);
        //start();
    });
}

// Function to view all roles
function viewAllRoles() {
    // Implement the logic to view all roles from the database
    const query = `SELECT * FROM role.id, role.title, departments.department_name, role.salary 
    FROM role JOIN departments 
    ON role.department_id = departments.id`;
    // Execute a SQL query using the connection.query() method
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        //start();
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
        //start();
    });

}

// function to add departments
function addDepartment() {
    // Prompt the user to enter the department details using inquirer
    inquirer
        .prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the name of the department you are trying to add:",
        },
    ])
    .then((answer) => {
    //Retrieve the users input from the answer object 
        console.log(answer.name);
    // Execute a SQL query using the connection.query() method to insert the department into the departments table
        const query = `INSERT INTO departments (department_name) VALUES ("${answer.name}) `;
        connection.query(query, (err, res) => {
        if(err) throw err; 
        console.log("Department added successfully!!!");
        //start();
        console.log(answer.name);
    });
});
    
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
            type: "list",
            name: "Department",
            message: "What department for the role:",
            choices: res.map(
                (department) => department.department_name
            ),
        },
        ])
  })
  .then((answers) => {
    const { title, salary, department } = answers;

    //Find the department_id based on the selected department name
    const selectedDepartment = res.find((dep) => dep.department_name === department);
    const departmentId = selectedDepartment.id;
    // Execute a SQL query using the connection.query() method to insert the role into the role table
    connection.query(
        insertQuery,
        [title, salary, departmentId],
        (err, res) => {
            if (err) throw err;
            console.log("Role added successfully!");
            //start();
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
                console.log("employee may have been added successfully. Unfortunately!");
                //start();
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
            //start();
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
              //start();
            }
          );
        });
    });
  }

  //
  
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
            connection.query(viewQuery, [managerId], (err, res) => {
                if(err) throw err;
                console.table(res);
                //start();
            });
        });
    });
}

//Function to view employees by department
function viewEmployeesByDepartment() {
    //Implement the logic to view employee's by department from the database
    const query = "SELECT * FROM departments";
    connection.query(query, (err, departments) => {
        if(err) throw err;
        inquirer
        .prompt([
            {
                type: "list",
                name: "department",
                message: "Select the department:",
                choices: departments.map((department) => department.department_name),
            },
        ])
        .then((answers) => {
            const { department } = answers;

            const viewQuery = 
            "SELECT * FROM employee WHERE role_id IN (SELECT id FROM role WHERE department_id = (SELECT id FROM departments WHERE department_name = ?))";
            connection.query(viewQuery, [department], (err, res) => {
                if(err) throw err;
                console.log(res);
                //start();
            });
        });
    });
}

//Function to delete data
function deleteData() {
    inquirer
    .prompt([
        {
            type: "list",
            name: "data",
            message: "Select the data to delete:",
            choices: ["Departments", "Role", "Employees"],
        },
    ])
    .then((answers) => {
        //Retrieve the user's input from the answers object
        const { data } = answers;

        let deleteQuery;
        switch (data) {
            case "Departments":
                deleteQuery = "DELETE FROM role";
                break;
            case "Role":
                deleteQuery = "DELETE FROM employee";
                break;
            case "Employees":
                deleteQuery = "DELETE FROM employee";
                break;
                default:
                console.log("Invalid choices, Please come again soon.");
                start();
                return;
        }
        connection.query(deleteQuery, (err, res) => {
            if(err) throw err;
            console.log(`Deleted all ${data.toLowerCase()} successfully!!`);
            //start();
        });
    });
}

//Function to view budget by department
function viewBudgetByDepartment() {
    const query = "SELECT * FROM departments";
    connection.query(query, (err, departments) => {
        if(err) throw err;
        inquirer
        .prompt([
            {
                type: "list",
                name: "department",
                message: "Select the department:",
                choices: departments.map((departments) => departments.department_name),
            },
        ])
        .then((answers) => {
            const { departments } = answers;


            const viewQuery = 
            `SELECT departments.department_name, 
            SUM(role.salary) AS total_budget 
            FROM role 
            JOIN departments 
            ON role.department_id = departments.id 
            WHERE departments.department_name IS NULL
            GROUP BY departments.department_name`

            connection.query(viewQuery, [departments], (err, res) => {
                if(err) throw err;
                console.table(res);
                //start();
            });
        });
    });
}