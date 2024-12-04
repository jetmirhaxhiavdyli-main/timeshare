-- First, let's make sure the table structure is correct
DROP TABLE IF EXISTS public.colleagues;

CREATE TABLE public.colleagues (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    calendar_id uuid REFERENCES public.calendars(id) ON DELETE CASCADE,
    name text NOT NULL,
    profile_picture text,
    country text,
    timezone text NOT NULL
);

-- Enable RLS
ALTER TABLE public.colleagues ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Enable public access" ON public.colleagues;

-- Create a single, simple policy that allows everything
CREATE POLICY "Enable public access"
ON public.colleagues
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Grant access to public
GRANT ALL ON public.colleagues TO public;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_colleagues_calendar_id ON public.colleagues(calendar_id);
