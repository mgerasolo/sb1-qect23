import React, { useState } from 'react';
import Header from './components/Header';
import CalendarView from './components/CalendarView';

function App() {
  const [startDay, setStartDay] = useState<'Sunday' | 'Monday'>('Sunday');

  return (
    <div className="min-h-screen flex flex-col">
      <Header startDay={startDay} onStartDayChange={setStartDay} />
      <div className="flex-1">
        <CalendarView startDay={startDay} onStartDayChange={setStartDay} />
      </div>
    </div>
  );
}

export default App;