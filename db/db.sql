DROP DATABASE IF EXISTS usof;
CREATE DATABASE IF NOT EXISTS usof;
USE usof;

CREATE USER IF NOT EXISTS 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON usof.* TO 'root'@'localhost';

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    role VARCHAR(100),
    rating INT,
    avatar varchar(255) NOT NULL DEFAULT "/storage/avatars/default.png",
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(500)
);

CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    user_id INT NOT NULL,
    status VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    comment_id INT,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    type varchar(100) NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CHECK (
        (post_id IS NULL AND comment_id IS NOT NULL) OR 
        (post_id IS NOT NULL AND comment_id IS NULL)
    )
);

CREATE TABLE post_categories (
    post_id INT NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE refresh_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token varchar(255) NOT NULL,
    expiration_date TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE reset_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    expiration_date TIMESTAMP NOT NULL,
    FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE
);

-- Users
INSERT INTO users (login, fullname, password, email, role)
VALUES
  ('admin', 'Admin User', 'hashed_password1', 'admin@example.com', 'admin'),
  ('john', 'John Doe', 'hashed_password2', 'john@example.com', 'user'),
  ('jane', 'Jane Smith', 'hashed_password3', 'jane@example.com', 'user');

-- Categories
INSERT INTO categories (title, description)
VALUES
  ('Technology', 'All about tech'),
  ('Science', 'Scientific discussions'),
  ('Lifestyle', 'Everything lifestyle');

-- Posts
INSERT INTO posts (title, content, user_id, status)
VALUES
  ('First Post', 'This is the first test post.', 1, 'active'),
  ('Second Post', 'Another test post content.', 2, 'inactive'),
  ('Hello World', 'Excited to join!', 3, 'active');

-- Comments
INSERT INTO comments (user_id, post_id, content)
VALUES
  (2, 1, 'Nice post!'),
  (3, 1, 'Thanks for sharing.'),
  (1, 3, 'Welcome aboard!');

-- Likes
INSERT INTO likes (post_id, user_id, type)
VALUES
  (1, 2, 'like'),
  (1, 3, 'like'),
  (3, 1, 'like');

-- Post-Categories
INSERT INTO post_categories (post_id, category_id)
VALUES
  (1, 1),
  (2, 2),
  (3, 3);