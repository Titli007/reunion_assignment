import React from 'react';

interface Props {
  onSortChange: (sort: string) => void;
  onPriorityFilter: (priority: number | null) => void;
  onStatusFilter: (status: 'pending' | 'finished' | null) => void;
  currentSort: string;
  currentPriority: number | null;
  currentStatus: 'pending' | 'finished' | null;
}

export const TaskFilters: React.FC<Props> = ({
  onSortChange,
  onPriorityFilter,
  onStatusFilter,
  currentSort,
  currentPriority,
  currentStatus,
}) => {
  return (
    <div className="flex justify-end space-x-4">
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="border rounded p-2"
      >
        <option value="">Sort by</option>
        <option value="startTimeAsc">Start time: ASC</option>
        <option value="startTimeDesc">Start time: DESC</option>
        <option value="endTimeAsc">End time: ASC</option>
        <option value="endTimeDesc">End time: DESC</option>
      </select>

      <select
        value={currentPriority || ''}
        onChange={(e) => onPriorityFilter(e.target.value ? Number(e.target.value) : null)}
        className="border rounded p-2"
      >
        <option value="">Priority: All</option>
        <option value="1">Priority: 1</option>
        <option value="2">Priority: 2</option>
        <option value="3">Priority: 3</option>
        <option value="4">Priority: 4</option>
        <option value="5">Priority: 5</option>
      </select>

      <select
        value={currentStatus || ''}
        onChange={(e) => onStatusFilter(e.target.value as 'pending' | 'finished' | null)}
        className="border rounded p-2"
      >
        <option value="">Status: All</option>
        <option value="pending">Status: Pending</option>
        <option value="finished">Status: Finished</option>
      </select>
    </div>
  );
};