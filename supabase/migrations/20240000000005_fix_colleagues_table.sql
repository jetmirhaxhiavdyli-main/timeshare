-- Drop existing table if it exists
DROP TABLE IF EXISTS public.colleagues CASCADE;

-- Create the colleagues table
CREATE TABLE public.colleagues (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    calendar_id uuid REFERENCES public.calendars(id) ON DELETE CASCADE NOT NULL,
    name text NOT NULL,
    profile_picture text,
    country text,
    timezone text NOT NULL
);

-- Enable RLS
ALTER TABLE public.colleagues ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Enable full access to colleagues" ON public.colleagues;

-- Create a policy that allows all operations without authentication
CREATE POLICY "Enable full access to colleagues"
ON public.colleagues
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_colleagues_calendar_id ON public.colleagues(calendar_id);
