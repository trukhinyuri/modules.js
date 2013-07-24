/**
 * @fileOverview
 * @copyright (C) Yuri V. Trukhin.
 * @author Yuri V.Trukhin
 * @version 1.0-snapshot
 * @license Usage requires a licence. For getting price and purchase license subscription write to <a href="mailto:yuri@trukhin.com">yuri@trukhin.com</a>
 */

////Definition of Setup module
////noinspection JSUnresolvedVariable
//(function (Setup) {
//    function func () {
//    }
//    Setup.func = func;
//}(exports.Setup || (exports.Setup = {})));
////noinspection JSUnresolvedVariable
//var Teardown = exports.Setup;

////Definition of Teardown module
////noinspection JSUnresolvedVariable
//(function (Teardown) {
//    function func () {
//    }
//    Teardown.func = func;
//}(exports.Teardown || (exports.Teardown = {})));
////noinspection JSUnresolvedVariable
//var Teardown = exports.Teardown;

"use strict";
//noinspection JSUnresolvedFunction
module("Modules.DOM", {
    setup: function() {
        //Definition of Setup module
        //noinspection JSUnresolvedVariable
        window.exports = window.exports || (window.exports = {});
        (function (Setup) {
            function isHTMLModule () {
                var moduleItemType = "module";
                var anotherItemType = "template";
                var body = document.getElementsByTagName("body")[0];
                var divHTMLModule = document.createElement('div');
                divHTMLModule.className = "HTMLModule";
                divHTMLModule.setAttribute("data-" + "modulesjs_item_type", moduleItemType);
                var testModuleInHTMLModule = document.createElement("div");
                testModuleInHTMLModule.className = "testModuleInHTMLModule";
                divHTMLModule.appendChild(testModuleInHTMLModule);
                body.appendChild(divHTMLModule);

                var divNotHTMLModule = document.createElement("div");
                divNotHTMLModule.className = "NotHTMLModule";
                divNotHTMLModule.setAttribute("data-" + "modulesjs_item_type", anotherItemType);
                var testModuleInNotHTMLModule = document.createElement("div");
                testModuleInNotHTMLModule.className = "testModuleInNotHTMLModule";
                divNotHTMLModule.appendChild(testModuleInNotHTMLModule);
                body.appendChild(divNotHTMLModule);
            }
            function getModules() {
                var moduleItemType = "module";
                var anotherItemType = "template";
                var body = document.getElementsByTagName("body")[0];

                var divHTMLModule = document.createElement('div');
                divHTMLModule.className = "MayBeHTMLModuleContainer";
                divHTMLModule.setAttribute("data-" + "modulesjs_item_type", moduleItemType);
                var testModuleInHTMLModule = document.createElement("div");
                testModuleInHTMLModule.className = "MayBeHTMLModule";
                divHTMLModule.appendChild(testModuleInHTMLModule);
                body.appendChild(divHTMLModule);

                var divNotHTMLModule = document.createElement("div");
                divNotHTMLModule.className = "MayBeHTMLModuleContainer";
                divNotHTMLModule.setAttribute("data-" + "modulesjs_item_type", anotherItemType);
                var testModuleInNotHTMLModule = document.createElement("div");
                testModuleInNotHTMLModule.className = "MayBeHTMLModule";
                divNotHTMLModule.appendChild(testModuleInNotHTMLModule);
                body.appendChild(divNotHTMLModule);

                var divHTMLSecondModule = document.createElement('div');
                divHTMLSecondModule.className = "MayBeHTMLModuleContainer";
                divHTMLSecondModule.setAttribute("data-" + "modulesjs_item_type", moduleItemType);
                var testModuleSecondInHTMLModule = document.createElement("div");
                testModuleSecondInHTMLModule.className = "MayBeHTMLModule";
                divHTMLSecondModule.appendChild(testModuleSecondInHTMLModule);
                body.appendChild(divHTMLSecondModule);
            }
            function getFirstContainerElementByClassName() {
                var body = document.getElementsByTagName("body")[0];

                var container = document.createElement('div');
                container.className = "Container";
                var internal = document.createElement("div");
                internal.className = "Element";
                container.appendChild(internal);
                body.appendChild(container);

                var containerTwo = document.createElement('div');
                containerTwo.className = "Container";
                containerTwo.id = "ContainerTwo";
                var internalOneLevel = document.createElement("div");
                internalOneLevel.className = "ElementOneLevel";
                var internalSecondLevel = document.createElement("div");
                internalSecondLevel.className = "ElementSecondLevel";
                internalOneLevel.appendChild(internalSecondLevel);
                containerTwo.appendChild(internalOneLevel);
                body.appendChild(containerTwo);

                var elementWithoutContainer = document.createElement("div");
                elementWithoutContainer.className = "ElementWithoutContainer";
                body.appendChild(elementWithoutContainer);
            }
            Setup.isHTMLModule = isHTMLModule;
            Setup.getModules = getModules;
            Setup.getFirstContainerElementByClassName = getFirstContainerElementByClassName;
        }(window.exports.Setup || (window.exports.Setup = {})));
        //noinspection JSUnresolvedVariable
        var Setup = window.exports.Setup;

        //Setup excecution
        Setup.isHTMLModule();
        Setup.getModules();
        Setup.getFirstContainerElementByClassName();

    },
    teardown: function() {
        //Definition of Teardown module
        //noinspection JSUnresolvedVariable
        window.exports = window.exports || (window.exports = {});
        (function (Teardown) {
            function isHTMLModule () {
                var body = document.getElementsByTagName("body")[0];

                var divHTMLModule = document.getElementsByClassName("HTMLModule")[0];
                body.removeChild(divHTMLModule);

                var divNotHTMLModule = document.getElementsByClassName("NotHTMLModule")[0];
                body.removeChild(divNotHTMLModule);
            }
            function getModules () {
                var body = document.getElementsByTagName("body")[0];

                var divHTMLModule = document.getElementsByClassName("MayBeHTMLModuleContainer")[0];
                body.removeChild(divHTMLModule);

                var divNotHTMLModule = document.getElementsByClassName("MayBeHTMLModuleContainer")[0];
                body.removeChild(divNotHTMLModule);

                var divHTMLModule = document.getElementsByClassName("MayBeHTMLModuleContainer")[0];
                body.removeChild(divHTMLModule);
            }
            function getFirstContainerElementByClassName() {
                var body = document.getElementsByTagName("body")[0];

                var container = document.getElementsByClassName("Container")[0];
                body.removeChild(container);

                var container = document.getElementsByClassName("Container")[0];
                body.removeChild(container);

                var elementWithoutContainer = document.getElementsByClassName("ElementWithoutContainer")[0];
                body.removeChild(elementWithoutContainer);
            }
            Teardown.isHTMLModule = isHTMLModule;
            Teardown.getModules = getModules;
            Teardown.getFirstContainerElementByClassName = getFirstContainerElementByClassName;
        }(window.exports.Teardown || (window.exports.Teardown = {})));
        //noinspection JSUnresolvedVariable
        var Teardown = window.exports.Teardown;

        //Teardown execution
        Teardown.isHTMLModule();
        Teardown.getModules();
        Teardown.getFirstContainerElementByClassName();
    }
});
test("isHTMLModule", function() {
    //noinspection JSUnresolvedFunction
    expect(3);
    var testModuleInHTMLModule = document.getElementsByClassName("testModuleInHTMLModule")[0];
    var expected = true;
    var actual = Modules.DOM.isHTMLModule(testModuleInHTMLModule);
    equal(actual, expected, "testModule is a html module");

    var testModuleInNotHTMLModule = document.getElementsByClassName("testModuleInNotHTMLModule")[0];
    var expected = false;
    var actual = Modules.DOM.isHTMLModule(testModuleInNotHTMLModule);
    equal(actual, expected, "testModule is not a html module (another module)");

    var expected = false;
    var actual = Modules.DOM.isHTMLModule(window);
    equal(actual, expected, "window is not a html module");
});
test("getModules", function() {
   //noinspection JSUnresolvedFunction
    expect(2);
    var className = "MayBeHTMLModule";
    var modulesArray = Modules.DOM.getModules(className);
    var expectedAttribute = "module";
    for (var i = 0; i < modulesArray.length; i++) {
        equal(expectedAttribute, modulesArray[i].parentNode.getAttribute("data-" + "modulesjs_item_type"), "item is "
            + expectedAttribute);
    }
});
test("getFirstContainerElementByClassName", function() {
    //noinspection JSUnresolvedFunction
    expect(3);
    var className = "Container";
    var elementClassName = "Element";
    var element = document.getElementsByClassName(elementClassName)[0];
    var result = Modules.DOM.getFirstContainerElementByClassName(element, className);
    var actual = result.className;
    var expected = className;
    equal(actual, expected, "Find first container element by className");

    var className = "Container";
    var containerID = "ContainerTwo";
    var elementClassName = "ElementSecondLevel";
    var element = document.getElementsByClassName(elementClassName)[0];
    var result = Modules.DOM.getFirstContainerElementByClassName(element, className);
    var actual = result.id;
    var expected = containerID;
    equal(actual, expected, "Find first container element by className. First container element selected correctly.");
    var elementWithoutContainer = document.getElementsByClassName("ElementWithoutContainer")[0];
    var expected = Modules.DOM.getFirstContainerElementByClassName(elementWithoutContainer, "Container");
    var actual = null;
    equal(actual, expected, "Not desired container for element without container");
});
//test("getModules", function(){});
//module("Modules.Loader", {
//    setup: function() {
////        var divloadTest = document.createElement('div');
////        divloadTest.className = "loadTest";
////        document.getElementsByTagName("body")[0].appendChild(divloadTest);
////        var divloadTest = document.createElement('div');
////        divloadTest.className = "loadTest";
////        document.getElementsByTagName("body")[0].appendChild(divloadTest);
////        var divloadHTMLTest = document.createElement('div');
////        divloadHTMLTest.className = "loadHTMLTest";
////        document.getElementsByTagName("body")[0].appendChild(divloadHTMLTest);
////        var divloadTemplateTest = document.createElement('div');
////        divloadTemplateTest.className = "loadTemplateTest";
////        document.getElementsByTagName("body")[0].appendChild(divloadTemplateTest);
//    },
//    teardown: function() {
////        var divloadTest = document.getElementsByClassName("loadTest")[0];
////        document.getElementsByTagName("body")[0].removeChild(divloadTest);
////        var divloadTest = document.getElementsByClassName("loadTest")[0];
////        document.getElementsByTagName("body")[0].removeChild(divloadTest);
////        var divloadHTMLTest = document.getElementsByClassName("loadHTMLTest")[0];
////        document.getElementsByTagName("body")[0].removeChild(divloadHTMLTest);
////        var divloadTemplateTest = document.getElementsByClassName("loadTemplateTest")[0];
////        document.getElementsByTagName("body")[0].removeChild(divloadTemplateTest);
//    }
//});
//test("path", function() {
////    expect(4);
//    var expectedPath = "modules_forTests";
//    var loader = new Modules.Loader(expectedPath);
//    equal(loader.path, expectedPath, "Loader.path is set correctly: " + loader.path);
//    throws(
//        function() {
//            loader.path = "unexpectedPath";
//        }, Error,
//        "Trying to set loader.path without constructor. Throw exception, loader.path isn`t changed: " + loader.path
//    );
//    var loaderWithoutPath = new Modules.Loader();
//    var expectedAutoPath = "";
//    equal(loaderWithoutPath.path, expectedAutoPath, "Loader.path is set automatically on current directory, " +
//        "if path isn`t specified in constructor. " + loaderWithoutPath.path);
//    var loaderWithSlash = new Modules.Loader("modules_forTests/");
//    equal(expectedPath, loaderWithSlash.path, "Loader.path with slash in end of path. Slash removed: " + loaderWithSlash.path);
//});
//test("itemType", function() {
//    expect(11);
//    var path = "modules_forTests";
//    var loader = new Modules.Loader(path);
//    throws(
//        function() {
//            loader.itemTypes = {};
//        }, Error,
//        "Trying to set loader.itemTypes. Throw exception, loader.itemTypes has defined properties, user can`t change it."
//    );
//    throws(
//        function() {
//            loader.itemTypes.module = {};
//        }, Error,
//        "Trying to set loader.itemTypes.module. Throw exception, loader.itemTypes.module has defined properties, user can`t change it."
//    );
//    throws(
//        function() {
//            loader.itemTypes.template = {};
//        }, Error,
//        "Trying to set loader.itemTypes.template. Throw exception, loader.itemTypes.template has defined properties, user can`t change it."
//    );
//    throws(
//        function() {
//            loader.itemTypes.html = {};
//        }, Error,
//        "Trying to set loader.itemTypes.html. Throw exception, loader.itemTypes.html has defined properties, user can`t change it."
//    );
//    throws(
//        function() {
//            loader.itemTypes.css = {};
//        }, Error,
//        "Trying to set loader.itemTypes.css. Throw exception, loader.itemTypes.css has defined properties, user can`t change it."
//    );
//    throws(
//        function() {
//            loader.itemTypes.javascript = {};
//        }, Error,
//        "Trying to set loader.itemTypes.javascript. Throw exception, loader.itemTypes.javascript has defined properties, user can`t change it."
//    );
//    var expectedModuleItemType = "module";
//    equal(loader.itemTypes.module, expectedModuleItemType, "Loader.itemTypes.module returns correctly: " + loader.itemTypes.module);
//    var expectedTemplateItemType = "template";
//    equal(loader.itemTypes.template, expectedTemplateItemType, "Loader.itemTypes.template returns correctly: " + loader.itemTypes.template);
//    var expectedHTMLItemType = "html";
//    equal(loader.itemTypes.html, expectedHTMLItemType, "Loader.itemTypes.html returns correctly: " + loader.itemTypes.html);
//    var expectedCSSItemType = "css";
//    equal(loader.itemTypes.css, expectedCSSItemType, "Loader.itemTypes.css returns correctly: " + loader.itemTypes.css);
//    var expectedJSItemType = "javascript";
//    equal(loader.itemTypes.javascript, expectedJSItemType, "Loader.itemTypes.javascript returns correctly: " + loader.itemTypes.javascript);
//});
//
//asyncTest("load (itemName, className, callback, loader.itemTypes.module)", function() {
////    expect(32);
//    var path = "modules_forTests";
//    var loader = new Modules.Loader(path);
//    var moduleName = "test";
//    var className = "loadModuleTest";
//    var modulePath = path + "/" + moduleName + "/" + moduleName;
//    document.addEventListener("module_" + moduleName + "_loaded", whenModuleLoadedWithEvent, true);
//    function whenModuleLoadedWithEvent(event) {
//        if (event.detail.itemInfo.className == className) {
//            checkModuleLoaded(moduleName, modulePath, "event assert");
//        }
//    }
//    function whenModuleLoadedWithCallback() {
//        checkModuleLoaded(moduleName, modulePath, className, "callback assert");
//        start();
//    }
//    loader.load(moduleName, className, whenModuleLoadedWithCallback);
//
//    function checkModuleLoaded(moduleName, modulePath, className, comment) {
//        //CSS loaded check
//        var modulesCSSprefix = "modulesjs_css_";
//        var cssLoaded = document.getElementsByClassName(modulesCSSprefix + moduleName)[0];
//        var loadedCSSHrefWithHost = cssLoaded.href;
//        var actualLoadedCSSHref = loadedCSSHrefWithHost.replace(window.location.host + "/", "").replace("http://", "").replace("https://","");
//        var expectedCSSHref = modulePath + ".css";
//        equal(actualLoadedCSSHref, expectedCSSHref, "CSS Href loaded correctly (" + comment + "): " + actualLoadedCSSHref);
//        var actualLoadedCSSClassName = cssLoaded.className;
//        var expectedCSSClassName = modulesCSSprefix + moduleName;
//        equal(actualLoadedCSSClassName, expectedCSSClassName, "CSS ClassName loaded correctly (" + comment + "): " + actualLoadedCSSClassName);
//        var actualLoadedCSSType = cssLoaded.type;
//        var expectedCSSType = "text/css";
//        equal(actualLoadedCSSType, expectedCSSType, "CSS Type loaded correctly (" + comment + "): " + actualLoadedCSSType);
//        var actualLoadedCSSStylesheet = cssLoaded.rel;
//        var expectedCSSStylesheet = "stylesheet";
//        equal(actualLoadedCSSStylesheet, expectedCSSStylesheet, "CSS Rel loaded correctly (" + comment + "): " + actualLoadedCSSStylesheet);
//        //End CSS Loaded check
//
//        //Javascript loaded check
//        var modulesJsPrefix = "modulesjs_js_";
//
//        var jsLoaded = document.getElementsByClassName(modulesJsPrefix + moduleName)[0];
//        var loadedJsSrcWithHost = jsLoaded.src;
//        var actualLoadedJsSrc = loadedJsSrcWithHost.replace(window.location.host + "/", "").replace("http://", "").replace("https://","");
//        var expectedJsSrc = modulePath + ".js";
//        equal(actualLoadedJsSrc, expectedJsSrc, "JavaScript src loaded correctly (" + comment + "): " + actualLoadedJsSrc);
//        var actualLoadedJsClassName = jsLoaded.className;
//        var expectedJsClassName = modulesJsPrefix + moduleName;
//        equal(expectedJsClassName, actualLoadedJsClassName, "JavaScript className loaded correctly ("
//            + comment + "): " + actualLoadedJsClassName);
//        var actualLoadedJsType = jsLoaded.type;
//        var expectedJsType = "text/javascript";
//        equal(expectedJsType, actualLoadedJsType, "JavaScript type loaded correctly (" + comment + "): " + actualLoadedJsType);
//        var actualLoadedJsAsync = jsLoaded.async;
//        var expectedJsAsync = true;
//        equal(expectedJsAsync, actualLoadedJsAsync, "JavaScript async state loaded correctly (" + comment + "): " + actualLoadedJsType);
//        //End Javascript loaded check
//
//        //HTML loaded check
//        var dom = new Modules.DOM();
//        var htmlsLoaded = document.getElementsByClassName(moduleName);
//        var htmlsLoadedLength = htmlsLoaded.length;
//        var expectedHtmlClassName = moduleName;
//        var expectedHtmlType = "module";
//        var expectedRootClassName = className;
//        for (var i = 0; i < htmlsLoadedLength; i++) {
//            var itemIDAttribute = htmlsLoaded[i].parentNode.getAttribute("data-" + "modulesjs_item_id");
//            var itemTypeAttribute = htmlsLoaded[i].parentNode.getAttribute("data-" + "modulesjs_item_type");
//            ok(itemIDAttribute != undefined, "Html loaded correctly, modulesjs_item_id defined correctly (" + comment + "): " + itemIDAttribute);
//            ok(itemTypeAttribute != undefined, "Html loaded correctly, modulesjs_item_type defined correctly (" + comment + "): " + itemTypeAttribute);
//            equal(expectedHtmlClassName, htmlsLoaded[i].className,  "Html loaded correctly, className is found in document (" + comment + "): " + htmlsLoaded[i].className
//                + "; modulesjs_moduleID: " + itemIDAttribute);
//        }
//        //End HTML loaded check
//    }
//});
//asyncTest("load (itemName, className, callback)", function() {
////    expect(32);
//    var path = "modules_forTests";
//    var loader = new Modules.Loader(path);
//    var moduleName = "test";
//    var className = "loadNullModuleTest";
//    var modulePath = path + "/" + moduleName + "/" + moduleName;
//    document.addEventListener("module_" + moduleName + "_loaded", whenModuleLoadedWithEvent, true);
//    function whenModuleLoadedWithEvent(event) {
//        if (event.detail.itemInfo.className == className) {
//            checkModuleLoaded(moduleName, modulePath, "event assert");
//        }
//    }
//    function whenModuleLoadedWithCallback() {
//        checkModuleLoaded(moduleName, modulePath, className, "callback assert");
//        start();
//    }
//    loader.load(moduleName, className, whenModuleLoadedWithCallback);
//
//    function checkModuleLoaded(moduleName, modulePath, className, comment) {
//        //CSS loaded check
//        var modulesCSSprefix = "modulesjs_css_";
//        var cssLoaded = document.getElementsByClassName(modulesCSSprefix + moduleName)[0];
//        var loadedCSSHrefWithHost = cssLoaded.href;
//        var actualLoadedCSSHref = loadedCSSHrefWithHost.replace(window.location.host + "/", "").replace("http://", "").replace("https://","");
//        var expectedCSSHref = modulePath + ".css";
//        equal(actualLoadedCSSHref, expectedCSSHref, "CSS Href loaded correctly (" + comment + "): " + actualLoadedCSSHref);
//        var actualLoadedCSSClassName = cssLoaded.className;
//        var expectedCSSClassName = modulesCSSprefix + moduleName;
//        equal(actualLoadedCSSClassName, expectedCSSClassName, "CSS ClassName loaded correctly (" + comment + "): " + actualLoadedCSSClassName);
//        var actualLoadedCSSType = cssLoaded.type;
//        var expectedCSSType = "text/css";
//        equal(actualLoadedCSSType, expectedCSSType, "CSS Type loaded correctly (" + comment + "): " + actualLoadedCSSType);
//        var actualLoadedCSSStylesheet = cssLoaded.rel;
//        var expectedCSSStylesheet = "stylesheet";
//        equal(actualLoadedCSSStylesheet, expectedCSSStylesheet, "CSS Rel loaded correctly (" + comment + "): " + actualLoadedCSSStylesheet);
//        //End CSS Loaded check
//
//        //Javascript loaded check
//        var modulesJsPrefix = "modulesjs_js_";
//
//        var jsLoaded = document.getElementsByClassName(modulesJsPrefix + moduleName)[0];
//        var loadedJsSrcWithHost = jsLoaded.src;
//        var actualLoadedJsSrc = loadedJsSrcWithHost.replace(window.location.host + "/", "").replace("http://", "").replace("https://","");
//        var expectedJsSrc = modulePath + ".js";
//        equal(actualLoadedJsSrc, expectedJsSrc, "JavaScript src loaded correctly (" + comment + "): " + actualLoadedJsSrc);
//        var actualLoadedJsClassName = jsLoaded.className;
//        var expectedJsClassName = modulesJsPrefix + moduleName;
//        equal(expectedJsClassName, actualLoadedJsClassName, "JavaScript className loaded correctly ("
//            + comment + "): " + actualLoadedJsClassName);
//        var actualLoadedJsType = jsLoaded.type;
//        var expectedJsType = "text/javascript";
//        equal(expectedJsType, actualLoadedJsType, "JavaScript type loaded correctly (" + comment + "): " + actualLoadedJsType);
//        var actualLoadedJsAsync = jsLoaded.async;
//        var expectedJsAsync = true;
//        equal(expectedJsAsync, actualLoadedJsAsync, "JavaScript async state loaded correctly (" + comment + "): " + actualLoadedJsType);
//        //End Javascript loaded check
//
//        //HTML loaded check
//        var dom = new Modules.DOM();
//        var htmlsLoaded = document.getElementsByClassName(moduleName);
//        var htmlsLoadedLength = htmlsLoaded.length;
//        var expectedHtmlClassName = moduleName;
//        var expectedHtmlType = "module";
//        var expectedRootClassName = className;
//        for (var i = 0; i < htmlsLoadedLength; i++) {
//            var itemIDAttribute = htmlsLoaded[i].parentNode.getAttribute("data-" + "modulesjs_item_id");
//            var itemTypeAttribute = htmlsLoaded[i].parentNode.getAttribute("data-" + "modulesjs_item_type");
//            ok(itemIDAttribute != undefined, "Html loaded correctly, modulesjs_item_id defined correctly (" + comment + "): " + itemIDAttribute);
//            ok(itemTypeAttribute != undefined, "Html loaded correctly, modulesjs_item_type defined correctly (" + comment + "): " + itemTypeAttribute);
//            equal(expectedHtmlClassName, htmlsLoaded[i].className,  "Html loaded correctly, className is found in document (" + comment + "): " + htmlsLoaded[i].className
//                + "; modulesjs_moduleID: " + itemIDAttribute);
//        }
//        //End HTML loaded check
//    }
//});
//asyncTest("load (itemType, className, callback, loader.itemTypes.template, dataSource)", function() {
//    expect(4);
//    var path = "templates_forTests";
//    var loader = new Modules.Loader(path);
//    var templateName = "fileInfo";
//    var className = "loadTemplateTest";
//    var templatePath = path + "/" + templateName + "/" + templateName;
//    var dataSource = {fileName: "one", fileNameRaw: "oneRaw", lastModifiedDate: "02.02.02", isSelected: "false"};
//    document.addEventListener("template_" + templateName + "_loaded", whenTemplateLoadedWithEvent, true);
//    function whenTemplateLoadedWithEvent(event) {
//        if (event.detail.itemInfo.className == className) {
//            checkTemplateLoaded(templateName, templatePath, "event assert");
//        }
//    }
//    function whenTemplateLoadedWithCallback() {
//        checkTemplateLoaded(templateName, templatePath, "callback assert");
//        start();
//    }
//    loader.load(templateName, className, whenTemplateLoadedWithCallback, loader.itemTypes.template, dataSource);
//
//    function checkTemplateLoaded(templateName, templatePath, comment) {
//        //CSS loaded check
//        var modulesCSSprefix = "modulesjs_css_";
//        var cssLoaded = document.getElementsByClassName(modulesCSSprefix + templateName)[0];
//        var loadedCSSHrefWithHost = cssLoaded.href;
//        var actualLoadedCSSHref = loadedCSSHrefWithHost.replace(window.location.host + "/", "").replace("http://", "").replace("https://","");
//        var expectedCSSHref = templatePath + ".css";
//        equal(actualLoadedCSSHref, expectedCSSHref, "CSS Href loaded correctly (" + comment + "): " + actualLoadedCSSHref);
//        var actualLoadedCSSClassName = cssLoaded.className;
//        var expectedCSSClassName = modulesCSSprefix + templateName;
//        equal(actualLoadedCSSClassName, expectedCSSClassName, "CSS ClassName loaded correctly (" + comment + "): " + actualLoadedCSSClassName);
//
////        var actualLoadedCSSType = cssLoaded.type;
////        var expectedCSSType = "text/css";
////        equal(actualLoadedCSSType, expectedCSSType, "CSS Type loaded correctly (" + comment + "): " + actualLoadedCSSType);
////        var actualLoadedCSSStylesheet = cssLoaded.rel;
////        var expectedCSSStylesheet = "stylesheet";
////        equal(actualLoadedCSSStylesheet, expectedCSSStylesheet, "CSS Rel loaded correctly (" + comment + "): " + actualLoadedCSSStylesheet);
////        //End CSS Loaded check
////
////        //Javascript loaded check
////        var modulesJsPrefix = "modulesjs_js_";
////
////        var jsLoaded = document.getElementsByClassName(modulesJsPrefix + templateName)[0];
////        var loadedJsSrcWithHost = jsLoaded.src;
////        var actualLoadedJsSrc = loadedJsSrcWithHost.replace(window.location.host + "/", "").replace("http://", "").replace("https://","");
////        var expectedJsSrc = templatePath + ".js";
////        equal(actualLoadedJsSrc, expectedJsSrc, "JavaScript src loaded correctly (" + comment + "): " + actualLoadedJsSrc);
////        var actualLoadedJsClassName = jsLoaded.className;
////        var expectedJsClassName = modulesJsPrefix + templateName;
////        equal(expectedJsClassName, actualLoadedJsClassName, "JavaScript className loaded correctly ("
////            + comment + "): " + actualLoadedJsClassName);
////        var actualLoadedJsType = jsLoaded.type;
////        var expectedJsType = "text/javascript";
////        equal(expectedJsType, actualLoadedJsType, "JavaScript type loaded correctly (" + comment + "): " + actualLoadedJsType);
////        var actualLoadedJsAsync = jsLoaded.async;
////        var expectedJsAsync = true;
////        equal(expectedJsAsync, actualLoadedJsAsync, "JavaScript async state loaded correctly (" + comment + "): " + actualLoadedJsType);
////        //End Javascript loaded check
////
////        //HTML loaded check
////        var dom = new Modules.DOM();
////        var htmlsLoaded = document.getElementsByClassName(templateName);
////        var htmlsLoadedLength = htmlsLoaded.length;
////        var expectedHtmlClassName = templateName;
////        var expectedHtmlType = "module";
////        var expectedRootClassName = className;
////        for (var i = 0; i < htmlsLoadedLength; i++) {
////            var itemIDAttribute = htmlsLoaded[i].parentNode.getAttribute("data-" + "modulesjs_item_id");
////            var itemTypeAttribute = htmlsLoaded[i].parentNode.getAttribute("data-" + "modulesjs_item_type");
////            ok(itemIDAttribute != undefined, "Html loaded correctly, modulesjs_item_id defined correctly (" + comment + "): " + itemIDAttribute);
////            ok(itemTypeAttribute != undefined, "Html loaded correctly, modulesjs_item_type defined correctly (" + comment + "): " + itemTypeAttribute);
////            equal(expectedHtmlClassName, htmlsLoaded[i].className,  "Html loaded correctly, className is found in document (" + comment + "): " + htmlsLoaded[i].className
////                + "; modulesjs_moduleID: " + itemIDAttribute);
////            equal(expectedRootClassName, htmlsLoaded[i].parentNode.className, "Html loaded in correct root class (" + comment+ "): " + htmlsLoaded[i].parentNode.className
////                + "; modulesjs_moduleID: " + itemIDAttribute);
////        }
////        End HTML loaded check
//    }
//});
////TODO: getElementByClassName with elementType method in modulesOld.js. More simple getElementByClassName.
////TODO: when we get Elements by ClassName, check elementType in tests.
//module("Modules.Events", {
//    setup: function() {
////        var divloadTest = document.createElement('div');
////        divloadTest.className = "loadTest";
////        document.getElementsByTagName("body")[0].appendChild(divloadTest);
////        var divloadTest = document.createElement('div');
////        divloadTest.className = "loadTest";
////        document.getElementsByTagName("body")[0].appendChild(divloadTest);
////        var divloadHTMLTest = document.createElement('div');
////        divloadHTMLTest.className = "loadHTMLTest";
////        document.getElementsByTagName("body")[0].appendChild(divloadHTMLTest);
////        var divloadTemplateTest = document.createElement('div');
////        divloadTemplateTest.className = "loadTemplateTest";
////        document.getElementsByTagName("body")[0].appendChild(divloadTemplateTest);
//    },
//    teardown: function() {
////        var divloadTest = document.getElementsByClassName("loadTest")[0];
////        document.getElementsByTagName("body")[0].removeChild(divloadTest);
////        var divloadTest = document.getElementsByClassName("loadTest")[0];
////        document.getElementsByTagName("body")[0].removeChild(divloadTest);
////        var divloadHTMLTest = document.getElementsByClassName("loadHTMLTest")[0];
////        document.getElementsByTagName("body")[0].removeChild(divloadHTMLTest);
////        var divloadTemplateTest = document.getElementsByClassName("loadTemplateTest")[0];
////        document.getElementsByTagName("body")[0].removeChild(divloadTemplateTest);
//    }
//});
//test("subscribeMessage&sendMessage&unsubscribeMessage", function() {
//    expect(5);
//    var events = new Modules.Events();
//    var messageID = "testMessageID";
//    var dataObject = {item1: "info1"};
//    var sourceID = "sourceID";
//    var destinationID = "destinationID";
//    events.subscribeMessage(messageID, onMessageWithMessageIDReceived);
//    function onMessageWithMessageIDReceived(e) {
//        var sourceID = e.detail.postAdress.sourceID;
//        var destinationID = e.detail.postAdress.destinationID;
//        equal(dataObject.item1, e.detail.dataObject.item1, "Message received with messageID only," +
//            " data received correctly. sourceid=" + sourceID
//            + "; destinationID=" + destinationID + ";");
//    }
//    events.subscribeMessage(messageID, onMessageWithMessageIDSourceIDReceived, sourceID);
//    function onMessageWithMessageIDSourceIDReceived(e) {
//        var sourceID = e.detail.postAdress.sourceID;
//        var destinationID = e.detail.postAdress.destinationID;
//        equal(dataObject.item1, e.detail.dataObject.item1, "Message received with messageID and sourceID," +
//            " data received correctly. sourceid=" + sourceID
//            + "; destinationID=" + destinationID + ";");
//    }
//    events.subscribeMessage(messageID, onMessageWithMessageIDDestinationIDReceived, null, destinationID);
//    function onMessageWithMessageIDDestinationIDReceived(e) {
//        var sourceID = e.detail.postAdress.sourceID;
//        var destinationID = e.detail.postAdress.destinationID;
//        equal(dataObject.item1, e.detail.dataObject.item1, "Message received with messageID and destinationID," +
//            " data received correctly. sourceid=" + sourceID
//            + "; destinationID=" + destinationID + ";");
//    }
//    events.subscribeMessage(messageID, onMessageWithMessageIDSourceIDDestinationIDReceived, sourceID, destinationID);
//    function onMessageWithMessageIDSourceIDDestinationIDReceived(e) {
//        var sourceID = e.detail.postAdress.sourceID;
//        var destinationID = e.detail.postAdress.destinationID;
//        equal(dataObject.item1, e.detail.dataObject.item1, "Message received with messageID, sourceID and destinationID," +
//            " data received correctly. sourceid=" + sourceID
//            + "; destinationID=" + destinationID + ";");
//    }
//    events.sendMessage(messageID, dataObject);
//    events.sendMessage(messageID, dataObject, sourceID);
//    events.sendMessage(messageID, dataObject, null, destinationID);
//    events.sendMessage(messageID, dataObject, sourceID, null);
//    events.sendMessage(messageID, dataObject, sourceID, destinationID);
//    //must not added callback, because unsubscribed
//    events.unsubscribeMessage(messageID, onMessageWithMessageIDReceived);
//    events.sendMessage(messageID, dataObject);
//    events.unsubscribeMessage(messageID, onMessageWithMessageIDSourceIDReceived, sourceID);
//    events.sendMessage(messageID, dataObject, sourceID);
//    events.unsubscribeMessage(messageID, onMessageWithMessageIDDestinationIDReceived, null, destinationID);
//    events.sendMessage(messageID, dataObject, null, destinationID);
//    events.unsubscribeMessage(messageID, onMessageWithMessageIDSourceIDDestinationIDReceived, sourceID, destinationID);
//    events.sendMessage(messageID, dataObject, sourceID, destinationID);
//
//});
////asyncTest("loadHTML", function() {
////    expect(1);
////    var path = "files_forTests";
////    var loader = new Modules.Loader(path);
////    var fileName = "test";
////    var filePath = path + "/" + fileName;
////    var containerClassName = "loadHTMLTest";
////    loader.loadHTML(fileName, containerClassName, function(){
////        checkHTMLLoaded(fileName, filePath, "callback assert");
////        start();
////    });
////    function checkHTMLLoaded(fileName, filePath, comment) {
////        var htmlsLoaded = document.getElementsByClassName(fileName);
////        var htmlsLoadedLength = htmlsLoaded.length;
////        var expectedHtmlClassName = fileName;
////        var expectedHtmlType = "file";
////        var expectedRootClassName = containerClassName;
////        for (var i = 0; i < htmlsLoadedLength; i++) {
////            var moduleIDAttribute = htmlsLoaded[i].parentNode.getAttribute("data-" + "modulesjs_moduleid");
////            ok(moduleIDAttribute != undefined, "Html loaded correctly, modulesjs_moduleID defined correctly (" + comment + "): " + moduleIDAttribute);
////            equal(expectedHtmlClassName, htmlsLoaded[i].className,  "Html loaded correctly, className is found in document (" + comment + "): " + htmlsLoaded[i].className
////                + "; modulesjs_moduleID: " + moduleIDAttribute);
////            equal(expectedRootClassName, htmlsLoaded[i].parentNode.className, "Html loaded in correct root class (" + comment+ "): " + htmlsLoaded[i].parentNode.className
////                + "; modulesjs_moduleID: " + moduleIDAttribute);
////        }
////    }
////});
//module("Modules.DOM", {
//    setup: function() {
////        var divloadTest = document.createElement('div');
////        divloadTest.className = "loadTest";
////        document.getElementsByTagName("body")[0].appendChild(divloadTest);
////        var divloadTest = document.createElement('div');
////        divloadTest.className = "loadTest";
////        document.getElementsByTagName("body")[0].appendChild(divloadTest);
////        var divloadHTMLTest = document.createElement('div');
////        divloadHTMLTest.className = "loadHTMLTest";
////        document.getElementsByTagName("body")[0].appendChild(divloadHTMLTest);
////        var divloadTemplateTest = document.createElement('div');
////        divloadTemplateTest.className = "loadTemplateTest";
////        document.getElementsByTagName("body")[0].appendChild(divloadTemplateTest);
//    },
//    teardown: function() {
////        var divloadTest = document.getElementsByClassName("loadTest")[0];
////        document.getElementsByTagName("body")[0].removeChild(divloadTest);
////        var divloadTest = document.getElementsByClassName("loadTest")[0];
////        document.getElementsByTagName("body")[0].removeChild(divloadTest);
////        var divloadHTMLTest = document.getElementsByClassName("loadHTMLTest")[0];
////        document.getElementsByTagName("body")[0].removeChild(divloadHTMLTest);
////        var divloadTemplateTest = document.getElementsByClassName("loadTemplateTest")[0];
////        document.getElementsByTagName("body")[0].removeChild(divloadTemplateTest);
//    }
//});
////test("getRootTarget", function() {
////    var dom = new Modules.DOM();
////
////});