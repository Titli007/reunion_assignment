import express, { Request, Response } from 'express';
import cors from 'cors'; // Import cors
import sequelize from './database/config';
import taskRoutes from './routes/taskRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Enable CORS for all routes
app.use(cors()); // Allow all origins (you can customize this)

// Sync database
async function syncDatabase() {
  try {
    await sequelize.sync({ force: true }); // WARNING: `force: true` will drop tables and recreate them
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
}
syncDatabase();

// Use routes
app.use( taskRoutes); // Use task routes under /api
app.use(userRoutes);

// Home route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Node.js!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
