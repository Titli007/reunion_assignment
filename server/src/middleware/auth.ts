import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    // Send response if token is missing
    res.status(401).json({ error: 'Access denied. No token provided.' });
    return; // Return here to prevent further code execution
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded; // Attach user information to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Send response if token is invalid
    res.status(400).json({ error: 'Invalid token' });
    return; // Return here to prevent further code execution
  }
};
