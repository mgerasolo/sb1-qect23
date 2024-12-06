import React, { useState } from 'react';
import { CheckSquare, Pause, XCircle, Pencil, Square } from 'lucide-react';
import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, status: Task['status']) => void;
  onEdit: (task: Task) => void;
  onTitleChange: (taskId: string, newTitle: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onStatusChange, onEdit, onTitleChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [showEdit, setShowEdit] = useState(false);

  const getStatusIcon = () => {
    switch (task.status) {
      case 'Completed':
        return <CheckSquare className="text-green-500 h-4 w-4" />;
      case 'OnHold':
        return <Pause className="text-yellow-500 h-4 w-4" />;
      case 'Canceled':
        return <XCircle className="text-gray-400 h-4 w-4" />;
      default:
        return <Square className="text-gray-400 h-4 w-4" />;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onTitleChange(task.id, editedTitle);
      setIsEditing(false);
    }
    if (e.key === 'Escape') {
      setEditedTitle(task.title);
      setIsEditing(false);
    }
  };

  return (
    <div 
      className={`flex items-center px-1.5 py-0.5 rounded hover:bg-gray-50 group
        ${task.type === 'Task' ? 'border-l-2 border-blue-500' : ''}
        ${task.type === 'Project' ? 'border-l-2 border-purple-500' : ''}
      `}
      onMouseEnter={() => setShowEdit(true)}
      onMouseLeave={() => setShowEdit(false)}
      draggable
      onDragStart={(e) => e.dataTransfer.setData('text/plain', task.id)}
    >
      <button 
        className="p-0.5 hover:bg-gray-100 rounded"
        onClick={() => onStatusChange(task.id, task.status === 'Completed' ? 'Active' : 'Completed')}
      >
        {getStatusIcon()}
      </button>
      
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={() => {
            onTitleChange(task.id, editedTitle);
            setIsEditing(false);
          }}
          onKeyDown={handleKeyDown}
          className="flex-1 ml-1 px-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          autoFocus
        />
      ) : (
        <span 
          className={`flex-1 ml-1 text-sm ${task.status === 'Completed' ? 'line-through text-gray-400' : ''}`}
          onDoubleClick={() => setIsEditing(true)}
        >
          {task.title}
        </span>
      )}
      
      {showEdit && (
        <button
          className="p-0.5 hover:bg-gray-100 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onEdit(task)}
        >
          <Pencil className="h-3 w-3 text-gray-400" />
        </button>
      )}
    </div>
  );
};

export default TaskItem;