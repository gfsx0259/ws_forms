<?php

$config["js_apps"]["core.apps.comments"] = array(
    'general' => array(
        'title' => 'Comments',
        'name' => 'comments',//should be like 3th part of folder
        'version' => '1.0.0',
        'category' => CATEGORY_FORMS,
        'description' => '',
        'depends' => []
    ),
    "content" => array(
        USERTYPE_ADMIN => array(
            "code" => array(
                "comments.js",
                "comments.admin.js"),
            "styles" => array(
                "style.admin.css"
            )
        ),

        USERTYPE_CONTRIBUTOR => array(
            "code" => array("comments.js")
        ),

        USERTYPE_GUEST => array(
            "code" => array("comments.js")
        )
    )

);