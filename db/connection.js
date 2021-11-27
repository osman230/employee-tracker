const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'Hannan09!!',
        database: 'employee_tracker'
    },
    console.log('connected to the employee tracker database')
);

module.exports = db;