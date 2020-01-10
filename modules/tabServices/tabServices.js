import {Modules} from "./../../modules.js";
    class TabServices {
        constructor() {
            let version = Modules.Server.getString("/api/version")
            let SDRoot = this.buildShadowDomRoot();
            this.activateTabSwitches(SDRoot);

            Modules.Loader.loadModule("./modules/", "ElasticCloudCalculator", "ElasticCloud", null, SDRoot)


// Modules.Loader.loadModule("./../../modules/", "calculatorHeader", "test")
        }

        buildShadowDomRoot() {
            let Container = document.getElementsByClassName(DynamicSDRoot)[0];
            let InternalContainer = Container.getElementsByClassName(DynamicSDRootInternalClass)[0];
            let SDRoot = Container.shadowRoot;
            return SDRoot;
        }

        activateTabSwitches(SDRoot) {
            let tablinks = SDRoot.querySelectorAll(".tablinks");
            let tabcontents = SDRoot.querySelectorAll(".tabcontent");

            tabcontents[0].classList.remove("hidden");
            tabcontents[0].classList.add("visible");

// tabcontents[0].className = tabcontents[0].className.replace(/\b"+ "hidden" +"\b/g, "");

            for (let i = 0; i < tablinks.length; i++) {
                Modules.Events.addListener(tablinks[i], "click", function (event) {
                    for (let i = 0; i < tablinks.length; i++) {
                        if (tablinks[i].id == event.target.id) {
                            tablinks[i].classList.remove("tablinks_unselected");
                            tablinks[i].classList.add("tablinks_selected");
                        } else {
                            tablinks[i].classList.remove("tablinks_selected");
                            tablinks[i].classList.add("tablinks_unselected");
                        }
                    }

                    for (let j = 0; j < tabcontents.length; j++) {
                        if (tabcontents[j].id == event.target.id) {
                            tabcontents[j].classList.remove("hidden");
                            tabcontents[j].classList.add("visible");
                        } else {
                            tabcontents[j].classList.remove("visible");
                            tabcontents[j].classList.add("hidden");
                        }
                    }
                });
            }
        }
    }

    let tabServices = new TabServices();



