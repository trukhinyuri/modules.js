/*
 * Copyright 2012-2013 Yuri Trukhin
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

"use strict";
(function () {
    function run() {
        var modules = new Modules.Loader("modules");
        modules.load("globalNavigationMenu", "header");
        modules.load("flexbox_study", "body");

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
        var server = new Modules.Server("/config");
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
