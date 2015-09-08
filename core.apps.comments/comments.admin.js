core.apps.comments.extendPrototype({
    


    settingsBlocks: [
        { title: "Content:",
          primary: true,
          controls: [
            { tag: "wsc_checkbox", title: "Variable content", id: "inp_variable_content" },
            { tag: "wsc_checkbox", title: "Hide if empty", id: "inp_hide_if_empty" }
          ]}
          
/*          ,

        { title: "Comments source:", 
          controls: [
            { tag: "wsc_select", id: "inp_source",
              options: [ {text: "Loading...", value: ""}] }
          ]}
          */
    ],


    fillSettingsForm: function() {
        this.$["inp_variable_content"].setChecked(this.profile["variable_content"]);
        this.$["inp_hide_if_empty"].setChecked(this.profile["hide_if_empty"]);
/*
        if(!core.data.comments_sources) {
            var r = {
                dialog: "comments",
                act: "get_sources"
            }
            core.transport.send("/controller.php", r, this.onSourcesResponce.bind(this));
        } else {
            this.fillList();
        }
        */
    },


    processSettingsForm: function() {
        this.profile["variable_content"] = this.$["inp_variable_content"].checked;
        this.profile["hide_if_empty"] = this.$["inp_hide_if_empty"].checked;
/*
        var v = this.$["inp_source"].value;
        if(v == "" || v == this.id) return;
        this.profile["sid"] = v;
        */
    },


    onSettingsUpdated: function() {
        this.refresh();
/*
        var v = this.profile["sid"];

        if(v == this.id) return;
        var app = desktop.layout.apps[v];
        if(app) {
            app.close();
        }

        desktop.layout.apps[v] = this;
        desktop.layout.freeApp(this.id);
        this.id = v;
        this.$["window"].wid = v;

        this.loadCaptcha();
        this.page = 1;
        this.loadPage();
        */
    },




    // sources list
/*
    onSourcesResponce: function(v) {
        if(v.status == "data") {
            core.data.comments_sources = v.list;
            this.fillList();
        }
    },


    fillList: function() {
        var l = core.data.comments_sources;
        var el = this.$["inp_source"];
        var opts = [ { text: "...", value: "" } ];
        var ofs = (new Date()).getTimezoneOffset()*60000;
        for(var i=0; i<l.length; i++) {
            var d = new Date();
            d.setTime(l[i] - ofs);
            opts.push({ text: d.toLocaleString(), value: l[i] });
//            el.options.add(new Option(d.toLocaleString(), l[i]));
        }
        el.setOptions(opts);
        el.setValue(this.profile["sid"]);
//        el.value = this.profile["sid"];
    }
*/


});