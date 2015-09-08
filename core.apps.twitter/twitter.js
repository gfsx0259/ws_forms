core.apps.twitter = function(args) {

    this.defaultProfile = {
        title: "",
        app_style: "",
        twitter_username: "",
        twitter_password: "",
        twitter_num_of_messages: "10",
        keyword: "",
        refesh_time_interval: 0,
        message_type: 0
    }

}


core.apps.twitter.prototype = {


    onOpen: function() {
        this.setTitle(this.profile["title"]);
        this.refresh();
    },



    refresh: function() {
        if(this.timeout) clearTimeout(this.timeout);
        var p = this.profile;
        if(p.message_type == 0) {
            if(p["twitter_username"] == "" || p["twitter_password"] == "") return;
            var p = {
                dialog: "twitter",
                act: "getMessages",
                username: p["twitter_username"],
                password: p["twitter_password"],
                num_of_messages: p["twitter_num_of_messages"]
            }
        } else {
            var p = {
                dialog: "twitter",
                act: "getSearch",
                keyword: p["keyword"],
                num_of_messages: p["twitter_num_of_messages"]
            }
        }
        core.transport.send("/controller.php", p, this.onServerResponce.bind(this), "POST");
        this.$["content"].innerHTML = "Loading...";
    },



    onServerResponce: function(r) {
        this.renderMessages(r);
        var t = parseInt(this.profile["refesh_time_interval"]);
        if(t) {
            this.timeout = setTimeout(this.refresh.bind(this), t*60000);
        }
    },



    renderMessages: function(data) { 
        var html = "";
        for(var i in data) {
            var text = data[i].message_text+="...("+data[i].sender_screen_name+")";
            html += 
                "<div class='twitter_message'>" +
                "<img src='" + data[i].sender_profile_image_url + "' class='twitter_sender_img'/>" +
                "<span>" + text + "</span>" +
                "<div class='twitter_message_send_date'>" + data[i].created_at + "</div>" +
                "</div>";
        }
        this.$["content"].innerHTML = html;
    }


}
core.apps.twitter.extendPrototype(core.components.html_component);
core.apps.twitter.extendPrototype(core.components.desktop_app);