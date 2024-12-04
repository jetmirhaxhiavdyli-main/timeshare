'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';
import { Linkedin } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const [calendarName, setCalendarName] = useState('');
  const [joinId, setJoinId] = useState('');
  const [loading, setLoading] = useState(false);

  const generateNewCalendar = async () => {
    if (!calendarName || !calendarName.trim()) {
      toast.error('Please enter a calendar name');
      return;
    }

    setLoading(true);
    try {
      // Generate a unique ID for the calendar
      const shareable_id = nanoid(10);
      
      // Create the calendar data object without timezone for now
      const calendarData = {
        name: calendarName.trim(),
        shareable_id: shareable_id,
        created_at: new Date().toISOString()
      };
      
      console.log('Creating calendar:', calendarData);

      // Insert the calendar into Supabase
      const { data, error } = await supabase
        .from('calendars')
        .insert([calendarData])
        .select()
        .single();

      if (error) {
        console.error('Failed to create calendar:', error);
        throw error;
      }

      console.log('Calendar created successfully:', data);
      toast.success('Calendar created!');

      // Redirect to the calendar page
      const calendarUrl = `/calendar/${shareable_id}`;
      console.log('Redirecting to:', calendarUrl);
      router.push(calendarUrl);

    } catch (error) {
      console.error('Error creating calendar:', error);
      toast.error('Failed to create calendar. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const joinCalendar = async () => {
    if (!joinId.trim()) {
      toast.error('Please enter a calendar ID');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('calendars')
        .select()
        .eq('shareable_id', joinId.trim())
        .single();

      if (error || !data) {
        toast.error('Calendar not found');
        setLoading(false);
        return;
      }

      router.push(`/calendar/${joinId.trim()}`);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to join calendar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            TimeShare
          </h2>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Add your team members, see their local time, and make scheduling meetings easier. 
              Perfect for remote teams working globally!
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="calendar-name" className="block text-sm font-medium text-gray-700">
                Create New Calendar
              </label>
              <div className="mt-1">
                <Input
                  id="calendar-name"
                  name="calendar-name"
                  type="text"
                  required
                  placeholder="Enter calendar name"
                  value={calendarName}
                  onChange={(e) => setCalendarName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Button
                onClick={generateNewCalendar}
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Generate New Calendar'}
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or</span>
              </div>
            </div>
          </div>

          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="join-id" className="block text-sm font-medium text-gray-700">
                Join Existing Calendar
              </label>
              <div className="mt-1">
                <Input
                  id="join-id"
                  name="join-id"
                  type="text"
                  required
                  placeholder="Enter calendar ID"
                  value={joinId}
                  onChange={(e) => setJoinId(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Button
                onClick={joinCalendar}
                className="w-full"
                variant="outline"
                disabled={loading}
              >
                {loading ? 'Joining...' : 'Join Calendar'}
              </Button>
            </div>

            {/* Creator Attribution */}
            <div className="mt-16 text-center text-sm text-gray-500">
              <p className="flex items-center justify-center gap-1">
                Created by: Jetmir Haxhiavdyli 
                <a 
                  href="https://www.linkedin.com/in/jetmirhaxhiavdyli/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
