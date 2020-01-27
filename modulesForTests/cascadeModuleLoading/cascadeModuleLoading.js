import {Modules} from "./modules.js";

// (async () => {
//     let result = await Modules.Loader.loadSingleModuleInClassAsync("cascadeModuleLoading", "modulesForTests", "cascadeModuleLoadingInternal", "cascadeModuleLoading");
// })();

let result = Modules.Loader.loadModuleInClass("cascadeModuleLoading", "modulesForTests", "cascadeModuleLoadingInternal", "cascadeModuleLoading");



