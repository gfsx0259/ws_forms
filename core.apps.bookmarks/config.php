<?

    $config["js_apps"]["core.apps.bookmarks"] = array(

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

    )

?>