<h1>Introduction</h1>

  <p>
    USOF is a question-and-answer platform designed for professional and enthusiast programmers. It allows users to share problems, solutions, and insights with the community through short posts, receive feedback, and increase their profile rating based on contributions. This API is the backend foundation for the future USOF web application. It provides all the necessary endpoints for managing users, posts, likes, comments, and user interactions.
  </p>

  <h2>Key Features</h2>
  <ul>
    <li><strong>Authentication &amp; Authorization</strong> — register, login, password reset; role-based access (user / admin)</li>
    <li><strong>CRUD operations</strong> — posts, comments, categories, and users</li>
    <li><strong>Likes system</strong> — like/dislike on posts and comments</li>
    <li><strong>Admin panel</strong> — manage users, content, and moderation (active/inactive, locking)</li>
    <li><strong>Sorting &amp; Filtering</strong> — by likes, date, categories, status</li>
    <li><strong>Error handling &amp; validation</strong> — informative responses and input checks</li>
  </ul>

<h1>CBL stages</h1>

<section>
    <h2> Engage</h2>
    <p><strong>Goal:</strong> Understand the problem.</p>
    <ul>
      <li><strong>Problem:</strong> Developers need a simple way to share knowledge.</li>
      <li><strong>Solution:</strong> Build a Q&A API as the backend for a future web platform.</li>
    </ul>
  </section>

  <section>
    <h2> Investigate</h2>
    <p><strong>Goal:</strong> Research tools & requirements.</p>
    <ul>
      <li>Chose <strong>Node.js + Express</strong> with <strong>MySQL</strong>.</li>
      <li>Defined REST endpoints, database schema, and role-based access control.</li>
      <li>Planned admin panel for data management.</li>
    </ul>
  </section>

  <section>
    <h2> Act: Basic</h2>
    <p><strong>Goal:</strong> Build the core API.</p>
    <ul>
      <li>Implemented authentication (JWT), user, post, comment, and like modules.</li>
      <li>Added admin panel for CRUD operations.</li>
      <li>Database auto-initialization and sample seeding.</li>
    </ul>
  </section>

  <section>
    <h2> Act: Creative</h2>
    <p><strong>Goal:</strong> Add enhancements.</p>
    <ul>
      <li>Favorites and subscriptions for posts.</li>
      <li>Advanced filtering and sorting.</li>
      <li>Improved security (rate limiting, input validation).</li>
    </ul>
  </section>

<h1>Algorithm</h1>

<h2>Authentication & Authorization</h2>
<ul>
  <li>User sends <code>/auth/register</code> request → data is validated → password hashed → user stored in DB with default <code>user</code> role.</li>
  <li>User logs in via <code>/auth/login</code> → credentials validated → system issues JWT access token + refresh token.</li>
  <li>Each protected route checks token with <code>authenticateAccessToken</code> middleware.</li>
  <li>Role-based access:
    <ul>
      <li><strong>User</strong>: Can create/update/delete own posts, comments, likes.</li>
      <li><strong>Admin</strong>: Has full control via <code>/admin</code> endpoints (manage users, posts, categories).</li>
    </ul>
  </li>
</ul>

<h2>Post Management</h2>
<ul>
  <li>Authenticated user sends <code>POST /posts</code> → request validated (title, content, categories) → stored in DB → linked to user.</li>
  <li>Posts can include images (handled via Multer middleware).</li>
  <li>Posts are fetched publicly with <code>GET /posts</code> (supports filters: category, date, status, sorting by likes/date).</li>
  <li>Only the author (or admin) can <code>PATCH</code> or <code>DELETE</code> a post.</li>
</ul>

<h2>Comments</h2>
<ul>
  <li>Users can comment under active posts via <code>POST /posts/:post_id/comments</code>.</li>
  <li>Each comment links to <code>user_id</code> and <code>post_id</code>.</li>
  <li>Author can edit comment status/content or delete it.</li>
