import React from 'react';
import { Task } from '../../types';
import { PencilIcon, TrashIcon } from 'lucide-react';

interface Props {
  task: Task;
  selected: boolean;
  onSelect: (selected: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: 'pending' | 'finished') => void;
}

export const TaskRow: React.FC<Props> = ({
  task,
  selected,
  onSelect,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const formattedTaskId = `T-${task.id.toString().slice(-4)}`;
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => onSelect(e.target.checked)}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{formattedTaskId}</td>
      <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
      <td className="px-6 py-4 whitespace-nowrap">{task.priority}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(e.target.value as 'pending' | 'finished')}
          className="border rounded p-1"
        >
          <option value="pending">Pending</option>
          <option value="finished">Finished</option>
        </select>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {new Date(task.startTime).toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {new Date(task.endTime).toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap space-x-2">
        <button
          onClick={onEdit}
          className="text-indigo-600 hover:text-indigo-900"
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-900"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
};