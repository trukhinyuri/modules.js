import {Modules} from "./../../modules.js";

class ElasticCloudCalculator {
    constructor() {
        let SDRoot = this.buildShadowDomRoot();
        this.activateSelectSwitches(SDRoot, "ecc_chooser_value_tarifModel");
        this.activateSelectSwitches(SDRoot, "ecc_chooser_value_region");
    }

    buildShadowDomRoot() {
        let HeadContainer = document.getElementsByClassName("services")[0].shadowRoot;
        let Container = HeadContainer.querySelectorAll("."+DynamicSDRoot)[0];
        // let InternalContainer = Container.getElementsByClassName(DynamicSDRootInternalClass)[0];
        let SDRoot = Container.shadowRoot;
        return SDRoot;
    }

    activateSelectSwitches(SDRoot, tab_chooserClassName) {
        let tab_chooser = SDRoot.querySelectorAll("."+tab_chooserClassName)[0];
        let tablinks = tab_chooser.querySelectorAll(".tab_chooser_links");

        for (let i = 0; i < tablinks.length; i++) {
            Modules.Events.addListener(tablinks[i], "click", function (event) {
                for (let i = 0; i < tablinks.length; i++) {
                    if (tablinks[i].id == event.target.id) {
                        tablinks[i].classList.remove("tab_chooser_links_unselected");
                        tablinks[i].classList.add("tab_chooser_links_selected");
                    } else {
                        tablinks[i].classList.remove("tab_chooser_links_selected");
                        tablinks[i].classList.add("tab_chooser_links_unselected");
                    }
                }
            });
        }
    }
}

let ecc = new ElasticCloudCalculator();