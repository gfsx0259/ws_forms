<?php

$config["js_apps"]["core.apps.bookmarks"] = array(
    'general' => array(
        'title' => 'bookmarks',
        'name' => 'bookmarks',//should be like 3th part of folder
        'version' => '1.0.0',
        'icon' => 'icon.png',
        'category' => CATEGORY_SOCIAL,
        'description' => ''
    ),
    "content" => array(
        USERTYPE_ADMIN => array(
            "code" => array(
                "bookmarks.js",
                "bookmarks.admin.js"
            )
        ),

        USERTYPE_CONTRIBUTOR => array(
            "code" => array("bookmarks.js")
        ),


        USERTYPE_GUEST => array(
            "code" => array("bookmarks.js")
        )

    )

);