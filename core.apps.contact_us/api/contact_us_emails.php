<?

class api_contact_us_emails
{


    // $args: { widget_id: int, email: str }
    function set($args)
    {
        $sql = "
                INSERT INTO
                    contact_us_emails
                    ( 
                    widget_id,
                    email
                    )
                VALUES
                    (
                    %widget_id%,
                    %email%
                    )
                ON DUPLICATE KEY UPDATE
                    email = %email%";
        $this->db->query($sql, $args);
    }


    // $args: { widget_id: int, email: str }
    function get($args)
    {
        $sql = "
                SELECT
                    email
                FROM
                    contact_us_emails
                WHERE   
                    widget_id = %widget_id%";
        return $this->db->get_one($sql, $args);
    }


    function delete($widget_id)
    {
        $sql = "
                DELETE FROM
                    contact_us_emails
                WHERE   
                    widget_id = %widget_id%";
        $this->db->query($sql, $widget_id);
    }


    function getKeyList()
    {
        $sql = "
                SELECT
                    widget_id,
                    email
                FROM
                    contact_us_emails";
        $rows = $this->db->get_list($sql);
        if (count($rows)) {
            $res = array();
            foreach ($rows as $row) {
                $res[$row["widget_id"]] = $row["email"];
            }
        } else {
            $res = null;
        }
        return $res;
    }

}

?>