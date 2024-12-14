# Express API with JWT Authentication, Redis Caching, and Rate Limiting

This is a sample Express.js project demonstrating how to:
- Use JWT (JSON Web Tokens) for user authentication.
- Cache API responses using Redis for improved performance.
- Protect routes with rate limiting.
- Provide a proxy for an external API.

## Prerequisites

Before you get started, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version >= 14.x)
- [Redis](https://redis.io/) (for caching)
- [npm](https://www.npmjs.com/) (for managing packages)

## Setup

1. Clone this repository to your local machine:
   ```bash
   git clone git@github.com:HB-programmer/proxy-server.git
   ```

2. Navigate into the project directory:
   ```bash
   cd proxy-server
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root of the project to store environment variables. Example `.env`:

   ```env
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_TTL=300
   JWT_SECRET=your_secret_key_here  # Secret for signing JWT tokens
   API_URL=your_api_url_here
   VALID_EMAIL=your_valid_email@example.com
   VALID_PASSWORD=your_valid_password
   MAX_LIMIT=5
   WINDOW_SIZE=1 * 60 * 1000
   ```

   - `REDIS_HOST`: Host for the Redis server.
   - `REDIS_PORT`: Port where the Redis server is running.
   - `REDIS_TTL`: Time to live (TTL) for cached responses in Redis (in seconds).
   - `JWT_SECRET`: A secret key used to sign JWT tokens. Replace this with your own secure key.
   - `API_URL`: URL of the external API you want to proxy.
   - `VALID_EMAIL` and `VALID_PASSWORD`: Valid credentials for login.
   - `MAX_LIMIT` and `WINDOW_SIZE`: Configuration for rate limiting.


5. Ensure Redis is running on your machine or through a Docker container:
   ```bash
   redis-server
   ```

6. Start the Express server:
   ```bash
   npm start
   ```

   The server should now be running at `http://localhost:3000`.

## Endpoints

### 1. **Login (Generate JWT Token)**

- **Endpoint**: `POST /auth/login`
- **Description**: Generate a JWT token when the correct credentials (email and password) are provided.
- **Request Body**:
  ```json
  {
    "email": "admin@gmail.com",
    "password": "Admin@123#"
  }
  ```

- **Response**:
  - **Success (200)**:
    ```json
    {
      "message": "Login successful",
      "token": "your_jwt_token_here"
    }
    ```

  - **Failure (401)**:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

### 2. **Proxy Data (With Caching)**

- **Endpoint**: `GET /api/proxy`
- **Description**: Fetch data from an external API (e.g., GitHub) with caching enabled. If the data is cached, it will be returned directly from Redis.
- **Caching**: If the data is found in Redis, it will return the cached data. If not, it fetches from the API, stores it in Redis, and then returns it.

- **Response**:
  ```json
  {
    "id": 1,
    "name": "Example Data"
  }
  ```

### 3. **Protected Route (Requires Token)**

- **Endpoint**: `GET /api/protected`
- **Description**: This is a protected route that requires a valid JWT token to access. The token should be passed in the `Authorization` header as `Bearer <your_jwt_token_here>`.

- **Response (Success)**:
  ```json
  {
    "message": "This is a protected route",
    "user": {
      "email": "admin@gmail.com"
    }
  }
  ```

- **Response (Failure)**:
  ```json
  {
    "message": "Invalid token"
  }
  ```

## Project Structure

Here is the structure of the project:

```
├── controllers/
│   ├── authController.js      # Handles user authentication and login
│   └── proxyController.js     # Handles fetching data from external APIs
├── helpers/
│   ├── cache.js               # Redis caching helper functions
│   └── jwtHelper.js           # Helper functions for JWT token generation
├── middlewares/
│   ├── authMiddleware.js      # Middleware for verifying JWT token
│   └── cacheMiddleware.js     # Middleware for checking and setting cache
├── routes/
│   ├── authRoutes.js          # Routes for login and token generation
│   └── index.js               # Main application routes
├── .env                       # Environment variables
├── package.json               # Project dependencies and scripts
└── server.js                  # Entry point for the Express server
```

## Using Redis Cache

The Redis cache is used to store API responses to reduce load and improve performance. By default, the cache time-to-live (TTL) is set to 5 minutes (`REDIS_TTL` in `.env`), but you can adjust this in the `.env` file.

1. When a request is made to the `/api/proxy` route, the cache is checked first.
2. If the data is found in Redis, it is returned immediately.
3. If the data is not found, it fetches from the external API, caches the result, and then returns it.

## Authentication and Authorization

1. The `/auth/login` endpoint accepts the email and password as input and generates a JWT token if the credentials are valid.
2. The JWT token is then used for subsequent requests to protected routes.
3. The `Authorization` header should include the token for any protected route requests (e.g., `Bearer <your_jwt_token_here>`).

## Rate Limiting

The project uses [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) to limit the number of requests each user can make to the API within a certain time frame. By default, users can make up to 5 requests per minute.

You can modify the rate limiting configuration in the `helpers/rateLimiter.js` file.

## Error Handling

All errors are caught by a generic error handler in the `server.js` file. If an error occurs in any route or middleware, a JSON response with the error message will be returned.

## Example of Protecting Routes

To protect any route from unauthorized access, simply add the `verifyToken` middleware like this:

```js
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/protected', verifyToken, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
});
```

This middleware ensures that only requests with a valid JWT token can access the route.

## Conclusion

This setup demonstrates how to implement a basic Express API with JWT authentication, Redis caching, and rate limiting. It is easily extendable to include additional routes, more sophisticated authentication (e.g., OAuth, password hashing), and advanced caching strategies.

### How to Use:

1. **Set up the project** by following the setup instructions in the `README.md` file.
2. **Start the server** and test the authentication system by logging in with the correct credentials to get a JWT token.
3. Use the **JWT token** to access protected routes and cache-enabled routes. The caching system will improve performance by reducing repeated external API calls.

This `README.md` should provide clear instructions for setting up and using your project.