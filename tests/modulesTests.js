/**
 * @fileOverview
 * @copyright (C) Yuri V. Trukhin.
 * @author Yuri V.Trukhin
 * @version 1.0-snapshot
 * @license Usage requires a licence. For getting price and purchase license subscription write to <a href="mailto:yuri@trukhin.com">yuri@trukhin.com</a>
 */

//Teamcity reporter
"use strict";
//QUnit.moduleStart({ name })
QUnit.moduleStart = function(settings){
    console.log("##teamcity[testSuiteStarted name='" + settings.name + "']");
};

//QUnit.moduleDone({ name, failed, passed, total })
QUnit.moduleDone = function(settings){
    console.log("##teamcity[testSuiteFinished name='" + settings.name + "']");
};

//QUnit.testStart({ name })
QUnit.testStart = function (settings){
    console.log("##teamcity[testStarted name='" + settings.name + "']");
};

//QUnit.testDone({ name, failed, passed, total })
QUnit.testDone = function(settings){
    if(settings.failed > 0){
        console.log("##teamcity[testFailed name='" + settings.name + "'"
            + " message='Assertions failed: " + settings.failed + "'"
            + " details='Assertions failed: " + settings.failed + "']");
    }
    console.log("##teamcity[testFinished name='" + settings.name + "']");
};
// end Teamcity reporter

"use strict";
//noinspection JSUnresolvedFunction
module("Modules", {
    setup: function() {
        //Definition of Setup module
        //noinspection JSUnresolvedVariable
        window.exports = window.exports || (window.exports = {});
        (function (Setup) {
            function ITEM_TYPE_CONSTANTS () {
                var moduleItemType = "module";
                var anotherItemType = "template";
                var body = document.getElementsByTagName("body")[0];
                var divHTMLModule = document.createElement('div');
                divHTMLModule.className = "HTMLModule";
                divHTMLModule.setAttribute("data-" + "modulesjs_item_type", moduleItemType);
                var testModuleInHTMLModule = document.createElement("div");
                testModuleInHTMLModule.className = "testModuleInHTMLModule";
                divHTMLModule.appendChild(testModuleInHTMLModule);
                body.appendChild(divHTMLModule);

                var divNotHTMLModule = document.createElement("div");
                divNotHTMLModule.className = "NotHTMLModule";
                divNotHTMLModule.setAttribute("data-" + "modulesjs_item_type", anotherItemType);
                var testModuleInNotHTMLModule = document.createElement("div");
                testModuleInNotHTMLModule.className = "testModuleInNotHTMLModule";
                divNotHTMLModule.appendChild(testModuleInNotHTMLModule);
                body.appendChild(divNotHTMLModule);
            }
            Setup.ITEM_TYPE_CONSTANTS = ITEM_TYPE_CONSTANTS;
        }(window.exports.Setup || (window.exports.Setup = {})));
        //noinspection JSUnresolvedVariable
        var Setup = window.exports.Setup;

        //Setup excecution
        Setup.ITEM_TYPE_CONSTANTS();
    },
    teardown: function() {
        //Definition of Teardown module
        //noinspection JSUnresolvedVariable
        window.exports = window.exports || (window.exports = {});
        (function (Teardown) {
            function ITEM_TYPE_CONSTANTS() {
                var body = document.getElementsByTagName("body")[0];

                var divHTMLModule = document.getElementsByClassName("HTMLModule")[0];
                body.removeChild(divHTMLModule);

                var divNotHTMLModule = document.getElementsByClassName("NotHTMLModule")[0];
                body.removeChild(divNotHTMLModule);
            }

            Teardown.ITEM_TYPE_CONSTANTS = ITEM_TYPE_CONSTANTS;

        }(window.exports.Teardown || (window.exports.Teardown = {})));
        //noinspection JSUnresolvedVariable
        var Teardown = window.exports.Teardown;

        //Teardown execution
        Teardown.ITEM_TYPE_CONSTANTS();
    }
});

test("ITEM_TYPE_CONSTANTS", function() {
    //noinspection JSUnresolvedFunction
    expect(5);

    var expectedModuleItemType = "module";
    equal(Modules.MODULE, expectedModuleItemType, "Modules.MODULE is set correctly: " + Modules.MODULE);
    var expectedTemplateItemType = "template";
    equal(Modules.TEMPLATE, expectedTemplateItemType, "Modules.TEMPLATE is set correctly: " + Modules.TEMPLATE);
    var expectedHTMLItemType = "html";
    equal(Modules.HTML, expectedHTMLItemType, "Modules.HTML is set correctly: " + Modules.HTML);
    var expectedCSSItemType = "css";
    equal(Modules.CSS, expectedCSSItemType, "Modules.CSS is set correctly: " + Modules.CSS);
    var expectedJSItemType = "javascript";
    equal(Modules.JAVASCRIPT, expectedJSItemType, "Modules.JAVASCRIPT is set correctly: " + Modules.JAVASCRIPT);
});


//noinspection JSUnresolvedFunction
module("Modules.DOM", {
    setup: function() {
        //Definition of Setup module
        //noinspection JSUnresolvedVariable
        window.exports = window.exports || (window.exports = {});
        (function (Setup) {
            function isHTMLModule () {
                var itemType = Modules.MODULE;
                var anotherItemType = Modules.TEMPLATE;
                var body = document.getElementsByTagName("body")[0];
                var divHTMLItemType = document.createElement('div');
                divHTMLItemType.className = "HTMLItemType";
                divHTMLItemType.setAttribute("data-" + "modulesjs_item_type", itemType);
                var testModuleInHTMLItemType = document.createElement("div");
                testModuleInHTMLItemType.className = "testModuleItemTypeInHTMLItemType";
                divHTMLItemType.appendChild(testModuleInHTMLItemType);
                body.appendChild(divHTMLItemType);

                var divNotHTMLItemType = document.createElement("div");
                divNotHTMLItemType.className = "NotHTMLItemType";
                divNotHTMLItemType.setAttribute("data-" + "modulesjs_item_type", anotherItemType);
                var testItemTypeInNotHTMLItemType = document.createElement("div");
                testItemTypeInNotHTMLItemType.className = "testModuleItemTypeInNotHTMLItemType";
                divNotHTMLItemType.appendChild(testItemTypeInNotHTMLItemType);
                body.appendChild(divNotHTMLItemType);
            }
            function isHTMLTemplate () {
                var itemType = Modules.TEMPLATE;
                var anotherItemType = Modules.MODULE;
                var body = document.getElementsByTagName("body")[0];
                var divHTMLItemType = document.createElement('div');
                divHTMLItemType.className = "HTMLItemType";
                divHTMLItemType.setAttribute("data-" + "modulesjs_item_type", itemType);
                var testModuleInHTMLItemType = document.createElement("div");
                testModuleInHTMLItemType.className = "testTemplateItemTypeInHTMLItemType";
                divHTMLItemType.appendChild(testModuleInHTMLItemType);
                body.appendChild(divHTMLItemType);

                var divNotHTMLItemType = document.createElement("div");
                divNotHTMLItemType.className = "NotHTMLItemType";
                divNotHTMLItemType.setAttribute("data-" + "modulesjs_item_type", anotherItemType);
                var testItemTypeInNotHTMLItemType = document.createElement("div");
                testItemTypeInNotHTMLItemType.className = "testTemplateItemTypeInNotHTMLItemType";
                divNotHTMLItemType.appendChild(testItemTypeInNotHTMLItemType);
                body.appendChild(divNotHTMLItemType);
            }

            function getModules() {
                var itemType = Modules.MODULE;
                var anotherItemType = Modules.TEMPLATE;
                var body = document.getElementsByTagName("body")[0];

                var divHTMLItemType = document.createElement('div');
                divHTMLItemType.className = "MayBeHTMLItemTypeContainer";
                divHTMLItemType.setAttribute("data-" + "modulesjs_item_type", itemType);
                var testItemTypeInHTMLItemType = document.createElement("div");
                testItemTypeInHTMLItemType.className = "MayBeHTMLModule";
                divHTMLItemType.appendChild(testItemTypeInHTMLItemType);
                body.appendChild(divHTMLItemType);

                var divNotHTMLItemType = document.createElement("div");
                divNotHTMLItemType.className = "MayBeHTMLItemTypeContainer";
                divNotHTMLItemType.setAttribute("data-" + "modulesjs_item_type", anotherItemType);
                var testItemTypeInNotHTMLItemType = document.createElement("div");
                testItemTypeInNotHTMLItemType.className = "MayBeHTMLModule";
                divNotHTMLItemType.appendChild(testItemTypeInNotHTMLItemType);
                body.appendChild(divNotHTMLItemType);

                var divHTMLSecondItemType = document.createElement('div');
                divHTMLSecondItemType.className = "MayBeHTMLItemTypeContainer";
                divHTMLSecondItemType.setAttribute("data-" + "modulesjs_item_type", itemType);
                var testItemTypeSecondInHTMLItemType = document.createElement("div");
                testItemTypeSecondInHTMLItemType.className = "MayBeHTMLModule";
                divHTMLSecondItemType.appendChild(testItemTypeSecondInHTMLItemType);
                body.appendChild(divHTMLSecondItemType);
            }
            function getTemplates() {
                var itemType = Modules.TEMPLATE;
                var anotherItemType = Modules.MODULE;
                var body = document.getElementsByTagName("body")[0];

                var divHTMLItemType = document.createElement('div');
                divHTMLItemType.className = "MayBeHTMLItemTypeContainer";
                divHTMLItemType.setAttribute("data-" + "modulesjs_item_type", itemType);
                var testItemTypeInHTMLItemType = document.createElement("div");
                testItemTypeInHTMLItemType.className = "MayBeHTMLTemplate";
                divHTMLItemType.appendChild(testItemTypeInHTMLItemType);
                body.appendChild(divHTMLItemType);

                var divNotHTMLItemType = document.createElement("div");
                divNotHTMLItemType.className = "MayBeHTMLItemTypeContainer";
                divNotHTMLItemType.setAttribute("data-" + "modulesjs_item_type", anotherItemType);
                var testItemTypeInNotHTMLItemType = document.createElement("div");
                testItemTypeInNotHTMLItemType.className = "MayBeHTMLTemplate";
                divNotHTMLItemType.appendChild(testItemTypeInNotHTMLItemType);
                body.appendChild(divNotHTMLItemType);

                var divHTMLSecondItemType = document.createElement('div');
                divHTMLSecondItemType.className = "MayBeHTMLItemTypeContainer";
                divHTMLSecondItemType.setAttribute("data-" + "modulesjs_item_type", itemType);
                var testItemTypeSecondInHTMLItemType = document.createElement("div");
                testItemTypeSecondInHTMLItemType.className = "MayBeHTMLTemplate";
                divHTMLSecondItemType.appendChild(testItemTypeSecondInHTMLItemType);
                body.appendChild(divHTMLSecondItemType);
            }

            function getFirstContainerElementByClassName() {
                var body = document.getElementsByTagName("body")[0];

                var container = document.createElement('div');
                container.className = "Container";
                var internal = document.createElement("div");
                internal.className = "Element";
                container.appendChild(internal);
                body.appendChild(container);

                var containerTwo = document.createElement('div');
                containerTwo.className = "Container";
                containerTwo.id = "ContainerTwo";
                var internalOneLevel = document.createElement("div");
                internalOneLevel.className = "ElementOneLevel";
                var internalSecondLevel = document.createElement("div");
                internalSecondLevel.className = "ElementSecondLevel";
                internalOneLevel.appendChild(internalSecondLevel);
                containerTwo.appendChild(internalOneLevel);
                body.appendChild(containerTwo);

                var elementWithoutContainer = document.createElement("div");
                elementWithoutContainer.className = "ElementWithoutContainer";
                body.appendChild(elementWithoutContainer);
            }
            function getFirstElementByClassName() {
                var body = document.getElementsByTagName("body")[0];

                var element1 = document.createElement('div');
                element1.className = "DesiredElement";
                element1.id = "first";
                body.appendChild(element1);

                var element2 = document.createElement('div');
                element2.className = "DesiredElement";
                element2.id = "second";
                body.appendChild(element2);
            }
            Setup.isHTMLModule = isHTMLModule;
            Setup.isHTMLTemplate = isHTMLTemplate;
            Setup.getModules = getModules;
            Setup.getTemplates = getTemplates;
            Setup.getFirstContainerElementByClassName = getFirstContainerElementByClassName;
            Setup.getFirstElementByClassName = getFirstElementByClassName;
        }(window.exports.Setup || (window.exports.Setup = {})));
        //noinspection JSUnresolvedVariable
        var Setup = window.exports.Setup;

        //Setup excecution
        Setup.isHTMLModule();
        Setup.isHTMLTemplate();
        Setup.getModules();
        Setup.getTemplates();
        Setup.getFirstContainerElementByClassName();
        Setup.getFirstElementByClassName();

    },
    teardown: function() {
        //Definition of Teardown module
        //noinspection JSUnresolvedVariable
        window.exports = window.exports || (window.exports = {});
        (function (Teardown) {
            function isHTMLModule () {
                var body = document.getElementsByTagName("body")[0];

                var divHTMLItemType = document.getElementsByClassName("HTMLItemType")[0];
                body.removeChild(divHTMLItemType);

                var divNotHTMLItemType = document.getElementsByClassName("NotHTMLItemType")[0];
                body.removeChild(divNotHTMLItemType);
            }
            function isHTMLTemplate () {
                var body = document.getElementsByTagName("body")[0];

                var divHTMLItemType = document.getElementsByClassName("HTMLItemType")[0];
                body.removeChild(divHTMLItemType);

                var divNotHTMLItemType = document.getElementsByClassName("NotHTMLItemType")[0];
                body.removeChild(divNotHTMLItemType);
            }
            function getModules () {
                var body = document.getElementsByTagName("body")[0];

                var divHTMLItemType = document.getElementsByClassName("MayBeHTMLItemTypeContainer")[0];
                body.removeChild(divHTMLItemType);

                var divNotHTMLItemType = document.getElementsByClassName("MayBeHTMLItemTypeContainer")[0];
                body.removeChild(divNotHTMLItemType);

                var divHTMLItemType = document.getElementsByClassName("MayBeHTMLItemTypeContainer")[0];
                body.removeChild(divHTMLItemType);
            }
            function getTemplates () {
                var body = document.getElementsByTagName("body")[0];

                var divHTMLItemType = document.getElementsByClassName("MayBeHTMLItemTypeContainer")[0];
                body.removeChild(divHTMLItemType);

                var divNotHTMLItemType = document.getElementsByClassName("MayBeHTMLItemTypeContainer")[0];
                body.removeChild(divNotHTMLItemType);

                var divHTMLItemType = document.getElementsByClassName("MayBeHTMLItemTypeContainer")[0];
                body.removeChild(divHTMLItemType);
            }
            function getFirstContainerElementByClassName() {
                var body = document.getElementsByTagName("body")[0];

                var container = document.getElementsByClassName("Container")[0];
                body.removeChild(container);

                var container = document.getElementsByClassName("Container")[0];
                body.removeChild(container);

                var elementWithoutContainer = document.getElementsByClassName("ElementWithoutContainer")[0];
                body.removeChild(elementWithoutContainer);
            }
            function getFirstElementByClassName() {
                var body = document.getElementsByTagName("body")[0];
                var element = document.getElementsByClassName("DesiredElement")[0];
                body.removeChild(element);
                var element = document.getElementsByClassName("DesiredElement")[0];
                body.removeChild(element);
            }
            Teardown.isHTMLModule = isHTMLModule;
            Teardown.isHTMLTemplate = isHTMLTemplate;
            Teardown.getModules = getModules;
            Teardown.getTemplates = getTemplates;
            Teardown.getFirstContainerElementByClassName = getFirstContainerElementByClassName;
            Teardown.getFirstElementByClassName = getFirstElementByClassName;
        }(window.exports.Teardown || (window.exports.Teardown = {})));
        //noinspection JSUnresolvedVariable
        var Teardown = window.exports.Teardown;

        //Teardown execution
        Teardown.isHTMLModule();
        Teardown.isHTMLTemplate();
        Teardown.getModules();
        Teardown.getTemplates();
        Teardown.getFirstContainerElementByClassName();
        Teardown.getFirstElementByClassName();
    }
});
test("isHTMLModule(htmlElement)", function() {
    //noinspection JSUnresolvedFunction
    expect(3);
    var testModuleInHTMLModule = document.getElementsByClassName("testModuleItemTypeInHTMLItemType")[0];
    var expected = true;
    var actual = Modules.DOM.isHTMLModule(testModuleInHTMLModule);
    equal(actual, expected, "testModule is a html module");

    var testModuleInNotHTMLModule = document.getElementsByClassName("testModuleItemTypeInNotHTMLItemType")[0];
    var expected = false;
    var actual = Modules.DOM.isHTMLModule(testModuleInNotHTMLModule);
    equal(actual, expected, "testModule is not a html module (another type)");

    var expected = false;
    var actual = Modules.DOM.isHTMLModule(window);
    equal(actual, expected, "window is not a html module");
});
test("isHTMLTemplate(htmlElement)", function() {
    //noinspection JSUnresolvedFunction
    expect(3);
    var testTemplateInHTMLModule = document.getElementsByClassName("testTemplateItemTypeInHTMLItemType")[0];
    var expected = true;
    var actual = Modules.DOM.isHTMLTemplate(testTemplateInHTMLModule);
    equal(actual, expected, "testModule is a html template");

    var testTemplateInNotHTMLModule = document.getElementsByClassName("testTemplateItemTypeInNotHTMLItemType")[0];
    var expected = false;
    var actual = Modules.DOM.isHTMLTemplate(testTemplateInNotHTMLModule);
    equal(actual, expected, "testModule is not a html template (another type)");

    var expected = false;
    var actual = Modules.DOM.isHTMLTemplate(window);
    equal(actual, expected, "window is not a html template");
});
test("getModules(className)", function() {
   //noinspection JSUnresolvedFunction
    expect(2);
    var className = "MayBeHTMLModule";
    var itemTypesArray = Modules.DOM.getModules(className);
    var expectedAttribute = Modules.MODULE;
    for (var i = 0; i < itemTypesArray.length; i++) {
        equal(expectedAttribute, itemTypesArray[i].parentNode.getAttribute("data-" + "modulesjs_item_type"), "item is "
            + expectedAttribute);
    }
});
test("getTemplates(className(htmlElement, className))", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var className = "MayBeHTMLTemplate";
    var itemTypesArray = Modules.DOM.getTemplates(className);
    var expectedAttribute = Modules.TEMPLATE;
    for (var i = 0; i < itemTypesArray.length; i++) {
        equal(expectedAttribute, itemTypesArray[i].parentNode.getAttribute("data-" + "modulesjs_item_type"), "item is "
            + expectedAttribute);
    }
});
test("getFirstContainerElementByClassName", function() {
    //noinspection JSUnresolvedFunction
    expect(3);
    var className = "Container";
    var elementClassName = "Element";
    var element = document.getElementsByClassName(elementClassName)[0];
    var result = Modules.DOM.getFirstContainerElementByClassName(element, className);
    var actual = result.className;
    var expected = className;
    equal(actual, expected, "Find first container element by className");

    var className = "Container";
    var containerID = "ContainerTwo";
    var elementClassName = "ElementSecondLevel";
    var element = document.getElementsByClassName(elementClassName)[0];
    var result = Modules.DOM.getFirstContainerElementByClassName(element, className);
    var actual = result.id;
    var expected = containerID;
    equal(actual, expected, "Find first container element by className. First container element selected correctly.");
    var elementWithoutContainer = document.getElementsByClassName("ElementWithoutContainer")[0];
    var expected = Modules.DOM.getFirstContainerElementByClassName(elementWithoutContainer, "Container");
    var actual = null;
    equal(actual, expected, "Not desired container for element without container");
});
test("getFirstElementByClassName", function(){
    expect(2);
    var className = "DesiredElement";
    var expectedElement = document.getElementsByClassName(className)[0];
    var actualElement = Modules.DOM.getFirstElementByClassName(document, className);
    equal(actualElement, expectedElement, "Find first element by className");
    var expectedId = "first";
    var actualId = actualElement.id;
    equal(actualId, expectedId, "Find first element by className, selected correct element (check by id)");
});

