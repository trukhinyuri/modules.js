"use strict";
module("Modules.Loader");
test("path", function() {
    expect(4);
    var expectedPath = "modules_forTests";
    var loader = new Modules.Loader(expectedPath);
    equal(loader.path, expectedPath, "Loader.path is set correctly: " + loader.path);
    throws(
        function() {
           loader.path = "unexpectedPath";
        }, Error,
        "Trying to set loader.path without constructor. Throw exception, loader.path isn`t changed: " + loader.path
    );
    var loaderWithoutPath = new Modules.Loader();
    var expectedAutoPath = "";
    equal(loaderWithoutPath.path, expectedAutoPath, "Loader.path is set automatically on current directory, " +
        "if path isn`t specified in constructor. " + loaderWithoutPath.path);
    var loaderWithSlash = new Modules.Loader("modules_forTests/");
    equal(expectedPath, loaderWithSlash.path, "Loader.path with slash in end of path. Slash removed: " + loaderWithSlash.path);
});
asyncTest("load", function() {
    expect(32);
    var path = "modules_forTests";
    var loader = new Modules.Loader(path);
    var moduleName = "test";
    var className = "loadTest";
    var modulePath = path + "/" + moduleName + "/" + moduleName;
    document.addEventListener("module_" + moduleName + "_loaded", whenModuleLoadedWithEvent, true);
    function whenModuleLoadedWithEvent() {
        checkModuleLoaded(moduleName, modulePath, "event assert");
    }
    function whenModuleLoadedWithCallback() {
        checkModuleLoaded(moduleName, modulePath, "callback assert");
        start();
    }
    loader.load(moduleName,className, whenModuleLoadedWithCallback);

    function checkModuleLoaded(moduleName, modulePath, comment) {
        //CSS loaded check
        var modulesCSSprefix = "modulesjs_css_";
        var cssLoaded = document.getElementsByClassName(modulesCSSprefix + moduleName)[0];
        var loadedCSSHrefWithHost = cssLoaded.href;
        var actualLoadedCSSHref = loadedCSSHrefWithHost.replace(window.location.host + "/", "").replace("http://", "").replace("https://","");
        var expectedCSSHref = modulePath + ".css";
        equal(actualLoadedCSSHref, expectedCSSHref, "CSS Href loaded correctly (" + comment + "): " + actualLoadedCSSHref);
        var actualLoadedCSSClassName = cssLoaded.className;
        var expectedCSSClassName = modulesCSSprefix + moduleName;
        equal(actualLoadedCSSClassName, expectedCSSClassName, "CSS ClassName loaded correctly (" + comment + "): " + actualLoadedCSSClassName);
        var actualLoadedCSSType = cssLoaded.type;
        var expectedCSSType = "text/css";
        equal(actualLoadedCSSType, expectedCSSType, "CSS Type loaded correctly (" + comment + "): " + actualLoadedCSSType);
        var actualLoadedCSSStylesheet = cssLoaded.rel;
        var expectedCSSStylesheet = "stylesheet";
        equal(actualLoadedCSSStylesheet, expectedCSSStylesheet, "CSS Rel loaded correctly (" + comment + "): " + actualLoadedCSSStylesheet);
        //End CSS Loaded check

        //Javascript loaded check
        var modulesJsPrefix = "modulesjs_js_";

        var jsLoaded = document.getElementsByClassName(modulesJsPrefix + moduleName)[0];
        var loadedJsSrcWithHost = jsLoaded.src;
        var actualLoadedJsSrc = loadedJsSrcWithHost.replace(window.location.host + "/", "").replace("http://", "").replace("https://","");
        var expectedJsSrc = modulePath + ".js";
        equal(actualLoadedJsSrc, expectedJsSrc, "JavaScript src loaded correctly (" + comment + "): " + actualLoadedJsSrc);
        var actualLoadedJsClassName = jsLoaded.className;
        var expectedJsClassName = modulesJsPrefix + moduleName;
        equal(expectedJsClassName, actualLoadedJsClassName, "JavaScript className loaded correctly ("
            + comment + "): " + actualLoadedJsClassName);
        var actualLoadedJsType = jsLoaded.type;
        var expectedJsType = "text/javascript";
        equal(expectedJsType, actualLoadedJsType, "JavaScript type loaded correctly (" + comment + "): " + actualLoadedJsType);
        var actualLoadedJsAsync = jsLoaded.async;
        var expectedJsAsync = true;
        equal(expectedJsAsync, actualLoadedJsAsync, "JavaScript async state loaded correctly (" + comment + "): " + actualLoadedJsType);
        //End Javascript loaded check

        //HTML loaded check
        var htmlsLoaded = document.getElementsByClassName(moduleName);
        var htmlsLoadedLength = htmlsLoaded.length;
        var expectedHtmlClassName = moduleName;
        var expectedHtmlType = "module";
        var expectedRootClassName = className;
        for (var i = 0; i < htmlsLoadedLength; i++) {
            var itemIDAttribute = htmlsLoaded[i].parentNode.getAttribute("data-" + "modulesjs_item_id");
            var itemTypeAttribute = htmlsLoaded[i].parentNode.getAttribute("data-" + "modulesjs_item_type");
            ok(itemIDAttribute != undefined, "Html loaded correctly, modulesjs_item_id defined correctly (" + comment + "): " + itemIDAttribute);
            ok(itemTypeAttribute != undefined, "Html loaded correctly, modulesjs_item_type defined correctly (" + comment + "): " + itemTypeAttribute);
            equal(expectedHtmlClassName, htmlsLoaded[i].className,  "Html loaded correctly, className is found in document (" + comment + "): " + htmlsLoaded[i].className
                + "; modulesjs_moduleID: " + itemIDAttribute);
            equal(expectedRootClassName, htmlsLoaded[i].parentNode.className, "Html loaded in correct root class (" + comment+ "): " + htmlsLoaded[i].parentNode.className
                + "; modulesjs_moduleID: " + itemIDAttribute);
        }
        //End HTML loaded check
    }
});
//asyncTest("loadHTML", function() {
//    expect(1);
//    var path = "files_forTests";
//    var loader = new Modules.Loader(path);
//    var fileName = "test";
//    var filePath = path + "/" + fileName;
//    var containerClassName = "loadHTMLTest";
//    loader.loadHTML(fileName, containerClassName, function(){
//        checkHTMLLoaded(fileName, filePath, "callback assert");
//        start();
//    });
//    function checkHTMLLoaded(fileName, filePath, comment) {
//        var htmlsLoaded = document.getElementsByClassName(fileName);
//        var htmlsLoadedLength = htmlsLoaded.length;
//        var expectedHtmlClassName = fileName;
//        var expectedHtmlType = "file";
//        var expectedRootClassName = containerClassName;
//        for (var i = 0; i < htmlsLoadedLength; i++) {
//            var moduleIDAttribute = htmlsLoaded[i].parentNode.getAttribute("data-" + "modulesjs_moduleid");
//            ok(moduleIDAttribute != undefined, "Html loaded correctly, modulesjs_moduleID defined correctly (" + comment + "): " + moduleIDAttribute);
//            equal(expectedHtmlClassName, htmlsLoaded[i].className,  "Html loaded correctly, className is found in document (" + comment + "): " + htmlsLoaded[i].className
//                + "; modulesjs_moduleID: " + moduleIDAttribute);
//            equal(expectedRootClassName, htmlsLoaded[i].parentNode.className, "Html loaded in correct root class (" + comment+ "): " + htmlsLoaded[i].parentNode.className
//                + "; modulesjs_moduleID: " + moduleIDAttribute);
//        }
//    }
//});