</ul>

<h2>Likes & Ratings</h2>
<ul>
  <li>Users can like or dislike a post/comment via <code>POST /posts/:post_id/like</code> or <code>/comments/:comment_id/like</code>.</li>
  <li>Each like is unique per user per entity (post/comment).</li>
  <li>When a like/dislike is added or removed, the author's rating is automatically recalculated.</li>
</ul>

<h2>Favorites & Subscriptions</h2>
<ul>
  <li>Users can mark posts as favorites → stored in <code>user_favorites</code> table → fetched via <code>GET /posts/favorites</code>.</li>
  <li>Users can subscribe to posts to receive notifications when someone comments or updates the post.</li>
</ul>

<h2>Notifications</h2>
<ul>
  <li>When subscribed post is updated or commented, a notification is created in <code>notifications</code> table.</li>
  <li>Users can fetch notifications via <code>GET /notifications</code> and clear them with <code>DELETE /notifications</code>.</li>
</ul>

<h2>Admin Panel Actions</h2>
<ul>
  <li>Admin can create/update/delete users, categories, and posts directly through <code>/admin</code> routes.</li>
  <li>Admin can deactivate posts or comments (set status to inactive), making them hidden from regular users.</li>
</ul>

<h2>Database Initialization</h2>
<ul>
  <li>On server start, the database is checked and recreated if needed.</li>
  <li>Seeds initial data: admin user, sample categories, posts, comments.</li>
</ul>

<h2>Error Handling</h2>
<ul>
  <li>Custom middleware captures errors → returns proper HTTP status codes (400, 401, 403, 404, 500).</li>
  <li>All validation errors send descriptive messages to help client handle them properly.</li>
</ul>

