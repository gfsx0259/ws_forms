core.apps.comments = function(args) {

    this.defaultProfile = {
        title: "",
        app_style: "",
        sid: null,
        variable_content: false
    }

    this.page = 1;
    core.data.comments_sources = false;
}



core.apps.comments.prototype = {



    onOpen: function() {
        this.setTitle(this.profile["title"]);
        this.refresh();
    },



    buildContent: function(el) {
        this.buildModel(el,
            { tag: "div", className: "comments",
              childs: [
                { tag: "div", className: "pager",
                  display: false,
                  id: "pager" },
                { tag: "div", className: "list",
                  id: "list" }
              ]}
        );
        this.renderForm(el);
    },



    refresh: function() {
        if(this.profile["variable_content"]) {
            if(core.data.variable_content.product) {
                this.topic_id = "ep-" + core.data.variable_content.product.id;
            } else {
                this.topic_id = false;
                if(core.usertype < USERTYPE_ADMIN && this.profile["hide_if_empty"]) {
                    this.hideElement("window");
                    return;
                }
            }
        } else {
            this.topic_id = this.id;
        }
        this.loadPage();
        this.loadCaptcha();
    },




    // comments

    loadPage: function() {
        this.hideElement("pager");
        if(!this.topic_id) {
            this.hideElement("form");
            this.$["list"].innerHTML = "";
            return;
        } else {
            this.showElement("form");
        }

        this.$["list"].innerHTML = "Loading...";
        this.$["btn_post"].disabled = true;
        var r = {
            dialog: "comments",
            act: "get_page",
            topic_id: this.topic_id,
            page: this.page
        }
        core.transport.send("/controller.php", r, this.onPageData.bind(this));
    },


    onPageData: function(v) {
        this.$["btn_post"].disabled = false;
        this.commentsCount = 0;
        if(v.status != "page") {
            this.hideElement("pager");
            this.$["list"].innerHTML = "error";
        } else if(v.data.length) {
            this.commentsCount = v.data.length;
            this.$["list"].innerHTML = "";
            for(var i=0; i<v.data.length; i++) {
                var c = v.data[i];
                var nm = c.email != "" ? 
                    { tag: "a", href: "mailto:" + c.email }
                    :
                    { tag: "span" }

                nm.className = "name";
                nm.innerHTML = c.name;

                var controls = 
                    core.usertype >= USERTYPE_ADMIN ?
                    { tag: "div", className: "controls",
                      childs: [
                        { tag: "div", className: "btn_del_comment",
                          title: "Delete comment",
                          events: { onclick: ["deleteComment", c.id]} }
                      ]}
                    :
                    null;

                this.buildModel(this.$["list"],
                    { tag: "div", className: "item",
                      childs: [
                        { tag: "div", className: "header",
                          childs: [
                            nm,
                            { tag: "span", className: "date",
                              innerHTML: c.created },
                            controls
                          ]},
                        { tag: "div", className: "content",
                          innerHTML: c.content }
                      ]}
                );
            }
            this.updatePager(v.page, v.total_pages);
        } else {
            this.hideElement("pager");
            this.$["list"].innerHTML = "No comments...";    
        }
        this.$["btn_post"].disabled = false;
    },





    // pager

    updatePager: function(page, total) {
        this.$["pager"].innerHTML = "";
        if(total < 2) {
            this.hideElement("pager");
            return;
        }
        this.showElement("pager");

        var p = page;
        if(p > total) p = total;
        var items = [];

        if(total > 7) {
            items.push({ text: "first", page: 1 });
        }
        for(var i=-3; i<4; i++) {
            var pp = p + i;
            if(pp > 0 && pp <= total) {
                items.push({ text: pp, page: pp});
            }
        }
        if(total > 7) {
            items.push({ text: "last", page: total});
        }

        for(var i=0; i<items.length; i++) {
            this.buildModel(this.$["pager"],
                items[i].page != page ?
                { tag: "a", href: "void",
                  innerHTML: items[i].text,
                  events: { onclick: [ "gotoPage", items[i].page ]} }
                :
                { tag: "span", innerHTML: items[i].text }
            );
        }
    },


    gotoPage: function(e, page) {
        this.page = page;
        this.loadPage();
        this.$["btn_post"].disabled = true;
    },




    // childs
    /*

    loadChilds: function(parent_id) {
        var r = {
            dialog: "comments",
            act: "get_childs",
            topic_id: this.id,
            parent_id: parent_id
        }
        core.transport.send("/controller.php", r, this.onChildsData.bind(this));
    },


    onChildsData: function(v) {

    },
    */




    // delete comment

    deleteComment: function(e, id) {                         
        desktop.modal_dialog.confirm("Delete comment?", this.deleteCommentRequest.bind(this, id));
    },


    deleteCommentRequest: function(id) {
        this.$["btn_post"].disabled = true;
        
        if(this.commentsCount == 1 && this.page > 1) {
            this.page--;
        }
        var r = {
            dialog: "comments",
            act: "delete",
            id: id,
            topic_id: this.topic_id,
            page: this.page
        }
        core.transport.send("/controller.php", r, this.onPageData.bind(this));
    },



    // add comment

    renderForm: function(el) {
        this.buildModel(el,
            { tag: "div", className: "comment_form",
              id: "form",
              childs: [
                { tag: "div", className: "header1", innerHTML: "Add comment" },
                { tag: "div", 
                  childs: [
                    { tag: "label", innerHTML: "Name" },
                    { tag: "input", className: "text", type: "text", id: "inp_name" }
                  ]},
                { tag: "div", 
                  childs: [
                    { tag: "label", innerHTML: "Email" },
                    { tag: "input", className: "text", type: "text", id: "inp_email" }
                  ]},
                { tag: "div", 
                  childs: [
                    { tag: "input", type: "checkbox", id: "inp_hidden_email" },
                    { tag: "text", innerHTML: " Hide Email" }
                  ]},
                { tag: "div", 
                  childs: [
                    { tag: "label", innerHTML: "Comment" },
                    { tag: "textarea", id: "inp_content" }
                  ]},
                { tag: "div", className: "captcha",
                  childs: [
                    { tag: "text", innerHTML: "Repeat numbers" },
                    { tag: "img", className: "captcha", id: "captcha" },
                    { tag: "input", className: "code", type: "text", id: "inp_code" }
                  ]},
                { tag: "span", className: "error", id: "error" },
                { tag: "div", style: { textAlign: "center" },
                  childs: [
                    { tag: "input", type: "button", value: "Post comment",
                      id: "btn_post",
                      events: { onclick: "addComment" } }
                  ]}
              ]}
        );
    },



    loadCaptcha: function() {
        this.$["captcha"].src = "/controller.php?dialog=comments&act=captcha&topic_id=" + this.topic_id + "&_=" + Math.random();
    },



    showFormError: function(e) {
        var str = "";
        switch(e) {
            case "name":
                str = "Empty name";
                break;
            case "content":
                str = "Empty comment";
                break;
            case "code":
                str = "Incorrect numbers";
                break;                
        }
        this.$["error"].innerHTML = str;
    },



    addComment: function() {
        var name = this.$["inp_name"].value.trim();
        if(name == "") {
            this.showFormError("name");
            this.$["inp_name"].focus();
            return
        }
        var content = this.$["inp_content"].value.trim();
        if(content == "") {
            this.showFormError("content");
            this.$["inp_content"].focus();
            return
        }
        var code = this.$["inp_code"].value.trim();
        if(code == "") {
            this.showFormError("code");
            this.$["inp_code"].focus();
            return
        }

        this.$["btn_post"].disabled = true;

        var r = {
            dialog: "comments",
            act: "post",
            topic_id: this.topic_id,
            name: name,
            email: this.$["inp_email"].value.trim(),
            email_visible: this.$["inp_hidden_email"].checked ? "0" : "1",
            content: content,
            code: code
        }
        core.transport.send("/controller.php", r, this.onCommentAdded.bind(this));
    },



    onCommentAdded: function(v) {
        this.$["btn_post"].disabled = false;
        if(v.status == "error") {
            if(v.field == "code") {
                this.$["inp_code"].value = "";
                this.loadCaptcha();
            }
            this.showFormError(v.field);
            this.$["inp_" + v.field].focus();
            return;
        }

        this.$["inp_code"].value = "";
        this.loadCaptcha();
        
        this.showFormError("");
        this.$["inp_content"].value = "";
        this.onPageData(v);
    }



}

core.apps.comments.extendPrototype(core.components.html_component);
core.apps.comments.extendPrototype(core.components.desktop_app);