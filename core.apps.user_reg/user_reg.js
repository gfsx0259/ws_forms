core.apps.user_reg = function(args) {


    this.defaultProfile = {
        title: "",
        app_style: ""
    }

};


core.apps.user_reg.prototype = {


    buildContent: function(el) {
        this.buildModel(this.$["content"], [
            { tag: "div", id: "content" },
            { tag: "div", id: "msg" }
        ]);
    },


    onOpen: function() {
        var mode = REQUEST_GET["user_reg_mode"] || "register";

        if(core.data.page_action_result) {
            switch(core.data.page_action_result) {
                case "reg_confirmed":
                    this.showMessage("info", "Success. Your account activated.");
                    break;
                case "reg_not_confirmed":
                    this.showMessage("error", "Error. Invalid code.");
                    break;
                case "reset_pwd_success":
                    this.showMessage("info", "New password sent to your email.");
                    break;
                case "reset_pwd_error":
                    this.showMessage("error", "Error. Invalid code.");
                    break;
            }
        } else {
            switch(mode) {
                case "register":
                    this.showSection("register");
                    if(core.data.site_info.users_reg_msg) {
                        this.$["reg_msg"].innerHTML = core.data.site_info.users_reg_msg;
                        this.showElement("sec_reg_reason");
                    } else {
                        this.hideElement("sec_reg_reason");
                    }
                    this.loadRegCaptcha();
                    break;

                case "reset_pwd":
                    this.showSection("reset_pwd");
                    break;
            }
        }
    },



    showSection: function(name) {
        if(this.active_section) {
            this.hideElement("user_reg_" + this.active_section);
        }
        if(!this.$["user_reg_" + name]) {
            this.displayTpl(this.$["content"], "user_reg_" + name);
        }
        this.showElement("user_reg_" + name);
        this.active_section = name;
    },


    hideActiveSection: function() {
        this.hideElement("user_reg_" + this.active_section);
        this.active_section = false;
    },



    showMessage: function(mode, str) {
        this.showElement("msg");
        this.$["msg"].className = "message_" + mode;
        this.$["msg"].innerHTML = str;
    },









    // Register
    loadRegCaptcha: function() {
        this.$["reg_captcha_img"].src = "/controller.php?dialog=users_manager&act=reg_captcha&_=" + Math.random();
    },


    onRegisterClick: function(e) {
        var p = {
            dialog: "users_manager",
            act: "register",
            first_name: this.$["inp_r_first_name"].value.trim(),
            last_name: this.$["inp_r_last_name"].value.trim(),
            email: this.$["inp_r_email"].value.trim(),
            captcha_code: this.$["inp_r_captcha_code"].value.trim(),
            confirm_page_url: location.href
        };

        if(p.email == "") {
            this.showMessage("error", "Incorrect email");
            return;
        } 
        var pwd = this.$["inp_r_pwd"].value.trim();
        var pwd2 = this.$["inp_r_pwd2"].value.trim();

        if(pwd == "") {
            this.showMessage("error", "You should define password");
            return;
        } else if(pwd != pwd2) {
            this.showMessage("error", "Incorrect password");
            return;
        } else if(core.data.site_info.users_reg_confirmation == 0 && p.captcha_code.length != 4) {
            this.showMessage("error", "Incorrect captcha code");
            return;
        }

        p.pwd = pwd;
        p.reg_reason = this.$["inp_r_reg_reason"].value;

        this.hideElement("msg");
        this.$["btn_r_submit"].disabled = true;
        core.transport.send("/controller.php", p, this.onRegisterResponce.bind(this));
    },




    register_result_messages: {
        waiting_approval: "Your account waiting admin approval.",
        confirmation_email_sent: "Success. Email with confirmation link was sent. Follow it to activate account.",
        registered: "Account registered."
    },


    onRegisterResponce: function(r) {
        switch(r["status"]) {
            case "captcha_error":
                this.showMessage("error", "Incorrect captcha code");
                this.$["inp_r_captcha_code"].value = "";
                this.loadRegCaptcha();
                break;

            case "empty_reason":
                this.showMessage("error", "Error. Please enter a reason you want to register for this site.");
                break;

            case "email_used":
                this.showMessage("error", "Email already used");
                break;

            case "success":
                this.hideActiveSection();
                this.showMessage("info", this.register_result_messages[r.msg]);
                break;

            default:
                this.showMessage("error", "Server error");
        }
    },



    // reset pwd
    onResetPwdClick: function(e) {
        var email = this.$["inp_rp_email"].value.trim();
        if(email == "") return;
        this.$["btn_rp_submit"].disabled = true;
        var p = {
            dialog: "users_manager",
            act: "reset_pwd",
            email: email,
            reset_page_url: location.href
        };
        core.transport.send("/controller.php", p, this.onResetPwdResponce.bind(this));        
    },


    onResetPwdResponce: function(v) {
        if(v == "ok") {
            this.hideActiveSection();
            this.showMessage("info", "Email with instructions was sent.");
        }
    }


};

core.apps.user_reg.extendPrototype(core.components.html_component);
core.apps.user_reg.extendPrototype(core.components.desktop_app);