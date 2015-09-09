<?

class dialog_controller_twitter extends dialog_controller
{


    public $appAPIs = ["twitter"];

    var $allowedTags = "<p><span><div><blockquote><h1><h2><h3><h4><h5><h6><ul><li><ol><br><hr><b><u><i><img><a>";

    var $disabledAttrs = array(
        'onclick', 'ondblclick', 'onkeydown', 'onkeypress', 'onkeyup', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onunload'
    );


    function run()
    {
        parent::run();

        switch ($_REQUEST["act"]) {

            case "getMessages":
                $args = array(
                    "username" => $this->getParam("username"),
                    "password" => urldecode($this->getParam("password")),
                    "num_of_messages" => (int)$_REQUEST['num_of_messages']
                );
                return $this->twitter->getMessages($args);
                break;

            case "getSearch":
                $args = array(
                    "keyword" => $this->getParam("keyword"),
                    "num_of_messages" => (int)$_REQUEST['num_of_messages']
                );
                return $this->twitter->getSearch($args);
                break;

            default:
                return false;
                break;
        }

    }


    function getParam($key)
    {
        if ($_REQUEST[$key] == "") return "";
        $c = stripslashes($_REQUEST[$key]);
        $c = $this->strip_tags_attributes($c);
        return preg_replace("@<script[^>]*?>.*?</script>@si", "", $c);
    }


    function strip_tags_attributes($s)
    {
        return preg_replace('/<(.*?)>/ie', "'<' . preg_replace(array('/javascript:[^\"\']*/i', '/(" . implode('|', $this->disabledAttrs) . ")=[\"\'][^\"\']*[\"\']/i', '/\s+/'), array('', '', ' '), stripslashes('\\1')) . '>'", strip_tags($s, $this->allowedTags));
    }

}

?>