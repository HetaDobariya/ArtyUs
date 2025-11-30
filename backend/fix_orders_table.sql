-- SQL script to fix the orders table schema
-- Run this script to fix the typo and add missing columns

-- Fix the typo: rename 'staus' to 'status'
ALTER TABLE `orders` CHANGE COLUMN `staus` `status` VARCHAR(45) NOT NULL DEFAULT 'pending';

-- Add created_at column if it doesn't exist
ALTER TABLE `orders` ADD COLUMN `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `address`;

-- Update existing records to have a default status if null
UPDATE `orders` SET `status` = 'pending' WHERE `status` IS NULL OR `status` = '';

