<?

    $config["js_apps"]["core.apps.site_auth"] = array(

        "content" => array(
            USERTYPE_ADMIN => array(
                "code" => array(
                    "site_auth.js",
                    "site_auth.admin.js"
                ),
                "templates" => array(
                    "template.tpl"
                )
            ),


            USERTYPE_CONTRIBUTOR => array(
                "code" => array(
                    "site_auth.js"
                ),
                "templates" => array(
                    "template.tpl"
                )
            ),


            USERTYPE_GUEST => array(
                "code" => array(
                    "site_auth.js"
                ),
                "templates" => array(
                    "template.tpl"
                )
            )
        )

    )


?>