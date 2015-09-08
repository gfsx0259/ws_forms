<?

    $config["js_apps"]["core.apps.user_reg"] = array(

        "content" => array(
            USERTYPE_ADMIN => array(
                "code" => array("user_reg.js"),
                "templates" => array(
                    "templates/user_reg_register.xml",
                    "templates/user_reg_reset_pwd.xml"
                )
            ),



            USERTYPE_CONTRIBUTOR => array(
                "code" => array("layout_user.js"),
                "templates" => array(
                    "templates/user_reg_register.xml",
                    "templates/user_reg_reset_pwd.xml"
                )
            ),


            USERTYPE_GUEST => array(
                "code" => array("layout_user.js"),
                "templates" => array(
                    "templates/user_reg_register.xml",
                    "templates/user_reg_reset_pwd.xml"
                )
            )
        )

    )


?>