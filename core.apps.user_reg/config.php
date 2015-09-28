<?

$config["js_apps"]["core.apps.user_reg"] = array(

    'general' => array(
        'title' => 'User registration',
        'name' => 'user_reg',//should be like 3th part of folder
        'version' => '1.0.0',
        'category' => CATEGORY_FORMS,
        'description' => '',
        'depends'=>[
            'forms_manager',
            'form',
            'form_builder',
            'form_select',
            'forms_data',
            'users_manager'
        ]
    ),


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