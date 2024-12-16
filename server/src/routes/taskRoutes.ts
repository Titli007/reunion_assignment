import express from 'express';
import { createTask, getTasks, editTask, deleteTask } from '../controllers/taskController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/tasks', authenticate, createTask); // Create a task for the authenticated user
router.get('/tasks', authenticate, getTasks); // Get all tasks for the authenticated user
router.put('/tasks', authenticate, editTask); // Edit a task for the authenticated user
router.delete('/tasks', authenticate, deleteTask); // Delete a task for the authenticated user

export default router;
