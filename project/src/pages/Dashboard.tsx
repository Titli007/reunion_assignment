import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TaskStats } from '../components/Dashboard/TaskStats';
import { getTasks } from '../api/tasks';
import { Task, TaskStats as TaskStatsType } from '../types';

export const Dashboard = () => {
  const [stats, setStats] = useState<TaskStatsType | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const tasks = await getTasks();
      const stats = calculateStats(tasks);
      setStats(stats);
    };

    fetchStats();
  }, []);

  const calculateStats = (tasks: Task[]): TaskStatsType => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'finished').length;
    
    const stats: TaskStatsType = {
      totalTasks,
      completedPercentage: Math.round((completedTasks / totalTasks) * 100) || 0,
      pendingPercentage: Math.round(((totalTasks - completedTasks) / totalTasks) * 100) || 0,
      timeLapsedByPriority: {},
      timeLeftByPriority: {},
      averageCompletionTime: 0
    };

    // Calculate time stats
    const now = new Date();
    const completedTasksTimes: number[] = [];

    tasks.forEach(task => {
      const priority = task.priority;
      const startTime = new Date(task.startTime);
      const endTime = new Date(task.endTime);

      if (task.status === 'finished') {
        const completionTime = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
        completedTasksTimes.push(completionTime);
      } else {
        // Time lapsed for pending tasks
        const lapsedTime = (now.getTime() - startTime.getTime()) / (1000 * 60 * 60);
        stats.timeLapsedByPriority[priority] = (stats.timeLapsedByPriority[priority] || 0) + lapsedTime;

        // Time left for pending tasks (ensure it's not negative)
        const timeLeft = Math.max(0, (endTime.getTime() - now.getTime()) / (1000 * 60 * 60));
        stats.timeLeftByPriority[priority] = (stats.timeLeftByPriority[priority] || 0) + timeLeft;
      }
    });

    // Calculate average completion time
    if (completedTasksTimes.length > 0) {
      stats.averageCompletionTime = completedTasksTimes.reduce((a, b) => a + b, 0) / completedTasksTimes.length;
    }

    return stats;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <Link 
                to="/dashboard" 
                className="text-indigo-600 hover:text-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link 
                to="/tasks" 
                className="text-gray-600 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Task list
              </Link>
            </div>
            <div className="flex items-center">
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                onClick={() => {/* Add sign out logic */}}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
          {stats ? (
            <TaskStats stats={stats} />
          ) : (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

