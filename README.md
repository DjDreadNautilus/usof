<h1>Description</h1>
<p>
USOF is a question-and-answer platform designed for professional and enthusiast programmers. It allows users to share problems, solutions, and insights with the community through short posts, receive feedback, and increase their profile rating based on contributions.
This API is the backend foundation for the future USOF web application. It provides all the necessary endpoints for managing users, posts, likes, comments, and user interactions.
</p>
<h1>Requirements</h1>
<ul>
  <li><em>Node.js (version >= 20)</em></li>
  <li><em>MySQL</em></li>
</ul>
<h2>Dependencies</h2>
<ul>
  <li><strong>bcrypt</strong> (v6.0.0) – Library for hashing passwords securely</li>
  <li><strong>cookie-parser</strong> (v1.4.7) – Middleware for parsing cookies in Express</li>
  <li><strong>dotenv</strong> (v17.2.2) – Loads environment variables from a <code>.env</code> file</li>
  <li><strong>express</strong> (v5.1.0) – Fast, unopinionated web framework for Node.js</li>
  <li><strong>express-session</strong> (v1.18.2) – Session middleware for Express</li>
  <li><strong>jsonwebtoken</strong> (v9.0.2) – JSON Web Token implementation for authentication</li>
  <li><strong>multer</strong> (v2.0.2) – Middleware for handling <code>multipart/form-data</code> (file uploads)</li>
  <li><strong>mysql2</strong> (v3.14.4) – MySQL client for Node.js</li>
  <li><strong>nodemailer</strong> (v7.0.6) – Module for sending emails from Node.js</li>
</ul>

<h1>How to Run</h1>
<ol>
  <li>Clone the repository:
    <pre><code>git clone https://github.com/DjDreadNautilus/usof</code></pre>
  </li>
  <li>Install dependencies:
    <pre><code>npm install</code></pre>
  </li>
  <li>Create a <code>.env</code> file in the project root and configure your environment variables:
    <pre><code>
      ACCESS_TOKEN_SECRET= Your secred here
      REFRESH_TOKEN_SECRET= Your secred here
      DB_HOST= Your host (localhost)
      DB_USER= Some username
      DB_PASSWORD= Some password
      DB_NAME= DB name
      ROOT_PASSWORD= Your root password
      ROOT_USER= Your root username
      SMTP_HOST= smtp host
      SMTP_USER= smtp user
      SMTP_PASS= smtp pass
    </code></pre>
  </li>
  <li>Start the server:
    <pre><code>npm start</code></pre>
  </li>
  <li>Navigate to your endpoints, e.g.:
    <pre><code>http://localhost:8080/api/</code></pre>
  </li>
</ol>

<h1>How to Run Admin Panel</h1>
<li>Go in directory:
  <pre><code>cd kottster</code></pre>
</li>
<li>Run admin panel:
  <pre><code>npm run dev</code></pre>
</li>

<h1>Database sceme</h1>
<p>Made with <a href="https://dbdiagram.io">diagram.io</a><p>
<img width="1140" height="815" alt="Untitled (1)" src="https://github.com/user-attachments/assets/e42c3058-c08e-4c52-9e2f-8ed48c6d5a9a" />

<h1>API Routes</h1>

<h2>Auth Routes</h2>
<ul>
  <li><strong>POST /api/auth/register</strong> – Register a new user (login, email, password)</li>
  <li><strong>POST /api/auth/login</strong> – Log in a user and receive access/refresh tokens</li>
  <li><strong>POST /api/auth/logout</strong> – Log out user (requires authentication)</li>
  <li><strong>POST /api/auth/email-confirm/:confirm_token</strong> – Confirm user's email</li>
  <li><strong>POST /api/auth/password-reset</strong> – Send password reset email</li>
  <li><strong>POST /api/auth/password-reset/:confirm_token</strong> – Reset password using token</li>
</ul>

