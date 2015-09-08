<?

    $config["js_apps"]["core.apps.follow_me_twitter"] = array(

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