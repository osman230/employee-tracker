INSERT INTO department (name)
VALUES
('IT'),
('Marketing'),
('Customer Service'),
('Finance');

INSERT INTO role (title, salary, department_id)
VALUES
('Software Engineer', 100000, 1),
('Marketing analyst', 80000, 2),
('Customer service representative', 30000, 3),
('Accountant', 90000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
('Jacob', 'Ains', 1),
('Mary', 'Lamb', 2),
('Henry', 'Brooks', 3),
('Laura', 'James', 4);

INSERT employee (first_name, last_name, role_id, manager_id)
VALUES  
('Jennifer', 'Kane', 1, 4224), 
('Lionel', 'Bourne', 2, 1251), 
('Jessica', 'Hanes', 3, 3532), 
('Vanessa', 'Willows', 4, 6544);

