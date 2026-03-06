-- Create a public bucket for mega menu videos
INSERT INTO storage.buckets (id, name, public)
VALUES ('videos', 'videos', true);

-- Allow anyone to read files from the videos bucket
CREATE POLICY "Public read access for videos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'videos');

-- Allow authenticated users to upload videos (admin use)
CREATE POLICY "Authenticated users can upload videos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'videos');