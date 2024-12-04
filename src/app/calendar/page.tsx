'use client';

import { useState } from 'react';
import ColleaguesList, { Colleague } from '@/components/calendar/colleagues-list';
import Navbar from '@/components/navigation/navbar';

export default function CalendarPage() {
  const [colleagues, setColleagues] = useState<Colleague[]>([]);

  const handleAddColleague = (newColleague: Colleague) => {
    setColleagues((prev) => [...prev, newColleague]);
  };

  const handleRemoveColleague = (id: string) => {
    setColleagues((prev) => prev.filter((colleague) => colleague.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        calendarId="main" 
        calendarName="My Calendar" 
        onAddColleague={handleAddColleague}
      />
      
      <main className="flex-1 p-8">
        <ColleaguesList
          colleagues={colleagues}
          onRemoveColleague={handleRemoveColleague}
        />
      </main>
    </div>
  );
}
