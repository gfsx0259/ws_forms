<?

$config["js_apps"]["core.apps.twitter"] = array(

    'general' => array(
        'title' => 'Twitter',
        'name' => 'twitter',//should be like 3th part of folder
        'version' => '1.0.0',
        'category' => CATEGORY_SOCIAL,
        'description' => ''
    ),

    "version" => 1,

    "content" => array(
        USERTYPE_ADMIN => array(
            "code" => array(
                "twitter.js",
                "twitter.admin.js"
            )
        ),
        USERTYPE_GUEST => array(
            "code" => array("twitter.js")
        )
    )

)


?>