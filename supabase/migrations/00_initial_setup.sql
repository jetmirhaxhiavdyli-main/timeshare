-- Drop existing tables if they exist
DROP TABLE IF EXISTS calendars;

-- Create tables for the timeshare app
CREATE TABLE calendars (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    name TEXT NOT NULL,
    shareable_id TEXT UNIQUE NOT NULL
);

-- Enable Row Level Security
ALTER TABLE calendars ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to select calendars
CREATE POLICY "Allow public read access" ON calendars
    FOR SELECT
    USING (true);

-- Create a policy that allows anyone to insert calendars
CREATE POLICY "Allow public insert access" ON calendars
    FOR INSERT
    WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS calendars_shareable_id_idx ON calendars(shareable_id);
