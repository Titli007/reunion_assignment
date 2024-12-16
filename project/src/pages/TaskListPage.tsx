import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TaskList } from '../components/Tasks/TaskList';
import { TaskModal } from '../components/Tasks/TaskModal';
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks';
import { Task } from '../types';
import { PlusIcon } from 'lucide-react';

export const TaskListPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const fetchedTasks = await getTasks();
    setTasks(fetchedTasks);
  };

  const handleCreateTask = async (taskData: Omit<Task, 'id'>) => {
    await createTask(taskData);
    fetchTasks();
  };

  const handleEdit = async (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleUpdate = async (taskData: Omit<Task, 'id'>) => {
    if (editingTask) {
      await updateTask({ ...taskData, id: editingTask.id });
      setEditingTask(null);
      fetchTasks();
    }
  };

  const handleDelete = async (taskId: string) => {
    await deleteTask(taskId);
    fetchTasks();
  };

  const handleStatusChange = async (taskId: string, status: 'pending' | 'finished') => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const updatedTask = {
        ...task,
        status,
        endTime: status === 'finished' ? new Date() : task.endTime
      };
      await updateTask(updatedTask);
      fetchTasks();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/dashboard" className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-gray-800">Task List</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Task
              </button>
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <TaskList
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />

        <TaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={editingTask ? handleUpdate : handleCreateTask}
          initialTask={editingTask || undefined}
        />
      </main>
    </div>
  );
};