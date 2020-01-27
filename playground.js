import {Modules} from "./modules.js";


let run = function () {
    Modules.Loader.loadModuleInClass(null, "./modulesForTests/", "cascadeModuleLoading", "pageHeader")
};
Modules.Events.addStartupListener(run);