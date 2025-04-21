const inquirer = require('inquirer');
const db = require('../db/queries');

async function mainMenu() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    },
  ]);

  switch (action) {
    case 'View all departments':
      console.table(await db.getAllDepartments());
      break;
    case 'View all roles':
      console.table(await db.getAllRoles());
      break;
    case 'View all employees':
      console.table(await db.getAllEmployees());
      break;
    case 'Add a department':
      const { departmentName } = await inquirer.prompt([
        { type: 'input', name: 'departmentName', message: 'Enter the department name:' },
      ]);
      await db.addDepartment(departmentName);
      console.log('Department added!');
      break;
    case 'Add a role':
      const { title, salary, departmentId } = await inquirer.prompt([
        { type: 'input', name: 'title', message: 'Enter the role title:' },
        { type: 'input', name: 'salary', message: 'Enter the role salary:' },
        { type: 'input', name: 'departmentId', message: 'Enter the department ID:' },
      ]);
      await db.addRole(title, salary, departmentId);
      console.log('Role added!');
      break;
    case 'Add an employee':
      const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        { type: 'input', name: 'firstName', message: 'Enter the first name:' },
        { type: 'input', name: 'lastName', message: 'Enter the last name:' },
        { type: 'input', name: 'roleId', message: 'Enter the role ID:' },
        { type: 'input', name: 'managerId', message: 'Enter the manager ID (leave blank if none):' },
      ]);
      await db.addEmployee(firstName, lastName, roleId, managerId || null);
      console.log('Employee added!');
      break;
    case 'Update an employee role':
      const { employeeId, newRoleId } = await inquirer.prompt([
        { type: 'input', name: 'employeeId', message: 'Enter the employee ID:' },
        { type: 'input', name: 'newRoleId', message: 'Enter the new role ID:' },
      ]);
      await db.updateEmployeeRole(employeeId, newRoleId);
      console.log('Employee role updated!');
      break;
    case 'Exit':
      console.log('Goodbye!');
      process.exit();
  }

  mainMenu();
}

mainMenu();