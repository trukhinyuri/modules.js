"use strict";
module("Modules.Loader");
test("path", function() {
    expect(1);
    var path = "modules_forTests";
    var loader = new Modules.Loader(path);
    equal(loader.path, path, "Loader.path is set correctly: " + path);
});
test("load", function() {
    expect(5);
    var path = "modules_forTests";
    var loader = new Modules.Loader(path);
    var moduleName = "test";
    var modulePath = path + "/" + moduleName + "/" + moduleName;
    stop();
    loader.load(moduleName,"loadTest", function(){
        checkModuleLoaded(moduleName, modulePath, "callback assert");
        start();
    });

    function checkModuleLoaded(moduleName, modulePath, comment) {
        //CSS loaded check
        var modulesCSSprefix = "modulesjs-css-";
        var cssLoaded = document.getElementsByClassName(modulesCSSprefix + moduleName)[0];
        var loadedCSSHrefWithHost = cssLoaded.href;
        var actualLoadedCSSHref = loadedCSSHrefWithHost.replace(window.location.host + "/", "").replace("http://", "").replace("https://","");
        var expectedCSSHref = modulePath + ".css";
        equal(actualLoadedCSSHref, expectedCSSHref, "CSS Href loaded correctly " + comment + ": " + actualLoadedCSSHref);
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
        var modulesJsPrefix = "modulesjs-js-";

        var jsLoaded = document.getElementsByClassName(modulesJsPrefix + moduleName)[0];
        var loadedJsSrcWithHost = jsLoaded.src;
        var actualLoadedJsSrc = loadedJsSrcWithHost.replace(window.location.host + "/", "").replace("http://", "").replace("https://","");
        var expectedJsSrc = modulePath + ".js";
        equal(actualLoadedJsSrc, expectedJsSrc, "JavaScript src loaded correctly " + comment + ": " + actualLoadedJsSrc);
//        //End Javascript loaded check
    }
});

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