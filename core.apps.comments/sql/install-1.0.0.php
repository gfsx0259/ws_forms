<?php
$db =& mysql::get_instance();
$db->query(
    "CREATE TABLE `comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `topic_id` varchar(16) NOT NULL,
  `parent_id` int(10) unsigned NOT NULL,
  `name` varchar(80) DEFAULT NULL,
  `email` varchar(80) NOT NULL,
  `email_visible` tinyint(4) NOT NULL DEFAULT '1',
  `content` text NOT NULL,
  `approved` tinyint(4) NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx1` (`topic_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;"
);