DROP DATABASE IF EXISTS usof;
CREATE DATABASE IF NOT EXISTS usof;
USE usof;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    verified BOOLEAN NOT NULL DEFAULT FALSE,
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
    images JSON,
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

CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    type VARCHAR(50) NOT NULL,
    payload JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post_categories (
    post_id INT NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE user_favorites (
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE user_subscribes (
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
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

INSERT INTO users (login, fullname, password, email, verified, role, rating)
VALUES
  ('admin', 'Admin User', '$2b$10$v9bRqeGl.rWUJgC6t/2B7uGcKq4iQ2C1ohdu5u/t/uFDjpGU0ixR.', 'admin@example.com', 1, 'admin', 0), -- password: asdasd123
  ('andrey', 'Andrey Gobzavr', '$2b$10$v9bRqeGl.rWUJgC6t/2B7uGcKq4iQ2C1ohdu5u/t/uFDjpGU0ixR.', 'andrey@example.com', 1, 'user', 0),
  ('oper', 'Oper Upolnomocheniy', '$2b$10$v9bRqeGl.rWUJgC6t/2B7uGcKq4iQ2C1ohdu5u/t/uFDjpGU0ixR.', 'oper@example.com', 1, 'user', 0),
  ('mark', 'Mark Taylor', '$2b$10$v9bRqeGl.rWUJgC6t/2B7uGcKq4iQ2C1ohdu5u/t/uFDjpGU0ixR.', 'mark@example.com', 1, 'user', 0),
  ('lisa', 'Lisa Wong', '$2b$10$v9bRqeGl.rWUJgC6t/2B7uGcKq4iQ2C1ohdu5u/t/uFDjpGU0ixR.', 'lisa@example.com', 1, 'user', 0);

INSERT INTO categories (title, description)
VALUES
  ('Technology', 'All about tech'),
  ('Science', 'Scientific discussions'),
  ('Lifestyle', 'Everything lifestyle'),
  ('Programming', 'Code tips and debugging help'),
  ('Career', 'Discussions about tech jobs and growth');

INSERT INTO posts (title, content, user_id, status)
VALUES
  ('First Post', 'This is the first test post.', 1, 'active'),
  ('Second Post', 'Another test post content.', 2, 'inactive'),
  ('Hello World', 'Excited to join!', 3, 'active'),
  ('Node.js Tips', 'Here are some useful Node.js tips for beginners.', 4, 'active'),
  ('Career Advice', 'How do you negotiate your first developer job offer?', 5, 'active');

INSERT INTO comments (user_id, post_id, content)
VALUES
  (2, 1, 'Nice post!'),
  (3, 1, 'Thanks for sharing.'),
  (1, 3, 'Welcome aboard!'),
  (5, 4, 'Great tips, thanks for posting.'),
  (4, 5, 'Negotiation is key, do your research first.');

INSERT INTO likes (post_id, user_id, type)
VALUES
  (1, 2, 'like'),
  (1, 3, 'like'),
  (3, 1, 'like'),
  (4, 5, 'like'),
  (5, 4, 'like');

INSERT INTO post_categories (post_id, category_id)
VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5);