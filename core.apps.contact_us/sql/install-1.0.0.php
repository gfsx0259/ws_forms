<?php
$db = & mysql::get_instance();
$db->query('
    CREATE TABLE `contact_us_emails` (
    `widget_id`  bigint(20) UNSIGNED NOT NULL ,
    `email`  varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL ,
    PRIMARY KEY (`widget_id`)
    )
    ENGINE=MyISAM
    DEFAULT CHARACTER SET=utf8 COLLATE=utf8_unicode_ci;
');

