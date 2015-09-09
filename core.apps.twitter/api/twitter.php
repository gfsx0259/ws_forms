<?
require_once("scripts/external/twitter/twitter.lib.php");

class api_twitter extends Twitter
{
    function connect($args)
    {
        //$this->username=$args["username"];
        //$this->password=$args["password"];
        parent::connect($args["username"], $args["password"]);
    }

    function getSearch($args)
    {
        //$this->connect($args);
        $search_result = $this->search($args["keyword"]);
        return $this->pareseSearchResults(json_decode($search_result), $args["num_of_messages"]);
    }

    function pareseSearchResults($results, $num_of_messages)
    {
        $str = array();
        $counter = 0;
        if (is_array($results->results) && !empty($results->results)) {
            foreach ($results->results as $result) {
                $temp = array();
                $temp["message_text"] = $this->parseMessageText($result->text);
                $temp["message_id"] = $result->id;
                $temp["sender_id"] = $result->from_user_id;
                $temp["sender_profile_image_url"] = $result->profile_image_url;
                $temp["sender_screen_name"] = $result->from_user;
                $temp["created_at"] = str_replace("+0000", "", $result->created_at);
                $str[] = $temp;
                $counter++;
                if ($counter >= $num_of_messages)
                    break;
            }
        }
        return $str;
    }

    function getMessages($args)
    {
        $this->connect($args);
        $messages_xml = $this->getUserTimeline();

        //$meaages=$this->parseDirectMessages($messages_xml,intval($args['num_of_messages']));
        $messages = $this->parseFriendTimeLine($messages_xml, intval($args['num_of_messages']));
        return $messages;
    }

    function xmlParser($xml)
    {
        $p = xml_parser_create();
        xml_parse_into_struct($p, $xml, $vals);
        xml_parser_free($p);
        return $vals;
    }

    function parseFriendTimeLine($xml, $limit = 10)
    {
        $vals = $this->xmlParser($xml);
        $match_chars = -1;
        $str = array();
        $flag = 0;
        $exists_media = array();
        foreach ($vals as $key => $tags) {
            if ((strtoupper($tags['tag']) == "STATUS") && (($tags['type']) == 'open'))
                $match_chars++;
            if ($match_chars >= 0) {
                if ((strtoupper($tags['tag']) == 'TEXT') && (($tags['type']) == 'complete')) {
                    $str[$match_chars]['message_text'] = $this->parseMessageText($tags['value']);
                }
                if ((strtoupper($tags['tag']) == 'CREATED_AT') && (($tags['type']) == 'complete')) {
                    $str[$match_chars]['created_at'] = str_replace("+0000", "", $tags['value']);
                }

                if ((strtoupper($tags['tag']) == 'SCREEN_NAME') && (($tags['type']) == 'complete')) {
                    $str[$match_chars]['sender_screen_name'] = $tags['value'];
                }

                if ((strtoupper($tags['tag']) == 'PROFILE_IMAGE_URL') && (($tags['type']) == 'complete')) {
                    $str[$match_chars]['sender_profile_image_url'] = $tags['value'];
                    $flag = 0;
                }
            }
            if ($match_chars >= $limit)
                break;
        }
        return $str;
    }

    function parseDirectMessages($xml, $limit)
    {
        $vals = $this->xmlParser($xml);
        $match_chars = -1;
        $str = array();
        $flag = 0;
        $exists_media = array();
        foreach ($vals as $key => $tags) {
            if ((strtoupper($tags['tag']) == "DIRECT_MESSAGE") && (($tags['type']) == 'open'))
                $match_chars++;
            if ($match_chars >= 0) {
                if ((strtoupper($tags['tag']) == "ID") && (($tags['type']) == 'complete')) {
                    $str[$match_chars]['message_id'] = $tags['value'];
                }
                if ((strtoupper($tags['tag']) == 'SENDER_ID') && (($tags['type']) == 'complete')) {
                    $str[$match_chars]['sender_id'] = $tags['value'];
                }
                if ((strtoupper($tags['tag']) == 'TEXT') && (($tags['type']) == 'complete')) {
                    $str[$match_chars]['message_text'] = $this->parseMessageText($tags['value']);
                }
                if ((strtoupper($tags['tag']) == 'RECIPIENT_ID') && (($tags['type']) == 'complete')) {
                    $str[$match_chars]['recipient_id'] = $tags['value'];
                }

                if ((strtoupper($tags['tag']) == 'CREATED_AT') && (($tags['type']) == 'complete')) {
                    $str[$match_chars]['created_at'] = str_replace("+0000", "", $tags['value']);
                }

                if ((strtoupper($tags['tag']) == 'SENDER_SCREEN_NAME') && (($tags['type']) == 'complete')) {
                    $str[$match_chars]['sender_screen_name'] = $tags['value'];
                }

                if ((strtoupper($tags['tag']) == 'RECIPIENT_SCREEN_NAME') && (($tags['type']) == 'complete')) {
                    $str[$match_chars]['recipient_screen_name'] = $tags['value'];
                }

                if ((strtoupper($tags['tag']) == 'SENDER') && (($tags['type']) == 'open')) {
                    $flag = 1;
                }

                if ((strtoupper($tags['tag']) == 'PROFILE_IMAGE_URL') && (($tags['type']) == 'complete') && $flag == 1) {
                    $str[$match_chars]['sender_profile_image_url'] = $tags['value'];
                    $flag = 0;
                }
            }
            if ($match_chars >= $limit)
                break;
        }
        return $str;
    }

    function parseMessageText($str)
    {
        if (preg_match_all('/http[s]?:\/\/[^\s]+/i', $str, $matches)) {
            foreach ($matches[0] as $match) {
                $str = str_ireplace($match, "<a href='" . $match . "' target='_blank' >" . $match . "</a>", $str);
            }
        }
        return $str;
    }
}

?>