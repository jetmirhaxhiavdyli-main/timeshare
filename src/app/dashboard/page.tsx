'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const [calendarName, setCalendarName] = useState('');
  const [calendarCode, setCalendarCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createCalendar = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('calendars')
        .insert([
          {
            name: calendarName,
            owner_id: user.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      toast.success('Calendar created successfully!');
      router.push(`/calendar/${data.id}`);
    } catch (error) {
      toast.error('Error creating calendar');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const joinCalendar = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('calendars')
        .select('*')
        .eq('id', calendarCode)
        .single();

      if (error) throw error;

      toast.success('Joined calendar successfully!');
      router.push(`/calendar/${data.id}`);
    } catch (error) {
      toast.error('Invalid calendar code');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">TimeShare Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Create Calendar Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Create New Calendar</h2>
            <form onSubmit={createCalendar}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Calendar Name
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={calendarName}
                  onChange={(e) => setCalendarName(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLoading ? 'Creating...' : 'Create Calendar'}
              </button>
            </form>
          </div>

          {/* Join Calendar Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Join Existing Calendar</h2>
            <form onSubmit={joinCalendar}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Calendar Code
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={calendarCode}
                  onChange={(e) => setCalendarCode(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLoading ? 'Joining...' : 'Join Calendar'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
