core.apps.site_auth = function(args) {

    this.defaultProfile = {
        title: "",
        reg_page: ""
    }
};


core.apps.site_auth.prototype = {

    
    hint_values: {
        login: "Email",
        pwd: "Password"
    },

    
    onOpen: function() {
        this.setTitle(this.profile["title"]);
        this.displayTpl(this.$["content"], "site_auth");
        if(core.data.site_user) {
            this.showElement("auth_logged");
            if(this.$["auth_logged_user"]) {
                this.$["auth_logged_user"].innerHTML = core.data.site_user.email;
            }
        } else {
            this.showElement("auth_not_logged");
        }
    },


    onAuthLogoutClick: function() {
        desktop.onAuthLogoutClick();
    },


    onRegisterClick: function() {
        var url = this.profile.reg_page ? "/" + this.profile.reg_page + ".html" : "/user/?mode=register";
        desktop.loadURL(url);
    },


    onPwdResetClick: function() {
        var url = this.profile.reg_page ? "/" + this.profile.reg_page + ".html?user_reg_mode=reset_pwd" : "/user/?mode=reset_pwd";
        desktop.loadURL(url);
    }

};
core.apps.site_auth.extendPrototype(core.components.html_component);
core.apps.site_auth.extendPrototype(core.components.desktop_app);