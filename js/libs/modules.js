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
        this.fire = function(to, from, e, msg, thisObj) {
            var scope = thisObj || window;
            this.fns.forEach(
                function(el) {
                    el.call(scope, {receiver: to, sender: from, evt: e, message: msg});
                });
        };
    }

    this.load = function(path, name, element) {
        $("head").append("<link rel=\"stylesheet\" href=\"" + path + "/" + name + "/" + name + ".css" + "\" type=\"text/css\" />");
        $(element).load(path + "/" + name + "/" + name + ".html ." + name, function() {
            require([path + "/" + name + "/" + name + ".js"], function (module) {
                module.run();
            });
        });
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
    }
};


