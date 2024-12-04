-- First, drop the existing table and its policies
DROP TABLE IF EXISTS public.colleagues CASCADE;

-- Recreate the table with proper structure
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

-- Create a simple policy that allows all operations
CREATE POLICY "Enable full access to colleagues"
ON public.colleagues
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Grant necessary privileges
GRANT ALL ON public.colleagues TO public;
GRANT USAGE ON SCHEMA public TO public;

-- Create index for better performance
CREATE INDEX idx_colleagues_calendar_id ON public.colleagues(calendar_id);
