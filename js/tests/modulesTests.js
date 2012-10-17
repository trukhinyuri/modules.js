/**
 * Created with IntelliJ IDEA.
 * User: trukhinyuri
 * Date: 10/17/12
 * Time: 12:36 AM
 * To change this template use File | Settings | File Templates.
 */

test("modules.Info_Test", function() {
    var info = new modules.Info("/modules", "globalNavigationMenu", "#header");
    ok(info.path === "/modules", "Info.path correct" );
    ok(info.name === "globalNavigationMenu", "Info.name correct");
    ok(info. element === "#header", "Info.element correct");
});

test("modules.notifier_Test", function() {
    function notify() {};
    modules.notifier.subscribe(notify);
    ok(modules.notifier.fns[0] === notify, "notifier subscribe correct function" );
});

