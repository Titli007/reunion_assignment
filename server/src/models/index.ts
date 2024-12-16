import User from './User';
import Task from './Task';

// Define relationships
User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });
Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { User, Task };
