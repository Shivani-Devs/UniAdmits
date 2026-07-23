-- Add cycle column to submissions table
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS cycle text default '2025-2026';