<h1>Database structure and entities</h1>

  <h2>Users</h2>
  <table>
    <tr><th>Column</th><th>Type</th><th>Description</th></tr>
    <tr><td>id</td><td>INT (PK)</td><td>Unique user ID.</td></tr>
    <tr><td>login</td><td>VARCHAR</td><td>Unique username.</td></tr>
    <tr><td>fullname</td><td>VARCHAR</td><td>Full name of the user.</td></tr>
    <tr><td>password</td><td>VARCHAR</td><td>Hashed password.</td></tr>
    <tr><td>email</td><td>VARCHAR (unique)</td><td>User email address.</td></tr>
    <tr><td>verified</td><td>BOOLEAN</td><td>Email verification status.</td></tr>
    <tr><td>role</td><td>VARCHAR</td><td>User role (admin/user).</td></tr>
    <tr><td>rating</td><td>INT</td><td>Sum of likes-dislikes.</td></tr>
    <tr><td>avatar</td><td>VARCHAR</td><td>Path to profile picture.</td></tr>
    <tr><td>created_at</td><td>TIMESTAMP</td><td>Account creation date.</td></tr>
  </table>

  <h2>Categories</h2>
  <table>
    <tr><th>Column</th><th>Type</th><th>Description</th></tr>
    <tr><td>id</td><td>INT (PK)</td><td>Unique category ID.</td></tr>
    <tr><td>title</td><td>VARCHAR</td><td>Category name.</td></tr>
    <tr><td>description</td><td>VARCHAR</td><td>Category details.</td></tr>
  </table>

  <h2>Posts</h2>
  <table>
    <tr><th>Column</th><th>Type</th><th>Description</th></tr>
    <tr><td>id</td><td>INT (PK)</td><td>Unique post ID.</td></tr>
    <tr><td>title</td><td>VARCHAR</td><td>Post title.</td></tr>
    <tr><td>content</td><td>TEXT</td><td>Main content.</td></tr>
    <tr><td>user_id</td><td>INT (FK)</td><td>Author (links to users).</td></tr>
    <tr><td>images</td><td>JSON</td><td>Attached images.</td></tr>
    <tr><td>status</td><td>VARCHAR</td><td>Active/Inactive status.</td></tr>
    <tr><td>created_at</td><td>TIMESTAMP</td><td>Creation date.</td></tr>
  </table>

  <h2>Comments</h2>
  <table>
    <tr><th>Column</th><th>Type</th><th>Description</th></tr>
    <tr><td>id</td><td>INT (PK)</td><td>Unique comment ID.</td></tr>
    <tr><td>user_id</td><td>INT (FK)</td><td>Author (links to users).</td></tr>
    <tr><td>post_id</td><td>INT (FK)</td><td>Post that comment belongs to.</td></tr>
    <tr><td>content</td><td>TEXT</td><td>Comment text.</td></tr>
    <tr><td>created_at</td><td>TIMESTAMP</td><td>Creation date.</td></tr>
  </table>

  <h2>Likes</h2>
  <table>
    <tr><th>Column</th><th>Type</th><th>Description</th></tr>
    <tr><td>id</td><td>INT (PK)</td><td>Unique like/dislike ID.</td></tr>
    <tr><td>post_id</td><td>INT (FK)</td><td>Liked post (nullable if comment).</td></tr>
    <tr><td>comment_id</td><td>INT (FK)</td><td>Liked comment (nullable if post).</td></tr>
    <tr><td>user_id</td><td>INT (FK)</td><td>User who reacted.</td></tr>
    <tr><td>type</td><td>VARCHAR</td><td>Like or Dislike.</td></tr>
    <tr><td>created_at</td><td>TIMESTAMP</td><td>Reaction date.</td></tr>
  </table>

  <h2>Notifications</h2>
  <table>
    <tr><th>Column</th><th>Type</th><th>Description</th></tr>
    <tr><td>id</td><td>INT (PK)</td><td>Notification ID.</td></tr>
    <tr><td>user_id</td><td>INT (FK)</td><td>Target user.</td></tr>
    <tr><td>post_id</td><td>INT (FK)</td><td>Related post.</td></tr>
    <tr><td>type</td><td>VARCHAR</td><td>Notification type.</td></tr>
    <tr><td>payload</td><td>JSON</td><td>Extra data.</td></tr>
    <tr><td>created_at</td><td>TIMESTAMP</td><td>Date of notification.</td></tr>
  </table>

  <h2>Relationships & Linking Tables</h2>
  <table>
    <tr><th>Table</th><th>Description</th></tr>
    <tr><td>post_categories</td><td>Links posts to categories (many-to-many).</td></tr>
    <tr><td>user_favorites</td><td>Stores which posts users marked as favorite.</td></tr>
    <tr><td>user_subscribes</td><td>Stores which posts users subscribed to.</td></tr>
  </table>

  <h2>Tokens</h2>
  <table>
    <tr><th>Table</th><th>Description</th></tr>
    <tr><td>refresh_tokens</td><td>Stores JWT refresh tokens for sessions.</td></tr>
    <tr><td>reset_tokens</td><td>Stores password reset tokens with expiration.</td></tr>
  </table>

  <h1>Routes</h1>
  <h2> Auth Routes</h2>
<ul>
  <li><code>POST /api/auth/register</code> – Register new user.</li>
  <li><code>POST /api/auth/login</code> – Login with email & password.</li>
  <li><code>POST /api/auth/logout</code> – Logout (requires token).</li>
  <li><code>POST /api/auth/email-confirm/:confirm_token</code> – Confirm email address.</li>
  <li><code>POST /api/auth/password-reset</code> – Request password reset email.</li>
  <li><code>POST /api/auth/password-reset/:confirm_token</code> – Reset password using token.</li>
</ul>

<h2>👤 User Routes</h2>
<ul>
  <li><code>GET /api/users</code> – Get all users.</li>
  <li><code>GET /api/users/:user_id</code> – Get specific user profile.</li>
  <li><code>PATCH /api/users/:user_id</code> – Update user data (self only).</li>
  <li><code>PATCH /api/users/avatar</code> – Update avatar.</li>
  <li><code>DELETE /api/users/:user_id</code> – Delete user (self only).</li>
