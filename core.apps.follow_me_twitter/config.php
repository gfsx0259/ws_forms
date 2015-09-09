<?

$config["js_apps"]["core.apps.follow_me_twitter"] = array(

    'general' => array(
        'title' => 'Follow Me Twitter',
        'name' => 'follow_me_twitter',//should be like 3th part of folder
        'version' => '1.0.0',
        'icon' => 'icon.png',
        'category' => CATEGORY_SOCIAL,
        'description' => ''
    ),

    "version" => 1,

    "content" => array(
        USERTYPE_ADMIN => array(
            "code" => array(
                "follow_me_twitter.js",
                "follow_me_twitter.admin.js"
            ),
            "templates" => array("templates/follow_me_twitter.xml")
        ),
        USERTYPE_GUEST => array(
            "code" => array("follow_me_twitter.js"),
            "templates" => array("templates/follow_me_twitter.xml")
        )
    )

)


?>