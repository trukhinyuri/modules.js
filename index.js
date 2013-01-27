"use strict";
(function () {
    function run() {
        var modules = new Modules.Loader("/modules");
        modules.load("globalNavigationMenu", "header");

        var templates = new Modules.Loader("/templates");
        var fileInfoData = {filename : 'one.txt', lastModifiedDate: '01.01.2013'};

        templates.loadTemplate('fileInfo', 'bodySimple', fileInfoData);
        var fileInfoListData = [
            {
                filename: 'one.cpp'
                ,lastModifiedDate: '01.01.2013'
            }
            , {
                filename: 'one.h'
                ,lastModifiedDate: '02.01.2013'
            }
        ];
        templates.loadTemplate('fileInfo', 'bodyList', fileInfoListData);
    }
    var events = new Modules.Events();
    events.addStartupListener(run);
}());
//function onLoad() {
//    var modulesInfo = new Array();
//    modulesInfo.push(new modules.Info("/modules", "globalNavigationMenu", "#header"));
//    modulesInfo.push(new modules.Info("/modules", "about", "#footer"));
//    modules.loadInfoArrayWithNotifier(modulesInfo);
//
//      modules.register("/modules", "globalNavigationMenu");
//      modules.register("/modules", "about");
   // alert("");

    //  modules.load("modules", "globalNavigationMenu", "header");
      //modules.load("modules", "about", "footer");

//};
