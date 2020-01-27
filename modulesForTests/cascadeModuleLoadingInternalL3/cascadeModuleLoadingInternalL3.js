import {Modules} from "./modules.js";

Modules.Loader.getModuleShadowDomRoots("cascadeModuleLoadingInternalL3").forEach(documentFragment => {
   let test = documentFragment.querySelectorAll("."+ "test")[0];
   test.innerHTML = "NewL3!";
});

function receiveTestMessage(e) {
      alert(e.detail.message);

}
Modules.Events.Messages.subscribe("test", receiveTestMessage, "d", "cascadeModuleLoadingInternalL3");
Modules.Events.Messages.send("moduleLoaded", "cascadeModuleLoadingInternalL3", "cascadeModuleLoadingInternalL3", "d");
