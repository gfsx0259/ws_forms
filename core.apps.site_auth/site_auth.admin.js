core.apps.site_auth.extendPrototype({

    onFirstRun: function() {
        this.showSettings();
    },


    settingsBlocks: [
        { title: "Registration page:", 
          controls: [
            { tag: "wsc_select", id: "inp_reg_page" }
          ]}
    ],


    onSettingsRendered: function() {
        var pl = core.data.pages_list;
        var opts = [ { text: "...", value: "" } ];
        for(var i=0; i<pl.length; i++) {
            if(pl[i].type == "std") {
                opts.push({ text: pl[i].name, value: pl[i].url });
            }
        }
        this.$["inp_reg_page"].setOptions(opts);
    },


    fillSettingsForm: function() {
        this.$["inp_reg_page"].value = this.profile["reg_page"];
    },


    processSettingsForm: function() {
        this.profile["reg_page"] = this.$["inp_reg_page"].value;
    }

});