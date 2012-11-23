test("modules.Info", function() {
    var info = modules.Info("modules", "globalNavigationMenu", "header");
    ok(info.path === "modules", "Info.path correct" );
    ok(info.name === "globalNavigationMenu", "Info.name correct");
    ok(info.element === "header", "Info.element correct");
});

test("modules.notifier", function() {
    var notifyCount = 0;
    var notify = function (msg) {
        return notifyCount++;
    };
    modules.notifier.subscribe(notify);
    ok(modules.notifier.fns[0] === notify, "notifier subscribe correct function notify" );
    var notifyCount2 = 0;
    var notify2 = function (msg) {
        return notifyCount2++;
    };
    modules.notifier.subscribe(notify2)
    ok(modules.notifier.fns[1] === notify2, "notifier subscribe correct function notify2");
    modules.notifier.sendMessage("", "", "", "");
    ok(notifyCount == 1, "notify executed once");
    ok(notifyCount2 == 1, "notify2 executed once");

    notifyCount = 0;
    notifyCount2 = 0;
    modules.notifier.sendMessage("notify", "core", "testEvent", "message");
    ok(notifyCount == 1, "notify executed");
    ok(notifyCount2 == 1, "notify2 executed, verification TO must doing in notify method");

    modules.notifier.unsubscribe(notify);
    ok(modules.notifier.fns[0] === notify2, "notifier unsubscribe correct, function notify removed from notifier" );
    notifyCount = 0;
    notifyCount2 = 0;
    modules.notifier.sendMessage("", "", "", "");
    ok(notifyCount == 0, "notify isn`t executed, unsubscribed");
    ok(notifyCount2 == 1, "notify2 executed correctly");
});

test("modules.load", function() {
    var path = "modules";
    var name = "test";
    modules.load(path, name, "header");
    var css = document.getElementsByClassName("modulesjs-css-" + name)[0];
    ok(css.href != undefined, "css loaded");
    var html = document.getElementsByClassName(name)[0];
    ok(html.textContent == 'Hello', "html loaded");
    var js = document.getElementsByClassName("modulesjs-js-" + name)[0];
    ok(js != undefined, "js loaded");
    //load module in different place
    modules.load(path, name, "footer");
    var cssCount = document.getElementsByClassName("modulesjs-css-" + name);
    ok(cssCount.length == 1, "module`s css loaded only once");
    var jsCount = document.getElementsByClassName("modulesjs-js-" + name);
    ok(jsCount.length == 1, "module`s js loaded only once");
    var html = document.getElementsByClassName(name)[1];
    ok(html.textContent == 'Hello', "html loaded in footer too");
});

test("modules.verifications", function() {
    ok(modules.getVerificationsState() === false, "Default verifications state is false by performance requirements");
    modules.enableVerifications();
    ok(modules.getVerificationsState() === true, "Verifications enable");
    modules.disableVerifications();
    ok(modules.getVerificationsState() === false, "Verifications disable");
});


