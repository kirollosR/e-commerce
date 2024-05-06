CREATE DATABASE IF NOT EXISTS category_database;


use category_database;

CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INT  NOT NULL,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);


--Inserting data into the categories table
INSERT INTO categories (name) VALUES
    ('Electronics'),
    ('Clothing'),
    ('Books');

-- Inserting data into the products table
INSERT INTO products (name, price, category_id) VALUES
    ('Smartphone', 499.99, 1),
    ('Laptop', 899.99, 1),
    ('T-shirt', 19.99, 2),
    ('Jeans', 39.99, 2),
    ('Novel', 12.99, 3),
    ('Textbook', 79.99, 3);
