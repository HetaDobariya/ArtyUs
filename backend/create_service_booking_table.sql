-- SQL script to create service_booking table
-- Run this script to create the table for service bookings

CREATE TABLE IF NOT EXISTS `service_booking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `service_provider_id` int NOT NULL,
  `request_title` varchar(255) NOT NULL,
  `request_details` text NOT NULL,
  `price_range` varchar(50) DEFAULT NULL,
  `time_range` date DEFAULT NULL,
  `support_pdf_url` varchar(500) DEFAULT NULL,
  `contact_pref` varchar(50) DEFAULT 'platform',
  `status` varchar(50) DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_service_booking_user` (`user_id`),
  KEY `fk_service_booking_provider` (`service_provider_id`),
  CONSTRAINT `fk_service_booking_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_service_booking_provider` FOREIGN KEY (`service_provider_id`) REFERENCES `service_provider` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

