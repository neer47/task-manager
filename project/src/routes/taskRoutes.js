import express from 'express';
import { getTasks, createTask, getTaskById, updateTask, deleteTask, summarizeTask } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createTask);

router.get('/', protect, getTasks);

router.get('/:id', protect, getTaskById);

router.put('/:id', protect, updateTask);

router.post('/summerize/:id', protect, summarizeTask);

router.delete('/:id', protect, deleteTask);

export default router;
