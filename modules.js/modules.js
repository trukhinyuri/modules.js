//version 1.0-snapshot
//revision 3
//Copyright (C) 2012–2013 Yuri V. Trukhin
//Author: Yuri V.Trukhin (yuri@trukhin.com)
//Owner: Yuri V.Trukhin
//You can`t change and publish code of modules.js without contributor licence from Yuri V.Trukhin
//You can`t sold this code
// You must get license this code from Yuri V.Trukhin (yuri@trukhin.com) for commercial use
// (and/or internal company use)
//You can use this code in open source projects without license
//If you don`t agreed with license, you must don`t use this code
"use strict";
var Modules = null;
(function (Modules) {
    Modules.DOM = (function(){
        function DOM() {
            this._DOM = null;
            this._Loader = null;
            this._Events = null;
            this._Server = null;
        }
        DOM.prototype = {
            get DOM() {
                if (this._DOM == null) {
                    this._DOM = new Modules.DOM();
                }
                return this._DOM;
            },
            get Loader() {
                if (this._Loader == null) {
                    this._Loader = new Modules.Loader();
                }
                return this._Loader;
            },
            get Events() {
                if (this._Events == null) {
                    this._Events = new Modules.Events();
                }
                return this._Events;
            },
            get Server() {
                if (this._Server == null) {
                    this._Server = new Modules.Server();
                }
                return this._Server;
            }
        }
        function isHTMLModule(element) {
           return element.parentNode.getAttribute("data-" + "modulesjs_item_id") == "module";
        }
        DOM.prototype.getModules = function(className) {
            var elements = document.getElementsByClassName(className);
            var elements_length = elements.length;
            var results = elements.filter(isHTMLModule);

            return results;
        }
        DOM.prototype.getRootTarget = function(eventTarget, className) {
            if (eventTarget.className == className) {
                return eventTarget;
            } else {
                return this.getRootTarget(eventTarget.parentNode, className);
            }
        }
    return DOM;
    })();
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

            this._itemTypes = {};
            Object.defineProperty(this._itemTypes, "module", {value: "module", writable: false});
            Object.defineProperty(this._itemTypes, "template", {value: "template", writable: false});
            Object.defineProperty(this._itemTypes, "html", {value: "html", writable: false});
            Object.defineProperty(this._itemTypes, "css", {value: "css", writable: false});
            Object.defineProperty(this._itemTypes, "javascript", {value: "javascript", writable: false});

            this._DOM = null;
            this._Loader = null;
            this._Events = null;
            this._Server = null;
        }
        Loader.prototype = {
            get path () {
                return this._path;
            },
            get itemTypes() {
                return this._itemTypes;
            },
            get DOM() {
                if (this._DOM == null) {
                    this._DOM = new Modules.DOM();
                }
                return this._DOM;
            },
            get Loader() {
                if (this._Loader == null) {
                    this._Loader = new Modules.Loader();
                }
                return this._Loader;
            },
            get Events() {
                if (this._Events == null) {
                    this._Events = new Modules.Events();
                }
                return this._Events;
            },
            get Server() {
                if (this._Server == null) {
                    this._Server = new Modules.Server();
                }
                return this._Server;
            }
        }

        function _loadCSS(path, name, callback) {
            var modulesCSSprefix = "modulesjs_css_";
            var cssLoaded = document.getElementsByClassName(modulesCSSprefix + name)[0];
            if (!cssLoaded) {
                var css = document.createElement('link');
                css.href = path + ".css";
                css.className = modulesCSSprefix + name;
                css.type = "text/css";
                css.rel = "stylesheet";
                document.getElementsByTagName("head")[0].appendChild(css);
            }
            if (callback) {
                callback();
            }
        }
        function _loadJS (path, name, callback) {
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
        function _loadHTML(path, name, className, attributeType, container, callback) {
            function loadedHandler(responseText, name) {
                _renderHTML(responseText, className, attributeType, container, callback);
            }
            _loadHTMLInMemory(path, name, loadedHandler);
        }
        function _renderHTML(responseText, className, htmlItemType, container, callback) {
            var elementClasses = null;
            if ((container != null) && (container != undefined)) {
                var containerElement = document.getElementsByClassName(container)[0];
                elementClasses = containerElement.getElementsByClassName(className);
            } else {
                elementClasses = document.getElementsByClassName(className);
            }
            var classesCount = elementClasses.length;
            for (var htmlID = 0; htmlID < classesCount; htmlID++) {
                elementClasses[htmlID].setAttribute("data-" + "modulesjs_item_id", htmlID.toString());
                elementClasses[htmlID].setAttribute("data-" + "modulesjs_item_type", htmlItemType);
                elementClasses[htmlID].innerHTML = responseText;
            }
            if (callback) {
                callback();
            }
        }
        function _loadHTMLInMemory(path, name, callback) {
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
        function _buildFilePath(path, name) {
            var result = path + "/" + name;
            return result;
        }
        function _buildTemplatePath(path, name) {
            var result = path + "/" + name + "/" + name;
            return result;
        }
        function _replace$PlaceholdersInTemplate(responseText, name, simpleDataSource) {
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
        function _addUUIDAttribute(responseText, itemNumber, name) {
            var dom = document.createElement('div');
            dom.innerHTML = responseText;
            var element = dom.getElementsByClassName('fileInfo')[0];
            element.setAttribute('uuid', itemNumber);
            return element.outerHTML;
        }
        function _buildModulePath(path, name) {
            var result = path + "/" + name + "/";
            return result;
        }
        function loadModule (scope, path, moduleName, className, callback, container) {
            var htmlItemType = "module";
            setTimeout(function(){
                loadSync(scope, path, moduleName, className, htmlItemType, callback, container);
            }, 0);
            function loadSync (scope, path, moduleName, className, htmlItemType, callback, container) {
                var modulePath = _buildModulePath(path, moduleName);
                scope.Events.dispatchDocumentCustomEvent("module_" + moduleName + "_loadingStarted",
                    {"itemInfo": {"itemName" : moduleName, "itemPath": modulePath, "className": className}});
                var pathToModuleFiles = modulePath + moduleName;
                _loadCSS(pathToModuleFiles, moduleName, function() {
                    _loadHTML(pathToModuleFiles, moduleName, className, htmlItemType, container, function() {
                        _loadJS(pathToModuleFiles, moduleName, function() {
                            scope.Events.dispatchDocumentCustomEvent("module_" + moduleName + "_loaded"
                                ,{"itemInfo": {"itemName" : moduleName, "itemPath": modulePath, "className": className}});
                            if (callback) {
                                callback();
                            }
                        });
                    });
                });
            }
        }
        function loadTemplate (scope, path, templateName, className, dataSource, callback, container) {
            document.getElementsByClassName(className).innerHTML = "";
            var htmlItemType = "template";
            setTimeout(function(){
                loadSync(scope, path, templateName, className, dataSource, htmlItemType, callback, container);
            }, 0);
            function loadSync(scope, path, templateName, className, dataSource, htmlItemType, callback, container) {
                var templatePath = _buildTemplatePath(path, templateName);
                scope.Events.dispatchCustomEvent(document, "template_" + templateName + "_loadingStarted",
                    {"itemInfo": {"itemName" : templateName, "path": templatePath, "className": className}});
                function htmlLoadedHandler(responseText, name) {
                    var result = '';
                    var stepResult = '';
                    //plain object
                    if (dataSource.length == undefined) {
                        result = _replace$PlaceholdersInTemplate(responseText, name, dataSource);
                        result = _addUUIDAttribute(result, 0, templateName);
                    }
                    //list
                    else {
                        for (var i = 0; i < dataSource.length; i++) {
                            stepResult = _replace$PlaceholdersInTemplate(responseText, name, dataSource[i]);
                            stepResult = _addUUIDAttribute(stepResult, i, templateName);
                            result += stepResult;
                        }
                    }
                    _renderHTML(result, className, htmlItemType, container, function(){
                        _loadJS(templatePath, templateName, function() {
                            scope.Events.dispatchDocumentCustomEvent("template_" + templateName + "_loaded"
                                ,{"itemInfo": {"itemName" : templateName, "path": templatePath, "className": className}});
                            if (callback) {
                                callback();
                            }
                        });
                    });
                }
                _loadCSS(templatePath, templateName, function() {
                    _loadHTMLInMemory(templatePath, templateName, htmlLoadedHandler);
                });

            }
        };
        function loadHTML (scope, path, fileName, className, callback, container) {
            var htmlItemType = "file";
            setTimeout(function(){
                loadSync(scope, path, fileName, className, htmlItemType, callback, container);
            }, 0);
            function loadSync(scope, path, fileName, className, htmlItemType, callback, container) {
//                if ( fileName.length )
                var htmlPath = _buildFilePath(path, fileName);
                scope.Events.dispatchCustomEvent(document, "html_" + fileName + "_loadingStarted",
                    {"detail": {"itemName" : fileName, "htmlPath": htmlPath, "path" : path, "className": className}});
                _loadHTML(htmlPath, fileName, className, htmlItemType, container, function() {
                    scope.Events.dispatchDocumentCustomEvent("html_" + fileName + "_loaded"
                        ,{"detail": {"fileName" : fileName, "htmlPath": htmlPath, "path" : path, "className": className}});
                    if (callback) {
                        callback();
                    }
                });
            }
        }
        function loadJS (scope, path, fileName, callback) {
            loadAsync(scope, path, fileName, callback);
            function loadAsync(scope, path, fileName, callback) {
                setTimeout(function(){
                    loadSync(scope, path, fileName, callback);
                }, 0);
            }
            function loadSync(scope, path, fileName,  callback) {
                var jsPath = _buildFilePath(path, fileName);
                scope.Events.dispatchCustomEvent(document, "js_" + fileName + "_loadingStarted",
                    {"detail": {"itemName" : fileName, "jsPath": jsPath, "path" : path}});
                _loadJS(jsPath, fileName, function() {
                    scope.Events.dispatchDocumentCustomEvent("js_" + fileName + "_loaded"
                        ,{"detail": {"fileName" : fileName, "jsPath": jsPath, "path" : path}});
                    if (callback) {
                        callback();
                    }
                });
            }
        }
        function loadCSS (scope, path, fileName, callback) {
            loadAsync(scope, path, fileName, callback);
            function loadAsync(scope, path, fileName, callback) {
                setTimeout(function(){
                    loadSync(scope, path, fileName, callback);
                }, 0);
            }
            function loadSync(scope, path, fileName, callback) {
                var cssPath = _buildFilePath(path, fileName);
                scope.Events.dispatchCustomEvent(document, "css_" + fileName + "_loadingStarted",
                    {"detail": {"itemName" : fileName, "cssPath": cssPath, "path" : path}});
                _loadCSS(cssPath, fileName, function() {
                    scope.Events.dispatchDocumentCustomEvent("css_" + fileName + "_loaded"
                        ,{"detail": {"fileName" : fileName, "cssPath": cssPath, "path" : path}});
                    if (callback) {
                        callback();
                    }
                });
            }
        }

        Loader.prototype.load = function (itemName, className, callback, itemType, dataSource, container) {
            if ((itemType == this.itemTypes.module) || (itemType == null) || (itemType == undefined)) {
                loadModule(this, this.path, itemName, className, callback, container);
            } else if (itemType == this.itemTypes.template) {
                loadTemplate(this, this.path, itemName, className, dataSource, callback, container);
            } else if (itemType == this.itemTypes.html) {
                loadHTML(this, this.path, itemName, className, callback, container);
            } else if (itemType == this.itemTypes.css) {
                loadCSS(this, this.path, itemName, callback);
            } else if (itemType == this.itemTypes.javascript) {
                loadJS(this, this.path, itemName, callback);
            }
        };

        return Loader;
    })();
    Modules.Events = (function(){
        function Events() {
            this._DOM = null;
            this._Loader = null;
            this._Events = null;
            this._Server = null;
        }
        Events.prototype = {
            get DOM() {
                if (this._DOM == null) {
                    this._DOM = new Modules.DOM();
                }
                return this._DOM;
            },
            get Loader() {
                if (this._Loader == null) {
                    this._Loader = new Modules.Loader();
                }
                return this._Loader;
            },
            get Events() {
                if (this._Events == null) {
                    this._Events = new Modules.Events();
                }
                return this._Events;
            },
            get Server() {
                if (this._Server == null) {
                    this._Server = new Modules.Server();
                }
                return this._Server;
            }
        }
        function addListenerImplementation(target, type, listener, useCapture) {
            target.addEventListener(type, listener, useCapture);
        }
        function removeListenerImplementation(target, type, listener, useCapture) {
            target.removeEventListener(type, listener, useCapture);
        }
        function Events() {
            this._DOM = new Modules.DOM();
            this._Loader = new Modules.Loader();
            this._Server = new Modules.Server();
        }
        Events.prototype.addListener = function (target, type, listener, useCapture) {
            var _useCapture = useCapture || false;
            addListenerImplementation(target, type, listener, _useCapture);
        };
        Events.prototype.addDocumentListener = function (type, listener, useCapture) {
            var _useCapture = useCapture || false;
            addListenerImplementation(document, type, listener, _useCapture);
        };
        Events.prototype.removeListener = function (target, type, listener, useCapture) {
            var _useCapture = useCapture || false;
            removeListenerImplementation(target, type, listener, _useCapture);
        };
        Events.prototype.removeDocumentListener = function (type, listener, useCapture) {
            var _useCapture = useCapture || false;
            removeListenerImplementation(document, type, listener, _useCapture);
        };
        Events.prototype.addStartupListener = function (listener) {
            addListenerImplementation(document, "DOMContentLoaded", listener, false);
        }
        Events.prototype.addModuleLoadedListener = function(moduleName, listener) {
            addListenerImplementation(document, "module_" + moduleName + "_loaded", listener, false);
        }
        Events.prototype.addTemplateLoadedListener = function(templateName, listener) {
            addListenerImplementation(document, "template_" + templateName + "_loaded", listener, false);
        }
        Events.prototype.addHTMLLoadedListener = function(fileName, listener) {
            addListenerImplementation(document, "html_" + fileName + "_loaded", listener, false);
        }
        Events.prototype.addCSSLoadedListener = function(fileName, listener) {
            addListenerImplementation(document, "css_" + fileName + "_loaded", listener, false);
        }
        Events.prototype.addJSLoadedListener = function(fileName, listener) {
            addListenerImplementation(document, "js_" + fileName + "_loaded", listener, false);
        }
        Events.prototype.removeModuleLoadedListener = function(moduleName, listener) {
            removeListenerImplementation(document, "module_" + moduleName + "_loaded", listener, false);
        }
        Events.prototype.removeTemplateLoadedListener = function(templateName, listener) {
            removeListenerImplementation(document, "template_" + templateName + "_loaded", listener, false);
        }
        Events.prototype.removeHTMLLoadedListener = function(fileName, listener) {
            removeListenerImplementation(document, "html_" + fileName + "_loaded", listener, false);
        }
        Events.prototype.removeCSSLoadedListener = function(fileName, listener) {
            removeListenerImplementation(document, "css_" + fileName + "_loaded", listener, false);
        }
        Events.prototype.removeJSLoadedListener = function(fileName, listener) {
            removeListenerImplementation(document, "js_" + fileName + "_loaded", listener, false);
        }
        Events.prototype.removeStartupListener = function (listener) {
            removeListenerImplementation(document, "DOMContentLoaded", listener, false);
        }
        Events.prototype.dispatchDocumentCustomEvent = function (ID, detailsObject) {
            var event = document.createEvent("CustomEvent");
            event.initCustomEvent(ID, true, true, detailsObject);
            document.dispatchEvent(event);
        }
        Events.prototype.dispatchCustomEvent = function (target, ID, detailsObject) {
            var event = target.createEvent("CustomEvent");
            event.initCustomEvent(ID, true, true, detailsObject);
            target.dispatchEvent(event);
        }
        Events.prototype.addListeners = function(targets, type, listener, useCapture) {
            var _useCapture = useCapture || true;
            var length = targets.length;
            for (var i = 0; i < length; i++) {
                addListenerImplementation(targets[i], type, listener, _useCapture);
            }
        }
        Events.prototype.removeListeners = function(targets, type, listener, useCapture) {
            var _useCapture = useCapture || false;
            var length = targets.length;
            for (var i = 0; i < length; i++) {
                removeListenerImplementation(targets[i], type, listener, _useCapture);
            }
        }
        Events.prototype.sendMessage = function(messageID, dataObject, sourceID, destinationID) {
            var messagePrefix = "modulesjs_message";
            if ((sourceID == null) || (sourceID == undefined)) {
                if ((destinationID == null) || (destinationID == undefined)) {
                    send(this, messagePrefix + "_" + messageID);
                } else {
                    send(this, messagePrefix + "_" + messageID + "__" + destinationID);
                }
            } else {
                if ((destinationID == null) || (destinationID == undefined)) {
                    send(this, messagePrefix + "_" + messageID + "_" + sourceID);
                } else {
                    send(this, messagePrefix + "_" + messageID + "_" + sourceID + "_" + destinationID);
                }
            }
            function send(scope, ID) {
                var detail = {"postAdress": {"sourceID" : sourceID, "destinationID": destinationID}
                    , "dataObject": dataObject};
                scope.dispatchDocumentCustomEvent(ID, detail);
            }
        }
        Events.prototype.subscribeMessage = function(messageID, onMessageReceived, sourceID, destinationID) {
            var messagePrefix = "modulesjs_message";
            if ((sourceID == null) || (sourceID == undefined)) {
                if ((destinationID == null) || (destinationID == undefined)) {
                    subscribe(this, messagePrefix + "_" + messageID);
                } else {
                    subscribe(this, messagePrefix + "_" + messageID + "__" + destinationID);
                }
            } else {
                if ((destinationID == null) || (destinationID == undefined)) {
                    subscribe(this, messagePrefix + "_" + messageID + "_" + sourceID);
                } else {
                    subscribe(this, messagePrefix + "_" + messageID + "_" + sourceID + "_" + destinationID);
                }
            }
            function subscribe(scope, ID){
                scope.addDocumentListener(ID, onMessageReceived);
            }
        }
        Events.prototype.unsubscribeMessage = function(messageID, onMessageReceived, sourceID, destinationID) {
            var messagePrefix = "modulesjs_message";
            if ((sourceID == null) || (sourceID == undefined)) {
                if ((destinationID == null) || (destinationID == undefined)) {
                    unsubscribe(this, messagePrefix + "_" + messageID);
                } else {
                    unsubscribe(this, messagePrefix + "_" + messageID + "__" + destinationID);
                }
            } else {
                if ((destinationID == null) || (destinationID == undefined)) {
                    unsubscribe(this, messagePrefix + "_" + messageID + "_" + sourceID);
                } else {
                    unsubscribe(this, messagePrefix + "_" + messageID + "_" + sourceID + "_" + destinationID);
                }
            }
            function unsubscribe(scope, ID) {
                scope.removeDocumentListener(ID, onMessageReceived);
            }
        }
        return Events;
    }());
    Modules.Server = (function(){
        function Server(path) {
            this._DOM = null;
            this._Loader = null;
            this._Events = null;
            this._Server = null;
//            loadJSONConfig(this._path, "cloud", function() {
//                alert(ModulesJsConfigCloud.trackers);
//                alert(getRandomInt(0, ModulesJsConfigCloud.trackers.length - 1));
//            });
        }
        Server.prototype = {
            get DOM() {
                if (this._DOM == null) {
                    this._DOM = new Modules.DOM();
                }
                return this._DOM;
            },
            get Loader() {
                if (this._Loader == null) {
                    this._Loader = new Modules.Loader();
                }
                return this._Loader;
            },
            get Events() {
                if (this._Events == null) {
                    this._Events = new Modules.Events();
                }
                return this._Events;
            },
            get Server() {
                if (this._Server == null) {
                    this._Server = new Modules.Server();
                }
                return this._Server;
            }
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
