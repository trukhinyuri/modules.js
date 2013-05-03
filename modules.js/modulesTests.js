"use strict";
test("Modules.Loader.path", function() {
    var path = "modules_forTests";
    var loader = new Modules.Loader(path);
    ok(loader.path == path, "Loader.path is set correctly");
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