//noinspection JSUnresolvedFunction
module("Modules.Events", {
    setup: function() {
        //Definition of Setup module
        //noinspection JSUnresolvedVariable
        window.exports = window.exports || (window.exports = {});
        (function (Setup) {
            function addListeners () {
                var body = document.getElementsByTagName("body")[0];
                var divRoot0 = document.createElement('div');
                divRoot0.className = "addListenersTest";
                body.appendChild(divRoot0);
                var divRoot1 = document.createElement("div");
                divRoot1.className = "addListenersTest";
                body.appendChild(divRoot1);
            }
            function addContextListeners () {
                var body = document.getElementsByTagName("body")[0];
                var divRoot0 = document.createElement('div');
                divRoot0.className = "addContextListenersTest";
                body.appendChild(divRoot0);
                var divRoot1 = document.createElement('div');
                divRoot1.className = "addContextListenersTest";
                body.appendChild(divRoot1);
            }
            function removeListeners () {
                var body = document.getElementsByTagName("body")[0];
                var divRoot0 = document.createElement('div');
                divRoot0.className = "removeListenersTest";
                body.appendChild(divRoot0);
                var divRoot1 = document.createElement("div");
                divRoot1.className = "removeListenersTest";
                body.appendChild(divRoot1);
            }
            function dispatchCustomEvent () {
                var body = document.getElementsByTagName("body")[0];
                var divRoot = document.createElement('div');
                divRoot.className = "dispatchCustomEventTest";
                body.appendChild(divRoot);
            }
            Setup.addListeners = addListeners;
            Setup.addContextListener = addContextListeners;
            Setup.removeListeners = removeListeners;
            Setup.dispatchCustomEvent = dispatchCustomEvent;
        }(window.exports.Setup || (window.exports.Setup = {})));
        //noinspection JSUnresolvedVariable
        var Setup = window.exports.Setup;

        //Setup excecution
        Setup.addListeners();
        Setup.addContextListener();
        Setup.removeListeners();
        Setup.dispatchCustomEvent();
    },
    teardown: function() {
        //Definition of Teardown module
        //noinspection JSUnresolvedVariable
        window.exports = window.exports || (window.exports = {});
        (function (Teardown) {
            function addListeners() {
                var body = document.getElementsByTagName("body")[0];

                var divRoot = document.getElementsByClassName("addListenersTest")[0];
                body.removeChild(divRoot);

                var divRoot = document.getElementsByClassName("addListenersTest")[0];
                body.removeChild(divRoot);
            }
            function addContextListeners() {
                var body = document.getElementsByTagName("body")[0];

                var divRoot = document.getElementsByClassName("addContextListenersTest")[0];
                body.removeChild(divRoot);

                var divRoot = document.getElementsByClassName("addContextListenersTest")[0];
                body.removeChild(divRoot);
            }
            function removeListeners() {
                var body = document.getElementsByTagName("body")[0];

                var divRoot = document.getElementsByClassName("removeListenersTest")[0];
                body.removeChild(divRoot);

                var divRoot = document.getElementsByClassName("removeListenersTest")[0];
                body.removeChild(divRoot);
            }
            function dispatchCustomEvent() {
                var body = document.getElementsByTagName("body")[0];

                var divRoot = document.getElementsByClassName("dispatchCustomEventTest")[0];
                body.removeChild(divRoot);
            }

            Teardown.addListeners = addListeners;
            Teardown.addContextListeners = addContextListeners;
            Teardown.removeListeners = removeListeners;
            Teardown.dispatchCustomEvent = dispatchCustomEvent;

        }(window.exports.Teardown || (window.exports.Teardown = {})));
        //noinspection JSUnresolvedVariable
        var Teardown = window.exports.Teardown;

        //Teardown execution
        Teardown.addListeners();
        Teardown.addContextListeners();
        Teardown.removeListeners();
        Teardown.dispatchCustomEvent();
    }
});

