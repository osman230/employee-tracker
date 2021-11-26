INSERT INTO departments (name)
VALUES
('IT'),
('Marketing'),
('Customer Service'),
('Finance');

INSERT INTO roles (title, salary, department_id)
VALUES
('Software Engineer', 100000, 1),
('Marketing analyst', 80000, 2),
('Customer service representative', 30000, 3),
('Accountant', 90000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Laura', 'James', 4, 1111),
('Jacob', 'Ains', 1, 2222),
('Henry', 'Brooks', 3, 3333),
('Mary', 'Lamb', 2, 4444);