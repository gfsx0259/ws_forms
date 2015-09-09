core.apps.bookmarks = function (args) {

    this.defaultProfile = {
        title: "",
        app_style: "",
        align: "center"
    }

};

core.apps.bookmarks.prototype = {

    sites: [
//        { title: "Ma.gnolia", icon: "magnolia.png",
//          url: "http://ma.gnolia.com/bookmarklet/add?url=[url]&title=[title]" },
//        { title: "Windows Live", icon: "windowslive.png",
//          url: "https://favorites.live.com/quickadd.aspx?marklet=1&mkt=en-us&url=[url]&top=1" },
//       { title: "Mixx", icon: "mixx.png",
//          url: "http://www.mixx.com/submit?page_url=[url]" },
//        { title: "Yahoo! MyWeb", icon: "myweb.png",
//          url: "http://myweb2.search.yahoo.com/myresults/bookmarklet?u=[url]&t=[title]" },
        {
            title: "Google", icon: "google32.png",
            url: "http://www.google.com/bookmarks/mark?op=edit&bkmk=[url]&title=[title]"
        },
        {
            title: "Twitter", icon: "Twitter32.png",
            url: "http://twitter.com/home?status=[url]"
        },
        {
            title: "Facebook", icon: "facebook32.png",
            url: "http://www.facebook.com/sharer.php?u=[url]"
        },
        {
            title: "Stumble Upon", icon: "Stumble-Upon32.png",
            url: "http://www.stumbleupon.com/submit?url=[url]&title=[title]"
        },
//        { title: "del.icio.us", icon: "delicious.gif", 
//          url: "http://del.icio.us/post?url=[url]&title=[title]" },
        {
            title: "Digg", icon: "digg32.png",
            url: "http://digg.com/submit?phase=2&url=[url]"
        },
//        { title: "Technorati", icon: "technorati.gif",
//          url: "http://technorati.com/cosmos/search.html?url=[url]" },
//        { title: "Blinklist", icon: "blinklist.gif", 
//          url: "http://blinklist.com/index.php?Action=Blink/addblink.php&url=[url]&Title=[title]" },
//        { title: "Furl", icon: "furl.gif",
//          url: "http://furl.net/storeIt.jsp?t=[title]&u=[url]" },
        {
            title: "reddit", icon: "Reddit32.png",
            url: "http://reddit.com/submit?url=[url]&title=[title]"
        }
    ],


    buildContent: function (el) {
        this.$["content"].style.textAlign = this.profile["align"];

        var page_url = escape("http://" + core.data.http_host + "/" + core.data.page_file + ".html");
        var page_title = escape(document.title);

        var html = "";
        for (var i = 0; i < this.sites.length; i++) {
            var s = this.sites[i];
            var url = s.url.replace("[url]", page_url).replace("[title]", page_title);
            html +=
                "<a href='" + url + "' target='_blank' style='text-decoration: none; background: transparent; color: transparent;' title='Add to " + s.title + "'>" +
                "<img style='width: 32px; height: 32px; border: 0; margin-right: 5px;' src='/static/bicons/" + s.icon + "'/></a> ";
        }
        el.innerHTML = html;
    },


    onOpen: function () {
        this.setTitle(this.profile["title"]);
    }

};

core.apps.bookmarks.extendPrototype(core.components.html_component);
core.apps.bookmarks.extendPrototype(core.components.desktop_app);