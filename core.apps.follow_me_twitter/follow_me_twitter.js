core.apps.follow_me_twitter = function(args) {

    this.defaultProfile = {
        title: "",
        app_style: "",
        username:"",
        button_text:"Follow Me"
    }

}


core.apps.follow_me_twitter.prototype = {


    buildContent: function(el) {  
        this.displayTpl(el, "follow_me_twitter");
    },


    onOpen: function() {
        this.setTitle(this.profile["title"]);
        this.refresh();
    },


    refresh: function() {
        this.$["twitter_button_img"].innerHTML = this.profile["button_text"];
    },


    onFollowMe: function() {
        desktop.loadURL("http://twitter.com/"+this.profile["username"]);
    }

}
core.apps.follow_me_twitter.extendPrototype(core.components.html_component);
core.apps.follow_me_twitter.extendPrototype(core.components.desktop_app);