INSERT INTO departments (department_name)
VALUES 
('Executive Board'),
('Marketing'),
('Human Resources'),
('Finance'),
('Engineering'),
('Information Technology'),
('Customer Relations'),
('Research and Development'),
('Legal'),
('Maintenance'),
('Coding');


INSERT INTO role (title, salary, department_id)
VALUES
('Chief Executive Officer', 555000.00, 1),
('Marketing Manager', 125000.00, 2),
('HR Director', 189000.00, 3),
('Finance Head', 145000.00, 4),
('Senior Engineer', 185000.00, 5),
('IT Manager', 125000.00, 6),
('Customer Relations Manager', 75000.00, 7),
('Research and Development Manager ', 185000.00, 8),
('Legal Manager', 95000.00, 9),
('Maintenance Manager', 135000.00, 10),
('Front-End Developer', 70000, 11),
('Front-End Developer Lead', 125000, 12);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Cesar', 'Alegria', 1, 1),
('Guillermo', 'Perez', 2, 2),
('Luis', 'Duran', 3, 3),
('Donavan', 'Colton', 4, 4),
('Diana', 'Alegria', 5, 5),
('Selena', 'Perez', 6, 6),
('John', 'Edralin', 7, 7),
('Salia', 'Steward', 8, 8),
('Gerilyn', 'Rufin', 9, 9),
('Christian', 'Alvarez', 10, 10)