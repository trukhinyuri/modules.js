//requirejs.config({
//    shim: {
//        "jquery" : ["/js/libs/jquery.js"]
//    },
//    baseUrl : "/js/libs"
//});

define(["jquery", "modules"], function ($, modules) {

    return {
        register : function (callback) {
            modules.notifier.subscribe(this.notify);
            callback();
        },
        notify: function (e) {
//            if ((e.receiver === "globalNavigationMenu") && (e.evt === "alert")) {
//                alert(e.message);
//            }
        },
        run: function () {
//           modules.notifier.fire("about", "globalNavigationMenu", "alert", "Hi from GNM");
        }
    };
});