const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const db = require('./db/connection');
const express = require('express');
const router = express.Router();

const questions = () => {
  inquirer
    .prompt({
      name: 'directory',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'Add Department',
        'Add Role',
        'Add Employee',
        'View Departments',
        'View Roles',
        'View Employees',
        'N/A'
      ]
    })
    .then((response) => {
      switch (response.directory) {
        case 'Add Department':
          addDepartment();
          break;

        case 'Add Role':
          addRole();
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'View Departments':
          viewDepartments();
          break;

        case 'View Roles':
          viewRoles();
          break;

        case 'View Employees':
          viewEmployees();
          break;

        case 'N/A':
          db.end();
          break;
      }
    });
};

addDepartment = () => {
  inquirer
    .prompt({
      name: 'department',
      type: 'input',
      message: 'What is the name is the department?'
    })
    .then((data) => {
      db.query('INSERT INTO department SET ?', {
          name: data.department
        },
        (err, data) => {
          if (err) throw err;
          console.log('Success!')
          questions();
        });
    });
};

addRole = () => {
    inquirer
      .prompt([
          {
          name: 'title',
          type: 'input',
          message: "Enter role name: "
          },
        {
          name: 'department',
          type: 'input',
          message: 'Enter department:'
        },
        {
          name: 'salary',
          type: 'input',
          message: 'Enter salary:'
        }
      ])
      .then((data) => {
        db.query('INSERT INTO role SET ?', {
            title: data.title,
            salary: data.salary,
            department_id: data.department,
          },
          (err, data) => {
            if (err) throw err;
            console.log('success!')
            questions();
          });
      });
};

addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Employee\'s First Name: ",
        name: "first_name"
      },
      {
        type: "input",
        message: "Employee\'s Last Name: ",
        name: "last_name"
      },
      {
        type: "input",
        message: "Employee\'s Role Id: ",
        name: "role_id"
      },
      {
        type: "input",
        message: "Manager\'s Id: ",
        name: "manager_id"
      }
    ])
    .then(function(data) {
     db.query('INSERT INTO employee SET ?', {
        first_name: data.first_name, 
        last_name: data.last_name,
        role_id: data.role_id, 
        manager_id: data.manager_id },
          (err, data) => {
          if (err) throw err;
          console.log('success!');
          questions();
      });
    });
}
viewDepartments = () => { 
  db.query('SELECT * FROM department', (err, data) => {
    if (err) throw err;
    data.forEach((options) => {
      console.log(options.name)
    });
    questions();
  });
};

viewRoles = () => {
  db.query('SELECT * FROM role', (err, data) => {
    if (err) throw err;
    data.forEach((options) => {
      console.log(options.title)
    });
    questions();
  });
};

viewEmployees = () => {
  db.query('SELECT * FROM employee', (err, data) => {
    if (err) throw err;
    data.forEach((options) => {
      console.log(options.first_name, options.last_name)
    });
    questions();
  });
};


db.connect((err) => {
  questions();
});