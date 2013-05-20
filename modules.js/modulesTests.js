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
    expect(28);
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
        var expectedRootClassName = className;
        for (var i = 0; i < htmlsLoadedLength; i++) {
            ok(htmlsLoaded[i].parentNode.dataset.modulesjs_moduleID != undefined, "Html loaded correctly, modulesjs_moduleID defined correctly (" + comment + "): " + htmlsLoaded[i].parentNode.dataset.modulesjs_moduleID);
            equal(expectedHtmlClassName, htmlsLoaded[i].className,  "Html loaded correctly, className is found in document (" + comment + "): " + htmlsLoaded[i].className
                + "; modulesjs_moduleID: " + htmlsLoaded[i].parentNode.dataset.modulesjs_moduleID);
            equal(expectedRootClassName, htmlsLoaded[i].parentNode.className, "Html loaded in correct root class (" + comment+ "): " + htmlsLoaded[i].parentNode.className
                + "; modulesjs_moduleID: " + htmlsLoaded[i].parentNode.dataset.modulesjs_moduleID);
        }
        //End HTML loaded check
    }
});
//asyncTest("loadHTML", function() {
//    expect(1);
//    var path = "modules_forTests";
//    var loader = new Modules.Loader(path);
//    var fileName = "test";
//    var filePath = path + "/" + fileName;
//    loader.loadHTML(fileName, "loadHTMLTest", function(){
//        checkHTMLLoaded(fileName, modulePath, "callback assert");
//        start();
//    });
//});

//    loader.path = "custom error path";
//    ok(loader.path == path, "Loader.path is set correctly after rewrite without object instantiation." +
//        " Path is readonly property.");
//    loader.load("test", "content", checkModuleLoading);
//    function checkModuleLoading() {
//        var modulesCSSprefix = "modulesjs-css-";
//        var cssLoaded = document.getElementsByClassName(modulesCSSprefix + name)[0];
//        alert(cssLoaded);
//    }
//    var _path = "modules";
//    var name = "test";
//    modules.load(_path, name, "header");
//    var css = document.getElementsByClassName("modulesjs-css-" + name)[0];
//    ok(css.href != undefined, "css loaded");
//    var html = document.getElementsByClassName(name)[0];
//    ok(html.textContent == 'Hello', "html loaded");
//    var js = document.getElementsByClassName("modulesjs-js-" + name)[0];
//    ok(js != undefined, "js loaded");
//    //load module in different place
//    modules.load(_path, name, "footer");
//    var cssCount = document.getElementsByClassName("modulesjs-css-" + name);
//    ok(cssCount.length == 1, "module`s css loaded only once");
//    var jsCount = document.getElementsByClassName("modulesjs-js-" + name);
//    ok(jsCount.length == 1, "module`s js loaded only once");
//    var html = document.getElementsByClassName(name)[1];
//    ok(html.textContent == 'Hello', "html loaded in footer too");
//});
//test("Modules.Events", function() {
//
//});
//test("Modules.Server", function() {
//
//});