<?php

class dialog_controller_contact_us_init extends dialog_site
{
    function __construct(&$dialog){
        $this->useAppAPI("contact_us/contact_us_emails");
        $dialog->contact_us_emails_data = $this->contact_us_emails->getKeyList();
    }

}