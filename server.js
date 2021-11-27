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
  db.query('SELECT * FROM department', (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([{
          name: 'department',
          type: 'list',
          choices: function () {
            const departmentOptions = [];
            results.forEach(({
              id,
              name
            }) => {
              departmentOptions.push({
                name: name,
                value: id
              });
            });
            return departmentOptions;

          }
        },
        {
          name: 'title',
          type: 'input',
          message: 'Enter Role'
        },
        {
          name: 'salary',
          type: 'input',
          message: 'Enter salary'
        }
      ])
      .then((data) => {
        db.query('INSERT INTO role SET ?', {
            title: data.title,
            salary: data.salary,
            department_id: data.department
          },
          (err, data) => {
            if (err) throw err;
            console.log('success!')
            questions();
          });
      });
  });
};

addEmployee = () => {
  db.query('SELECT * FROM employee', (err, arrayOptions) =>{    
    const teamMembers = arrayOptions.map(employee => {
      return {
        name: (employee.first_name, employee.last_name),
        value: employee.id
      };
    });
    let team;
    inquirer
      .prompt([{
        name: 'team',
        type: 'list',
        message: 'Select manager',
        choices: teamMembers
      }])
      .then ((data) => {
        manager = data.team
        db.query('SELECT * FROM role', (err, data) => {
          if(err) throw err;

          inquirer
          .prompt([
            {
              name: 'role',
              type: 'list',
              message: 'Enter employee\'s role',
              choices: function () {
                const newInfo = [];
                data.forEach(({
                  title,
                  id
                }) => {
                  newInfo.push({
                    name: title, 
                    value: id
                  });
                });
                return newInfo;
              },
            },
            {
              name: 'firstName', 
              type: 'input', 
              message: 'Enter first name'
            },
            {
              name: 'lastName',
              type: 'input',
              message: 'Enter last name'
            }
          ])
        .then((data) => {
          db.query('INSERT INTO employee SET ?', {
            first_name: data.firstName, 
            last_name: data.lastName,
            role_id: data.role,
            manager_id: team
          },
          (err, res) => {
            if(err) throw err;
            console.log('success!');
            questions();
          });
        });
      });
    });
  });
};

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