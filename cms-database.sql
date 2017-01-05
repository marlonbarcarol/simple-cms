-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 05-Jan-2017 às 17:48
-- Versão do servidor: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `demo`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `abouts`
--

CREATE TABLE IF NOT EXISTS `abouts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identification` varchar(255) DEFAULT 'About',
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Extraindo dados da tabela `abouts`
--

INSERT INTO `abouts` (`id`, `identification`, `title`, `description`, `created_at`, `updated_at`) VALUES
(1, 'About - Home', 'Know more', '<p>Distinctively expedite leveraged technologies after progressive solutions. Uniquely scale revolutionary portals through low-risk high-yield strategic theme areas. Efficiently synthesize low-risk high-yield architectures through worldwide e-commerce. 2</p>\r\n', '2016-08-05 19:09:29', '2016-12-28 14:18:08'),
(2, 'About - Page', 'I am Person', '<p>Proactively pursue fully tested potentialities vis-a-vis professional supply chains.<br />Appropriately benchmark value-added paradigms after extensive catalysts for change. Collaboratively supply maintainable infomediaries and professional sources. Enthusiastically monetize team building web services whereas client-based channels.</p>', '2016-08-05 19:09:29', '2016-08-09 17:13:14');

-- --------------------------------------------------------

--
-- Estrutura da tabela `about_files`
--

CREATE TABLE IF NOT EXISTS `about_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file` text,
  `path` text NOT NULL,
  `subtitle` text,
  `about_id` int(10) NOT NULL,
  `created_at` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `about_id` (`about_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Extraindo dados da tabela `about_files`
--

INSERT INTO `about_files` (`id`, `file`, `path`, `subtitle`, `about_id`, `created_at`, `updated_at`) VALUES
(3, '20151203-HCCH-sign-1-57722.png', '/uploads/about/20151203-HCCH-sign-1-57722.png', '', 1, '2016-12-28 14:18:09', '2016-12-28 14:18:09'),
(4, 'images-48904.jpg', '/uploads/about/images-48904.jpg', '', 1, '2016-12-28 14:18:09', '2016-12-28 14:18:09');

-- --------------------------------------------------------

--
-- Estrutura da tabela `contacts`
--

CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `message` text,
  `created_at` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Extraindo dados da tabela `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `phone`, `email`, `message`, `created_at`, `updated_at`) VALUES
(1, 'Lorem Ipsum', '+44 073 99999999', 'marlon@gmail.com', 'Collaboratively repurpose future-proof scenarios after cutting-edge imperatives. Enthusiastically promote team building expertise vis-a-vis front-end vortals. Authoritatively deliver intermandated e-services without resource-leveling functionalities. Phosfluorescently pursue team building human capital whereas multimedia based collaboration and idea-sharing. Synergistically cultivate impactful content and clicks-and-mortar niche markets.\n\nProgressively grow cross-platform expertise with cross functional information.', '2016-08-05 19:09:29', '2016-01-23 13:54:14'),
(2, 'Jack Blocker', '+44 073 99999999', 'teste.ipsum@gmail.com', 'Completely conceptualize impactful ideas vis-a-vis error-free value. Monotonectally disseminate client-focused collaboration and idea-sharing through prospective strategic theme areas. Credibly negotiate cutting-edge services rather than long-term high-impact solutions. Phosfluorescently incentivize vertical e-business via goal-oriented convergence. Professionally synthesize web-enabled niche markets through inexpensive scenarios.\n\nHolisticly impact best-of-breed quality vectors rather than progressive.', '2016-08-05 19:09:29', '2016-01-24 18:01:22');

-- --------------------------------------------------------

--
-- Estrutura da tabela `migrations`
--

CREATE TABLE IF NOT EXISTS `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `services`
--

CREATE TABLE IF NOT EXISTS `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `summary` text,
  `slug` varchar(255) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Extraindo dados da tabela `services`
--

INSERT INTO `services` (`id`, `title`, `summary`, `slug`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Quickly redefine clicks-and-mortar process improvements', 'Our Know How.', 'quickly-redefine-clicks-and-mortar-process-improvements', '<p>Energistically conceptualize superior solutions through interactive applications. Synergistically actualize team building core competencies without state of the.</p>\r\n', '2016-08-05 19:09:29', '2017-01-05 14:28:37'),
(2, 'Collaboratively maintain holistic testing procedures and B2B initiatives', 'See how to do..', 'collaboratively-maintain-holistic-testing-procedures-and-B2B-initiatives', '<p>Energistically conceptualize superior solutions through interactive applications. Synergistically actualize team building core competencies without state of the.</p>\r\n', '2016-08-05 19:09:29', '2016-01-20 17:25:54');

-- --------------------------------------------------------

--
-- Estrutura da tabela `service_files`
--

CREATE TABLE IF NOT EXISTS `service_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file` text,
  `path` text NOT NULL,
  `subtitle` text,
  `service_id` int(10) NOT NULL,
  `created_at` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `service_id` (`service_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Extraindo dados da tabela `service_files`
--

INSERT INTO `service_files` (`id`, `file`, `path`, `subtitle`, `service_id`, `created_at`, `updated_at`) VALUES
(2, 'shutterstock_7763944_RP-34252.jpg', '/uploads/servicos/shutterstock_7763944_RP-34252.jpg', '', 2, '2016-08-09 17:15:36', '2016-08-09 17:15:36'),
(4, 'images-18223.jpg', '/uploads/service/images-18223.jpg', 'Subtitle Ipsum', 1, '2017-01-05 14:28:19', '2017-01-05 14:28:19');

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `type` enum('user','admin') COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `user`, `password`, `name`, `email`, `type`, `created_at`, `updated_at`) VALUES
(1, 'test', '$2y$10$4Qs3G4nz2L43Pm8KT7x3Wu2l78fw1sh6IzOBBaRRpDEYZDo3jb/fe', 'Test', 'test@test.com.br', 'user', '2016-08-05 19:09:29', '2017-01-05 14:32:49');

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `about_files`
--
ALTER TABLE `about_files`
  ADD CONSTRAINT `fk_about` FOREIGN KEY (`about_id`) REFERENCES `abouts` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `service_files`
--
ALTER TABLE `service_files`
  ADD CONSTRAINT `fk_service` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
