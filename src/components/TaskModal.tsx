import React, { useState } from 'react';
import { Calendar, Clock, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { Task, TaskType } from '../types/task';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  initialDate?: Date;
  editTask?: Task;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, initialDate, editTask }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [taskData, setTaskData] = useState<Partial<Task>>({
    title: '',
    type: 'Quickie' as TaskType,
    status: 'Active',
    category: 'House',
    plannedDate: initialDate?.toISOString().split('T')[0] || '',
    tags: '',
    priority: 'Moderate',
    isRecurring: false,
    subTasks: [],
    ...editTask,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(taskData as Task);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-4 border-b">
          <div className="flex gap-3">
            {['Quickie', 'Task', 'Project'].map((type) => (
              <button
                key={type}
                className={`px-4 py-2 rounded-md ${
                  taskData.type === type
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => setTaskData({ ...taskData, type: type as TaskType })}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Task Name *</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={taskData.title}
                onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
              />
            </div>

            {taskData.type !== 'Quickie' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={taskData.category}
                      onChange={(e) => setTaskData({ ...taskData, category: e.target.value })}
                    >
                      {['House', 'Fun', 'Health', 'Finance', 'Garden', 'Tech', 'ADLs'].map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={taskData.priority}
                      onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
                    >
                      {['Critical', 'High', 'Moderate', 'Low'].map((priority) => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> Planned Date
                    </label>
                    <input
                      type="date"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={taskData.plannedDate}
                      onChange={(e) => setTaskData({ ...taskData, plannedDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Clock className="h-4 w-4" /> Due Date
                    </label>
                    <input
                      type="date"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={taskData.dueDate}
                      onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="button"
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              <span className="ml-1">Advanced Options</span>
            </button>

            {showAdvanced && (
              <div className="border-t pt-4 space-y-4">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                      checked={taskData.isRecurring}
                      onChange={(e) => setTaskData({ ...taskData, isRecurring: e.target.checked })}
                    />
                    <span className="ml-2 text-sm text-gray-700">Recurring Task</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Tag className="h-4 w-4" /> Tags
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Separate with commas"
                    value={taskData.tags}
                    onChange={(e) => setTaskData({ ...taskData, tags: e.target.value })}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              {editTask ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;