//version 1.0-snapshot
// Copyright (C) 2012–2013 Yuri V. Trukhin
"use strict";
var Modules = null;
(function (Modules) {
    Modules.Loader = (function () {
        function Loader(path) {
            if (path != undefined) {
                if (path[path.length-1] === "/") {
                    path = path.substring(0, path.length - 1);
                }
                this._path = path;
            }
            else {
                this._path = "";
            }
        }
        Loader.prototype = {
            get path () {
                return this._path;
            }
        }

        function loadCSS(path, name, callback) {
            var modulesCSSprefix = "modulesjs_css_";
            var cssLoaded = document.getElementsByClassName(modulesCSSprefix + name)[0];
            if (!cssLoaded) {
                var css = document.createElement('link');
                css.href = path + ".css";
                css.className = modulesCSSprefix + name;
                css.type = "text/css";
                css.rel = "stylesheet";
                document.getElementsByTagName("head")[0].appendChild(css);
                if (callback) {
                    callback();
                }
            }
        }
        function loadJS (path, name, callback) {
            var modulesJsPrefix = "modulesjs_js_";
            var jsLoaded = document.getElementsByClassName(modulesJsPrefix + name)[0];
            if (jsLoaded) {
                document.getElementsByTagName("head")[0].removeChild(jsLoaded);
            }
            var script = document.createElement('script');
            script.src = path + ".js";
            script.className = modulesJsPrefix + name;
            script.type = "text/javascript";
            script.async = true;
            document.getElementsByTagName("head")[0].appendChild(script);
            var done = false;
            script.onreadystatechange = script.onload = function () {
                var state = script.readyState;
                if (!done && (!state || state == "loaded" || state == "complete")) {
                    done = true;
                    if (callback) {
                        callback(name);
                    }
                }
            }
        }
        function renderHTML(responseText, className, callback) {
            var elementClasses = document.getElementsByClassName(className);
            var classesCount = elementClasses.length;
            for (var htmlModuleID = 0; htmlModuleID < classesCount; htmlModuleID++) {
                elementClasses[htmlModuleID].dataset.modulesjs_moduleID = htmlModuleID;
                elementClasses[htmlModuleID].innerHTML = responseText;
            }
            if (callback) {
                callback();
            }
        }
        function loadHTML(path, name, className, callback) {
            function loadedHandler(responseText, name) {
                renderHTML(responseText, className, callback);
            }
            loadHTMLInMemory(path, name, loadedHandler);
        }
        function loadHTMLInMemory(path, name, callback) {
            var xhrHtmlLoader = new XMLHttpRequest();
            xhrHtmlLoader.open("GET", path  + ".html", true);
            xhrHtmlLoader.onreadystatechange = function() {
                if (xhrHtmlLoader.readyState == 4 /* complete */) {
                    if (xhrHtmlLoader.status == 200 || xhrHtmlLoader.status == 304) {
                        if (callback) {
                            callback(xhrHtmlLoader.responseText, name);
                        }
                    }
                }
            };
            xhrHtmlLoader.send(null);
        }
        function buildFilePath(path, name) {
            var result = path + "/" + name;
            return result;
        }
        function buildTemplatePath(path, name) {
            var result = path + "/" + name + "/" + name;
            return result;
        }
        function replace$PlaceholdersInTemplate(responseText, name, simpleDataSource) {
            var keys = Object.keys(simpleDataSource);
            var placeholder, value;
            var result = responseText;
            for (var i = 0; i < keys.length; i++) {
                placeholder = keys[i];
                value = simpleDataSource[keys[i]];
                result = result.split('$' + placeholder + ';').join(value);
            }
            return result;
        }
        function addUUIDAttribute(responseText, itemNumber, name) {
            var dom = document.createElement('div');
            dom.innerHTML = responseText;
            var element = dom.getElementsByClassName('fileInfo')[0];
            element.setAttribute('uuid', itemNumber);
            return element.outerHTML;
        }
        function buildModulePath(path, name) {
            var result = path + "/" + name + "/" + name;
            return result;
        }
        Loader.prototype.load = function (moduleName, className, callback) {
            var path = this.path;
            setTimeout(function(){
                load(path, moduleName, className, callback);
            }, 0);
            function load (path, moduleName, className, callback) {
                var modulePath = buildModulePath(path, moduleName);
                loadCSS(modulePath, moduleName, function() {
                    loadHTML(modulePath, moduleName, className, function() {
                        loadJS(modulePath, moduleName, function() {
                            var event = document.createEvent("CustomEvent");
                            event.initCustomEvent("module_" + moduleName + "_loaded", true, true,
                                {"detail": {"moduleName" : moduleName,"_path": modulePath, "className": className}});
                            document.dispatchEvent(event);
                            if (callback) {
                                callback();
                            }
                        });
                    });
                });
            }
        };
//        Loader.prototype.unload = function() {
//
//        };
        Loader.prototype.loadHTML = function(fileName, className, callback) {
            loadAsync(this._path, fileName, className, callback);
            function loadAsync(path, fileName, className, callback) {
                setTimeout(function(){
                    loadSync(path, fileName, className, callback);
                }, 0);
            }
            function loadSync(path, fileName, className, callback) {
                var htmlPath = buildFilePath(path, fileName);
                loadHTML(htmlPath, fileName, className, function() {
                    document.dispatchEvent(new CustomEvent("html_" + fileName + "_loaded",
                        {"detail": {"fileName" : fileName, "htmlPath": htmlPath, "_path" : path, "className": className}}
                    ));
                    if (callback) {
                        callback();
                    }
                });
            }
        };
        Loader.prototype.loadJS = function(fileName, callback) {
            loadAsync(this._path, fileName, callback);
            function loadAsync(path, fileName, callback) {
                setTimeout(function(){
                    loadSync(path, fileName, callback);
                }, 0);
            }
            function loadSync(path, fileName,  callback) {
                var jsPath = buildFilePath(path, fileName);
                loadJS(jsPath, fileName, function() {
                    document.dispatchEvent(new CustomEvent("js_" + fileName + "_loaded",
                        {"detail": {"fileName" : fileName, "jsPath": jsPath, "_path" : path}}
                    ));
                    if (callback) {
                        callback();
                    }
                });
            }
        };
        Loader.prototype.loadCSS = function(fileName, callback) {
            loadAsync(this._path, fileName, callback);
            function loadAsync(path, fileName, callback) {
                setTimeout(function(){
                    loadSync(path, fileName, callback);
                }, 0);
            }
            function loadSync(path, fileName, callback) {
                var cssPath = buildFilePath(path, fileName);
                loadCSS(cssPath, fileName, function() {
                    document.dispatchEvent(new CustomEvent("css_" + fileName + "_loaded",
                        {"detail": {"fileName" : fileName, "cssPath": cssPath, "_path" : path}}
                    ));
                    if (callback) {
                        callback();
                    }
                });
            }
        };
        Loader.prototype.loadTemplate = function(templateName, className, dataSource, callback) {
            loadAsync(this._path, templateName, className, callback);
            function loadAsync(path, templateName, className, callback) {
                setTimeout(function(){
                    loadSync(path, templateName, className, callback);
                }, 0);
            }
            function loadSync(path, templateName, className, callback) {
                var templatePath = buildTemplatePath(path, templateName);
                function htmlLoadedHandler(responseText, name) {
                    var result = '';
                    var stepResult = '';
                    //plain object
                    if (dataSource.length == undefined) {
                        result = replace$PlaceholdersInTemplate(responseText, name, dataSource);
                        result = addUUIDAttribute(result, 0, templateName);
                    }
                    //list
                    else {
                        for (var i = 0; i < dataSource.length; i++) {
                            stepResult = replace$PlaceholdersInTemplate(responseText, name, dataSource[i]);
                            stepResult = addUUIDAttribute(stepResult, i, templateName);
                            result += stepResult;
                        }
                    }
                    renderHTML(result, templateName, className, function(){
                        loadJS(templatePath, templateName, function() {
                            document.dispatchEvent(new CustomEvent("template_" + templateName + "_loaded",
                                {"detail": {"templateName" : templateName, "_path": templatePath, "className": className}}
                            ));
                            if (callback) {
                                callback();
                            }
                        });
                    });
                }
                loadCSS(templatePath, templateName);
                loadHTMLInMemory(templatePath, templateName, htmlLoadedHandler);
            }
        };
        return Loader;
    })();
    Modules.Events = (function(){
        function addListenerImplementation(target, type, listener, useCapture) {
            target.addEventListener(type, listener, useCapture);
        }
        function removeListenerImplementation(target, type, listener, useCapture) {
            target.removeEventListener(type, listener, useCapture);
        }
        function Events() {}
        Events.prototype.addListener = function (target, type, listener) {
            addListenerImplementation(target, type, listener, true);
        };
        Events.prototype.removeListener = function (target, type, listener) {
            removeListenerImplementation(target, type, listener, true);
        };
        Events.prototype.addStartupListener = function (listener) {
            addListenerImplementation(document, "DOMContentLoaded", listener, true);
        }
        Events.prototype.addModuleLoadedListener = function(moduleName, listener) {
            addListenerImplementation(document, "module_" + moduleName + "_loaded", listener, true);
        }
        Events.prototype.addTemplateLoadedListener = function(templateName, listener) {
            addListenerImplementation(document, "template_" + templateName + "_loaded", listener, true);
        }
        Events.prototype.addHTMLLoadedListener = function(fileName, listener) {
            addListenerImplementation(document, "html_" + fileName + "_loaded", listener, true);
        }
        Events.prototype.addCSSLoadedListener = function(fileName, listener) {
            addListenerImplementation(document, "css_" + fileName + "_loaded", listener, true);
        }
        Events.prototype.addJSLoadedListener = function(fileName, listener) {
            addListenerImplementation(document, "js_" + fileName + "_loaded", listener, true);
        }
        Events.prototype.removeModuleLoadedListener = function(moduleName, listener) {
            removeListenerImplementation(document, "module_" + moduleName + "_loaded", listener, true);
        }
        Events.prototype.removeTemplateLoadedListener = function(templateName, listener) {
            removeListenerImplementation(document, "template_" + templateName + "_loaded", listener, true);
        }
        Events.prototype.removeHTMLLoadedListener = function(fileName, listener) {
            removeListenerImplementation(document, "html_" + fileName + "_loaded", listener, true);
        }
        Events.prototype.removeCSSLoadedListener = function(fileName, listener) {
            removeListenerImplementation(document, "css_" + fileName + "_loaded", listener, true);
        }
        Events.prototype.removeJSLoadedListener = function(fileName, listener) {
            removeListenerImplementation(document, "js_" + fileName + "_loaded", listener, true);
        }
        Events.prototype.removeStartupListener = function (listener) {
            removeListenerImplementation(document, "DOMContentLoaded", listener, true);
        }
        Events.prototype.addListeners = function(targets, type, listener) {
            var forEach = Array.prototype.forEach;
            forEach.call(targets, function(target) {
                addListenerImplementation(target, type, listener, true);
            });
        }
        Events.prototype.removeListeners = function(targets, type, listener) {
            var forEach = Array.prototype.forEach;
            forEach.call(targets, function(target) {
                removeListenerImplementation(target, type, listener, true);
            });
        }
        return Events;
    }());
    Modules.Server = (function(){
        function Server(path) {
            this._path = path;
            loadJSONConfig(this._path, "cloud", function() {
                alert(ModulesJsConfigCloud.trackers);
                alert(getRandomInt(0, ModulesJsConfigCloud.trackers.length - 1));
            });
        }
        Server.prototype.getString = function(url) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            xhr.send(null);
            return xhr.responseText;
        };
        Server.prototype.getStringAsync = function(url, handler) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 /* complete */) {
                    if (xhr.status == 200 || xhr.status == 304) {
                        handler(xhr.responseText);
                    }
                }
            };
            xhr.send();
        };
        function loadJSONConfig(path, name, callback) {
            var jsLoaded = document.getElementsByClassName("modulesjs-config-" + name)[0];
            if (jsLoaded) {
                document.getElementsByTagName("head")[0].removeChild(jsLoaded);
            }
            var script = document.createElement('script');
            script.src = path + "/" + name + ".js";
            script.className = "modulesjs-config-" + name;
            script.type = "text/javascript";
            document.getElementsByTagName("head")[0].appendChild(script);
            var done = false;

            script.onreadystatechange = script.onload = function () {
                var state = script.readyState;
                if (!done && (!state || state == "loaded" || state == "complete")) {
                    done = true;
                    document.dispatchEvent(new CustomEvent("config_" + name + "_loaded",
                        {"detail": {"configName" : name, "_path": path}}
                    ));
                    if (callback) {
                        callback(name);
                    }
                }
            }
        }
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        return Server;
    }());
})(Modules || (Modules = {}));
