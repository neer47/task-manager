import express from 'express';
import { getTasks, createTask, getTaskById, updateTask, deleteTask, summarizeTask } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getTasks);

router.post('/', protect, createTask);

router.get('/:id', protect, getTaskById);

router.put('/:id', protect, updateTask);

router.post('/:id/summarize', protect, summarizeTask);

router.delete('/:id', protect, deleteTask);

export default router;
