-- Create tables for the timeshare app
CREATE TABLE IF NOT EXISTS calendars (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    name TEXT NOT NULL,
    owner_id UUID NOT NULL,
    shareable_id TEXT UNIQUE NOT NULL
);

-- Enable Row Level Security
ALTER TABLE calendars ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for authenticated users
CREATE POLICY "Enable all operations for authenticated users" ON calendars
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
