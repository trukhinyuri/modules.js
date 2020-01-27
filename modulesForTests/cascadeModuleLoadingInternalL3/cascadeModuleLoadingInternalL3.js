import {Modules} from "./modules.js";

Modules.Loader.getModuleShadowDomRoots("cascadeModuleLoadingInternalL3").forEach(documentFragment => {
   let test = documentFragment.querySelectorAll("."+ "test")[0];
   test.innerHTML = "NewL3!";
});