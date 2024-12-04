-- First, ensure the table exists with the correct structure
CREATE TABLE IF NOT EXISTS public.colleagues (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    calendar_id UUID REFERENCES public.calendars(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    profile_picture TEXT,
    country TEXT,
    timezone TEXT NOT NULL
);

-- Enable RLS
ALTER TABLE public.colleagues ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON public.colleagues;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON public.colleagues;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.colleagues;

-- Create policies that specifically check for authentication
CREATE POLICY "Enable insert access for authenticated users"
ON public.colleagues
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable delete access for authenticated users"
ON public.colleagues
FOR DELETE
TO authenticated
USING (true);

CREATE POLICY "Enable read access for authenticated users"
ON public.colleagues
FOR SELECT
TO authenticated
USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS colleagues_calendar_id_idx ON public.colleagues(calendar_id);
