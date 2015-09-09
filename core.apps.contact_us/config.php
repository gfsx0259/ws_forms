<?

$config["js_apps"]["core.apps.contact_us"] = array(

    'general' => array(
        'title' => 'Contact Us',
        'name' => 'contact_us',//should be like 3th part of folder
        'version' => '1.0.0',
        'icon' => 'icon.png',
        'category' => CATEGORY_FORMS,
        'description' => '',
        'depends' => [
            'form'
        ]
    ),

    "content" => array(
        USERTYPE_ADMIN => array(
            "templates" => array(
                "templates/contact_us_content.xml"
            ),
            "code" => array(
                "contact_us.js",
                "contact_us.admin.js"
            )
        ),


        USERTYPE_CONTRIBUTOR => array(
            "code" => array("contact_us.js"),
            "templates" => array(
                "templates/contact_us_content.xml"
            )
        ),


        USERTYPE_GUEST => array(
            "code" => array("contact_us.js"),
            "templates" => array(
                "templates/contact_us_content.xml"
            )
        )
    )

)


?>