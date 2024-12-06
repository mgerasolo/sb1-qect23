import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { format, addDays, subDays, startOfWeek } from 'date-fns';
import Sidebar from './Sidebar';
import TaskModal from './TaskModal';
import DayColumn from './DayColumn';
import { Task } from '../types/task';

interface CalendarViewProps {
  startDay: 'Sunday' | 'Monday';
  onStartDayChange: (day: 'Sunday' | 'Monday') => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ startDay, onStartDayChange }) => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);

  const days = startDay === 'Sunday' 
    ? ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const getWeekDates = () => {
    const start = startOfWeek(currentWeek, { weekStartsOn: startDay === 'Sunday' ? 0 : 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const weekDates = getWeekDates();

  const handlePreviousWeek = () => {
    setCurrentWeek(subDays(currentWeek, 7));
  };

  const handleNextWeek = () => {
    setCurrentWeek(addDays(currentWeek, 7));
  };

  const handleSaveTask = (taskData: Task) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
    };
    setTasks(prev => [...prev, newTask]);
    setIsTaskModalOpen(false);
    setSelectedDate(null);
  };

  const handleTaskDrop = (taskId: string, date: Date) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, plannedDate: format(date, 'yyyy-MM-dd') }
        : task
    ));
  };

  const handleTaskStatusChange = (taskId: string, status: Task['status']) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, status } : task
    ));
  };

  const handleTaskEdit = (task: Task) => {
    setTasks(prev => prev.map(t =>
      t.id === task.id ? task : t
    ));
  };

  const handleTaskTitleChange = (taskId: string, newTitle: string) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, title: newTitle } : task
    ));
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => task.plannedDate === format(date, 'yyyy-MM-dd'));
  };

  useEffect(() => {
    setCurrentWeek(new Date());
  }, []);

  return (
    <div className="flex h-full">
      <Sidebar
        title="Quick Access"
        position="left"
        isOpen={leftSidebarOpen}
        onToggle={() => setLeftSidebarOpen(!leftSidebarOpen)}
      >
        {/* Quick access content */}
      </Sidebar>

      <div className="flex-1 flex flex-col">
        <div className="py-1.5 px-2 border-b bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                className="p-1 hover:bg-gray-100 rounded"
                onClick={handlePreviousWeek}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <h4 className="text-sm font-medium mx-2">
                Week of {format(weekDates[0], 'MMM d')} - {format(weekDates[6], 'd, yyyy')}
              </h4>
              <button 
                className="p-1 hover:bg-gray-100 rounded"
                onClick={handleNextWeek}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <button 
              className="flex items-center px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setIsTaskModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Task
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-7 h-full">
            {weekDates.map((date, index) => (
              <DayColumn
                key={date.toISOString()}
                date={date}
                dayName={days[index]}
                tasks={getTasksForDate(date)}
                onDrop={handleTaskDrop}
                onAddTask={(date) => {
                  setSelectedDate(date);
                  setIsTaskModalOpen(true);
                }}
                onTaskStatusChange={handleTaskStatusChange}
                onTaskEdit={handleTaskEdit}
                onTaskTitleChange={handleTaskTitleChange}
              />
            ))}
          </div>
        </div>
      </div>

      <Sidebar
        title="Tools"
        position="right"
        isOpen={rightSidebarOpen}
        onToggle={() => setRightSidebarOpen(!rightSidebarOpen)}
      >
        {/* Tools content */}
      </Sidebar>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setSelectedDate(null);
        }}
        onSave={handleSaveTask}
        initialDate={selectedDate}
      />
    </div>
  );
};

export default CalendarView;