<?php

class api_comments
{


    var $perPage = 10;


    // $args: { topic_id}
    function getCount($args)
    {
        $sql = "
                SELECT
                    count(*)
                FROM
                    comments
                WHERE
                    topic_id = %topic_id%";
        return $this->db->get_one($sql, $args);
    }


    // data = { topic_id, [page] }
    function getPage($data)
    {
        $data["per_page"] = $this->per_page;
        $data["page"] = (int)$data["page"];

        $total_count = $this->getCount($data);
        $total = ceil($total_count / $this->perPage);

        $ofs = ($data["page"] - 1) * $this->perPage;
        $sql = "
                SELECT
                    id, content, created, 
                    name, IF(email_visible = 0, '', email) as email
                FROM
                    comments
                WHERE
                    topic_id = %topic_id%
                ORDER BY 
                    `created` DESC
                LIMIT " . $ofs . "," . $this->perPage;

        return array(
            "status" => "page",
            "page" => $data["page"],
            "total_pages" => $total,
            "data" => $this->db->get_list($sql, $data)
        );
    }


    // data = { topic_id,  parent_id
    function getChilds($data)
    {
        $sql = "
                SELECT
                    id, content, created, 
                    name, IF(email_visible = 0, '', email) as email
                FROM
                    comments
                WHERE
                    topic_id = %topic_id% AND
                    parent_id = %parent_id%
                ORDER BY 
                    `created` DESC";


        return array(
            "status" => "childs",
            "data" => $this->db->get_list($sql, $data),
            "parent_id" => $data["parent_id"]
        );
    }


    // $data = {  topic_id[, parent_id], name, email, email_visible, content }
    function add($data)
    {
        if (!isset($data["parent_id"])) $data["parent_id"] = 0;

        $data["created"] = time();
        $data["content"] = substr($data["content"], 0, 4000);
        $data["content"] = nl2br(htmlspecialchars(stripslashes($data["content"])));
        $data["name"] = substr($data["name"], 0, 80);
        $data["name"] = htmlspecialchars(stripslashes($data["name"]));
        $data["email"] = substr($data["email"], 0, 80);

        $sql = "
                INSERT INTO
                    comments
                ( topic_id, parent_id, name, email, email_visible, content, created)
                VALUES
                ( %topic_id%, %parent_id%, %name%, %email%, %email_visible%, %content%,
                 FROM_UNIXTIME(%created%))";

        return $this->db->query($sql, $data);
    }


    function delete($data)
    {
        $sql = "
                DELETE FROM
                    comments
                WHERE
                    topic_id = %topic_id% AND
                    id = %id%
                LIMIT 1";
        $this->db->query($sql, $data);
    }


    function deleteTopic($data)
    {
        $sql = "
                DELETE FROM
                    comments
                WHERE
                    topic_id = %topic_id%";
        $this->db->query($sql, $data);
    }


    // used in widget settings
    function getSources()
    {
        $sql = "
                SELECT DISTINCT
                    topic_id
                FROM
                    comments";
        return $this->db->get_vector($sql);
    }


}