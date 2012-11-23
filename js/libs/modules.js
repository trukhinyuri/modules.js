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
        var result = "CSS VERIFICATION RESULT (" + name + ") </br>";
        var xhrHtmlLoader = new XMLHttpRequest();
        xhrHtmlLoader.open("GET", path + "/" + name + "/" + name + ".css", false);
        xhrHtmlLoader.send(null);
        var responseArray = xhrHtmlLoader.responseText.split("\n");
        result += searchCSSExpressions(responseArray);
        writeMessage(result);
    };

    var verifyJS = function(path, name) {
        var result = "JAVASCRIPT VERIFICATION RESULT (" + name + ") </br>";
        var xhrHtmlLoader = new XMLHttpRequest();
        xhrHtmlLoader.open("GET", path + "/" + name + "/" + name + ".js", false);
        xhrHtmlLoader.send(null);
        var responseArray = xhrHtmlLoader.responseText.split("\n");
        result += searchJSUsingStyles(responseArray);
        writeMessage(result);
    };

    var searchCSSExpressions = function(array) {
        var resultDocument = "";
        for (var i = 0; i < array.length; i++) {
            var searchResult = array[i].search(/expression\(/);
            if (searchResult != -1) {
                var lineNumber = i + 1;
                resultDocument += "Warning: CSS Expressions found: " + lineNumber + " line </br>";
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
                resultDocument += "Warning: Access to style from JavaScript: " + lineNumber + " line. " +
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
                notificator.style.opacity = (parseFloat(notificator.style.opacity) + 0.01);
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

    this.load = function(path, name, element) {
        if (verifications === true) {
            addNotificator();
            verifyCSS(path, name);
            verifyJS(path, name);
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
        }
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