<h2>User Routes</h2>
<ul>
  <li><strong>GET /api/users</strong> – Get all users</li>
  <li><strong>GET /api/users/:user_id</strong> – Get user by ID</li>
  <li><strong>DELETE /api/users/:user_id</strong> – Delete user (requires authentication & author)</li>
  <li><strong>PATCH /api/users/:user_id</strong> – Update user (login, email, password) (requires authentication & author)</li>
  <li><strong>PATCH /api/users/avatar</strong> – Update user avatar (requires authentication & author)</li>
</ul>

<h2>Post Routes</h2>
<ul>
  <li><strong>GET /api/posts</strong> – Get all posts (optional authentication)</li>
  <li><strong>GET /api/posts/:post_id</strong> – Get post by ID</li>
  <li><strong>GET /api/posts/:post_id/comments</strong> – Get comments of a post</li>
  <li><strong>GET /api/posts/:post_id/categories</strong> – Get categories of a post</li>
  <li><strong>GET /api/posts/:post_id/like</strong> – Get likes of a post</li>
  <li><strong>POST /api/posts</strong> – Create a new post (requires authentication)</li>
  <li><strong>POST /api/posts/:post_id/comments</strong> – Add comment to post (requires authentication)</li>
  <li><strong>POST /api/posts/:post_id/like</strong> – Like a post (requires authentication)</li>
  <li><strong>PATCH /api/posts/:post_id</strong> – Update post (requires authentication & author)</li>
  <li><strong>POST /api/posts/:post_id</strong> – Add post to favorites (requires authentication)</li>
  <li><strong>DELETE /api/posts/:post_id/like</strong> – Remove like from post (requires authentication)</li>
  <li><strong>DELETE /api/posts/:post_id</strong> – Delete post (requires authentication & author)</li>
</ul>

<h2>Comment Routes</h2>
<ul>
  <li><strong>GET /api/comments</strong> – Get all comments</li>
  <li><strong>GET /api/comments/:comment_id</strong> – Get comment by ID</li>
  <li><strong>GET /api/comments/:comment_id/like</strong> – Get likes of a comment</li>
  <li><strong>POST /api/comments/:comment_id/like</strong> – Like a comment (requires authentication)</li>
  <li><strong>DELETE /api/comments/:comment_id/like</strong> – Remove like (requires authentication)</li>
  <li><strong>PATCH /api/comments/:comment_id</strong> – Update comment (requires authentication & author)</li>
  <li><strong>DELETE /api/comments/:comment_id</strong> – Delete comment (requires authentication & author)</li>
</ul>

<h2>Category Routes</h2>
<ul>
  <li><strong>GET /api/categories</strong> – Get all categories</li>
  <li><strong>GET /api/categories/:category_id</strong> – Get category by ID</li>
  <li><strong>GET /api/categories/:category_id/posts</strong> – Get all posts for a category</li>
</ul>

<h2>Admin Routes</h2>
<p>All routes below require <strong>authentication</strong> and <strong>admin role</strong>:</p>
<ul>
  <li><strong>POST /api/admin/users</strong> – Create user</li>
  <li><strong>PATCH /api/admin/users/:user_id</strong> – Update user role</li>
  <li><strong>DELETE /api/admin/users/:user_id</strong> – Delete user</li>

  <li><strong>GET /api/admin/posts</strong> – Get all posts (filtered)</li>
  <li><strong>PATCH /api/admin/posts/:post_id</strong> – Update post (status, categories)</li>
  <li><strong>DELETE /api/admin/posts/:post_id</strong> – Delete post</li>

  <li><strong>DELETE /api/admin/comments/:comment_id</strong> – Delete comment</li>

  <li><strong>POST /api/admin/categories</strong> – Create category</li>
  <li><strong>PATCH /api/admin/categories/:category_id</strong> – Update category</li>
  <li><strong>DELETE /api/admin/categories/:category_id</strong> – Delete category</li>
</ul>

<h1>Documentation</h1>
<p>For documentation see <a href="https://github.com/DjDreadNautilus/usof/blob/main/DOCUMENTATION.md">documentation</a></p>
