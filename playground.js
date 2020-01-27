import {Modules} from "./modules.js";


let run = function () {
    Modules.Loader.loadModuleInClass(null, "./modulesForTests/", "cascadeModuleLoading", "pageHeader");


    function receiveTestMessage(e) {
        Modules.Events.Messages.send("test", "WOW!!!", "d", "cascadeModuleLoadingInternalL3");

    }
    Modules.Events.Messages.subscribe("moduleLoaded", receiveTestMessage, "cascadeModuleLoadingInternalL3", "d");

};
Modules.Events.addStartupListener(run);