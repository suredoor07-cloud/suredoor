-- Supabase Storage Setup for Gallery Images
-- Run this in your Supabase SQL Editor AFTER running schema.sql

-- Create the gallery storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery',
  'gallery',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

-- Allow public read access to gallery bucket
CREATE POLICY "Public can view gallery images"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery');

-- Allow public uploads to gallery bucket (for admin panel)
CREATE POLICY "Allow uploads to gallery"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'gallery');

-- Allow public deletes from gallery bucket (for admin panel)
CREATE POLICY "Allow deletes from gallery"
ON storage.objects FOR DELETE
USING (bucket_id = 'gallery');

-- Allow public updates to gallery bucket
CREATE POLICY "Allow updates to gallery"
ON storage.objects FOR UPDATE
USING (bucket_id = 'gallery');
