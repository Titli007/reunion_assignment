import React, { useState } from 'react';
import { Task } from '../../types';
import { TaskRow } from './TaskRow';
import { TaskFilters } from './TaskFilters';

interface Props {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: 'pending' | 'finished') => void;
}

export const TaskList: React.FC<Props> = ({ tasks, onEdit, onDelete, onStatusChange }) => {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<'pending' | 'finished' | null>(null);

  const filteredTasks = tasks
    .filter((task) => !priorityFilter || task.priority === priorityFilter)
    .filter((task) => !statusFilter || task.status === statusFilter)
    .sort((a, b) => {
      switch (sortBy) {
        case 'startTimeAsc':
          return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
        case 'startTimeDesc':
          return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
        case 'endTimeAsc':
          return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
        case 'endTimeDesc':
          return new Date(b.endTime).getTime() - new Date(a.endTime).getTime();
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-4">
      <TaskFilters
        onSortChange={setSortBy}
        onPriorityFilter={setPriorityFilter}
        onStatusFilter={setStatusFilter}
        currentSort={sortBy}
        currentPriority={priorityFilter}
        currentStatus={statusFilter}
      />
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTasks(tasks.map(t => t.id));
                    } else {
                      setSelectedTasks([]);
                    }
                  }}
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                selected={selectedTasks.includes(task.id)}
                onSelect={(selected) => {
                  if (selected) {
                    setSelectedTasks([...selectedTasks, task.id]);
                  } else {
                    setSelectedTasks(selectedTasks.filter(id => id !== task.id));
                  }
                }}
                onEdit={() => onEdit(task)}
                onDelete={() => onDelete(task.id)}
                onStatusChange={(status) => onStatusChange(task.id, status)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};