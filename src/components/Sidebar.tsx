import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  title: string;
  position: 'left' | 'right';
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
  title,
  position,
  isOpen,
  onToggle,
  children
}) => {
  return (
    <div 
      className={`
        h-full bg-gray-50 border-${position === 'left' ? 'r' : 'l'} border-gray-200
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-72' : 'w-16'}
      `}
    >
      <div className="relative h-full">
        <button
          className={`absolute -${position}-3 top-4 transform translate-x-1/2
            p-1.5 rounded-full bg-white shadow-md border border-gray-200
            hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          `}
          onClick={onToggle}
        >
          {position === 'left' ? 
            (isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />) :
            (isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />)
          }
        </button>

        {isOpen && (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">{title}</h2>
            </div>
            <div className="flex-1 overflow-auto p-4">
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;