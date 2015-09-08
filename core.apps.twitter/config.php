<?

    $config["js_apps"]["core.apps.twitter"] = array(

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