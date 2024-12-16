export interface Task {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  priority: number;
  status: 'pending' | 'finished';
}

export interface User {
  id: string;
  email: string;
}

export interface TaskStats {
  totalTasks: number;
  completedPercentage: number;
  pendingPercentage: number;
  timeLapsedByPriority: { [key: number]: number };
  timeLeftByPriority: { [key: number]: number };
  averageCompletionTime: number;
}