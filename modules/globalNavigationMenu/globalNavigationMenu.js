var globalNavigationMenu = new function() {
    this.run = function() {
        alert("");
    };
    this.subscribe = function(callback) {
       modules.notifier.subscribe(this.notify);
       callback();
    };
    this.notify = function(message) {

    };
};



//    return {
//        register : function (callback) {
//            modules.notifier.subscribe(this.notify);
//            callback();
//        },
//        notify: function (e) {
////            if ((e.receiver === "globalNavigationMenu") && (e.evt === "alert")) {
////                alert(e.message);
////            }
//        },
//        run: function () {
////           modules.notifier.fire("about", "globalNavigationMenu", "alert", "Hi from GNM");
//        }
//    };
