import React from 'react';

interface SettingsProps {
  show: boolean;
  onHide: () => void;
  startDay: 'Sunday' | 'Monday';
  onStartDayChange: (day: 'Sunday' | 'Monday') => void;
}

const Settings: React.FC<SettingsProps> = ({
  show,
  onHide,
  startDay,
  onStartDayChange,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">Calendar Settings</h3>
          <button
            onClick={onHide}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Day of Week
              </label>
              <select
                value={startDay}
                onChange={(e) => onStartDayChange(e.target.value as 'Sunday' | 'Monday')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-4 border-t">
          <button
            onClick={onHide}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;