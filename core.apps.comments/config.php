<?

    $config["js_apps"]["core.apps.comments"] = array(

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

    )


?>