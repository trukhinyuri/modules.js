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

import { Modules } from './modules.js';

function run() {

        let demoData = { "hello": "OOK", "nehello" : "ok"};
        // let demoDataFooter = {
        //         0: { "hello": "OOK", "nehello" : "ok"}
        //         , 1: { "hello": "OOK1", "nehello" : "ok1"}
        // };


        async function loadModules() {
            await Modules.Loader.loadModule("modules", "demo", "menu", demoData);
            // await Modules.Loader.loadModule("modules", "demo", "footer", demoDataFooter);
        }

        loadModules().then(function () {
            demoData = Modules.Loader.bindDataObject("menu", demoData);
            // demoDataFooter = Modules.Loader.bindDataObject("footer", demoDataFooter);
            demoData.nehello = 4;
            demoData.hello = 3;

            // demoDataFooter["0"].hello = 1;
            // demoDataFooter["1"].nehello = 1;
            // demoDataFooter["2"] = { "hello": "OOK1", "nehello" : "ok1"};

        });







        // var data = {"hello": "one"};
        //
        //
        // var p = new Proxy(target, {
        //     set(target, prop, val) { // для перехвата записи свойства
        //         if (prop == 'value') {
        //             alert(val);
        //             target[prop] = val;
        //         }
        //     }
        // });
        //  p.value = 2;
    }
Modules.Events.addStartupListener(run);


// "use strict";
// (function () {
//     function run() {
//         // Modules.Loader.loadModule("modules", "globalNavigationMenu", "menu");
//         import {addTextToBody} from './utils.mjs';
//
//         addTextToBody('Modules are pretty cool.');
//     }
//     Modules.Events.addStartupListener(run);
// }());
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
