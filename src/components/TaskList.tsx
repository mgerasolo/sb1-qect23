import React from 'react';
import { Task } from '../types/task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onTaskStatusChange: (taskId: string, status: Task['status']) => void;
  onTaskEdit: (task: Task) => void;
  onTaskTitleChange: (taskId: string, newTitle: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskStatusChange,
  onTaskEdit,
  onTaskTitleChange
}) => {
  return (
    <div className="space-y-0.5">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={onTaskStatusChange}
          onEdit={onTaskEdit}
          onTitleChange={onTaskTitleChange}
        />
      ))}
    </div>
  );
};

export default TaskList;