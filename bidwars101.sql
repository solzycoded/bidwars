-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 03, 2024 at 09:35 PM
-- Server version: 5.7.36
-- PHP Version: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bidwars101`
--

-- --------------------------------------------------------

--
-- Table structure for table `auction_rooms`
--

DROP TABLE IF EXISTS `auction_rooms`;
CREATE TABLE IF NOT EXISTS `auction_rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `auction_date` date NOT NULL,
  `auction_start` time NOT NULL,
  `auction_end` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `room_id` (`room_id`),
  KEY `item_id` (`item_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `bids`
--

DROP TABLE IF EXISTS `bids`;
CREATE TABLE IF NOT EXISTS `bids` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bidder` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `offer` bigint(20) NOT NULL,
  `awarded` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `bidder` (`bidder`),
  KEY `item_id` (`item_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'art'),
(2, 'electronics'),
(3, 'antiques'),
(4, 'vintage cars'),
(5, 'furniture');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
CREATE TABLE IF NOT EXISTS `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` varchar(120) NOT NULL,
  `category_id` int(11) NOT NULL,
  `current_condition_id` int(11) NOT NULL,
  `pre_condition_id` int(11) NOT NULL,
  `price` bigint(20) NOT NULL,
  `selling_time` int(11) NOT NULL,
  `purchase_duration` int(11) NOT NULL,
  `time_frame_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `sold` tinyint(1) DEFAULT '0',
  `date_sold` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`),
  KEY `user_id` (`user_id`),
  KEY `category_id` (`category_id`),
  KEY `time_frame_id` (`time_frame_id`),
  KEY `current_condition_id` (`current_condition_id`),
  KEY `pre_condition_id` (`pre_condition_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `user_id`, `title`, `category_id`, `current_condition_id`, `pre_condition_id`, `price`, `selling_time`, `purchase_duration`, `time_frame_id`, `created_at`, `sold`, `date_sold`) VALUES
(1, 3, 'The mona lisa', 1, 4, 1, 50000000, 34, 5, 1, '2024-04-03 18:42:54', 0, NULL),
(2, 3, 'The creation of adam', 1, 4, 1, 34000000, 34, 20, 1, '2024-04-03 18:44:55', 0, NULL),
(3, 3, 'Play Station 3 Full set, with Controller and Memory Cards', 2, 3, 1, 100, 20, 15, 1, '2024-04-03 18:48:03', 0, NULL),
(4, 3, 'First Generation Ipod with ear phones', 2, 3, 1, 26, 23, 12, 1, '2024-04-03 18:50:05', 0, NULL),
(5, 3, 'Original sword of truth, from the legend of the seeker', 3, 4, 1, 7000, 13, 5, 1, '2024-04-03 18:54:39', 0, NULL),
(6, 3, 'The original Iron throne, from GOT', 3, 3, 1, 60000, 12, 4, 1, '2024-04-03 18:57:30', 0, NULL),
(7, 3, 'An old cardillac', 4, 3, 1, 34000, 12, 4, 1, '2024-04-03 19:03:40', 0, NULL),
(8, 3, 'A dinning set', 5, 3, 1, 234, 23, 23, 2, '2024-04-03 19:05:03', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `item_conditions`
--

DROP TABLE IF EXISTS `item_conditions`;
CREATE TABLE IF NOT EXISTS `item_conditions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_condition` varchar(30) NOT NULL,
  `pre_condition` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `item_condition` (`item_condition`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `item_conditions`
--

INSERT INTO `item_conditions` (`id`, `item_condition`, `pre_condition`) VALUES
(1, 'used', 1),
(2, 'brand new', 1),
(3, 'looks brand new', 0),
(4, 'very old', 0),
(5, 'broken and needs fixing', 0),
(6, 'just needs little dusting', 0);

-- --------------------------------------------------------

--
-- Table structure for table `item_images`
--

DROP TABLE IF EXISTS `item_images`;
CREATE TABLE IF NOT EXISTS `item_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image_blob` text,
  `item_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `item_images`
--

INSERT INTO `item_images` (`id`, `image_blob`, `item_id`) VALUES
(1, 'mona-lisa-67506_640.jpg', 1),
(2, 'pandemic-4981895_640.jpg', 2),
(3, 'video-game-console-2202613_640.jpg', 3),
(4, 'ipod-1752964_640.jpg', 4),
(5, 'images (1).jpeg', 5),
(6, 'images (2).jpeg', 6),
(7, 'auto-788747_640.jpg', 7),
(8, 'chairs-2181960_640.jpg', 8);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `un_read` tinyint(1) DEFAULT '1',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `message`, `un_read`, `created_at`) VALUES
(1, 3, 'You just received a new offer of <b>£2,000,000</b> on your Item <b>The creation of adam</b>.', 1, '2024-04-03 21:09:13');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
CREATE TABLE IF NOT EXISTS `rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_tag` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `room_tag`) VALUES
(1, 'alpha'),
(2, 'beta'),
(3, 'bolt'),
(4, '101'),
(5, 'alpha'),
(6, 'beta'),
(7, 'bolt'),
(8, '101'),
(9, 'alpha'),
(10, 'beta'),
(11, 'bolt'),
(12, '101'),
(13, 'alpha'),
(14, 'beta'),
(15, 'bolt'),
(16, '101');

-- --------------------------------------------------------

--
-- Table structure for table `time_frames`
--

DROP TABLE IF EXISTS `time_frames`;
CREATE TABLE IF NOT EXISTS `time_frames` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `time_frames`
--

INSERT INTO `time_frames` (`id`, `name`) VALUES
(1, 'year'),
(2, 'month'),
(3, 'day'),
(4, 'hour'),
(5, 'year'),
(6, 'month'),
(7, 'day'),
(8, 'hour'),
(9, 'year'),
(10, 'month'),
(11, 'day'),
(12, 'hour'),
(13, 'year'),
(14, 'month'),
(15, 'day'),
(16, 'hour');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(120) NOT NULL,
  `password` text NOT NULL,
  `role` varchar(8) NOT NULL,
  `token` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `token`, `created_at`) VALUES
(1, 'admin', 'admin@bidwars.com', '$2b$10$KB7f2F/szLJTkasmQt22g./bvJrzlIiUYaZe8rY5lDwAOndKyd/sC', 'admin', '6ck4v4md3es6n0eruipqv8', '2024-04-03 17:26:42'),
(2, 'solzy1', 'solzycoded@gmail.com', '$2b$10$nS2dz7AWfmMjMATX8I8oLeVLt93ybhCNB6cyYmiHhFfzP.dcG.hea', 'user', 'yob3dc66x20yglmgey90y', '2024-04-03 17:26:42'),
(3, 'solzycoded', 'solomonfidelis012@gmail.com', '$2b$10$GO.kcq7ujmGRpYHhDs9zn.c9gWYe2j3XWhsNxoJDaOo1Crs6sUq/q', 'user', '74z8q15juusa4bv1ny7u06', '2024-04-03 18:34:40');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
