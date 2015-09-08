core.apps.follow_me_twitter.extendPrototype({

    onFirstRun: function() {
        this.showSettings();
    },


    settingsBlocks: [
        { title: "Username:",
          controls: [
            { tag: "wsc_text", id: "inp_username" }
          ]},

        { title: "Button caption:",
          controls: [
            { tag: "wsc_text", id: "button_text" }
          ]}
    ],


    fillSettingsForm: function() {
        this.$["inp_username"].value = this.profile["username"];
        this.$["button_text"].value = this.profile["button_text"];
    },


    processSettingsForm: function() {
        this.profile["username"] = this.$["inp_username"].value;
        this.profile["button_text"] = this.$["button_text"].value;
    },
    
    onSettingsUpdated: function() {
        this.refresh();
    }

});