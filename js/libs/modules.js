"use strict";
//Legacy
var modules = new function() {
    var verifications = false;
    this.enableVerifications = function() {
         verifications = true;
    };
    this.disableVerifications = function() {
         verifications = false;
    };
    this.getVerificationsState = function() {
        return verifications;
    };

    this.notifier = new function() {
        this.fns = [];
        this.subscribe = function(fn) {
            this.fns.push(fn);
        };
        this.unsubscribe = function(fn) {
            this.fns = this.fns.filter(
                function(el) {
                    if ( el !== fn ) {
                        return el;
                    }
                });
        };
        this.sendMessage = function(to, from, e, msg) {
            this.fns.forEach(
                function(el) {
                    el.call(window, {receiver: to, sender: from, evt: e, message: msg});
                });
        };
    };

    var verifyCSS = function(path, name) {
        var result = "CSS VERIFICATION REPORT (" + name + ") </br>";
        var xhrHtmlLoader = new XMLHttpRequest();
        xhrHtmlLoader.open("GET", path + "/" + name + "/" + name + ".css", false);
        xhrHtmlLoader.send(null);
        var responseArray = xhrHtmlLoader.responseText.split("\n");
        result += searchCSSExpressions(responseArray);
        writeMessage(result);
    };

    var verifyJS = function(path, name) {
        var result = "JAVASCRIPT VERIFICATION REPORT (" + name + ") </br>";
        var xhrHtmlLoader = new XMLHttpRequest();
        xhrHtmlLoader.open("GET", path + "/" + name + "/" + name + ".js", false);
        xhrHtmlLoader.send(null);
        var responseArray = xhrHtmlLoader.responseText.split("\n");
        result += searchJSUsingStyles(responseArray);
        result += searchJSUsingInnerHTML(responseArray);
        writeMessage(result);
    };

    var verifyHTML = function (path, name) {
        var result = "HTML VERIFICATION REPORT (" + name + ") </br>";
        var xhrHtmlLoader = new XMLHttpRequest();
        xhrHtmlLoader.open("GET", path + "/" + name + "/" + name + ".html", false);
        xhrHtmlLoader.send(null);
        var responseArray = xhrHtmlLoader.responseText.split("\n");
        result += searchHTMLUsingEventHandlers(responseArray);
        result += searchHTMLUsingScriptTagWithCode(responseArray);
        writeMessage(result);
    };

    var searchJSUsingInnerHTML = function(array) {
        var resultDocument = "";
        for (var i = 0; i < array.length; i++) {
            var searchParam = /innerHTML/;
            var searchResult = array[i].search(searchParam);
            if (searchResult != -1) {
                var lineNumber = i + 1;
                resultDocument += "Warning [line "+lineNumber+"]: Using innerHTML in JavaScript. " +
                    "</br>Possible solution: </br>" +
                    "1) load HTML from server (use function modules.server.requestHTMLToElement(path, element))</br>" +
                    "2) Client-side templates (use template in HTML and replace from JavaScript) </br>";
            }
        }
        return resultDocument;
    };

    var searchHTMLUsingEventHandlers = function(array) {
        var resultDocument = "";
        for (var i = 0; i < array.length; i++) {
            var searchParam = '(?:onabort=|oncancel=|oncanplay=|oncanplaythrough=|onchange=|onclick=|onclose='
                + '|oncontextmenu=|oncuechange=|ondblclick=|ondrag=|ondragend=|ondragenter=|ondragleave=|ondragover='
                + '|ondragstart=|ondrop=|ondurationchange=|onemptied=|onended=|oninput=|oninvalid=|onkeydown='
                + '|onkeypress=|onkeyup=|onloadeddata=|onloadedmetadata=|onloadstart=|onmousedown=|onmousemove='
                + '|onmouseout=|onmouseover=|onmouseup=|onmousewheel=|onpause=|onplay=|onplaying=|onprogress='
                + '|onratechange=|onreset=|onseeked=|onseeking=|onselect=|onshow=|onstalled=|onsubmit=|onsuspend='
                + '|ontimeupdate=|onvolumechange=|onwaiting=|onblur=|onerror=|onfocus=|onload=|onscroll='
                + '|onafterprint=|onbeforeprint=|onbeforeunload=|onhashchange=|onload=|onmessage=|onoffline='
                + '|ononline=|onpagehide=|onpageshow=|onpopstate=|onredo=|onresize=|onscroll=|onstorage='
                + '|onundo=|onunload=|onreadystatechange='
                +')';
            var searchResult = array[i].search(searchParam);
            if (searchResult != -1) {
                var lineNumber = i + 1;
                resultDocument += "Warning [line "+lineNumber+"]: Using Javascript Event Handlers in HTML. " +
                    "Use \"Unobstructive JavaScript\" Pattern (use function modules.helpers.addListener(target, type, handler)) </br>";
            }
        }
        return resultDocument;
    };

    var searchHTMLUsingScriptTagWithCode = function(array) {
        var resultDocument = "";
        for (var i = 0; i < array.length; i++) {
            var searchParam = /<script>/;
            var searchResult = array[i].search(searchParam);
            if (searchResult != -1) {
                var lineNumber = i + 1;
                resultDocument += "Warning [line "+lineNumber+"]: Using Javascript code in HTML script tag. " +
                    "Use link to external Javascript file in script tag. </br>";
            }
        }
        return resultDocument;
    };

    var searchCSSExpressions = function(array) {
        var resultDocument = "";
        for (var i = 0; i < array.length; i++) {
            var searchResult = array[i].search(/expression\(/);
            if (searchResult != -1) {
                var lineNumber = i + 1;
                resultDocument += "Warning [line "+ lineNumber +"]: CSS Expressions found. </br>";
            }
        }
        return resultDocument;
    };

    var searchJSUsingStyles = function(array) {
        var resultDocument = "";
        for (var i = 0; i < array.length; i++) {
            var searchResult = array[i].search(/.style/);
            if (searchResult != -1) {
                var lineNumber = i + 1;
                resultDocument += "Warning [line "+lineNumber+"]: Access to style from JavaScript." +
                    "Write style in CSS and add CSS class to JavaScript Element </br>";
            }
        }
        return resultDocument;
    };

    var addNotificator = function() {
        var notificator = document.createElement("div");
        notificator.id = 'modulesjs_internal_notificator';
        notificator.style.width = '100%';
        notificator.style.height = '100%';
        notificator.style.zIndex = '2147483647';
        notificator.style.background = '#ffffff';
        notificator.style.position = 'absolute';
        notificator.style.top = '0';
        notificator.style.left = '0';
        notificator.style.margin = '0';
        notificator.style.padding = '0';
        notificator.style.opacity = '0';

        var notificator_footer = document.createElement('div');
        notificator_footer.id = 'modulesjs_internal_notificator_footer';
        notificator_footer.style.width = '100%';
        notificator_footer.style.position = 'relative';
        notificator_footer.style.cssFloat = 'left';
//        notificator_footer.style.height = '25px';
        var notificator_footer_left = document.createElement('div');
        notificator_footer_left.id = 'modulesjs_internal_notificator_footer_left';
        notificator_footer_left.style.cssFloat = 'left';
        notificator_footer_left.style.height = '100%';
        notificator_footer_left.style.width = 'auto';

        var notificator_footer_left_header = document.createElement('a');
        notificator_footer_left_header.id = 'modulesjs_internal_notificator_footer_left_header';
        notificator_footer_left_header.innerHTML = 'MODULES.JS verification report';
        notificator_footer_left_header.style.height = '100%';
        notificator_footer_left_header.style.fontSize = '30px';
        notificator_footer_left_header.style.color = '#000000';
        notificator_footer_left_header.style.margin = '0';
        notificator_footer_left_header.style.padding = '0';
        notificator_footer_left.appendChild(notificator_footer_left_header);

        notificator_footer.appendChild(notificator_footer_left);


        var notificator_footer_right = document.createElement('div');
        notificator_footer_right.id = 'modulesjs_internal_notificator_footer_right';
        notificator_footer_right.style.cssFloat = 'right';
        notificator_footer_right.style.height = '100%';
        notificator_footer_right.style.width = '30px';
        notificator_footer_right.style.background = '#ff0000';

        var notificator_footer_right_closeButton = document.createElement('input');
        notificator_footer_right_closeButton.id = 'modulesjs_internal_notificator_footer_right_closeButton';
        notificator_footer_right_closeButton.setAttribute('value', 'x');
        notificator_footer_right_closeButton.setAttribute('type', 'button');
        notificator_footer_right_closeButton.style.height = '100%';
        notificator_footer_right_closeButton.style.width = '100%';
        notificator_footer_right_closeButton.style.background = '#ff0000';
        notificator_footer_right_closeButton.style.border = 'none';
        notificator_footer_right_closeButton.style.fontSize = '30px';
        notificator_footer_right_closeButton.style.color = '#ffffff';
        notificator_footer_right_closeButton.style.margin = '0';
        notificator_footer_right_closeButton.style.padding = '0';
        notificator_footer_right_closeButton.addEventListener('click', close, false);
        notificator_footer_right.appendChild(notificator_footer_right_closeButton);

        notificator_footer.appendChild(notificator_footer_right);
        notificator.appendChild(notificator_footer);

        var notificator_content = document.createElement('div');
        notificator_content.style.width = '100%';
        notificator_content.style.position = "relative";
        notificator_content.style.cssFloat = 'left';
        notificator_content.id = 'modulesjs_internal_notificator_content';
        var notificator_content_a = document.createElement('a');
        notificator_content_a.id = 'modulesjs_internal_notificator_content_a';
        notificator_content.appendChild(notificator_content_a);
        notificator.appendChild(notificator_content);
//        notificator_textDiv.id = 'modulesjs_internal_notificator_textDiv';
//        notificator_textDiv.style.height = '100%';
//
//        notificator_textDiv.style.float = 'left';
//        notificator_textDiv.style.background = '#ff0000';
//        notificator.appendChild(notificator_textDiv);
//
//        var notificator_linkDiv = document.createElement('div');
//        notificator_linkDiv.id = 'modulesjs_internal_notificator_linkDiv';
//        var notificator_closeDiv = document.createElement('div');
//        notificator_closeDiv.id = 'modulesjs_internal_notificator_closeDiv';
        document.getElementsByTagName('body')[0].appendChild(notificator);
        show();

        function show() {
            var notificator = document.getElementById('modulesjs_internal_notificator');
            if (parseFloat(notificator.style.opacity) <= 1) {
                notificator.style.opacity = (parseFloat(notificator.style.opacity) + 0.005);
                setTimeout(show, 20);
            }
        }

        function close() {
            var notificator = document.getElementById('modulesjs_internal_notificator');
            notificator.parentNode.removeChild(notificator);
        }
    };

    var writeMessage = function(message) {
        var content = document.getElementById('modulesjs_internal_notificator_content_a');
        content.innerHTML += message;
        content.innerHTML += '</br>';
    };

    this.reportPage = new function() {



//        var generator = window.open('','_new').location.href=this.title;
//        generator.document = new Document();
//        generator.document.write('<html><head><title>Popup</title>');
////        generator.document.write('<link rel="stylesheet" href="style.css">');
//        generator.document.write('</head><body>');
//        generator.document.write('<p>This page was generated by the main window.</p>');
//        generator.document.write('<p><a href="javascript:self.close()">Close</a> the popup.</p>');
//        generator.document.write('</body></html>');


//        this.write = function() {
//           generator.document.getElementsByTagName("body").innerHTML += "Hello";
//        };
    };

    this.helpers = new function() {
        this.addListener = function(target, type, handler) {
            if (target.addEventListener) {
                target.addEventListener(type, handler, false);
            } else if (target.attachEvent) {
                target.attachEvent("on" + type, handler);
            } else {
                target["on" + type] = handler; }
        }
    };

    this.server = new function() {
        this.requestHTMLToElement = function(path, elementClassName, onComplete) {
            var xhr = new XMLHttpRequest(); xhr.open("get", "path", true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var div = document.getElementsByClassName(elementClassName);
                    for (var i = 0; i<div.length; i++) {
                        div[i].innerHTML = xhr.responseText;
                    }
                    onComplete();
                } else {
// handle error
                } };
            xhr.send(null);
        };
    };

    this.load = function(path, name, element) {
        if (verifications === true) {
            addNotificator();
            verifyCSS(path, name);
            verifyJS(path, name);
            verifyHTML(path, name);
        }
        var cssLoaded = document.getElementsByClassName("modulesjs-css-" + name)[0];
        if (!cssLoaded) {
            var css = document.createElement('link');
            css.href = path + "/" + name + "/" + name + ".css";
            css.className = "modulesjs-css-" + name;
            css.type = "text/css";
            css.rel = "stylesheet";
            document.getElementsByTagName("head")[0].appendChild(css);
        }

        var xhrHtmlLoader = new XMLHttpRequest();
        xhrHtmlLoader.open("GET", path + "/" + name + "/" + name + ".html", false);
        xhrHtmlLoader.send(null);
        document.getElementById(element).innerHTML = xhrHtmlLoader.responseText;

        var jsLoaded = document.getElementsByClassName("modulesjs-js-" + name)[0];
        if (!jsLoaded) {
            var script = document.createElement('script');
            script.src = path + "/" + name + "/" + name + ".js";
            script.className = "modulesjs-js-" + name;
            script.type = "text/javascript";
            document.getElementsByTagName("head")[0].appendChild(script);
            var done = false;
            script.onreadystatechange = script.onload = function(){
                var state = script.readyState;
                if (!done && (!state || state == "loaded" || state == "complete")) {
                    done = true;
                    var module = window[name];
                    module.run();
                }
            }
        }
    };
    this.loadInClass = function(modulePath, moduleName, classNameForLoad) {

        var cssLoaded = document.getElementsByClassName("modulesjs-css-" + moduleName)[0];
        if (!cssLoaded) {
            var css = document.createElement('link');
            css.href = modulePath + "/" + moduleName + "/" + moduleName + ".css";
            css.className = "modulesjs-css-" + moduleName;
            css.type = "text/css";
            css.rel = "stylesheet";
            document.getElementsByTagName("head")[0].appendChild(css);
        }

        var xhrHtmlLoader = new XMLHttpRequest();
        xhrHtmlLoader.open("GET", modulePath + "/" + moduleName + "/" + moduleName + ".html", false);
        xhrHtmlLoader.send(null);
        var elementClasses = document.getElementsByClassName(classNameForLoad);
        for (var i = 0; i < elementClasses.length; i++) {
            elementClasses[i].innerHTML = xhrHtmlLoader.responseText;
        }

        var jsLoaded = document.getElementsByClassName("modulesjs-js-" + moduleName)[0];
        if (!jsLoaded) {
            var script = document.createElement('script');
            script.src = modulePath + "/" + moduleName + "/" + moduleName + ".js";
            script.className = "modulesjs-js-" + moduleName;
            script.type = "text/javascript";
            document.getElementsByTagName("head")[0].appendChild(script);
            var done = false;
            script.onreadystatechange = script.onload = function(){
                var state = script.readyState;
                if (!done && (!state || state == "loaded" || state == "complete")) {
                    done = true;
                    var module = window[moduleName];
                    module.run();
                }
            }
        }
    };
    this.loadHtmlCssInClass = function(modulePath, moduleName, classNameForLoad) {

        var cssLoaded = document.getElementsByClassName("modulesjs-css-" + moduleName)[0];
        if (!cssLoaded) {
            var css = document.createElement('link');
            css.href = modulePath + "/" + moduleName + "/" + moduleName + ".css";
            css.className = "modulesjs-css-" + moduleName;
            css.type = "text/css";
            css.rel = "stylesheet";
            document.getElementsByTagName("head")[0].appendChild(css);
        }

        var xhrHtmlLoader = new XMLHttpRequest();
        xhrHtmlLoader.open("GET", modulePath + "/" + moduleName + "/" + moduleName + ".html", false);
        xhrHtmlLoader.send(null);
        var elementClasses = document.getElementsByClassName(classNameForLoad);
        for (var i = 0; i < elementClasses.length; i++) {
            elementClasses[i].innerHTML = xhrHtmlLoader.responseText;
        }
    };
    this.loadInfoArrayWithNotifier = function(InfoArray) {
        var infoArrayCounter = 0;
        var callback = function() {
            infoArrayCounter++;
            if (infoArrayCounter == InfoArray.length - 1) {
                InfoArray.forEach(function (el) {
                    if (el.element === "") {
                        var script = document.getElementsByClassName("js" + el.name)[0];
                        eval(script.text);
                        var module = eval(el.name);
                        module.run();
                    } else {
                        var cssLoaded = document.getElementsByClassName("css" + el.name)[0];
                        if (!cssLoaded) {
                            var xhrCssLoader = new XMLHttpRequest();
                            xhrCssLoader.open("GET", el.path + "/" + el.name + "/" + el.name + ".css", false);
                            xhrCssLoader.send(null);
                            document.getElementsByTagName("head")[0].innerHTML += '<style type="text/css" class="css' + el.name + '">' + xhrCssLoader.responseText + '</style>';
                        }

                        var xhrHtmlLoader = new XMLHttpRequest();
                        xhrHtmlLoader.open("GET", el.path + "/" + el.name + "/" + el.name + ".html", false);
                        xhrHtmlLoader.send(null);
                        document.getElementById(el.element).innerHTML = xhrHtmlLoader.responseText;

                        var jsLoaded = document.getElementsByClassName("js" + el.name)[0];
                        if (!jsLoaded) {
                            var xhrJsLoader = new XMLHttpRequest();
                            xhrJsLoader.open("GET", el.path + "/" + el.name + "/" + el.name + ".js", false);
                            xhrJsLoader.send(null);
                            document.getElementsByTagName("head")[0].innerHTML += '<script type="text/javascript" class="js' + name + '">' + xhrJsLoader.responseText + '</script>';

                            var script = document.getElementsByClassName("js" + el.name)[0];
                            eval(script.text);
                            var module = eval(el.name);
                            module.run();
                        }

                    }
                });
            }
        };
        InfoArray.forEach(function (el) {
            var jsLoaded = document.getElementsByClassName("js" + el.name)[0];
            if (!jsLoaded) {
                var xhrJsLoader = new XMLHttpRequest();
                xhrJsLoader.open("GET", el.path + "/" + el.name + "/" + el.name + ".js", false);
                xhrJsLoader.send(null);
                document.getElementsByTagName("head")[0].innerHTML += '<script type="text/javascript" class="js' + name + '">' + xhrJsLoader.responseText + '</script>';

                var script = document.getElementsByClassName("js" + el.name)[0];
                eval(script.text);
                var module = eval(el.name);
                module.subscribe(callback);
            } else {callback();}

        });
    };
    this.Info = function(path, name, element) {
        this.path = path;
        this.name = name;
        this.element = element;
        return this;
    };
};
//endLegacy

