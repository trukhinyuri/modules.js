"use strict";
test("Modules.Loader.path", function() {
    var path = "modules_forTests";
    var loader = new Modules.Loader(path);
    equal(loader.path, path, "Loader.path is set correctly: " + path);
});
test("Modules.Loader.load", function() {
    var path = "modules_forTests";
    var loader = new Modules.Loader(path);
    var moduleName = "test";
    var modulePath = path + "/" + moduleName + "/" + moduleName;
    stop();
    loader.load(moduleName,"loadTest", function(){
        var modulesCSSprefix = "modulesjs-css-";
        var cssLoaded = document.getElementsByClassName(modulesCSSprefix + moduleName);
        var loadedCSSHrefWithHost = cssLoaded[0].href;
        var actualLoadedCSSHref = loadedCSSHrefWithHost.replace(window.location.host + "/", "").replace("http://", "").replace("https://","");
        var expectedCSSHref = modulePath + ".css";
        equal(actualLoadedCSSHref, expectedCSSHref, "CSS Href loaded correctly (callback assert): " + actualLoadedCSSHref);
        var actualLoadedCSSClassName = cssLoaded[0].className;
        var expectedCSSClassName = modulesCSSprefix + moduleName;
        equal(actualLoadedCSSClassName, expectedCSSClassName, "CSS ClassName loaded correctly (callback assert): " + actualLoadedCSSClassName);
        var actualLoadedCSSType = cssLoaded[0].type;
        var expectedCSSType = "text/css";
        equal(actualLoadedCSSType, expectedCSSType, "CSS Type loaded correctly (callback assert): " + actualLoadedCSSType);
//    css.type = "text/css";
//    css.rel = "stylesheet";
        start();
    });
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