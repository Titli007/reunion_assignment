import { Router } from 'express';
import { signup, login } from '../controllers/userController';
import { authenticate } from '../middleware/auth';
import express, { Request, Response } from 'express';

const router = Router();

// Signup route
router.post('/signup', async (req: Request, res: Response) => {
  await signup(req, res);
});

// Login route

router.post('/login', async (req: Request, res: Response) => {
  await login(req, res);
});

export default router;
