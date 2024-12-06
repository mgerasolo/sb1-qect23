export type TaskType = 'Quickie' | 'Task' | 'Project';
export type TaskStatus = 'Active' | 'Completed' | 'OnHold' | 'Canceled';

export interface Task {
  id: string;
  title: string;
  type: TaskType;
  status: TaskStatus;
  category?: string;
  plannedDate?: string;
  tags?: string;
  priority?: string;
  dueDate?: string;
  isRecurring?: boolean;
  recurringPattern?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: string;
    occurrences?: number;
  };
  subTasks?: Task[];
}