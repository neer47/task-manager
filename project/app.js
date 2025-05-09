import express from 'express';
import cors from 'cors';
import { errorHandler, notFound } from './src/middleware/errorMiddleware.js';
import connectDB from './src/config/db.js';
import routes from './src/routes/index.js';

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api', routes);

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Task Management API',
    documentation: {
      users: {
        register: 'POST /api/users/register',
        login: 'POST /api/users/login',
        profile: 'GET /api/users/profile'
      },
      tasks: {
        getAllTasks: 'GET /api/tasks',
        createTask: 'POST /api/tasks',
        getTaskById: 'GET /api/tasks/:id',
        updateTask: 'PUT /api/tasks/:id',
        deleteTask: 'DELETE /api/tasks/:id'
      }
    }
  });
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;