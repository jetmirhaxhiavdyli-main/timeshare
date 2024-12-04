-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON public.colleagues;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON public.colleagues;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.colleagues;
DROP POLICY IF EXISTS "Enable public insert access" ON public.colleagues;
DROP POLICY IF EXISTS "Enable public delete access" ON public.colleagues;
DROP POLICY IF EXISTS "Enable public read access" ON public.colleagues;

-- Enable RLS
ALTER TABLE public.colleagues ENABLE ROW LEVEL SECURITY;

-- Create public access policies
CREATE POLICY "Enable public insert access"
ON public.colleagues
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Enable public delete access"
ON public.colleagues
FOR DELETE
TO public
USING (true);

CREATE POLICY "Enable public read access"
ON public.colleagues
FOR SELECT
TO public
USING (true);
