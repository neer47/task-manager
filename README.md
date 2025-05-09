# Task Management API

A RESTful API built with Node.js, Express.js, and MongoDB for managing users and tasks, featuring JWT authentication and an AI-powered task summary using a Large Language Model (LLM) API (e.g., XAI's Grok API). The project follows the Model-View-Controller (MVC) architecture, adheres to industry standards, and includes comprehensive testing and documentation.

---

## 📚 Table of Contents

* [Features](#features)
* [Technologies](#technologies)
* [Setup Instructions](#setup-instructions)
* [API Documentation](#api-documentation)
* [Running Tests](#running-tests)
* [Design Decisions](#design-decisions)
* [Deployment (Optional)](#deployment-optional)
* [License](#license)

---

## ✅ Features

### 🔐 User Management

* Register and login with email and password
* Fetch authenticated user profile
* Secure password hashing with bcrypt and JWT-based authentication

### 🗂️ Task Management

* Create, read, update, and delete tasks
* Filter tasks by priority or due date with pagination
* Associate tasks with authenticated users

### 🤖 AI-Powered Task Summary

* Generate concise task summaries using an LLM API (e.g., XAI's Grok API)
* Store and retrieve summaries in MongoDB

### 🛡️ Additional Features

* Input validation and robust error handling
* Unit and integration tests with Jest and Supertest
* Code linting with ESLint (Airbnb style guide)
* Optional: Rate limiting and task status transitions

---

## 🛠 Technologies

* **Backend:** Node.js, Express.js
* **Database:** MongoDB with Mongoose
* **Authentication:** JWT, bcrypt
* **Validation:** express-validator
* **API Client:** Axios (for LLM API calls)
* **Testing:** Jest, Supertest
* **Linting:** ESLint (Airbnb style guide)
* **Logging:** Morgan
* **Environment:** dotenv
* **Optional:** express-rate-limit (for rate limiting)

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-management-api.git
cd task-management-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_jwt_secret
LLM_API_KEY=your_llm_api_key
LLM_API_URL=https://api.x.ai/v1/summarize
```

* Replace `MONGO_URI` with your MongoDB connection string
* Use a strong `JWT_SECRET`
* Obtain `LLM_API_KEY` and `LLM_API_URL` from your LLM provider (e.g., XAI's Grok API)

### 4. Start the Server

```bash
npm start
```

API will be available at: [http://localhost:3000](http://localhost:3000)

For development mode (with auto-restart):

```bash
npm run dev
```

---

## 📘 API Documentation

### User Management

#### `POST /api/users/register` - Register a new user

```json
Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123"
}
```

```json
Response:
{
  "userId": "123",
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### `POST /api/users/login` - Login user

```json
Request:
{
  "email": "john@example.com",
  "password": "secure123"
}
```

```json
Response:
{
  "token": "jwt_token",
  "user": {
    "userId": "123",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### `GET /api/users/me` - Get user profile

Headers:
`Authorization: Bearer <jwt_token>`

```json
Response:
{
  "userId": "123",
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

### Task Management

#### `POST /api/tasks` - Create a task

Headers:
`Authorization: Bearer <jwt_token>`

```json
Request:
{
  "title": "Build Dashboard",
  "description": "Develop a new feature for the dashboard, including UI and backend logic, by next week.",
  "dueDate": "2025-05-16",
  "priority": "high"
}
```

```json
Response:
{
  "taskId": "123",
  "title": "Build Dashboard",
  "description": "...",
  "dueDate": "2025-05-16T00:00:00.000Z",
  "priority": "high",
  "userId": "123"
}
```

#### `GET /api/tasks` - Get tasks with filters

Query Parameters: `?page=1&limit=10&priority=high&dueDate=2025-05-16`

```json
Response:
{
  "tasks": [ ... ],
  "total": 25,
  "page": 1,
  "limit": 10
}
```

#### `PUT /api/tasks/:id` - Update a task

Headers:
`Authorization: Bearer <jwt_token>`

```json
Request:
{
  "title": "Updated Dashboard",
  "priority": "medium"
}
```

#### `DELETE /api/tasks/:id` - Delete a task

Headers:
`Authorization: Bearer <jwt_token>`

```json
Response:
{
  "message": "Task deleted"
}
```

#### `POST /api/tasks/:id/summarize` - Generate task summary

Headers:
`Authorization: Bearer <jwt_token>`

```json
Response:
{
  "taskId": "123",
  "summary": "Create a dashboard feature with UI and backend by next week."
}
```

---

## 🧪 Running Tests

```bash
npm test
```

* Tests cover user/task CRUD and summarization
* Edge cases: invalid input, unauthorized access
* Uses Jest and Supertest

Test coverage report:

```bash
npm test -- --coverage
```

---

## 🧱 Design Decisions

* **MVC Architecture**: Separation of concerns (Models, Controllers, Routes)
* **Mongoose**: Schema validation, indexing, and query optimization
* **JWT Auth**: Stateless, secure, 1-day expiration
* **LLM Integration**: Uses retry logic and error handling
* **Testing**: Jest and Supertest for reliable testing
* **Linting**: ESLint (Airbnb) for consistent, clean code
* **Security**: bcrypt password hashing, input validation

---

## 🚢 Deployment (Optional)

### Deploy to Heroku

```bash
# Install Heroku CLI and login
heroku create

# Set environment variables
heroku config:set PORT=3000 MONGO_URI=<your-uri> JWT_SECRET=<your-secret> LLM_API_KEY=<your-key> LLM_API_URL=<your-url>

# Deploy
git push heroku main

# Open app
heroku open
```

Or deploy to **Render** using their platform documentation and similar environment variables.

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

