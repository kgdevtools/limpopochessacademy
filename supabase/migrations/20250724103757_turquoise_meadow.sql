/*
  # Create events table for chess tournaments

  1. New Tables
    - `events`
      - `id` (text, primary key) - Tournament ID from JSON data
      - `event_data` (jsonb) - Complete tournament information
      - `created_at` (timestamp) - Record creation time

  2. Security
    - Enable RLS on `events` table
    - Add policy for public read access (tournaments are public)
    - Add policy for authenticated insert/update (for future admin features)

  3. Indexes
    - Create indexes on JSONB fields for efficient filtering
    - Index on status, district, venue, and date fields
*/

CREATE TABLE IF NOT EXISTS events (
  id text PRIMARY KEY,
  event_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (tournaments are public information)
CREATE POLICY "Public read access for events"
  ON events
  FOR SELECT
  TO public
  USING (true);

-- Create policy for authenticated insert/update (for future admin features)
CREATE POLICY "Authenticated users can insert events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update events"
  ON events
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create indexes for efficient querying on JSONB fields
CREATE INDEX IF NOT EXISTS idx_events_status 
  ON events USING GIN ((event_data->>'status'));

CREATE INDEX IF NOT EXISTS idx_events_district 
  ON events USING GIN ((event_data->>'district'));

CREATE INDEX IF NOT EXISTS idx_events_venue 
  ON events USING GIN ((event_data->>'venue'));

CREATE INDEX IF NOT EXISTS idx_events_date 
  ON events USING BTREE ((event_data->>'date'));

CREATE INDEX IF NOT EXISTS idx_events_end_date 
  ON events USING BTREE ((event_data->>'endDate'));

-- Create a composite index for common filter combinations
CREATE INDEX IF NOT EXISTS idx_events_status_district 
  ON events USING GIN ((event_data->>'status'), (event_data->>'district'));

-- Create full-text search index for tournament titles and descriptions
CREATE INDEX IF NOT EXISTS idx_events_search 
  ON events USING GIN (
    to_tsvector('english', 
      COALESCE(event_data->>'title', '') || ' ' || 
      COALESCE(event_data->>'description', '') || ' ' ||
      COALESCE(event_data->>'venue', '')
    )
  );