core.apps.contact_us.extendPrototype({

    settingsBlocks: [
        { title: "Email:",
          controls: [
            { tag: "wsc_text", id: "inp_email" }
          ]},    
        { title: "Misc:", 
          controls: [
            { tag: "wsc_checkbox", title: "Send confirmation email", id: "inp_send_autoreply" }
          ]},
    ],


    fillSettingsForm: function() {
        this.$["inp_send_autoreply"].setChecked(this.profile["send_autoreply"]);
        this.$["inp_email"].value = core.data.contact_us_emails[this.id] || "";
    },


    processSettingsForm: function() {
        this.profile["send_autoreply"] = this.$["inp_send_autoreply"].checked ? 1 : 0;

        var email = this.$["inp_email"].value.trim();
        if(email != core.data.contact_us_emails[this.id]) {
            core.data.contact_us_emails[this.id] = email;
            this.force_save_profile = true;
        }
    },


    onSettingsUpdated: function() {
    },


    onClose: function() {
        delete(core.data.contact_us_emails[this.id]);
        var p = {
            dialog: "contact_us",
            act: "delete",
            widget_id: this.id
        };
        core.transport.send("/controller.php", p, this.onDeleteResponse.bind(this));
    },

    onDeleteResponse: function(r) {}

});