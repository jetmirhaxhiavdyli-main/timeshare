-- Create tables
CREATE TABLE calendars (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    owner_id UUID NOT NULL REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

CREATE TABLE friends (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    calendar_id UUID NOT NULL REFERENCES calendars(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    profile_picture_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE calendars ENABLE ROW LEVEL SECURITY;
ALTER TABLE friends ENABLE ROW LEVEL SECURITY;

-- Policies for calendars
CREATE POLICY "Calendars are viewable by owner"
    ON calendars FOR SELECT
    USING (auth.uid() = owner_id);

CREATE POLICY "Users can insert their own calendars"
    ON calendars FOR INSERT
    WITH CHECK (auth.uid() = owner_id);

-- Policies for friends
CREATE POLICY "Friends are viewable by calendar owner"
    ON friends FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM calendars
            WHERE calendars.id = friends.calendar_id
            AND calendars.owner_id = auth.uid()
        )
    );

CREATE POLICY "Calendar owner can manage friends"
    ON friends FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM calendars
            WHERE calendars.id = friends.calendar_id
            AND calendars.owner_id = auth.uid()
        )
    );
