-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable insert access for all users" ON public.colleagues;
DROP POLICY IF EXISTS "Enable delete access for all users" ON public.colleagues;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.colleagues;

-- Enable RLS
ALTER TABLE public.colleagues ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable insert access for all users"
ON public.colleagues
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Enable delete access for all users"
ON public.colleagues
FOR DELETE
USING (true);

CREATE POLICY "Enable read access for all users"
ON public.colleagues
FOR SELECT
USING (true);
