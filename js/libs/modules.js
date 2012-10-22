var modules = new function() {
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
    this.load = function(path, name, element) {

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
            var callbackFired = false;
            var script = document.createElement('script');
            script.src = path + "/" + name + "/" + name + ".js";
            script.className = "modulesjs-js-" + name;
            script.type = "text/javascript";
            document.getElementsByTagName("head")[0].appendChild(script);
            script.onreadystatechange = script.onload = function(){
                var state = script.readyState;
                if (state == 'loaded' || 'completed') {
                    if (!callbackFired) {
                        callbackFired = true;
                        var module = window[name];
                        module.run();
                    }
                }
            }
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




