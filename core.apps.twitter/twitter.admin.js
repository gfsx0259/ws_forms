core.apps.twitter.extendPrototype({

    onFirstRun: function() {
        this.showSettings();
    },


    settingsBlocks: [
        { title: "Source:", 
          controls: [
            { tag: "wsc_select", id: "message_type", 
              events: { onchange: "onMessageTypeChange" }, 
              options: [
                { value: "0", text: "My Account"},
                { value: "1", text: "Search Result Messages"}
              ]}
         ]},

        { title: "Username:", 
          id: "twitter_username_section",
          controls: [
            { tag: "wsc_text", id: "twitter_username" }
          ]},

        { title: "Password:", 
          id: "twitter_password_section",
          controls: [
            { tag: "wsc_password", id: "twitter_password" }
          ]},
        
        { title: "Keyword:", 
          id: "twitter_keyword_section",
          controls: [
            { tag: "wsc_text", id: "twitter_keyword" }
          ]},

        { title: "Show:", 
          id: "twitter_num_of_messages_section",
          controls: [
            { tag: "wsc_slider", 
              id: "twitter_num_of_messages", 
              options: [
                { value: "1", text: "1 message"},
                { value: "2", text: "2 messages"},
                { value: "3", text: "3 messages"},
                { value: "4", text: "4 messages"},
                { value: "5", text: "5 messages"},
                { value: "6", text: "6 messages"},
                { value: "7", text: "7 messages"},
                { value: "8", text: "8 messages"},
                { value: "9", text: "9 messages"},
                { value: "10", text: "10 messages"},
                { value: "11", text: "11 messages"},
                { value: "12", text: "12 messages"},
                { value: "13", text: "13 messages"},
                { value: "14", text: "14 messages"},
                { value: "15", text: "15 messages"},
                { value: "16", text: "16 messages"},
                { value: "17", text: "17 messages"},
                { value: "18", text: "18 messages"},
                { value: "19", text: "19 messages"},
                { value: "20", text: "20 messages"}
              ]}
          ]},

        { title: "Refresh every:", 
          controls: [
            { tag: "wsc_slider", 
              id: "refesh_time_interval", 
              options: [
                { value: "0", text: "no refresh"},
                { value: "1", text: "1 minute"},
                { value: "2", text: "2 minutes"},
                { value: "3", text: "3 minutes"},
                { value: "4", text: "4 minutes"},
                { value: "5", text: "5 minutes"},
                { value: "10", text: "10 minutes"},
                { value: "15", text: "15 minutes"},
                { value: "20", text: "20 minutes"},
                { value: "30", text: "30 minutes"},
                { value: "60", text: "hour"}
              ]}
          ]}
    ],


    onMessageTypeChange:function() {
        if(this.$["message_type"].value == 1) {
            this.hideElements(["twitter_username_section", "twitter_password_section"]);
            this.showElement("twitter_keyword_section");
        } else {
            this.showElements(["twitter_username_section", "twitter_password_section"]);
            this.hideElement("twitter_keyword_section");
        }
    },


    fillSettingsForm: function() {
        this.$["twitter_username"].value = this.profile["twitter_username"];
        this.$["twitter_password"].value = decodeURIComponent(this.profile["twitter_password"]);
        this.$["twitter_num_of_messages"].setValue(this.profile["twitter_num_of_messages"]);
        this.$["refesh_time_interval"].setValue(this.profile["refesh_time_interval"]);
        this.$["message_type"].setValue(this.profile["message_type"]);
        this.$["twitter_keyword"].value = this.profile["keyword"];
        this.onMessageTypeChange();
    },


    processSettingsForm: function() {
        this.profile["twitter_username"] = this.$["twitter_username"].value;
        this.profile["twitter_password"] = encodeURIComponent(this.$["twitter_password"].value);
        this.profile["twitter_num_of_messages"] = this.$["twitter_num_of_messages"].value;
        this.profile["message_type"] = this.$["message_type"].value;
        this.profile["keyword"] = this.$["twitter_keyword"].value;

        var el = this.$["refesh_time_interval"];
        el.value = Math.abs(parseInt(el.value, 10)) || this.defaultProfile["refesh_time_interval"];
        this.profile["refesh_time_interval"] = el.value;
    },
    

    onSettingsUpdated: function() {
        this.refresh();
    }

});