-- Add a unique shareable_id column to calendars table
ALTER TABLE calendars
ADD COLUMN shareable_id TEXT UNIQUE DEFAULT gen_random_uuid()::text;

-- Update existing calendars with a unique shareable_id if any exist
UPDATE calendars 
SET shareable_id = gen_random_uuid()::text 
WHERE shareable_id IS NULL;
