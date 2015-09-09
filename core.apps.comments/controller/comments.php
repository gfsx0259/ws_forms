<?php

class dialog_controller_comments extends dialog_controller
{
    public $appAPIs = ["comments"];
    public $APIs = ["captcha"];

    function run()
    {
        parent::run();

        switch ($_REQUEST["act"]) {

            case "get_page":
                return $this->comments->getPage($_REQUEST);
                break;

            case "get_childs":
                return $this->comments->getChilds($_REQUEST);
                break;


            case "captcha":
                $topic_id = $_REQUEST["topic_id"];
                $code = $this->captcha->generateCode();
                if (!is_array($_SESSION["tccodes"])) {
                    $_SESSION["tccodes"] = array();
                }
                $_SESSION["tccodes"][$topic_id] = $code;
                $this->captcha->render($code);
                break;
            
            case "post":
                $topic_id = $_REQUEST["topic_id"];
                if ($_SESSION["tccodes"] && $_SESSION["tccodes"][$topic_id] == $_REQUEST["code"]) {
                    if (trim($_REQUEST["name"]) == "") {
                        return array("status" => "error", "field" => "name");
                    } else if (trim($_REQUEST["content"]) == "") {
                        return array("status" => "error", "field" => "content");
                    }
                    $this->comments->add($_REQUEST);
                    $_REQUEST["page"] = 1;
                    unset($_SESSION["tccodes"][$topic_id]);
                    return $this->comments->getPage($_REQUEST);
                } else {
                    return array("status" => "error", "field" => "code");
                }
                break;

            case "delete":
                if ($this->usertype < USERTYPE_ADMIN) return array("status" => "error");
                $this->comments->delete($_REQUEST);
                return $this->comments->getPage($_REQUEST);
                break;

            case "delete_topic":
                if ($this->usertype < USERTYPE_ADMIN) return array("status" => "error");
                $this->comments->deleteTopic($_REQUEST);
                return array("status" => "deleted");
                break;


            case "get_sources":
                if ($this->usertype < USERTYPE_ADMIN) return array("status" => "error");
                return array(
                    "status" => "data",
                    "list" => $this->comments->getSources()
                );
                break;
        }
    }


    function getContent()
    {
        $v = trim($_REQUEST["content"]);
        $v = htmlspecialchars($v);
        return $v;
    }


}