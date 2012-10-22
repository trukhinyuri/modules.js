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

        var cssLoaded = document.getElementsByClassName("css" + name)[0];
        if (!cssLoaded) {
            var xhrCssLoader = new XMLHttpRequest();
            xhrCssLoader.open("GET", path + "/" + name + "/" + name + ".css", false);
            xhrCssLoader.send(null);
            document.getElementsByTagName("head")[0].innerHTML += '<style type="text/css" class="css' + name + '">' + xhrCssLoader.responseText + '</style>';
        }

        var xhrHtmlLoader = new XMLHttpRequest();
        xhrHtmlLoader.open("GET", path + "/" + name + "/" + name + ".html", false);
        xhrHtmlLoader.send(null);
        document.getElementById(element).innerHTML = xhrHtmlLoader.responseText;

        var jsLoaded = document.getElementsByClassName("js" + name)[0];
        if (!jsLoaded) {
            var xhrJsLoader = new XMLHttpRequest();
            xhrJsLoader.open("GET", path + "/" + name + "/" + name + ".js", false);
            xhrJsLoader.send(null);
            document.getElementsByTagName("head")[0].innerHTML += '<script type="text/javascript" class="js' + name + '">' + xhrJsLoader.responseText + '</script>';

            var script = document.getElementsByClassName("js" + name)[0];
            eval(script.text);
            var module = eval(name);
            module.run();
        }
    };
    this.loadInfoArrayWithNotifier = function(InfoArray) {
        var registeredCounter = 0;
        var callback = function() {
            registeredCounter++;
            if (registeredCounter == InfoArray.length - 1) {
                InfoArray.forEach(function (el) {
                    if (el.element === "") {
                        require([el.path + "/" + el.name + "/" + el.name + ".js"], function (module) {
                            module.run();
                        });
                    } else {
                        $("head").append("<link rel=\"stylesheet\" href=\"" + el.path + "/" + el.name + "/" + el.name + ".css" + "\" type=\"text/css\" />");
                        $(el.element).load(el.path + "/" + el.name + "/" + el.name + ".html ." + el.name, function () {
                            require([el.path + "/" + el.name + "/" + el.name + ".js"], function (module) {
                                module.run();
                            });
                        });
                    }
                });
            }
        }
        InfoArray.forEach(function (el) {
            require([el.path + "/" + el.name + "/" + el.name + ".js"], function (module) {
                module.register(callback);
            });
        });
    };
    this.Info = function(path, name, element) {
        this.path = path;
        this.name = name;
        this.element = element;
        return this;
    };
};




