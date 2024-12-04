'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import toast from 'react-hot-toast';
import Navbar from '@/components/navigation/navbar';
import { Colleague } from '@/components/calendar/colleagues-list';
import Image from 'next/image';

interface Calendar {
  id: string;
  name: string;
  shareable_id: string;
}

export default function CalendarPage() {
  const params = useParams();
  const [calendar, setCalendar] = useState<Calendar | null>(null);
  const [loading, setLoading] = useState(true);
  const [colleagues, setColleagues] = useState<Colleague[]>([]);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handleAddColleague = (newColleague: Colleague) => {
    setColleagues((prev) => [...prev, newColleague]);
  };

  const getTimeDifference = (colleagueTimezone: string) => {
    try {
      // Use local timezone as base since creator_timezone is not available
      const baseTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      const now = new Date();
      const localTime = new Date(now.toLocaleString('en-US', { timeZone: baseTimezone }));
      const colleagueTime = new Date(now.toLocaleString('en-US', { timeZone: colleagueTimezone }));
      
      const diffInHours = (colleagueTime.getTime() - localTime.getTime()) / (1000 * 60 * 60);
      return Math.round(diffInHours);
    } catch (error) {
      console.error('Error calculating time difference:', error);
      return 0;
    }
  };

  // Format hour difference relative to local timezone
  const formatHourDifference = (colleague: Colleague) => {
    const timeDifference = getTimeDifference(colleague.timezone);
    
    if (timeDifference === 0) return 'Same time';
    if (timeDifference > 0) return `${timeDifference}h ahead`;
    return `${Math.abs(timeDifference)}h behind`;
  };

  const getCurrentHour = (timezone: string) => {
    try {
      const now = new Date();
      return new Date(now.toLocaleString('en-US', { timeZone: timezone })).getHours();
    } catch (error) {
      console.error('Error getting current hour:', error);
      return new Date().getHours(); // Fallback to local time
    }
  };

  // Get the current hour for each colleague based on their timezone
  const getColleagueCurrentHour = (colleague: Colleague) => {
    return getCurrentHour(colleague.timezone);
  };

  // Format the current time for a colleague
  const getColleagueCurrentTime = (colleague: Colleague) => {
    const now = new Date();
    const colleagueTime = now.toLocaleString("en-US", { 
      timeZone: colleague.timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    return colleagueTime;
  };

  useEffect(() => {
    if (!params) return;
    const fetchCalendar = async () => {
      try {
        console.log('Fetching calendar with shareable_id:', params.id);
        const { data, error } = await supabase
          .from('calendars')
          .select()
          .eq('shareable_id', params.id)
          .single();

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        if (!data) {
          console.error('Calendar not found');
          throw new Error('Calendar not found');
        }

        console.log('Calendar found:', data);
        setCalendar(data);
      } catch (error) {
        console.error('Error fetching calendar:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        toast.error('Failed to load calendar');
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!calendar) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Calendar not found</h1>
        <p className="text-gray-600 mb-4">The calendar you&apos;re looking for doesn&apos;t exist.</p>
        <Button onClick={() => window.location.href = '/auth'}>Go Home</Button>
      </div>
    );
  }

  // Group colleagues by their current hour
  const colleaguesByHour = colleagues.reduce((acc, colleague) => {
    const hour = getColleagueCurrentHour(colleague);
    if (!acc[hour]) {
      acc[hour] = [];
    }
    acc[hour].push(colleague);
    return acc;
  }, {} as Record<number, Colleague[]>);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        calendarId={calendar.id} 
        calendarName={calendar.name} 
        onAddColleague={handleAddColleague}
      />
      
      <main className="flex-1 overflow-auto p-8">
        <div className="bg-white border border-gray-200 rounded-lg">
          {/* Time slots grid */}
          <div>
            {hours.map((hour) => (
              <div key={hour} className="flex w-full border-b border-gray-200 last:border-b-0">
                {/* Hour label */}
                <div className="w-[100px] py-4 px-4 text-sm text-gray-500 border-r border-gray-200 flex-shrink-0">
                  {`${hour.toString().padStart(2, '0')}:00`}
                </div>
                
                {/* Time slot content area */}
                <div className="flex-1 p-2 min-h-[80px] hover:bg-gray-50">
                  {colleaguesByHour[hour]?.map((colleague) => (
                    <div 
                      key={colleague.id} 
                      className="flex items-center gap-3 p-2 bg-white rounded-lg shadow-sm border border-gray-200"
                    >
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={colleague.profilePicture}
                          alt={colleague.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium truncate">{colleague.name}</div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="truncate">{colleague.country}</span>
                          <span className="flex-shrink-0">•</span>
                          <span className="flex-shrink-0">{getColleagueCurrentTime(colleague)}</span>
                          <span className="flex-shrink-0">•</span>
                          <span className="flex-shrink-0">{formatHourDifference(colleague)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
