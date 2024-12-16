import React from 'react';
import { TaskStats as TaskStatsType } from '../../types';

interface Props {
  stats: TaskStatsType;
}

export const TaskStats: React.FC<Props> = ({ stats }) => {
  // Calculate pending tasks summary
  const totalPendingTasks = Object.values(stats.timeLapsedByPriority).length;
  const totalTimeLapsed = Object.values(stats.timeLapsedByPriority)
    .reduce((sum, time) => sum + time, 0);
  const totalTimeToFinish = Object.values(stats.timeLeftByPriority)
    .reduce((sum, time) => sum + Math.max(0, time), 0);

  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        <div className="grid grid-cols-4 gap-8">
          <div>
            <div className="text-4xl font-bold text-indigo-600">{stats.totalTasks}</div>
            <div className="text-gray-500 mt-1">Total tasks</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600">{stats.completedPercentage}%</div>
            <div className="text-gray-500 mt-1">Tasks completed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-600">{stats.pendingPercentage}%</div>
            <div className="text-gray-500 mt-1">Tasks pending</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600">{stats.averageCompletionTime.toFixed(1)} hrs</div>
            <div className="text-gray-500 mt-1">Average time per completed task</div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Pending task summary</h2>
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-4xl font-bold text-indigo-600">{totalPendingTasks}</div>
            <div className="text-gray-500 mt-1">Pending tasks</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-600">{totalTimeLapsed.toFixed(0)} hrs</div>
            <div className="text-gray-500 mt-1">Total time lapsed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600">{totalTimeToFinish.toFixed(0)} hrs</div>
            <div className="text-gray-500 mt-1">Total time to finish</div>
            <div className="text-sm text-gray-400">estimated based on endtime</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Task priority</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Pending tasks</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Time lapsed (hrs)</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Time to finish (hrs)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((priority) => (
                <tr key={priority} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{priority}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {Object.keys(stats.timeLapsedByPriority).filter(p => Number(p) === priority).length}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {(stats.timeLapsedByPriority[priority] || 0).toFixed(0)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {Math.max(0, (stats.timeLeftByPriority[priority] || 0)).toFixed(0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
