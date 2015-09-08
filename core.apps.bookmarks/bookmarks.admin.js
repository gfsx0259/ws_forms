core.apps.bookmarks.extendPrototype({    

    settingsBlocks: [
        { title: "Align to:",
          controls: [
            { tag: "wsc_select", id: "inp_align",
              options: [
                { value: "left", text: "Left" },
                { value: "center", text: "Center" },
                { value: "right", text: "Right" }
              ]}
          ]}
    ],


    fillSettingsForm: function() {
        this.$["inp_align"].setValue(this.profile["align"]);
    },


    processSettingsForm: function() {
        this.profile["align"] = this.$["inp_align"].value;
    },


    onSettingsUpdated: function() {
        this.$["content"].style.textAlign = this.profile["align"];
    }

});