core.apps.contact_us = function(args) {

    this.defaultProfile = {
        title: "",
        app_style: "",
        send_autoreply: 0
    };


    this.form_structure = {
        description: "",
        fields: [
          { type: "text",
            properties: {
              label: "Your name:",
              name: "name" 
            }
          },

          { type: "text",
            properties: {
              label: "Your email:",
              name: "reply" 
            }
          },

          { type: "text",
            properties: {
              label: "Subject:",
              name: "subject" 
            }
          },

          { type: "textarea",
            properties: {
              label: "Message:",
              name: "message",
              height: 120
            }
          },

          { type: "captcha",
            properties: {
              label: "Enter code:",
              name: "captcha"
            }
          }
        ]
    }; //form struct
};


core.apps.contact_us.prototype = {

    buildContent: function(el) {
        this.displayTpl(el, "contact_us_content");
    },

   
    onOpen: function() {
        this.setTitle(this.profile["title"]);

        var fp = {
            parent_el: this.$["form"],
            target_type: "callback",
            target_value: this.onFormSubmit.bind(this)
        };
        this.form = new core.objects.form(fp);
        this.form.setStructure(this.form_structure, "contact_us");
        this.form.render();
    },


    onFormSubmit: function(data) {
        if(core.common.isEmpty(data.reply) || 
           core.common.isEmpty(data.name) || 
           core.common.isEmpty(data.subject) || 
           core.common.isEmpty(data.message) ||
           core.common.isEmpty(data.captcha)) {
            this.showMessage("error", "All fields must be not empty!");
        } else {
            if(!core.common.isEmail(data.reply)){
                this.showMessage("error", "Wrong E-mail!");
            } else {
                this.form.$["btn_submit"].disabled = true;
                this.showMessage(false);
                var r = {
                    dialog: "contact_us",
                    act: "send",
                    widget_id: this.id,
                    name: data.name,
                    reply: data.reply,
                    subject: data.subject,
                    message: data.message,
                    captcha: data.captcha,
                    autoreply: this.profile["send_autoreply"]
                };
                if(core.data.contact_us_emails && core.data.contact_us_emails[this.id]) {
                    r.email = core.data.contact_us_emails[this.id];
                }
                core.transport.send("/controller.php", r, this.serverResponce.bind(this), "POST");   
            }
        }
    },

    serverResponce: function(msg) {
        this.form.$["btn_submit"].disabled = false;
        if(msg && msg.status == "sent") {
            this.showMessage("success", "Email has been sent.");
            this.form.clear();
        } else {
            this.showMessage("error", "Email not sent.");
        }
    },
    

    showMessage: function(type, msg) {
        this.hideElements(["msg_error", "msg_success"]);
        if(msg) {
            this.$["msg_" + type].innerHTML = msg;
            this.showElement("msg_" + type);
            clearTimeout(this.timeout);
            this.timeout = setTimeout(this.hideMessage.bind(this), 5000);
        }
    },

    hideMessage: function() {
        this.hideElements(["msg_error", "msg_success"]);
    }

};
core.apps.contact_us.extendPrototype(core.components.html_component);
core.apps.contact_us.extendPrototype(core.components.desktop_app);