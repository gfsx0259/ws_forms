<?

class dialog_controller_contact_us extends dialog_controller
{

    public $appAPIs = [
        "contact_us_emails",
        "form/form"
    ];

    var $APIs = array(
        "site_page",
        "mailer",
        "site_mailer"
    );

    var $fields = array(
        "reply" => array("type" => "email"),
        "subject" => array("type" => "string"),
        "message" => array("type" => "string"),
        "name" => array("type" => "string")
    );


    function run()
    {
        parent::run();
        global $config;

        switch ($_REQUEST["act"]) {
            case "delete":
                return $this->delete();
                break;

            case "send":
                return $this->send();
                break;
        }
    }


    function delete()
    {
        if ($this->usertype < USERTYPE_ADMIN) return;

        $p = array(
            "widget_id" => (int)$_REQUEST["widget_id"]
        );
        $this->contact_us_emails->delete($p);
        return array("status" => "ok");
    }


    function send()
    {
        if (is_array($_SESSION["fccodes"])) {
            $code = $_SESSION["fccodes"]["contact_us"];
        }
        $res = $this->form->process($_REQUEST, $data, $this->fields);
        if (($_POST["captcha"] == $code) && ($res === true)) {
            if (isset($_REQUEST["email"])) {
                $to_email = $_REQUEST["email"];
            } else {
                $p = array(
                    "widget_id" => $_REQUEST["widget_id"]
                );
                $to_email = $this->contact_us_emails->get($p);
            }

            if (!empty($to_email)) {
                $result = $this->mailer->sendManually(
                    $data["reply"],
                    $to_email,
                    $data["subject"],
                    nl2br($data["message"]),
                    $data["name"],
                    true
                );


                if ($_REQUEST["autoreply"] == 1) {
                    $values = array(
                        "NAME" => $data["name"]
                    );
                    $this->site_mailer->setValues($values);
                    $this->site_mailer->setTemplate("contact_us_autoreply");
                    $this->site_mailer->send($data["reply"], $to_email);
                }
            }
            return array("status" => "sent");
        } else {
            return array(
                "status" => "send_failed",
                "errors" => $res
            );
        }
    }

}

?>