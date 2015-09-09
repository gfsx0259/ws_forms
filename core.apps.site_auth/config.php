<?

$config["js_apps"]["core.apps.site_auth"] = array(

    'general' => array(
        'title' => 'User login',
        'name' => 'site_auth',//should be like 3th part of folder
        'version' => '1.0.0',
        'icon' => 'icon.png',
        'category' => CATEGORY_FORMS,
        'description' => '',
        'depends'=>[
            'forms_manager',
            'form',
            'form_builder',
            'form_select',
            'forms_data'
        ]
    ),


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