import { Request, Response } from 'express';
import Task from '../models/Task';

// Create task
export const createTask = async (req: any, res: any): Promise<any> => {
  const { title, startTime, endTime, priority, status } = req.body;
  const userId = (req as any).user.id; // Get userId from authenticated user

  try {
    // Create task in the database
    const task = await Task.create({
      title,
      startTime,
      endTime,
      priority,
      status,
      userId,
    });

    // Send the created task back in the response
    return res.status(201).json(task);
  } catch (error) {
    // Handle error if task creation fails
    return res.status(500).json({ error: 'Failed to create task', details: error });
  }
};

// Get all tasks for a specific user
export const getTasks = async (req: any, res: any): Promise<any> => {
  const userId = (req as any).user.id; // Get userId from authenticated user

  try {
    // Fetch tasks for the authenticated user
    const tasks = await Task.findAll({
      where: { userId }, // Filter tasks by userId
    });

    if (tasks.length === 0) {
      // No tasks found for the user
      return res.status(404).json({ message: 'No tasks found for this user' });
    }

    // Send tasks as a response
    return res.status(200).json(tasks);
  } catch (error) {
    // Handle error if task fetching fails
    return res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

// Edit task (excluding userId and id)
export const editTask = async (req: any, res: any): Promise<any> => {
  const { id, title, startTime, endTime, priority, status } = req.body; // Extract task details from the body
  const userId = (req as any).user.id; // Get userId from authenticated user

  try {
    // Find the task by id and userId
    const task = await Task.findOne({ where: { id, userId } });
    if (!task) {
      // If task not found or not authorized to edit
      return res.status(404).json({ message: 'Task not found or not authorized to edit' });
    }

    // Update task fields (only if they are provided)
    task.title = title ?? task.title;
    task.startTime = startTime ?? task.startTime;
    task.endTime = endTime ?? task.endTime;
    task.priority = priority ?? task.priority;
    task.status = status ?? task.status;

    // Save updated task
    await task.save();

    // Send the updated task in the response
    return res.status(200).json(task);
  } catch (error) {
    // Handle error if task update fails
    return res.status(500).json({ message: 'Error updating task', error });
  }
};

// Delete task
export const deleteTask = async (req: any, res: any): Promise<any> => {
  const { id } = req.body; // Task ID passed in the body
  const userId = (req as any).user.id; // Authenticated user's ID

  try {
    // Find the task by id and userId
    const task = await Task.findOne({ where: { id, userId } });
    if (!task) {
      // If task not found or not authorized to delete
      return res.status(404).json({ message: 'Task not found or not authorized to delete' });
    }

    // Delete the task from the database
    await task.destroy();

    // Send success message in the response
    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    // Handle error if task deletion fails
    return res.status(500).json({ message: 'Error deleting task', error });
  }
};