</ul>

<h2> Post Routes</h2>
<ul>
  <li><code>GET /api/posts</code> – Get posts (supports filters, sorting, pagination).</li>
  <li><code>GET /api/posts/favorites</code> – Get favorite posts (requires login).</li>
  <li><code>GET /api/posts/:post_id</code> – Get single post.</li>
  <li><code>GET /api/posts/:post_id/comments</code> – Get comments for a post.</li>
  <li><code>GET /api/posts/:post_id/categories</code> – Get post categories.</li>
  <li><code>GET /api/posts/:post_id/like</code> – Get likes for post.</li>
  <li><code>POST /api/posts</code> – Create new post.</li>
  <li><code>POST /api/posts/:post_id/favorite</code> – Add to favorites.</li>
  <li><code>POST /api/posts/:post_id/comments</code> – Create comment.</li>
  <li><code>POST /api/posts/:post_id/like</code> – Like/dislike post.</li>
  <li><code>POST /api/posts/:post_id/subscribe</code> – Subscribe to post updates.</li>
  <li><code>PATCH /api/posts/:post_id</code> – Update own post.</li>
  <li><code>DELETE /api/posts/:post_id/like</code> – Remove like from post.</li>
  <li><code>DELETE /api/posts/:post_id</code> – Delete post (only author).</li>
</ul>

<h2> Comment Routes</h2>
<ul>
  <li><code>GET /api/comments</code> – Get all comments.</li>
  <li><code>GET /api/comments/:comment_id</code> – Get single comment.</li>
  <li><code>GET /api/comments/:comment_id/like</code> – Get likes on comment.</li>
  <li><code>POST /api/comments/:comment_id/like</code> – Like/dislike comment.</li>
  <li><code>DELETE /api/comments/:comment_id/like</code> – Remove like from comment.</li>
  <li><code>PATCH /api/comments/:comment_id</code> – Update own comment.</li>
  <li><code>DELETE /api/comments/:comment_id</code> – Delete comment (author only).</li>
</ul>

<h2> Category Routes</h2>
<ul>
  <li><code>GET /api/categories</code> – Get all categories.</li>
  <li><code>GET /api/categories/:category_id</code> – Get category details.</li>
  <li><code>GET /api/categories/:category_id/posts</code> – Get posts in category.</li>
</ul>

<h2> Notification Routes</h2>
<ul>
  <li><code>GET /api/notifications</code> – Get user notifications.</li>
  <li><code>DELETE /api/notifications</code> – Clear notifications.</li>
</ul>

<h2> Admin Routes</h2>
<ul>
  <li><code>POST /api/admin/users</code> – Create user (admin).</li>
  <li><code>PATCH /api/admin/users/:user_id</code> – Update user role.</li>
  <li><code>DELETE /api/admin/users/:user_id</code> – Delete user.</li>
  <li><code>PATCH /api/admin/posts/:post_id</code> – Change post status/category.</li>
  <li><code>DELETE /api/admin/posts/:post_id</code> – Delete post.</li>
  <li><code>DELETE /api/admin/comments/:comment_id</code> – Delete comment.</li>
  <li><code>POST /api/admin/categories</code> – Create category.</li>
  <li><code>PATCH /api/admin/categories/:category_id</code> – Update category.</li>
  <li><code>DELETE /api/admin/categories/:category_id</code> – Delete category.</li>
</ul>

<h1>Author</h1>

<div style="margin-top: 20px; padding: 10px; border-top: 1px solid #ddd;">
  <p><strong>Author:</strong> <a href="https://github.com/DjDreadNautilus" target="_blank">Ostras Maksym</a></p>
  <p><strong>Project:</strong> <a href="https://github.com/DjDreadNautilus/usof" target="_blank">Usof</a></p>
</div>
