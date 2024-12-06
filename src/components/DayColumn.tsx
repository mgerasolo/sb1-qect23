import React from 'react';
import { Plus } from 'lucide-react';
import { Task } from '../types/task';
import TaskList from './TaskList';

interface DayColumnProps {
  date: Date;
  dayName: string;
  tasks: Task[];
  onDrop: (taskId: string, date: Date) => void;
  onAddTask: (date: Date) => void;
  onTaskStatusChange: (taskId: string, status: Task['status']) => void;
  onTaskEdit: (task: Task) => void;
  onTaskTitleChange: (taskId: string, newTitle: string) => void;
}

const DayColumn: React.FC<DayColumnProps> = ({
  date,
  dayName,
  tasks,
  onDrop,
  onAddTask,
  onTaskStatusChange,
  onTaskEdit,
  onTaskTitleChange,
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-gray-50');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('bg-gray-50');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-gray-50');
    const taskId = e.dataTransfer.getData('text/plain');
    onDrop(taskId, date);
  };

  return (
    <div className="h-full flex flex-col border-r last:border-r-0">
      <div className="flex items-center justify-between px-2 py-1 bg-white border-b">
        <h6 className="text-sm font-medium flex-1 text-center">
          {dayName} ({date.getDate()})
        </h6>
        <button
          className="text-green-600 hover:text-green-700 p-0.5"
          onClick={() => onAddTask(date)}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      
      <div
        className="flex-1 p-1 overflow-auto"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <TaskList
          tasks={tasks}
          onTaskStatusChange={onTaskStatusChange}
          onTaskEdit={onTaskEdit}
          onTaskTitleChange={onTaskTitleChange}
        />
      </div>
    </div>
  );
};

export default DayColumn;