var Modules = null;
(function (Modules) {
    Modules.Loader = (function () {
        function Loader(path) {
            this.path = path;
        }
        function loadJS (path, name, callback) {
            var jsLoaded = document.getElementsByClassName("modulesjs-js-" + name)[0];
            if (jsLoaded) {
                document.getElementsByTagName("head")[0].removeChild(jsLoaded);
            }
            var script = document.createElement('script');
            script.src = path + ".js";
            script.className = "modulesjs-js-" + name;
            script.type = "text/javascript";
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
        function loadCSS(path, name, callback) {
            var cssLoaded = document.getElementsByClassName("modulesjs-css-" + name)[0];
            if (!cssLoaded) {
                var css = document.createElement('link');
                css.href = path + ".css";
                css.className = "modulesjs-css-" + name;
                css.type = "text/css";
                css.rel = "stylesheet";
                document.getElementsByTagName("head")[0].appendChild(css);
                if (callback) {
                    callback();
                }
            }
        }
        function renderHTML(responseText, name, className, callback) {
            var elementClasses = document.getElementsByClassName(className);
            var forEach = Array.prototype.forEach;
            forEach.call(elementClasses, function(elementClass) {
                elementClass.innerHTML = responseText;
            });
            if (callback) {
                callback(name);
            }
        }
        function loadHTML(path, name, className, callback) {
            function loadedHandler(responseText, name) {
                renderHTML(responseText, name, className, callback);
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
        function buildModulePath(path, name) {
            var result = path + "/" + name + "/" + name;
            return result;
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
        Loader.prototype.load = function (moduleName, className, callback) {
            loadAsync(this.path, moduleName, className, callback);
            function loadAsync(path, moduleName, className, callback) {
                setTimeout(function(){
                    loadSync(path, moduleName, className, callback);
                }, 0);
            }
            function loadSync(path, moduleName, className, callback) {
                var modulePath = buildModulePath(path, moduleName);
                loadCSS(modulePath, moduleName, function() {
                    loadHTML(modulePath, moduleName, className, function() {
                        loadJS(modulePath, moduleName, function() {
                            document.dispatchEvent(new CustomEvent("module_" + moduleName + "_loaded",
                                {"detail": {"moduleName" : moduleName,"path": modulePath, "className": className}}
                            ));
                            if (callback) {
                                callback();
                            }
                        });
                    });
                });
            }
        };
        Loader.prototype.loadHTML = function(fileName, className, callback) {
            loadAsync(this.path, fileName, className, callback);
            function loadAsync(path, fileName, className, callback) {
                setTimeout(function(){
                    loadSync(path, fileName, className, callback);
                }, 0);
            }
            function loadSync(path, fileName, className, callback) {
                var htmlPath = buildFilePath(path, fileName);
                loadHTML(htmlPath, fileName, className, function() {
                    document.dispatchEvent(new CustomEvent("html_" + fileName + "_loaded",
                        {"detail": {"fileName" : fileName, "htmlPath": htmlPath, "path" : path, "className": className}}
                    ));
                    if (callback) {
                        callback();
                    }
                });
            }
        };
        Loader.prototype.loadJS = function(fileName, callback) {
            loadAsync(this.path, fileName, callback);
            function loadAsync(path, fileName, callback) {
                setTimeout(function(){
                    loadSync(path, fileName, callback);
                }, 0);
            }
            function loadSync(path, fileName,  callback) {
                var jsPath = buildFilePath(path, fileName);
                loadJS(jsPath, fileName, function() {
                    document.dispatchEvent(new CustomEvent("js_" + fileName + "_loaded",
                        {"detail": {"fileName" : fileName, "jsPath": jsPath, "path" : path}}
                    ));
                    if (callback) {
                        callback();
                    }
                });
            }
        };
        Loader.prototype.loadCSS = function(fileName, callback) {
            loadAsync(this.path, fileName, callback);
            function loadAsync(path, fileName, callback) {
                setTimeout(function(){
                    loadSync(path, fileName, callback);
                }, 0);
            }
            function loadSync(path, fileName, callback) {
                var cssPath = buildFilePath(path, fileName);
                loadCSS(cssPath, fileName, function() {
                    document.dispatchEvent(new CustomEvent("css_" + fileName + "_loaded",
                        {"detail": {"fileName" : fileName, "cssPath": cssPath, "path" : path}}
                    ));
                    if (callback) {
                        callback();
                    }
                });
            }
        };
        Loader.prototype.loadTemplate = function(templateName, className, dataSource, callback) {
            loadAsync(this.path, templateName, className, callback);
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
                                {"detail": {"templateName" : templateName, "path": templatePath, "className": className}}
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
//    Modules.MessageQueuePointToPoint = (function(){
//        var queueCallbacks = {};
//        var queuePool = {};
//        function MessageQueuePointToPoint() {
//            var instance;
//            if (typeof instance !== 'undefined') {
//                return instance;
//            }
//            return instance = this;
//        }
//        function flush(theme) {
//            if (queueCallbacks[theme]) {
//                for (var callback in queueCallbacks[theme]) {
//                    callback(queuePool[theme][0]);
//                }
//                queuePool[theme].shift();
//            }
//        }
//        MessageQueuePointToPoint.prototype.register = function(moduleName, listener, theme) {
//            if ((theme == null) || (theme == undefined)) {
//                queueCallbacks['nulltheme'][moduleName] = listener;
//                if ((queuePool['nulltheme'] != null) || (queuePool['nulltheme'] != undefined)) {
//                    listener(queuePool['nulltheme'][0]);
//                    queuePool['nulltheme'].shift();
//                }
//                queuePool['nulltheme'] = [];
//
//            } else {
//                queueCallbacks[theme][moduleName] = listener;
//                if ((queuePool[theme] != null) || (queuePool[theme] != undefined)) {
//                    listener(queuePool[theme][0]);
//                    queuePool[theme].shift();
//                }
//                queuePool[theme] = [];
//            }
//        };
//        MessageQueuePointToPoint.prototype.sendMessage = function(message, theme) {
//            if ((theme == null) || (theme == undefined)) {
//                queuePool['nulltheme'] = queuePool['nulltheme'] || [];
//                queuePool['nulltheme'].push(message);
//                flush('nulltheme');
//            } else {
//                queuePool[theme] = queuePool[theme] || [];
//                queuePool[theme].push(message);
//                flush(theme);
//            }
//
//            //queueCallbacks[moduleName](message);
//        }
//
//        return MessageQueuePointToPoint;
//    }());
//    Modules.MessageQueuePublishSubscribe = (function(){
//        var queueCallbacks = {};
//        var queuePool = {};
//        function MessageQueue() {
//            var instance;
//            if (typeof instance !== 'undefined') {
//                return instance;
//            }
//            return instance = this;
//        }
//        function flush(theme) {
//            if (queueCallbacks[theme]) {
//                for (var callback in queueCallbacks[theme]) {
//                    callback(queuePool[theme][0]);
//                }
//                queuePool[theme].shift();
//            }
//        }
//        MessageQueue.prototype.register = function(moduleName, listener, theme) {
//            if ((theme == null) || (theme == undefined)) {
//                queueCallbacks['nulltheme'][moduleName] = listener;
//                if ((queuePool['nulltheme'] != null) || (queuePool['nulltheme'] != undefined)) {
//                    listener(queuePool['nulltheme'][0]);
//                    queuePool['nulltheme'].shift();
//                }
//                queuePool['nulltheme'] = [];
//
//            } else {
//                queueCallbacks[theme][moduleName] = listener;
//                if ((queuePool[theme] != null) || (queuePool[theme] != undefined)) {
//                    listener(queuePool[theme][0]);
//                    queuePool[theme].shift();
//                }
//                queuePool[theme] = [];
//            }
//        };
//        MessageQueue.prototype.sendMessage = function(message, theme) {
//            if ((theme == null) || (theme == undefined)) {
//                queuePool['nulltheme'] = queuePool['nulltheme'] || [];
//                queuePool['nulltheme'].push(message);
//                flush('nulltheme');
//            } else {
//                queuePool[theme] = queuePool[theme] || [];
//                queuePool[theme].push(message);
//                flush(theme);
//            }
//
//            //queueCallbacks[moduleName](message);
//        }
//
//        return MessageQueue;
//    }());
    Modules.Server = (function(){
        function Server(path) {
            this.path = path;
            loadJSONConfig(this.path, "cloud", function() {
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
                        {"detail": {"configName" : name, "path": path}}
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

//var greeter = new Modules.Loader();
//var button = document.createElement('button');
//button.innerText = "Say Hello";
//button.onclick = function () {
//    alert(greeter.greet());
//};
//document.body.appendChild(button);