//noinspection JSUnresolvedFunction
asyncTest("addListener (target, type, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(3);
    var target = document;
    var expected = 1;
    //noinspection JSCheckFunctionSignatures

    //Event must be handled one time only
    var returnedListener = Modules.Events.addListener(target, "testEvent", listener);
    equal(returnedListener, listener, "Event return listener correctly");
    Modules.Events.addListener(target, "testEvent", listener);

    function listener(e) {
        target.removeEventListener("testEvent", listener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var actual = this.i;
        notEqual(expected, actual, "Can`t use context this, where listener was registered");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("testEvent", true, true, {});
    target.dispatchEvent(event);
});

asyncTest("addListener (target, type, listener, useCapture)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    var i = 1;
    var expected = i;
    //noinspection JSCheckFunctionSignatures

    //Event must be handled one time only
    //noinspection JSValidateTypes
    Modules.Events.addListener(target, "testEventWithUseCapture", listener, true);

    function listener(e) {
        target.removeEventListener("testEventWithUseCapture", listener, true);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var actual = this.i;
        notEqual(expected, actual, "Can`t use context this, where listener was registered");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("testEventWithUseCapture", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addContextListener(target, type, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    //noinspection JSCheckFunctionSignatures
    var i = 1;
    var expected = this.i;
    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addContextListener(target, "testContextEvent", listener);

    function listener(e) {
        target.removeEventListener("testContextEvent", bindedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        start();
    }

    var event = target.createEvent("CustomEvent");
    event.initCustomEvent("testContextEvent", true, true, {});
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addContextListener(target, type, listener, context)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    //noinspection JSCheckFunctionSignatures
    var obj = {i:1}
    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addContextListener(target, "testContext2Event", listener, obj);

    function listener(e) {
        target.removeEventListener("testContext2Event", bindedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var expected = 1;
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        start();
    }

    var event = target.createEvent("CustomEvent");
    event.initCustomEvent("testContext2Event", true, true, {});
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addContextListener(target, type, listener, context, useCapture)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    //noinspection JSCheckFunctionSignatures
    var i = 1;
    var expected = this.i;
    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addContextListener(target, "testContext3Event", listener, null, true);

    function listener(e) {
        target.removeEventListener("testContext3Event", bindedListener, true);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        start();
    }

    var event = target.createEvent("CustomEvent");
    event.initCustomEvent("testContext3Event", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("removeListener(target, type, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    target.addEventListener("testRemoveEvent", listener);
//
    function listener(e) {
        //noinspection JSCheckFunctionSignatures
        Modules.Events.removeListener(target, "testRemoveEvent", listener);
        ok(true, "Test listener launched once, not launched after removing listener");
        start();
    }

    var event = target.createEvent("CustomEvent");
    event.initCustomEvent("testRemoveEvent", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("removeListener(target, type, listener, useCapture)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    target.addEventListener("testRemoveEventWC", listenerWithUseCapture, true);

    function listenerWithUseCapture(e) {
        //noinspection JSCheckFunctionSignatures
        Modules.Events.removeListener(target, "testRemoveEventWC", listenerWithUseCapture, true);
        ok(true, "Test listener launched once, not launched after removing listener with useCapture = true");
        start();
    }

    var event = target.createEvent("CustomEvent");
    event.initCustomEvent("testRemoveEventWC", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);

});

//noinspection JSUnresolvedFunction
asyncTest("addStartupListener(listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var returnedListener = Modules.Events.addStartupListener(listener);
    equal(returnedListener, listener, "Event return listener correctly");
//
    function listener(e) {
        //noinspection JSCheckFunctionSignatures
        Modules.Events.removeListener(target, "DOMContentLoaded", listener);
        ok(true, "Test listener launched once, not launched after removing listener");
        start();
    }

    var event = target.createEvent("CustomEvent");
    event.initCustomEvent("DOMContentLoaded", true, true, {});
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addStartupContextListener(listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    var i = 1;
    var expected = this.i;
    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addStartupContextListener(listener);
//
    function listener(e) {
        //noinspection JSCheckFunctionSignatures
        target.removeEventListener("DOMContentLoaded", bindedListener);
        ok(true, "Test listener launched once, not launched after removing listener");
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        start();
    }
    var event = target.createEvent("CustomEvent");
    event.initCustomEvent("DOMContentLoaded", true, true, {});
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addStartupContextListener(listener, context)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    var obj = { i : 1};
    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addStartupContextListener(listener, obj);
//
    function listener(e) {
        //noinspection JSCheckFunctionSignatures
        target.removeEventListener("DOMContentLoaded", bindedListener);
        ok(true, "Test listener launched once, not launched after removing listener");
        var expected = 1;
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        start();
    }
    var event = target.createEvent("CustomEvent");
    event.initCustomEvent("DOMContentLoaded", true, true, {});
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("removeStartupListener(listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    target.addEventListener("DOMContentLoaded", listener, false);
//
    function listener(e) {
        //noinspection JSCheckFunctionSignatures,JSValidateTypes
        Modules.Events.removeStartupListener(listener);
        ok(true, "Test listener launched once, not launched after removing listener");
        start();
    }

    var event = target.createEvent("CustomEvent");
    event.initCustomEvent("DOMContentLoaded", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addDocumentListener(type, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;
    //noinspection JSCheckFunctionSignatures

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    Modules.Events.addDocumentListener("testDocumentEvent", listener);

    function listener(e) {
        target.removeEventListener("testDocumentEvent", listener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("testDocumentEvent", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addDocumentListener(type, listener, useCapture)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;
    //noinspection JSCheckFunctionSignatures

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures,JSValidateTypes
    Modules.Events.addDocumentListener("testDocument2Event", listener, true);

    function listener(e) {
        target.removeEventListener("testDocument2Event", listener, true);
        e.stopPropagation();
        ok(true, "Test listener launched");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("testDocument2Event", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addDocumentContextListener(type, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    var i = 1;
    var expected = this.i;
    //noinspection JSCheckFunctionSignatures

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addDocumentListener("testDocumentContextEvent", listener);

    function listener(e) {
        target.removeEventListener("testDocumentContextEvent", bindedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("testDocumentContextEvent", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addDocumentContextListener(type, listener, useCapture)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    var i = 1;
    var expected = this.i;
    //noinspection JSCheckFunctionSignatures

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addDocumentListener("testDocumentContext2Event", listener, true);

    function listener(e) {
        target.removeEventListener("testDocumentContext2Event", bindedListener, true);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("testDocumentContext2Event", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("removeDocumentListener(type, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    target.addEventListener("testRemoveDocumentEvent", listener);
//
    function listener(e) {
        //noinspection JSCheckFunctionSignatures
        Modules.Events.removeDocumentListener("testRemoveDocumentEvent", listener);
        ok(true, "Test listener launched once, not launched after removing listener");
        start();
    }

    var event = target.createEvent("CustomEvent");
    event.initCustomEvent("testRemoveDocumentEvent", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("removeDocumentListener(type, listener, useCapture)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    target.addEventListener("testRemoveDocumentEvent2", listener);
//
    function listener(e) {
        //noinspection JSCheckFunctionSignatures
        Modules.Events.removeDocumentListener("testRemoveDocumentEvent2", listener);
        ok(true, "Test listener launched once, not launched after removing listener");
        start();
    }

    var event = target.createEvent("CustomEvent");
    event.initCustomEvent("testRemoveDocumentEvent2", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addItemLoadedListener(ITEM_TYPE=Modules.MODULE, itemName, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;
    var itemName = "item1";
    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures,JSValidateTypes
    var returnedListener = Modules.Events.addItemLoadedListener(Modules.MODULE, itemName, listener);

    function listener(e) {
        target.removeEventListener("module_" + itemName + "_loaded", returnedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("module_" + itemName + "_loaded", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addItemLoadedListener(ITEM_TYPE=Modules.TEMPLATE, itemName, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;
    var itemName = "item1";
    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures,JSValidateTypes
    var returnedListener = Modules.Events.addItemLoadedListener(Modules.TEMPLATE, itemName, listener);

    function listener(e) {
        target.removeEventListener("template_" + itemName + "_loaded", returnedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("template_" + itemName + "_loaded", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addItemLoadedListener(ITEM_TYPE=Modules.HTML, itemName, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;
    var itemName = "item1";
    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures,JSValidateTypes
    var returnedListener = Modules.Events.addItemLoadedListener(Modules.HTML, itemName, listener);

    function listener(e) {
        target.removeEventListener("html_" + itemName + "_loaded", returnedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("html_" + itemName + "_loaded", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addItemLoadedListener(ITEM_TYPE=Modules.CSS, itemName, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;
    var itemName = "item1";
    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures,JSValidateTypes
    var returnedListener = Modules.Events.addItemLoadedListener(Modules.CSS, itemName, listener);

    function listener(e) {
        target.removeEventListener("css_" + itemName + "_loaded", returnedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("css_" + itemName + "_loaded", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addItemLoadedListener(ITEM_TYPE=Modules.JAVASCRIPT, itemName, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;
    var itemName = "item1";
    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures,JSValidateTypes
    var returnedListener = Modules.Events.addItemLoadedListener(Modules.JAVASCRIPT, itemName, listener);

    function listener(e) {
        target.removeEventListener("js_" + itemName + "_loaded", returnedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("js_" + itemName + "_loaded", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addItemLoadedContextListener(ITEM_TYPE=Modules.MODULE, itemName, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    var itemName = "item1";
    var i = 1;
    var expected = this.i;
    //noinspection JSCheckFunctionSignatures

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addItemLoadedContextListener(Modules.MODULE, itemName, listener);

    function listener(e) {
        target.removeEventListener("module_" + itemName + "_loaded", bindedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("module_" + itemName + "_loaded", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addItemLoadedContextListener(ITEM_TYPE=Modules.TEMPLATE, itemName, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    var itemName = "item1";
    var i = 1;
    var expected = this.i;
    //noinspection JSCheckFunctionSignatures

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addItemLoadedContextListener(Modules.TEMPLATE, itemName, listener);

    function listener(e) {
        target.removeEventListener("template_" + itemName + "_loaded", bindedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("template_" + itemName + "_loaded", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addItemLoadedContextListener(ITEM_TYPE=Modules.HTML, itemName, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    var itemName = "item1";
    var i = 1;
    var expected = this.i;
    //noinspection JSCheckFunctionSignatures

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addItemLoadedContextListener(Modules.HTML, itemName, listener);

    function listener(e) {
        target.removeEventListener("html_" + itemName + "_loaded", bindedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("html_" + itemName + "_loaded", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addItemLoadedContextListener(ITEM_TYPE=Modules.CSS, itemName, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    var itemName = "item1";
    var i = 1;
    var expected = this.i;
    //noinspection JSCheckFunctionSignatures

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addItemLoadedContextListener(Modules.CSS, itemName, listener);

    function listener(e) {
        target.removeEventListener("css_" + itemName + "_loaded", bindedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("css_" + itemName + "_loaded", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addItemLoadedContextListener(ITEM_TYPE=Modules.JAVASCRIPT, itemName, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    var itemName = "item1";
    var i = 1;
    var expected = this.i;
    //noinspection JSCheckFunctionSignatures

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addItemLoadedContextListener(Modules.JAVASCRIPT, itemName, listener);

    function listener(e) {
        target.removeEventListener("js_" + itemName + "_loaded", bindedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("js_" + itemName + "_loaded", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addItemLoadedContextListener(ITEM_TYPE=Modules.MODULE, itemName, listener, context)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    var itemName = "item1";
    var obj = {i : 1};
    //noinspection JSCheckFunctionSignatures

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addItemLoadedContextListener(Modules.MODULE, itemName, listener, obj);

    function listener(e) {
        target.removeEventListener("module_" + itemName + "_loaded", bindedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var expected = 1;
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("module_" + itemName + "_loaded", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addItemLoadedContextListener(ITEM_TYPE=Modules.TEMPLATE, itemName, listener, context)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    var itemName = "item1";
    var obj = {i : 1};
    //noinspection JSCheckFunctionSignatures

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addItemLoadedContextListener(Modules.TEMPLATE, itemName, listener, obj);

    function listener(e) {
        target.removeEventListener("template_" + itemName + "_loaded", bindedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var expected = 1;
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("template_" + itemName + "_loaded", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addItemLoadedContextListener(ITEM_TYPE=Modules.HTML, itemName, listener, context)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    var itemName = "item1";
    var obj = {i : 1};
    //noinspection JSCheckFunctionSignatures

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addItemLoadedContextListener(Modules.HTML, itemName, listener, obj);

    function listener(e) {
        target.removeEventListener("html_" + itemName + "_loaded", bindedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var expected = 1;
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("html_" + itemName + "_loaded", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addItemLoadedContextListener(ITEM_TYPE=Modules.CSS, itemName, listener, context)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    var itemName = "item1";
    var obj = {i : 1};
    //noinspection JSCheckFunctionSignatures

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addItemLoadedContextListener(Modules.CSS, itemName, listener, obj);

    function listener(e) {
        target.removeEventListener("css_" + itemName + "_loaded", bindedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var expected = 1;
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("css_" + itemName + "_loaded", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addItemLoadedContextListener(ITEM_TYPE=Modules.JAVASCRIPT, itemName, listener, context)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    var itemName = "item1";
    var obj = {i : 1};

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addItemLoadedContextListener(Modules.JAVASCRIPT, itemName, listener, obj);

    function listener(e) {
        target.removeEventListener("js_" + itemName + "_loaded", bindedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var expected = 1;
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("js_" + itemName + "_loaded", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("removeItemLoadedListener(ITEM_TYPE=Modules.MODULE, itemName,  listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;
    var itemName = "item2";

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    target.addEventListener("module_" + itemName + "_loaded", listener);
//
    function listener(e) {
        //noinspection JSCheckFunctionSignatures,JSValidateTypes
        Modules.Events.removeItemLoadedListener(Modules.MODULE, itemName, listener);
        ok(true, "Test listener launched once, not launched after removing listener");
        start();
    }

    var event = target.createEvent("CustomEvent");
    event.initCustomEvent("module_" + itemName + "_loaded", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("removeItemLoadedListener(ITEM_TYPE=Modules.TEMPLATE, itemName,  listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;
    var itemName = "item2";

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    target.addEventListener("template_" + itemName + "_loaded", listener);
//
    function listener(e) {
        //noinspection JSCheckFunctionSignatures,JSValidateTypes
        Modules.Events.removeItemLoadedListener(Modules.TEMPLATE, itemName, listener);
        ok(true, "Test listener launched once, not launched after removing listener");
        start();
    }

    var event = target.createEvent("CustomEvent");
    event.initCustomEvent("template_" + itemName + "_loaded", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("removeItemLoadedListener(ITEM_TYPE=Modules.HTML, itemName,  listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;
    var itemName = "item2";

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    target.addEventListener("html_" + itemName + "_loaded", listener);
//
    function listener(e) {
        //noinspection JSCheckFunctionSignatures,JSValidateTypes
        Modules.Events.removeItemLoadedListener(Modules.HTML, itemName, listener);
        ok(true, "Test listener launched once, not launched after removing listener");
        start();
    }

    var event = target.createEvent("CustomEvent");
    event.initCustomEvent("html_" + itemName + "_loaded", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("removeItemLoadedListener(ITEM_TYPE=Modules.CSS, itemName,  listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;
    var itemName = "item2";

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    target.addEventListener("css_" + itemName + "_loaded", listener);
//
    function listener(e) {
        //noinspection JSCheckFunctionSignatures,JSValidateTypes
        Modules.Events.removeItemLoadedListener(Modules.CSS, itemName, listener);
        ok(true, "Test listener launched once, not launched after removing listener");
        start();
    }

    var event = target.createEvent("CustomEvent");
    event.initCustomEvent("css_" + itemName + "_loaded", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("removeItemLoadedListener(ITEM_TYPE=Modules.JAVASCRIPT, itemName,  listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;
    var itemName = "item2";

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    target.addEventListener("js_" + itemName + "_loaded", listener);
//
    function listener(e) {
        //noinspection JSCheckFunctionSignatures,JSValidateTypes
        Modules.Events.removeItemLoadedListener(Modules.JAVASCRIPT, itemName, listener);
        ok(true, "Test listener launched once, not launched after removing listener");
        start();
    }

    var event = target.createEvent("CustomEvent");
    event.initCustomEvent("js_" + itemName + "_loaded", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addBeforeItemLoadedListener(ITEM_TYPE=Modules.MODULE, itemName, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;
    var itemName = "item1";
    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures,JSValidateTypes
    var returnedListener = Modules.Events.addBeforeItemLoadedListener(Modules.MODULE, itemName, listener);

    function listener(e) {
        target.removeEventListener("module_" + itemName + "_loadingStarted", returnedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("module_" + itemName + "_loadingStarted", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addBeforeItemLoadedListener(ITEM_TYPE=Modules.TEMPLATE, itemName, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;
    var itemName = "item1";
    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures,JSValidateTypes
    var returnedListener = Modules.Events.addBeforeItemLoadedListener(Modules.TEMPLATE, itemName, listener);

    function listener(e) {
        target.removeEventListener("template_" + itemName + "_loadingStarted", returnedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("template_" + itemName + "_loadingStarted", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addBeforeItemLoadedListener(ITEM_TYPE=Modules.HTML, itemName, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;
    var itemName = "item1";
    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures,JSValidateTypes
    var returnedListener = Modules.Events.addBeforeItemLoadedListener(Modules.HTML, itemName, listener);

    function listener(e) {
        target.removeEventListener("html_" + itemName + "_loadingStarted", returnedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("html_" + itemName + "_loadingStarted", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addBeforeItemLoadedListener(ITEM_TYPE=Modules.CSS, itemName, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;
    var itemName = "item1";
    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures,JSValidateTypes
    var returnedListener = Modules.Events.addBeforeItemLoadedListener(Modules.CSS, itemName, listener);

    function listener(e) {
        target.removeEventListener("css_" + itemName + "_loadingStarted", returnedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("css_" + itemName + "_loadingStarted", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addBeforeItemLoadedListener(ITEM_TYPE=Modules.JAVASCRIPT, itemName, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;
    var itemName = "item1";
    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures,JSValidateTypes
    var returnedListener = Modules.Events.addBeforeItemLoadedListener(Modules.JAVASCRIPT, itemName, listener);

    function listener(e) {
        target.removeEventListener("js_" + itemName + "_loadingStarted", returnedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("js_" + itemName + "_loadingStarted", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addBeforeItemLoadedContextListener(ITEM_TYPE=Modules.MODULE, itemName, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    var itemName = "item1";
    var i = 1;
    var expected = this.i;
    //noinspection JSCheckFunctionSignatures

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addBeforeItemLoadedContextListener(Modules.MODULE, itemName, listener);

    function listener(e) {
        target.removeEventListener("module_" + itemName + "_loadingStarted", bindedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("module_" + itemName + "_loadingStarted", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addBeforeItemLoadedContextListener(ITEM_TYPE=Modules.TEMPLATE, itemName, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    var itemName = "item1";
    var i = 1;
    var expected = this.i;
    //noinspection JSCheckFunctionSignatures

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addBeforeItemLoadedContextListener(Modules.TEMPLATE, itemName, listener);

    function listener(e) {
        target.removeEventListener("template_" + itemName + "_loadingStarted", bindedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("template_" + itemName + "_loadingStarted", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addBeforeItemLoadedContextListener(ITEM_TYPE=Modules.HTML, itemName, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    var itemName = "item1";
    var i = 1;
    var expected = this.i;
    //noinspection JSCheckFunctionSignatures

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addBeforeItemLoadedContextListener(Modules.HTML, itemName, listener);

    function listener(e) {
        target.removeEventListener("html_" + itemName + "_loadingStarted", bindedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("html_" + itemName + "_loadingStarted", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addBeforeItemLoadedContextListener(ITEM_TYPE=Modules.CSS, itemName, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    var itemName = "item1";
    var i = 1;
    var expected = this.i;
    //noinspection JSCheckFunctionSignatures

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addBeforeItemLoadedContextListener(Modules.CSS, itemName, listener);

    function listener(e) {
        target.removeEventListener("css_" + itemName + "_loadingStarted", bindedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("css_" + itemName + "_loadingStarted", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addBeforeItemLoadedContextListener(ITEM_TYPE=Modules.JAVASCRIPT, itemName, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    var itemName = "item1";
    var i = 1;
    var expected = this.i;
    //noinspection JSCheckFunctionSignatures

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addBeforeItemLoadedContextListener(Modules.JAVASCRIPT, itemName, listener);

    function listener(e) {
        target.removeEventListener("js_" + itemName + "_loadingStarted", bindedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("js_" + itemName + "_loadingStarted", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addBeforeItemLoadedContextListener(ITEM_TYPE=Modules.MODULE, itemName, listener, context)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    var itemName = "item1";
    var obj = {i : 1};
    //noinspection JSCheckFunctionSignatures

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addBeforeItemLoadedContextListener(Modules.MODULE, itemName, listener, obj);

    function listener(e) {
        target.removeEventListener("module_" + itemName + "_loadingStarted", bindedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var expected = 1;
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("module_" + itemName + "_loadingStarted", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addBeforeItemLoadedContextListener(ITEM_TYPE=Modules.TEMPLATE, itemName, listener, context)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    var itemName = "item1";
    var obj = {i : 1};
    //noinspection JSCheckFunctionSignatures

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addBeforeItemLoadedContextListener(Modules.TEMPLATE, itemName, listener, obj);

    function listener(e) {
        target.removeEventListener("template_" + itemName + "_loadingStarted", bindedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var expected = 1;
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("template_" + itemName + "_loadingStarted", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addBeforeItemLoadedContextListener(ITEM_TYPE=Modules.HTML, itemName, listener, context)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    var itemName = "item1";
    var obj = {i : 1};
    //noinspection JSCheckFunctionSignatures

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addBeforeItemLoadedContextListener(Modules.HTML, itemName, listener, obj);

    function listener(e) {
        target.removeEventListener("html_" + itemName + "_loadingStarted", bindedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var expected = 1;
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("html_" + itemName + "_loadingStarted", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addBeforeItemLoadedContextListener(ITEM_TYPE=Modules.CSS, itemName, listener, context)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    var itemName = "item1";
    var obj = {i : 1};
    //noinspection JSCheckFunctionSignatures

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addBeforeItemLoadedContextListener(Modules.CSS, itemName, listener, obj);

    function listener(e) {
        target.removeEventListener("css_" + itemName + "_loadingStarted", bindedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var expected = 1;
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("css_" + itemName + "_loadingStarted", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("addBeforeItemLoadedContextListener(ITEM_TYPE=Modules.JAVASCRIPT, itemName, listener, context)", function() {
    //noinspection JSUnresolvedFunction
    expect(2);
    var target = document;
    var itemName = "item1";
    var obj = {i : 1};

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addBeforeItemLoadedContextListener(Modules.JAVASCRIPT, itemName, listener, obj);

    function listener(e) {
        target.removeEventListener("js_" + itemName + "_loadingStarted", bindedListener);
        e.stopPropagation();
        ok(true, "Test listener launched");
        var expected = 1;
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        //noinspection JSUnresolvedFunction
        start();
    }

    var event = target.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("js_" + itemName + "_loadingStarted", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("removeBeforeItemLoadedListener(ITEM_TYPE=Modules.MODULE, itemName,  listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;
    var itemName = "item2";

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    target.addEventListener("module_" + itemName + "_loadingStarted", listener);
//
    function listener(e) {
        //noinspection JSCheckFunctionSignatures,JSValidateTypes
        Modules.Events.removeBeforeItemLoadedListener(Modules.MODULE, itemName, listener);
        ok(true, "Test listener launched once, not launched after removing listener");
        start();
    }

    var event = target.createEvent("CustomEvent");
    event.initCustomEvent("module_" + itemName + "_loadingStarted", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("removeBeforeItemLoadedListener(ITEM_TYPE=Modules.TEMPLATE, itemName,  listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;
    var itemName = "item2";

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    target.addEventListener("template_" + itemName + "_loadingStarted", listener);
//
    function listener(e) {
        //noinspection JSCheckFunctionSignatures,JSValidateTypes
        Modules.Events.removeBeforeItemLoadedListener(Modules.TEMPLATE, itemName, listener);
        ok(true, "Test listener launched once, not launched after removing listener");
        start();
    }

    var event = target.createEvent("CustomEvent");
    event.initCustomEvent("template_" + itemName + "_loadingStarted", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("removeBeforeItemLoadedListener(ITEM_TYPE=Modules.HTML, itemName,  listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;
    var itemName = "item2";

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    target.addEventListener("html_" + itemName + "_loadingStarted", listener);
//
    function listener(e) {
        //noinspection JSCheckFunctionSignatures,JSValidateTypes
        Modules.Events.removeBeforeItemLoadedListener(Modules.HTML, itemName, listener);
        ok(true, "Test listener launched once, not launched after removing listener");
        start();
    }

    var event = target.createEvent("CustomEvent");
    event.initCustomEvent("html_" + itemName + "_loadingStarted", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("removeBeforeItemLoadedListener(ITEM_TYPE=Modules.CSS, itemName,  listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;
    var itemName = "item2";

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    target.addEventListener("css_" + itemName + "_loadingStarted", listener);
//
    function listener(e) {
        //noinspection JSCheckFunctionSignatures,JSValidateTypes
        Modules.Events.removeBeforeItemLoadedListener(Modules.CSS, itemName, listener);
        ok(true, "Test listener launched once, not launched after removing listener");
        start();
    }

    var event = target.createEvent("CustomEvent");
    event.initCustomEvent("css_" + itemName + "_loadingStarted", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//noinspection JSUnresolvedFunction
asyncTest("removeBeforeItemLoadedListener(ITEM_TYPE=Modules.JAVASCRIPT, itemName,  listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var target = document;
    var itemName = "item2";

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    target.addEventListener("js_" + itemName + "_loadingStarted", listener);
//
    function listener(e) {
        //noinspection JSCheckFunctionSignatures,JSValidateTypes
        Modules.Events.removeBeforeItemLoadedListener(Modules.JAVASCRIPT, itemName, listener);
        ok(true, "Test listener launched once, not launched after removing listener");
        start();
    }

    var event = target.createEvent("CustomEvent");
    event.initCustomEvent("js_" + itemName + "_loadingStarted", true, true, {});
    target.dispatchEvent(event);
    target.dispatchEvent(event);
});

//nexttests

//noinspection JSUnresolvedFunction
asyncTest("addListeners (targets, type, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(3);
    var targets = document.getElementsByClassName("addListenersTest");
    //noinspection JSCheckFunctionSignatures

    //noinspection JSCheckFunctionSignatures
    var returnedListener = Modules.Events.addListeners(targets, "testAddListeners", listener);
    equal(returnedListener, listener, "Event return listener correctly");
    var listen = 0;
    function listener(e) {
        start();
        e.target.removeEventListener("testAddListeners", returnedListener);
        ok(true, "Test listener launched");
        listen++;
        if (listen < 2) {
            stop();
        }
    }

    var event = document.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("testAddListeners", true, true, {});
    for (var i = 0; i < targets.length; i++) {
        targets[i].dispatchEvent(event);
    }
});

//noinspection JSUnresolvedFunction
asyncTest("addListeners (targets, type, listener, useCapture)", function() {
    //noinspection JSUnresolvedFunction
    expect(3);
    var targets = document.getElementsByClassName("addListenersTest");
    //noinspection JSCheckFunctionSignatures

    //noinspection JSCheckFunctionSignatures
    var returnedListener = Modules.Events.addListeners(targets, "testAddListeners2", listener, true);
    equal(returnedListener, listener, "Event return listener correctly");
    var listen = 0;
    function listener(e) {
        start();
        e.target.removeEventListener("testAddListeners2", returnedListener, true);
        ok(true, "Test listener launched");
        listen++;
        if (listen < 2) {
            stop();
        }
    }

    var event = document.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("testAddListeners2", true, true, {});
    for (var i = 0; i < targets.length; i++) {
        targets[i].dispatchEvent(event);
    }
});

//noinspection JSUnresolvedFunction
asyncTest("addContextListeners (targets, type, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(4);
    var targets = document.getElementsByClassName("addListenersTest");
    var i = 1;
    var expected = this.i;
    //noinspection JSCheckFunctionSignatures

    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addContextListeners(targets, "testAddListeners3", listener);
    function listener(e) {
        start();
        e.target.removeEventListener("testAddListeners3", bindedListener);
        ok(true, "Test listener launched");
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        stop();
    }

    var event = document.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("testAddListeners3", true, true, {});
    for (var i = 0; i < targets.length; i++) {
        targets[i].dispatchEvent(event);
    }
    start();
});

//noinspection JSUnresolvedFunction
asyncTest("addContextListeners (targets, type, listener, context)", function() {
    //noinspection JSUnresolvedFunction
    expect(4);
    var targets = document.getElementsByClassName("addContextListenersTest");
    var obj = {i:1};
    //noinspection JSCheckFunctionSignatures

    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addContextListeners(targets, "testAddListeners4", listener, obj);
    function listener(e) {
        start();
        e.target.removeEventListener("testAddListeners4", bindedListener);
        ok(true, "Test listener launched");
        var expected = 1;
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        stop();
    }

    var event = document.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("testAddListeners4", true, true, {});
    for (var i = 0; i < targets.length; i++) {
        targets[i].dispatchEvent(event);
    }
    start();
});

//noinspection JSUnresolvedFunction
asyncTest("addContextListeners (targets, type, listener, context, useCapture)", function() {
    //noinspection JSUnresolvedFunction
    expect(4);
    var targets = document.getElementsByClassName("addContextListenersTest");
    //noinspection JSCheckFunctionSignatures
    var obj = {i:1, listen:0, scope: this}
    //noinspection JSCheckFunctionSignatures
    var bindedListener = Modules.Events.addContextListeners(targets, "testAddListeners3", listener, obj, true);
    function listener(e) {
        start();
        e.target.removeEventListener("testAddListeners3", bindedListener, true);
        ok(true, "Test listener launched");
        var expected = 1;
        var actual = this.i;
        equal(actual, expected, "Context this was binded correctly");
        stop();
    }

    var event = document.createEvent("CustomEvent");
    //noinspection JSUnresolvedFunction
    event.initCustomEvent("testAddListeners3", true, true, {});
    for (var i = 0; i < targets.length; i++) {
        targets[i].dispatchEvent(event);
    }
    start();
});

//noinspection JSUnresolvedFunction
asyncTest("removeListeners(target, type, listener)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var targets = document.getElementsByClassName("removeListenersTest");

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    for (var i = 0; i < targets.length; i++) {
        targets[i].addEventListener("testRemoveListeners", listener);
    }

    function listener(e) {
        start();
        //noinspection JSCheckFunctionSignatures
        //Remove all listeners
        Modules.Events.removeListeners(targets, "testRemoveListeners", listener);
        ok(true, "Test listener launched once, not launched after removing listener");
        stop();
    }

    var event = document.createEvent("CustomEvent");
    event.initCustomEvent("testRemoveListeners", true, true, {});
    for (var i = 0; i < targets.length; i++) {
        targets[i].dispatchEvent(event);
    }
    start();
});

//noinspection JSUnresolvedFunction
asyncTest("removeListeners(target, type, listener, useCapture)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var targets = document.getElementsByClassName("removeListenersTest");

    //Event must be handled one time only
    //noinspection JSCheckFunctionSignatures
    for (var i = 0; i < targets.length; i++) {
        targets[i].addEventListener("testRemoveListenersWC", listener, true);
    }

    function listener(e) {
        start();
        //noinspection JSCheckFunctionSignatures
        //Remove all listeners
        Modules.Events.removeListeners(targets, "testRemoveListenersWC", listener, true);
        ok(true, "Test listener launched once, not launched after removing listener");
        stop();
    }

    var event = document.createEvent("CustomEvent");
    event.initCustomEvent("testRemoveListenersWC", true, true, {});
    for (var i = 0; i < targets.length; i++) {
        targets[i].dispatchEvent(event);
    }
    start();
});

//noinspection JSUnresolvedFunction
asyncTest("dispatchCustomEvent (target, type)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    document.addEventListener("customEvent", listener);
    //noinspection JSCheckFunctionSignatures
    Modules.Events.dispatchCustomEvent(document, "customEvent");

    function listener(e) {
        start();
        //noinspection JSCheckFunctionSignatures
        //Remove all listeners
        document.removeEventListener("customEvent", listener);
        ok(true, "Custom event dispatched");
    }
});

//noinspection JSUnresolvedFunction
asyncTest("dispatchCustomEvent (target, type, detail)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    document.addEventListener("customEvent2", listener);
    //noinspection JSCheckFunctionSignatures
    Modules.Events.dispatchCustomEvent(document, "customEvent2", {parameter: true});

    function listener(e) {
        start();
        //noinspection JSCheckFunctionSignatures
        document.removeEventListener("customEvent2", listener);
        ok(e.detail.parameter, "Custom event dispatched, parameter is set correctly");
    }
});

//noinspection JSUnresolvedFunction
asyncTest("dispatchCustomEvent (target, type, detail, canBubble=false)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var body = document.getElementsByTagName("body")[0];
    var divRoot = document.getElementsByClassName("dispatchCustomEventTest")[0];
    document.addEventListener("customEvent3", listener);
    //noinspection JSCheckFunctionSignatures
    function listener(e) {

        //noinspection JSCheckFunctionSignatures
        document.removeEventListener("customEvent3", listener);
        ok(false, "Error, event listen second time");
    }

    Modules.Events.dispatchCustomEvent(divRoot, "customEvent3", {parameter: true}, false);
    start();
    ok(true, "Custom event is not dispatched in top element, bubbling disabled");

});

//noinspection JSUnresolvedFunction
asyncTest("dispatchCustomEvent (target, type, detail, canBubble=true)", function() {
    //noinspection JSUnresolvedFunction
    expect(1);
    var divRoot = document.getElementsByClassName("dispatchCustomEventTest")[0];
    document.addEventListener("customEvent5", listener);
    //noinspection JSCheckFunctionSignatures

    function listener(e) {
        start();
        //noinspection JSCheckFunctionSignatures
        document.removeEventListener("customEvent5", listener);
        ok(e.detail.parameter, "Custom event dispatched in top element, bubbling enabled");
    }

    Modules.Events.dispatchCustomEvent(divRoot, "customEvent5", {parameter: true}, true);
});

//Offtopic: Events in the JS distributed under the item: first up (bubbling), then down (capturing).
// If the event occurred on the item under a handler - a handler on the element above event will see.
// Thus an event handler must be in the same cell where it occurred or lower.

//noinspection JSUnresolvedFunction
asyncTest("dispatchCustomEvent (target, type, detail, canBubble, cancellable=false)", function() {
    //noinspection JSUnresolvedFunction
    expect(3);
    var divRoot = document.getElementsByClassName("dispatchCustomEventTest")[0];
    document.addEventListener("customEvent7", listener);
    //noinspection JSCheckFunctionSignatures

    function listener(e) {
        start();
        //noinspection JSCheckFunctionSignatures
        e.preventDefault();
        document.removeEventListener("customEvent7", listener);
        ok(e.detail.parameter, "Custom event dispatched in top element, bubbling enabled");
        stop();
    }

    var cancellableStatus = Modules.Events.dispatchCustomEvent(divRoot, "customEvent7", {parameter: true}, true, false);
    equal(cancellableStatus, true, "Default not prevented");
    var cancellableStatus = Modules.Events.dispatchCustomEvent(divRoot, "customEvent7", {parameter: true}, true, false);
    equal(cancellableStatus, true, "Default is not prevented in previous listener call, cancellable == false, return == true");
    start();
});

//noinspection JSUnresolvedFunction
asyncTest("dispatchCustomEvent (target, type, detail, canBubble, cancellable=true)", function() {
    //noinspection JSUnresolvedFunction
    expect(3);
    var divRoot = document.getElementsByClassName("dispatchCustomEventTest")[0];
    document.addEventListener("customEvent6", listener);
    //noinspection JSCheckFunctionSignatures

    function listener(e) {
        start();
        //noinspection JSCheckFunctionSignatures
        e.preventDefault();
        document.removeEventListener("customEvent6", listener);
        ok(e.detail.parameter, "Custom event dispatched in top element, bubbling enabled");
        stop();
    }

    var cancellableStatus = Modules.Events.dispatchCustomEvent(divRoot, "customEvent6", {parameter: true}, true, true);
    equal(cancellableStatus, false, "Default is prevented");
    var cancellableStatus = Modules.Events.dispatchCustomEvent(divRoot, "customEvent6", {parameter: true}, true, true);
    equal(cancellableStatus, true, "Default is not prevented");
    start();
});

//noinspection JSUnresolvedFunction
module("Modules.Events.Messages", {
    setup: function() {
        //Definition of Setup module
        //noinspection JSUnresolvedVariable
        window.exports = window.exports || (window.exports = {});
        (function (Setup) {
            function subscribe () {
                var body = document.getElementsByTagName("body")[0];
                var divRoot0 = document.createElement('div');
                divRoot0.className = "subscribe_el1";
                body.appendChild(divRoot0);
                var divRoot1 = document.createElement("div");
                divRoot1.className = "subscribe_el2";
                body.appendChild(divRoot1);
            }

            Setup.subscribe = subscribe;

        }(window.exports.Setup || (window.exports.Setup = {})));
        //noinspection JSUnresolvedVariable
        var Setup = window.exports.Setup;

        //Setup excecution
        Setup.subscribe();
    },
    teardown: function() {
        //Definition of Teardown module
        //noinspection JSUnresolvedVariable
        window.exports = window.exports || (window.exports = {});
        (function (Teardown) {
            function subscribe() {
                var body = document.getElementsByTagName("body")[0];

                var divRoot = document.getElementsByClassName("subscribe_el1")[0];
                body.removeChild(divRoot);

                var divRoot = document.getElementsByClassName("subscribe_el2")[0];
                body.removeChild(divRoot);
            }
            Teardown.subscribe = subscribe;
        }(window.exports.Teardown || (window.exports.Teardown = {})));
        //noinspection JSUnresolvedVariable
        var Teardown = window.exports.Teardown;

        //Teardown execution
        Teardown.subscribe();
    }
});

asyncTest("subscribe (theme, listener)", function() {
    expect(1);
    var msg = Modules.Events.Messages;
    var evt = Modules.Events;
    var theme = "greetings";
    var detail = {item: "true"};
    var sourceID = null;
    var destinationID = null;
    //noinspection JSCheckFunctionSignatures
    msg.subscribe(theme, receiver);
    function receiver(e) {
        //noinspection JSCheckFunctionSignatures
        evt.removeDocumentListener("modulesjs_message_" + theme, receiver);
        equal(e.detail.message.item, "true", "Message received");
        start();
    }
    //noinspection JSCheckFunctionSignatures
    var detailObject = {"postAdress": {"sourceID" : sourceID, "destinationID": destinationID}, "message": detail};
    evt.dispatchCustomEvent(document, "modulesjs_message_" + theme, detailObject);
});

asyncTest("subscribe (theme, listener, sourceID)", function() {
    expect(1);
    var msg = Modules.Events.Messages;
    var evt = Modules.Events;
    var theme = "greetings";
    var detail = {item: "true"};
    var sourceID = "element1";
    var destinationID = null;
    //noinspection JSCheckFunctionSignatures
    msg.subscribe(theme, receiver, sourceID);
    function receiver(e) {
        //noinspection JSCheckFunctionSignatures
        evt.removeDocumentListener("modulesjs_message_" + theme + "_" + sourceID, receiver);
        equal(e.detail.message.item, "true", "Message received");
        start();
    }
    //noinspection JSCheckFunctionSignatures
    var detailObject = {"postAdress": {"sourceID" : sourceID, "destinationID": destinationID}, "message": detail};
    evt.dispatchCustomEvent(document, "modulesjs_message_" + theme + "_" + sourceID, detailObject);
});

asyncTest("subscribe (theme, listener, sourceID, destinationID)", function() {
    expect(1);
    var msg = Modules.Events.Messages;
    var evt = Modules.Events;
    var theme = "greetings";
    var detail = {item: "true"};
    var sourceID = "element1";
    var destinationID = "element2";
    //noinspection JSCheckFunctionSignatures
    msg.subscribe(theme, receiver, sourceID, destinationID);
    function receiver(e) {
        //noinspection JSCheckFunctionSignatures
        evt.removeDocumentListener("modulesjs_message_" + theme + "_" + sourceID + "_" + destinationID, receiver);
        equal(e.detail.message.item, "true", "Message received");
        start();
    }
    //noinspection JSCheckFunctionSignatures
    var detailObject = {"postAdress": {"sourceID" : sourceID, "destinationID": destinationID}, "message": detail};
    evt.dispatchCustomEvent(document, "modulesjs_message_" + theme + "_" + sourceID + "_" + destinationID, detailObject);
});

asyncTest("subscribe (theme, listener, undefined, destinationID)", function() {
    expect(1);
    var msg = Modules.Events.Messages;
    var evt = Modules.Events;
    var theme = "greetings";
    var detail = {item: "true"};
    var sourceID = undefined;
    var destinationID = "element2";
    //noinspection JSCheckFunctionSignatures,JSValidateTypes
    msg.subscribe(theme, receiver, sourceID, destinationID);
    function receiver(e) {
        //noinspection JSCheckFunctionSignatures
        evt.removeDocumentListener("modulesjs_message_" + theme + "__" + destinationID, receiver);
        equal(e.detail.message.item, "true", "Message received");
        start();
    }
    //noinspection JSCheckFunctionSignatures
    var detailObject = {"postAdress": {"sourceID" : sourceID, "destinationID": destinationID}, "message": detail};
    evt.dispatchCustomEvent(document, "modulesjs_message_" + theme + "__" + destinationID, detailObject);
});

asyncTest("subscribe (theme, listener, null, destinationID)", function() {
    expect(1);
    var msg = Modules.Events.Messages;
    var evt = Modules.Events;
    var theme = "greetings";
    var detail = {item: "true"};
    var sourceID = null;
    var destinationID = "element2";
    //noinspection JSCheckFunctionSignatures,JSValidateTypes
    msg.subscribe(theme, receiver, sourceID, destinationID);
    function receiver(e) {
        //noinspection JSCheckFunctionSignatures
        evt.removeDocumentListener("modulesjs_message_" + theme + "__" + destinationID, receiver);
        equal(e.detail.message.item, "true", "Message received");
        start();
    }
    //noinspection JSCheckFunctionSignatures
    var detailObject = {"postAdress": {"sourceID" : sourceID, "destinationID": destinationID}, "message": detail};
    evt.dispatchCustomEvent(document, "modulesjs_message_" + theme + "__" + destinationID, detailObject);
});

asyncTest("send (theme, detail)", function() {
    expect(3);
    var msg = Modules.Events.Messages;
    var evt = Modules.Events;
    var theme = "greetings";
    var detail = {item: "true"};
    var sourceID = null;
    var destinationID = null;
    //noinspection JSCheckFunctionSignatures,JSValidateTypes
    evt.addDocumentListener("modulesjs_message_" + theme, receiver);
    function receiver(e) {
        //noinspection JSCheckFunctionSignatures
        start();
        evt.removeDocumentListener("modulesjs_message_" + theme, receiver);
        equal(e.detail.message.item, "true", "Message received");
        equal(e.detail.postAdress.sourceID, null, "Source undefined");
        equal(e.detail.postAdress.destinationID, null, "Destination undefined");
    }
    //noinspection JSCheckFunctionSignatures
    msg.send(theme, detail);
});

asyncTest("send (theme, detail, sourceID)", function() {
    expect(3);
    var msg = Modules.Events.Messages;
    var evt = Modules.Events;
    var theme = "greetings";
    var detail = {item: "true"};
    var sourceID = "source";
    var destinationID = null;
    //noinspection JSCheckFunctionSignatures,JSValidateTypes
    evt.addDocumentListener("modulesjs_message_" + theme + "_" + sourceID, receiver);
    function receiver(e) {
        start();
        //noinspection JSCheckFunctionSignatures
        evt.removeDocumentListener("modulesjs_message_" + theme + "_" + sourceID, receiver);
        equal(e.detail.message.item, "true", "Message received");
        equal(e.detail.postAdress.sourceID, sourceID, "Source correct");
        equal(e.detail.postAdress.destinationID, null, "Destination undefined");
    }
    //noinspection JSCheckFunctionSignatures
    msg.send(theme, detail, sourceID);
});

asyncTest("send (theme, detail, null, destinationID)", function() {
    expect(3);
    var msg = Modules.Events.Messages;
    var evt = Modules.Events;
    var theme = "greetings";
    var detail = {item: "true"};
    var sourceID = null;
    var destinationID = "destination";
    //noinspection JSCheckFunctionSignatures,JSValidateTypes
    evt.addDocumentListener("modulesjs_message_" + theme + "__" + destinationID, receiver);
    function receiver(e) {
        start();
        //noinspection JSCheckFunctionSignatures
        evt.removeDocumentListener("modulesjs_message_" + theme + "__" + destinationID, receiver);
        equal(e.detail.message.item, "true", "Message received");
        equal(e.detail.postAdress.sourceID, null, "Source undefined");
        equal(e.detail.postAdress.destinationID, destinationID, "Destination correct");
    }
    //noinspection JSCheckFunctionSignatures
    msg.send(theme, detail, undefined, destinationID);
});

asyncTest("send (theme, detail, sourceID, destinationID)", function() {
    expect(3);
    var msg = Modules.Events.Messages;
    var evt = Modules.Events;
    var theme = "greetings";
    var detail = {item: "true"};
    var sourceID = "source";
    var destinationID = "destination";
    //noinspection JSCheckFunctionSignatures,JSValidateTypes
    evt.addDocumentListener("modulesjs_message_" + theme + "_" + sourceID + "_" + destinationID, receiver);
    function receiver(e) {
        start();
        //noinspection JSCheckFunctionSignatures
        evt.removeDocumentListener("modulesjs_message_" + theme + "_" + sourceID + "_" + destinationID, receiver);
        equal(e.detail.message.item, "true", "Message received");
        equal(e.detail.postAdress.sourceID, sourceID, "Source correct");
        equal(e.detail.postAdress.destinationID, destinationID, "Destination correct");
    }
    //noinspection JSCheckFunctionSignatures
    msg.send(theme, detail, sourceID, destinationID);
});

asyncTest("unsubscribe (theme, listener)", function() {
    expect(3);
    var msg = Modules.Events.Messages;
    var evt = Modules.Events;
    var theme = "greetings";
    var detail = {item: "true"};
    var sourceID = null;
    var destinationID = null;
    //noinspection JSCheckFunctionSignatures,JSValidateTypes
    evt.addDocumentListener("modulesjs_message_" + theme, receiver);
    function receiver(e) {
        start();
        //noinspection JSCheckFunctionSignatures
        msg.unsubscribe(theme, receiver);
        equal(e.detail.message.item, "true", "Message received");
        equal(e.detail.postAdress.sourceID, null, "Source undefined");
        equal(e.detail.postAdress.destinationID, null, "Destination undefined");
    }
    //noinspection JSCheckFunctionSignatures
    var detailObject = {"postAdress": {"sourceID" : sourceID, "destinationID": destinationID}, "message": detail};
    evt.dispatchCustomEvent(document, "modulesjs_message_" + theme, detailObject);
});

asyncTest("unsubscribe (theme, listener, sourceID)", function() {
    expect(3);
    var msg = Modules.Events.Messages;
    var evt = Modules.Events;
    var theme = "greetings";
    var detail = {item: "true"};
    var sourceID = "source";
    var destinationID = null;
    //noinspection JSCheckFunctionSignatures,JSValidateTypes
    evt.addDocumentListener("modulesjs_message_" + theme + "_" + sourceID, receiver);
    function receiver(e) {
        start();
        //noinspection JSCheckFunctionSignatures
        msg.unsubscribe(theme, receiver, sourceID);
        equal(e.detail.message.item, "true", "Message received");
        equal(e.detail.postAdress.sourceID, sourceID, "Source correct");
        equal(e.detail.postAdress.destinationID, null, "Destination undefined");
    }
    //noinspection JSCheckFunctionSignatures
    var detailObject = {"postAdress": {"sourceID" : sourceID, "destinationID": destinationID}, "message": detail};
    evt.dispatchCustomEvent(document, "modulesjs_message_" + theme + "_" + sourceID, detailObject);
});

asyncTest("unsubscribe (theme, listener, null, destinationID)", function() {
    expect(3);
    var msg = Modules.Events.Messages;
    var evt = Modules.Events;
    var theme = "greetings";
    var detail = {item: "true"};
    var sourceID = null;
    var destinationID = "destination";
    //noinspection JSCheckFunctionSignatures,JSValidateTypes
    evt.addDocumentListener("modulesjs_message_" + theme + "__" + destinationID, receiver);
    function receiver(e) {
        start();
        //noinspection JSCheckFunctionSignatures
        msg.unsubscribe(theme, receiver, undefined, destinationID);
        equal(e.detail.message.item, "true", "Message received");
        equal(e.detail.postAdress.sourceID, null, "Source undefined");
        equal(e.detail.postAdress.destinationID, destinationID, "Destination correct");
    }
    //noinspection JSCheckFunctionSignatures
    var detailObject = {"postAdress": {"sourceID" : sourceID, "destinationID": destinationID}, "message": detail};
    evt.dispatchCustomEvent(document, "modulesjs_message_" + theme + "__" + destinationID, detailObject);
});

asyncTest("unsubscribe (theme, listener, sourceID, destinationID)", function() {
    expect(3);
    var msg = Modules.Events.Messages;
    var evt = Modules.Events;
    var theme = "greetings";
    var detail = {item: "true"};
    var sourceID = "source";
    var destinationID = "destination";
    //noinspection JSCheckFunctionSignatures,JSValidateTypes
    evt.addDocumentListener("modulesjs_message_" + theme + "_"+ sourceID +"_" + destinationID, receiver);
    function receiver(e) {
        start();
        //noinspection JSCheckFunctionSignatures
        msg.unsubscribe(theme, receiver, sourceID, destinationID);
        equal(e.detail.message.item, "true", "Message received");
        equal(e.detail.postAdress.sourceID, sourceID, "Source undefined");
        equal(e.detail.postAdress.destinationID, destinationID, "Destination correct");
    }
    //noinspection JSCheckFunctionSignatures
    var detailObject = {"postAdress": {"sourceID" : sourceID, "destinationID": destinationID}, "message": detail};
    evt.dispatchCustomEvent(document, "modulesjs_message_" + theme + "_" + sourceID + "_" + destinationID, detailObject);
});

asyncTest("subscribe, send, unsubscribe (theme, detail)", function() {
    expect(3);
    var msg = Modules.Events.Messages;
    var theme = "greetings";
    var detail = {item: "true"};
    var sourceID = null;
    var destinationID = null;
    //noinspection JSCheckFunctionSignatures,JSValidateTypes
    msg.subscribe(theme, receiver);
    function receiver(e) {
        start();
        //noinspection JSCheckFunctionSignatures
        msg.unsubscribe(theme, receiver);
        equal(e.detail.message.item, "true", "Message received");
        equal(e.detail.postAdress.sourceID, sourceID, "Source undefined");
        equal(e.detail.postAdress.destinationID, destinationID, "Destination undefined");
    }
    //noinspection JSCheckFunctionSignatures
    msg.send(theme, detail);
});

asyncTest("subscribe, send, unsubscribe (theme, detail, sourceID)", function() {
    expect(3);
    var msg = Modules.Events.Messages;
    var theme = "greetings";
    var detail = {item: "true"};
    var sourceID = "source";
    var destinationID = null;
    //noinspection JSCheckFunctionSignatures,JSValidateTypes
    msg.subscribe(theme, receiver, sourceID);
    function receiver(e) {
        start();
        //noinspection JSCheckFunctionSignatures
        msg.unsubscribe(theme, receiver, sourceID);
        equal(e.detail.message.item, "true", "Message received");
        equal(e.detail.postAdress.sourceID, sourceID, "Source correct");
        equal(e.detail.postAdress.destinationID, destinationID, "Destination undefined");
    }
    //noinspection JSCheckFunctionSignatures
    msg.send(theme, detail, sourceID);
});

asyncTest("subscribe, send, unsubscribe (theme, detail, null, destinationID)", function() {
    expect(3);
    var msg = Modules.Events.Messages;
    var theme = "greetings";
    var detail = {item: "true"};
    var sourceID = null;
    var destinationID = "destination";
    //noinspection JSCheckFunctionSignatures,JSValidateTypes
    msg.subscribe(theme, receiver, null, destinationID);
    function receiver(e) {
        start();
        //noinspection JSCheckFunctionSignatures
        msg.unsubscribe(theme, receiver, null, destinationID);
        equal(e.detail.message.item, "true", "Message received");
        equal(e.detail.postAdress.sourceID, sourceID, "Source undefined");
        equal(e.detail.postAdress.destinationID, destinationID, "Destination correct");
    }
    //noinspection JSCheckFunctionSignatures
    msg.send(theme, detail, null, destinationID);
});

asyncTest("subscribe, send, unsubscribe (theme, detail, sourceID, destinationID)", function() {
    expect(3);
    var msg = Modules.Events.Messages;
    var theme = "greetings";
    var detail = {item: "true"};
    var sourceID = "source";
    var destinationID = "destination";
    //noinspection JSCheckFunctionSignatures,JSValidateTypes
    msg.subscribe(theme, receiver, sourceID, destinationID);
    function receiver(e) {
        start();
        //noinspection JSCheckFunctionSignatures
        msg.unsubscribe(theme, receiver, sourceID, destinationID);
        equal(e.detail.message.item, "true", "Message received");
        equal(e.detail.postAdress.sourceID, sourceID, "Source correct");
        equal(e.detail.postAdress.destinationID, destinationID, "Destination correct");
    }
    //noinspection JSCheckFunctionSignatures
    msg.send(theme, detail, sourceID, destinationID);
});

//noinspection JSUnresolvedFunction
module("Modules.Loader", {
    setup: function() {
        //Definition of Setup module
        //noinspection JSUnresolvedVariable
        window.exports = window.exports || (window.exports = {});
        (function (Setup) {
            function loadModuleSimple () {
                var body = document.getElementsByTagName("body")[0];
                var divRoot0 = document.createElement('div');
                divRoot0.className = "loadModuleSimpleTest";
                body.appendChild(divRoot0);
            }

            Setup.loadModuleSimple = loadModuleSimple;
        }(window.exports.Setup || (window.exports.Setup = {})));
        //noinspection JSUnresolvedVariable
        var Setup = window.exports.Setup;

        //Setup excecution
        Setup.loadModuleSimple();
    },
    teardown: function() {
        //Definition of Teardown module
        //noinspection JSUnresolvedVariable
        window.exports = window.exports || (window.exports = {});
        (function (Teardown) {
            function loadModuleSimple() {
                var body = document.getElementsByTagName("body")[0];

                var divRoot = document.getElementsByClassName("loadModuleSimpleTest")[0];
                body.removeChild(divRoot);
            }

            Teardown.loadModuleSimple = loadModuleSimple;

        }(window.exports.Teardown || (window.exports.Teardown = {})));
        //noinspection JSUnresolvedVariable
        var Teardown = window.exports.Teardown;

        //Teardown execution
        Teardown.loadModuleSimple();
    }
});

asyncTest("load (itemType=Modules.MODULE, path, itemName, className, callback)", function(){
    expect(1);
    var loader = Modules.Loader;
    var modulesPath = "modules_forTests";
    loader.load(Modules.MODULE, modulesPath, "test", "loadModuleSimpleTest", testModuleLoaded);
    function testModuleLoaded () {
        ok(true, "Module loaded callback excecuted");
        start();
    }
});



//module("Modules.Loader", {
//    setup: function() {
////        var divloadTest = document.createElement('div');
////        divloadTest.className = "loadTest";
////        document.getElementsByTagName("body")[0].appendChild(divloadTest);
////        var divloadTest = document.createElement('div');
////        divloadTest.className = "loadTest";
////        document.getElementsByTagName("body")[0].appendChild(divloadTest);
////        var divloadHTMLTest = document.createElement('div');
////        divloadHTMLTest.className = "loadHTMLTest";
////        document.getElementsByTagName("body")[0].appendChild(divloadHTMLTest);
////        var divloadTemplateTest = document.createElement('div');
////        divloadTemplateTest.className = "loadTemplateTest";
////        document.getElementsByTagName("body")[0].appendChild(divloadTemplateTest);
//    },
//    teardown: function() {
////        var divloadTest = document.getElementsByClassName("loadTest")[0];
////        document.getElementsByTagName("body")[0].removeChild(divloadTest);
////        var divloadTest = document.getElementsByClassName("loadTest")[0];
////        document.getElementsByTagName("body")[0].removeChild(divloadTest);
////        var divloadHTMLTest = document.getElementsByClassName("loadHTMLTest")[0];
////        document.getElementsByTagName("body")[0].removeChild(divloadHTMLTest);
////        var divloadTemplateTest = document.getElementsByClassName("loadTemplateTest")[0];
////        document.getElementsByTagName("body")[0].removeChild(divloadTemplateTest);
//    }
//});
//test("path", function() {
////    expect(4);
//    var expectedPath = "modules_forTests";
//    var loader = new Modules.Loader(expectedPath);
//    equal(loader.path, expectedPath, "Loader.path is set correctly: " + loader.path);
//    throws(
//        function() {
//            loader.path = "unexpectedPath";
//        }, Error,
//        "Trying to set loader.path without constructor. Throw exception, loader.path isn`t changed: " + loader.path
//    );
//    var loaderWithoutPath = new Modules.Loader();
//    var expectedAutoPath = "";
//    equal(loaderWithoutPath.path, expectedAutoPath, "Loader.path is set automatically on current directory, " +
//        "if path isn`t specified in constructor. " + loaderWithoutPath.path);
//    var loaderWithSlash = new Modules.Loader("modules_forTests/");
//    equal(expectedPath, loaderWithSlash.path, "Loader.path with slash in end of path. Slash removed: " + loaderWithSlash.path);
//});

//asyncTest("load (itemName, className, callback, loader.itemTypes.module)", function() {
////    expect(32);
//    var path = "modules_forTests";
//    var loader = new Modules.Loader(path);
//    var moduleName = "test";
//    var className = "loadModuleTest";
//    var modulePath = path + "/" + moduleName + "/" + moduleName;
//    document.addEventListener("module_" + moduleName + "_loaded", whenModuleLoadedWithEvent, true);
//    function whenModuleLoadedWithEvent(event) {
//        if (event.detail.itemInfo.className == className) {
//            checkModuleLoaded(moduleName, modulePath, "event assert");
//        }
//    }
//    function whenModuleLoadedWithCallback() {
//        checkModuleLoaded(moduleName, modulePath, className, "callback assert");
//        start();
//    }
//    loader.load(moduleName, className, whenModuleLoadedWithCallback);
//
//    function checkModuleLoaded(moduleName, modulePath, className, comment) {
//        //CSS loaded check
//        var modulesCSSprefix = "modulesjs_css_";
//        var cssLoaded = document.getElementsByClassName(modulesCSSprefix + moduleName)[0];
//        var loadedCSSHrefWithHost = cssLoaded.href;
//        var actualLoadedCSSHref = loadedCSSHrefWithHost.replace(window.location.host + "/", "").replace("http://", "").replace("https://","");
//        var expectedCSSHref = modulePath + ".css";
//        equal(actualLoadedCSSHref, expectedCSSHref, "CSS Href loaded correctly (" + comment + "): " + actualLoadedCSSHref);
//        var actualLoadedCSSClassName = cssLoaded.className;
//        var expectedCSSClassName = modulesCSSprefix + moduleName;
//        equal(actualLoadedCSSClassName, expectedCSSClassName, "CSS ClassName loaded correctly (" + comment + "): " + actualLoadedCSSClassName);
//        var actualLoadedCSSType = cssLoaded.type;
//        var expectedCSSType = "text/css";
//        equal(actualLoadedCSSType, expectedCSSType, "CSS Type loaded correctly (" + comment + "): " + actualLoadedCSSType);
//        var actualLoadedCSSStylesheet = cssLoaded.rel;
//        var expectedCSSStylesheet = "stylesheet";
//        equal(actualLoadedCSSStylesheet, expectedCSSStylesheet, "CSS Rel loaded correctly (" + comment + "): " + actualLoadedCSSStylesheet);
//        //End CSS Loaded check
//
//        //Javascript loaded check
//        var modulesJsPrefix = "modulesjs_js_";
//
//        var jsLoaded = document.getElementsByClassName(modulesJsPrefix + moduleName)[0];
//        var loadedJsSrcWithHost = jsLoaded.src;
//        var actualLoadedJsSrc = loadedJsSrcWithHost.replace(window.location.host + "/", "").replace("http://", "").replace("https://","");
//        var expectedJsSrc = modulePath + ".js";
//        equal(actualLoadedJsSrc, expectedJsSrc, "JavaScript src loaded correctly (" + comment + "): " + actualLoadedJsSrc);
//        var actualLoadedJsClassName = jsLoaded.className;
//        var expectedJsClassName = modulesJsPrefix + moduleName;
//        equal(expectedJsClassName, actualLoadedJsClassName, "JavaScript className loaded correctly ("
//            + comment + "): " + actualLoadedJsClassName);
//        var actualLoadedJsType = jsLoaded.type;
//        var expectedJsType = "text/javascript";
//        equal(expectedJsType, actualLoadedJsType, "JavaScript type loaded correctly (" + comment + "): " + actualLoadedJsType);
//        var actualLoadedJsAsync = jsLoaded.async;
//        var expectedJsAsync = true;
//        equal(expectedJsAsync, actualLoadedJsAsync, "JavaScript async state loaded correctly (" + comment + "): " + actualLoadedJsType);
//        //End Javascript loaded check
//
//        //HTML loaded check
//        var dom = new Modules.DOM();
//        var htmlsLoaded = document.getElementsByClassName(moduleName);
//        var htmlsLoadedLength = htmlsLoaded.length;
//        var expectedHtmlClassName = moduleName;
//        var expectedHtmlType = "module";
//        var expectedRootClassName = className;
//        for (var i = 0; i < htmlsLoadedLength; i++) {
//            var itemIDAttribute = htmlsLoaded[i].parentNode.getAttribute("data-" + "modulesjs_item_id");
//            var itemTypeAttribute = htmlsLoaded[i].parentNode.getAttribute("data-" + "modulesjs_item_type");
//            ok(itemIDAttribute != undefined, "Html loaded correctly, modulesjs_item_id defined correctly (" + comment + "): " + itemIDAttribute);
//            ok(itemTypeAttribute != undefined, "Html loaded correctly, modulesjs_item_type defined correctly (" + comment + "): " + itemTypeAttribute);
//            equal(expectedHtmlClassName, htmlsLoaded[i].className,  "Html loaded correctly, className is found in document (" + comment + "): " + htmlsLoaded[i].className
//                + "; modulesjs_moduleID: " + itemIDAttribute);
//        }
//        //End HTML loaded check
//    }
//});
//asyncTest("load (itemName, className, callback)", function() {
////    expect(32);
//    var path = "modules_forTests";
//    var loader = new Modules.Loader(path);
//    var moduleName = "test";
//    var className = "loadNullModuleTest";
//    var modulePath = path + "/" + moduleName + "/" + moduleName;
//    document.addEventListener("module_" + moduleName + "_loaded", whenModuleLoadedWithEvent, true);
//    function whenModuleLoadedWithEvent(event) {
//        if (event.detail.itemInfo.className == className) {
//            checkModuleLoaded(moduleName, modulePath, "event assert");
//        }
//    }
//    function whenModuleLoadedWithCallback() {
//        checkModuleLoaded(moduleName, modulePath, className, "callback assert");
//        start();
//    }
//    loader.load(moduleName, className, whenModuleLoadedWithCallback);
//
//    function checkModuleLoaded(moduleName, modulePath, className, comment) {
//        //CSS loaded check
//        var modulesCSSprefix = "modulesjs_css_";
//        var cssLoaded = document.getElementsByClassName(modulesCSSprefix + moduleName)[0];
//        var loadedCSSHrefWithHost = cssLoaded.href;
//        var actualLoadedCSSHref = loadedCSSHrefWithHost.replace(window.location.host + "/", "").replace("http://", "").replace("https://","");
//        var expectedCSSHref = modulePath + ".css";
//        equal(actualLoadedCSSHref, expectedCSSHref, "CSS Href loaded correctly (" + comment + "): " + actualLoadedCSSHref);
//        var actualLoadedCSSClassName = cssLoaded.className;
//        var expectedCSSClassName = modulesCSSprefix + moduleName;
//        equal(actualLoadedCSSClassName, expectedCSSClassName, "CSS ClassName loaded correctly (" + comment + "): " + actualLoadedCSSClassName);
//        var actualLoadedCSSType = cssLoaded.type;
//        var expectedCSSType = "text/css";
//        equal(actualLoadedCSSType, expectedCSSType, "CSS Type loaded correctly (" + comment + "): " + actualLoadedCSSType);
//        var actualLoadedCSSStylesheet = cssLoaded.rel;
//        var expectedCSSStylesheet = "stylesheet";
//        equal(actualLoadedCSSStylesheet, expectedCSSStylesheet, "CSS Rel loaded correctly (" + comment + "): " + actualLoadedCSSStylesheet);
//        //End CSS Loaded check
//
//        //Javascript loaded check
//        var modulesJsPrefix = "modulesjs_js_";
//
//        var jsLoaded = document.getElementsByClassName(modulesJsPrefix + moduleName)[0];
//        var loadedJsSrcWithHost = jsLoaded.src;
//        var actualLoadedJsSrc = loadedJsSrcWithHost.replace(window.location.host + "/", "").replace("http://", "").replace("https://","");
//        var expectedJsSrc = modulePath + ".js";
//        equal(actualLoadedJsSrc, expectedJsSrc, "JavaScript src loaded correctly (" + comment + "): " + actualLoadedJsSrc);
//        var actualLoadedJsClassName = jsLoaded.className;
//        var expectedJsClassName = modulesJsPrefix + moduleName;
//        equal(expectedJsClassName, actualLoadedJsClassName, "JavaScript className loaded correctly ("
//            + comment + "): " + actualLoadedJsClassName);
//        var actualLoadedJsType = jsLoaded.type;
//        var expectedJsType = "text/javascript";
//        equal(expectedJsType, actualLoadedJsType, "JavaScript type loaded correctly (" + comment + "): " + actualLoadedJsType);
//        var actualLoadedJsAsync = jsLoaded.async;
//        var expectedJsAsync = true;
//        equal(expectedJsAsync, actualLoadedJsAsync, "JavaScript async state loaded correctly (" + comment + "): " + actualLoadedJsType);
//        //End Javascript loaded check
//
//        //HTML loaded check
//        var dom = new Modules.DOM();
//        var htmlsLoaded = document.getElementsByClassName(moduleName);
//        var htmlsLoadedLength = htmlsLoaded.length;
//        var expectedHtmlClassName = moduleName;
//        var expectedHtmlType = "module";
//        var expectedRootClassName = className;
//        for (var i = 0; i < htmlsLoadedLength; i++) {
//            var itemIDAttribute = htmlsLoaded[i].parentNode.getAttribute("data-" + "modulesjs_item_id");
//            var itemTypeAttribute = htmlsLoaded[i].parentNode.getAttribute("data-" + "modulesjs_item_type");
//            ok(itemIDAttribute != undefined, "Html loaded correctly, modulesjs_item_id defined correctly (" + comment + "): " + itemIDAttribute);
//            ok(itemTypeAttribute != undefined, "Html loaded correctly, modulesjs_item_type defined correctly (" + comment + "): " + itemTypeAttribute);
//            equal(expectedHtmlClassName, htmlsLoaded[i].className,  "Html loaded correctly, className is found in document (" + comment + "): " + htmlsLoaded[i].className
//                + "; modulesjs_moduleID: " + itemIDAttribute);
//        }
//        //End HTML loaded check
//    }
//});
//asyncTest("load (itemType, className, callback, loader.itemTypes.template, dataSource)", function() {
//    expect(4);
//    var path = "templates_forTests";
//    var loader = new Modules.Loader(path);
//    var templateName = "fileInfo";
//    var className = "loadTemplateTest";
//    var templatePath = path + "/" + templateName + "/" + templateName;
//    var dataSource = {fileName: "one", fileNameRaw: "oneRaw", lastModifiedDate: "02.02.02", isSelected: "false"};
//    document.addEventListener("template_" + templateName + "_loaded", whenTemplateLoadedWithEvent, true);
//    function whenTemplateLoadedWithEvent(event) {
//        if (event.detail.itemInfo.className == className) {
//            checkTemplateLoaded(templateName, templatePath, "event assert");
//        }
//    }
//    function whenTemplateLoadedWithCallback() {
//        checkTemplateLoaded(templateName, templatePath, "callback assert");
//        start();
//    }
//    loader.load(templateName, className, whenTemplateLoadedWithCallback, loader.itemTypes.template, dataSource);
//
//    function checkTemplateLoaded(templateName, templatePath, comment) {
//        //CSS loaded check
//        var modulesCSSprefix = "modulesjs_css_";
//        var cssLoaded = document.getElementsByClassName(modulesCSSprefix + templateName)[0];
//        var loadedCSSHrefWithHost = cssLoaded.href;
//        var actualLoadedCSSHref = loadedCSSHrefWithHost.replace(window.location.host + "/", "").replace("http://", "").replace("https://","");
//        var expectedCSSHref = templatePath + ".css";
//        equal(actualLoadedCSSHref, expectedCSSHref, "CSS Href loaded correctly (" + comment + "): " + actualLoadedCSSHref);
//        var actualLoadedCSSClassName = cssLoaded.className;
//        var expectedCSSClassName = modulesCSSprefix + templateName;
//        equal(actualLoadedCSSClassName, expectedCSSClassName, "CSS ClassName loaded correctly (" + comment + "): " + actualLoadedCSSClassName);
//
////        var actualLoadedCSSType = cssLoaded.type;
////        var expectedCSSType = "text/css";
////        equal(actualLoadedCSSType, expectedCSSType, "CSS Type loaded correctly (" + comment + "): " + actualLoadedCSSType);
////        var actualLoadedCSSStylesheet = cssLoaded.rel;
////        var expectedCSSStylesheet = "stylesheet";
////        equal(actualLoadedCSSStylesheet, expectedCSSStylesheet, "CSS Rel loaded correctly (" + comment + "): " + actualLoadedCSSStylesheet);
////        //End CSS Loaded check
////
////        //Javascript loaded check
////        var modulesJsPrefix = "modulesjs_js_";
////
////        var jsLoaded = document.getElementsByClassName(modulesJsPrefix + templateName)[0];
////        var loadedJsSrcWithHost = jsLoaded.src;
////        var actualLoadedJsSrc = loadedJsSrcWithHost.replace(window.location.host + "/", "").replace("http://", "").replace("https://","");
////        var expectedJsSrc = templatePath + ".js";
////        equal(actualLoadedJsSrc, expectedJsSrc, "JavaScript src loaded correctly (" + comment + "): " + actualLoadedJsSrc);
////        var actualLoadedJsClassName = jsLoaded.className;
////        var expectedJsClassName = modulesJsPrefix + templateName;
////        equal(expectedJsClassName, actualLoadedJsClassName, "JavaScript className loaded correctly ("
////            + comment + "): " + actualLoadedJsClassName);
////        var actualLoadedJsType = jsLoaded.type;
////        var expectedJsType = "text/javascript";
////        equal(expectedJsType, actualLoadedJsType, "JavaScript type loaded correctly (" + comment + "): " + actualLoadedJsType);
////        var actualLoadedJsAsync = jsLoaded.async;
////        var expectedJsAsync = true;
////        equal(expectedJsAsync, actualLoadedJsAsync, "JavaScript async state loaded correctly (" + comment + "): " + actualLoadedJsType);
////        //End Javascript loaded check
////
////        //HTML loaded check
////        var dom = new Modules.DOM();
////        var htmlsLoaded = document.getElementsByClassName(templateName);
////        var htmlsLoadedLength = htmlsLoaded.length;
////        var expectedHtmlClassName = templateName;
////        var expectedHtmlType = "module";
////        var expectedRootClassName = className;
////        for (var i = 0; i < htmlsLoadedLength; i++) {
////            var itemIDAttribute = htmlsLoaded[i].parentNode.getAttribute("data-" + "modulesjs_item_id");
////            var itemTypeAttribute = htmlsLoaded[i].parentNode.getAttribute("data-" + "modulesjs_item_type");
////            ok(itemIDAttribute != undefined, "Html loaded correctly, modulesjs_item_id defined correctly (" + comment + "): " + itemIDAttribute);
////            ok(itemTypeAttribute != undefined, "Html loaded correctly, modulesjs_item_type defined correctly (" + comment + "): " + itemTypeAttribute);
////            equal(expectedHtmlClassName, htmlsLoaded[i].className,  "Html loaded correctly, className is found in document (" + comment + "): " + htmlsLoaded[i].className
////                + "; modulesjs_moduleID: " + itemIDAttribute);
////            equal(expectedRootClassName, htmlsLoaded[i].parentNode.className, "Html loaded in correct root class (" + comment+ "): " + htmlsLoaded[i].parentNode.className
////                + "; modulesjs_moduleID: " + itemIDAttribute);
////        }
////        End HTML loaded check
//    }
//});
////TODO: getElementByClassName with elementType method in modulesOld.js. More simple getElementByClassName.
////TODO: when we get Elements by ClassName, check elementType in tests.
//module("Modules.Events", {
//    setup: function() {
////        var divloadTest = document.createElement('div');
////        divloadTest.className = "loadTest";
////        document.getElementsByTagName("body")[0].appendChild(divloadTest);
////        var divloadTest = document.createElement('div');
////        divloadTest.className = "loadTest";
////        document.getElementsByTagName("body")[0].appendChild(divloadTest);
////        var divloadHTMLTest = document.createElement('div');
////        divloadHTMLTest.className = "loadHTMLTest";
////        document.getElementsByTagName("body")[0].appendChild(divloadHTMLTest);
////        var divloadTemplateTest = document.createElement('div');
////        divloadTemplateTest.className = "loadTemplateTest";
////        document.getElementsByTagName("body")[0].appendChild(divloadTemplateTest);
//    },
//    teardown: function() {
////        var divloadTest = document.getElementsByClassName("loadTest")[0];
////        document.getElementsByTagName("body")[0].removeChild(divloadTest);
////        var divloadTest = document.getElementsByClassName("loadTest")[0];
////        document.getElementsByTagName("body")[0].removeChild(divloadTest);
////        var divloadHTMLTest = document.getElementsByClassName("loadHTMLTest")[0];
////        document.getElementsByTagName("body")[0].removeChild(divloadHTMLTest);
////        var divloadTemplateTest = document.getElementsByClassName("loadTemplateTest")[0];
////        document.getElementsByTagName("body")[0].removeChild(divloadTemplateTest);
//    }
//});
//test("subscribeMessage&sendMessage&unsubscribeMessage", function() {
//    expect(5);
//    var events = new Modules.Events();
//    var messageID = "testMessageID";
//    var dataObject = {item1: "info1"};
//    var sourceID = "sourceID";
//    var destinationID = "destinationID";
//    events.subscribeMessage(messageID, onMessageWithMessageIDReceived);
//    function onMessageWithMessageIDReceived(e) {
//        var sourceID = e.detail.postAdress.sourceID;
//        var destinationID = e.detail.postAdress.destinationID;
//        equal(dataObject.item1, e.detail.dataObject.item1, "Message received with messageID only," +
//            " data received correctly. sourceid=" + sourceID
//            + "; destinationID=" + destinationID + ";");
//    }
//    events.subscribeMessage(messageID, onMessageWithMessageIDSourceIDReceived, sourceID);
//    function onMessageWithMessageIDSourceIDReceived(e) {
//        var sourceID = e.detail.postAdress.sourceID;
//        var destinationID = e.detail.postAdress.destinationID;
//        equal(dataObject.item1, e.detail.dataObject.item1, "Message received with messageID and sourceID," +
//            " data received correctly. sourceid=" + sourceID
//            + "; destinationID=" + destinationID + ";");
//    }
//    events.subscribeMessage(messageID, onMessageWithMessageIDDestinationIDReceived, null, destinationID);
//    function onMessageWithMessageIDDestinationIDReceived(e) {
//        var sourceID = e.detail.postAdress.sourceID;
//        var destinationID = e.detail.postAdress.destinationID;
//        equal(dataObject.item1, e.detail.dataObject.item1, "Message received with messageID and destinationID," +
//            " data received correctly. sourceid=" + sourceID
//            + "; destinationID=" + destinationID + ";");
//    }
//    events.subscribeMessage(messageID, onMessageWithMessageIDSourceIDDestinationIDReceived, sourceID, destinationID);
//    function onMessageWithMessageIDSourceIDDestinationIDReceived(e) {
//        var sourceID = e.detail.postAdress.sourceID;
//        var destinationID = e.detail.postAdress.destinationID;
//        equal(dataObject.item1, e.detail.dataObject.item1, "Message received with messageID, sourceID and destinationID," +
//            " data received correctly. sourceid=" + sourceID
//            + "; destinationID=" + destinationID + ";");
//    }
//    events.sendMessage(messageID, dataObject);
//    events.sendMessage(messageID, dataObject, sourceID);
//    events.sendMessage(messageID, dataObject, null, destinationID);
//    events.sendMessage(messageID, dataObject, sourceID, null);
//    events.sendMessage(messageID, dataObject, sourceID, destinationID);
//    //must not added callback, because unsubscribed
//    events.unsubscribeMessage(messageID, onMessageWithMessageIDReceived);
//    events.sendMessage(messageID, dataObject);
//    events.unsubscribeMessage(messageID, onMessageWithMessageIDSourceIDReceived, sourceID);
//    events.sendMessage(messageID, dataObject, sourceID);
//    events.unsubscribeMessage(messageID, onMessageWithMessageIDDestinationIDReceived, null, destinationID);
//    events.sendMessage(messageID, dataObject, null, destinationID);
//    events.unsubscribeMessage(messageID, onMessageWithMessageIDSourceIDDestinationIDReceived, sourceID, destinationID);
//    events.sendMessage(messageID, dataObject, sourceID, destinationID);
//
//});
////asyncTest("loadHTML", function() {
////    expect(1);
////    var path = "files_forTests";
////    var loader = new Modules.Loader(path);
////    var fileName = "test";
////    var filePath = path + "/" + fileName;
////    var containerClassName = "loadHTMLTest";
////    loader.loadHTML(fileName, containerClassName, function(){
////        checkHTMLLoaded(fileName, filePath, "callback assert");
////        start();
////    });
////    function checkHTMLLoaded(fileName, filePath, comment) {
////        var htmlsLoaded = document.getElementsByClassName(fileName);
////        var htmlsLoadedLength = htmlsLoaded.length;
////        var expectedHtmlClassName = fileName;
////        var expectedHtmlType = "file";
////        var expectedRootClassName = containerClassName;
////        for (var i = 0; i < htmlsLoadedLength; i++) {
////            var moduleIDAttribute = htmlsLoaded[i].parentNode.getAttribute("data-" + "modulesjs_moduleid");
////            ok(moduleIDAttribute != undefined, "Html loaded correctly, modulesjs_moduleID defined correctly (" + comment + "): " + moduleIDAttribute);
////            equal(expectedHtmlClassName, htmlsLoaded[i].className,  "Html loaded correctly, className is found in document (" + comment + "): " + htmlsLoaded[i].className
////                + "; modulesjs_moduleID: " + moduleIDAttribute);
////            equal(expectedRootClassName, htmlsLoaded[i].parentNode.className, "Html loaded in correct root class (" + comment+ "): " + htmlsLoaded[i].parentNode.className
////                + "; modulesjs_moduleID: " + moduleIDAttribute);
////        }
////    }
////});
//module("Modules.DOM", {
//    setup: function() {
////        var divloadTest = document.createElement('div');
////        divloadTest.className = "loadTest";
////        document.getElementsByTagName("body")[0].appendChild(divloadTest);
////        var divloadTest = document.createElement('div');
////        divloadTest.className = "loadTest";
////        document.getElementsByTagName("body")[0].appendChild(divloadTest);
////        var divloadHTMLTest = document.createElement('div');
////        divloadHTMLTest.className = "loadHTMLTest";
////        document.getElementsByTagName("body")[0].appendChild(divloadHTMLTest);
////        var divloadTemplateTest = document.createElement('div');
////        divloadTemplateTest.className = "loadTemplateTest";
////        document.getElementsByTagName("body")[0].appendChild(divloadTemplateTest);
//    },
//    teardown: function() {
////        var divloadTest = document.getElementsByClassName("loadTest")[0];
////        document.getElementsByTagName("body")[0].removeChild(divloadTest);
////        var divloadTest = document.getElementsByClassName("loadTest")[0];
////        document.getElementsByTagName("body")[0].removeChild(divloadTest);
////        var divloadHTMLTest = document.getElementsByClassName("loadHTMLTest")[0];
////        document.getElementsByTagName("body")[0].removeChild(divloadHTMLTest);
////        var divloadTemplateTest = document.getElementsByClassName("loadTemplateTest")[0];
////        document.getElementsByTagName("body")[0].removeChild(divloadTemplateTest);
//    }
//});
////test("getRootTarget", function() {
////    var dom = new Modules.DOM();
////
////});