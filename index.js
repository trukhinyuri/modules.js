requirejs.config({
    shim: {
        "jquery" : ["/js/libs/jquery.js"],
    },
    baseUrl : "/js/libs"
});

require(["jquery", "modules"], function ($, modules) {
    $(document).ready(function () {
        var modulesInfo = new Array();
        modulesInfo.push(new modules.Info("/modules", "globalNavigationMenu", "#header"));
        modulesInfo.push(new modules.Info("/modules", "about", "#footer"));
        modules.loadInfoArrayWithNotifier(modulesInfo);

//        modules.register("/modules", "globalNavigationMenu");
//        modules.register("/modules", "about");
//        modules.load("/modules", "globalNavigationMenu", "#header");
//        modules.load("/modules", "about", "#footer");

    });
});