import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/config';
import User from './User';

// Define the Task model's attributes
interface TaskAttributes {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  priority: number;
  status: 'pending' | 'finished';
  userId: string;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> {}

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: string;
  public title!: string;
  public startTime!: Date;
  public endTime!: Date;
  public priority!: number;
  public status!: 'pending' | 'finished';
  public userId!: string;

  // Timestamps for Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Task model
Task.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    status: {
      type: DataTypes.ENUM('pending', 'finished'),
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User, // Referencing the User model
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: true,
  }
);

export default Task;
